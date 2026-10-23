export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  website: string | null;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  template_id: string;
  is_published: boolean;
  published_at: string | null;
  custom_domain: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioSection {
  id: string;
  portfolio_id: string;
  type: SectionType;
  title: string;
  content: SectionContent;
  order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export type SectionType =
  'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'education' | 'contact' | 'custom';

export interface SectionContent {
  // Hero
  name?: string;
  headline?: string;
  subheadline?: string;
  cta_text?: string;
  cta_link?: string;
  avatar_url?: string;

  // About
  description?: string;
  highlights?: string[];

  // Skills
  categories?: SkillCategory[];

  // Projects
  projects?: Project[];

  // Experience
  experiences?: Experience[];

  // Education
  education?: Education[];

  // Contact
  email?: string;
  phone?: string;
  location?: string;
  social_links?: SocialLink[];

  // Custom
  custom_html?: string;
  custom_css?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  featured: boolean;
  start_date?: string;
  end_date?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  location?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  description?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  grade?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  preview_url: string;
  sections: TemplateSection[];
  styles: TemplateStyles;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateSection {
  type: SectionType;
  title: string;
  default_content: SectionContent;
  order: number;
  required: boolean;
}

export interface TemplateStyles {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: 'compact' | 'normal' | 'relaxed';
  border_radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export interface AdminStats {
  total_users: number;
  total_portfolios: number;
  published_portfolios: number;
  active_users_today: number;
  new_users_this_week: number;
  portfolios_published_this_week: number;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  portfolio_count: number;
  is_admin: boolean;
  is_banned: boolean;
}
