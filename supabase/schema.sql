-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  headline TEXT,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  website TEXT,
  linkedin TEXT,
  github TEXT,
  twitter TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Portfolios table
CREATE TABLE public.portfolios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL DEFAULT 'modern',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  custom_domain TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Portfolios policies
CREATE POLICY "Users can view own portfolios" ON public.portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own portfolios" ON public.portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios" ON public.portfolios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolios" ON public.portfolios
  FOR DELETE USING (auth.uid() = user_id);

-- Public can view published portfolios
CREATE POLICY "Public can view published portfolios" ON public.portfolios
  FOR SELECT USING (is_published = TRUE);

-- Portfolio sections table
CREATE TABLE public.portfolio_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact', 'custom')),
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  "order" INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.portfolio_sections ENABLE ROW LEVEL SECURITY;

-- Portfolio sections policies
CREATE POLICY "Users can view own portfolio sections" ON public.portfolio_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE portfolios.id = portfolio_sections.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own portfolio sections" ON public.portfolio_sections
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE portfolios.id = portfolio_sections.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own portfolio sections" ON public.portfolio_sections
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE portfolios.id = portfolio_sections.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own portfolio sections" ON public.portfolio_sections
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE portfolios.id = portfolio_sections.portfolio_id
      AND portfolios.user_id = auth.uid()
    )
  );

-- Public can view sections of published portfolios
CREATE POLICY "Public can view sections of published portfolios" ON public.portfolio_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.portfolios
      WHERE portfolios.id = portfolio_sections.portfolio_id
      AND portfolios.is_published = TRUE
    )
  );

-- Templates table
CREATE TABLE public.templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  preview_url TEXT,
  sections JSONB NOT NULL DEFAULT '[]',
  styles JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Templates policies (public read, admin write)
CREATE POLICY "Public can view active templates" ON public.templates
  FOR SELECT USING (is_active = TRUE);

-- Admin users table
CREATE TABLE public.admin_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin policies
CREATE POLICY "Admins can view admin users" ON public.admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Storage bucket for avatars and portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', TRUE);
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', TRUE);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own avatar" ON storage.objects
  FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for portfolio images
CREATE POLICY "Portfolio images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-images');

CREATE POLICY "Users can upload portfolio images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update portfolio images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'portfolio-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete portfolio images" ON storage.objects
  FOR DELETE USING (bucket_id = 'portfolio-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON public.portfolios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_sections_updated_at
  BEFORE UPDATE ON public.portfolio_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX idx_portfolios_slug ON public.portfolios(slug);
CREATE INDEX idx_portfolio_sections_portfolio_id ON public.portfolio_sections(portfolio_id);
CREATE INDEX idx_portfolio_sections_order ON public.portfolio_sections(portfolio_id, "order");