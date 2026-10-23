'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { generateSlug } from '@/lib/utils';

export async function createPortfolio(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  const title = formData.get('title') as string;
  const templateId = (formData.get('template_id') as string) || 'modern';

  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  // Check if slug exists and make unique
  while (true) {
    const { data: existing } = await supabase
      .from('portfolios')
      .select('id')
      .eq('slug', slug)
      .single();

    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const { data: portfolio, error } = await supabase
    .from('portfolios')
    .insert({
      user_id: user.id,
      title,
      slug,
      template_id: templateId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Create default sections from template
  const { data: template } = await supabase
    .from('templates')
    .select('sections')
    .eq('id', templateId)
    .single();

  if (template?.sections) {
    const sections = template.sections.map((section: any, index: number) => ({
      portfolio_id: portfolio.id,
      type: section.type,
      title: section.title,
      content: section.default_content || {},
      order: section.order,
      is_visible: true,
    }));

    await supabase.from('portfolio_sections').insert(sections);
  }

  revalidatePath('/dashboard');
  redirect(`/dashboard/portfolio/${portfolio.id}`);
}

export async function updatePortfolio(portfolioId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  const title = formData.get('title') as string;
  const templateId = formData.get('template_id') as string;
  const seoTitle = formData.get('seo_title') as string;
  const seoDescription = formData.get('seo_description') as string;

  let slug = formData.get('slug') as string;
  if (slug) {
    slug = generateSlug(slug);
    // Check if slug is taken by another portfolio
    const { data: existing } = await supabase
      .from('portfolios')
      .select('id')
      .eq('slug', slug)
      .neq('id', portfolioId)
      .single();

    if (existing) {
      throw new Error('This URL is already taken');
    }
  }

  const { error } = await supabase
    .from('portfolios')
    .update({
      title,
      slug: slug || undefined,
      template_id: templateId,
      seo_title: seoTitle,
      seo_description: seoDescription,
      updated_at: new Date().toISOString(),
    })
    .eq('id', portfolioId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/portfolio/${portfolioId}`);
}

export async function deletePortfolio(portfolioId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  const { error } = await supabase
    .from('portfolios')
    .delete()
    .eq('id', portfolioId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
}

export async function publishPortfolio(portfolioId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  const { error } = await supabase
    .from('portfolios')
    .update({
      is_published: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', portfolioId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/portfolio/${portfolioId}`);
}

export async function unpublishPortfolio(portfolioId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  const { error } = await supabase
    .from('portfolios')
    .update({
      is_published: false,
      published_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', portfolioId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/portfolio/${portfolioId}`);
}

export async function getUserPortfolios() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: portfolios } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return portfolios || [];
}

export async function getPortfolio(portfolioId: string) {
  const supabase = await createClient();

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('id', portfolioId)
    .single();

  return portfolio;
}

export async function getPortfolioWithSections(portfolioId: string) {
  const supabase = await createClient();

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('id', portfolioId)
    .single();

  if (!portfolio) return null;

  const { data: sections } = await supabase
    .from('portfolio_sections')
    .select('*')
    .eq('portfolio_id', portfolioId)
    .order('order', { ascending: true });

  return { ...portfolio, sections: sections || [] };
}

export async function getPublicPortfolio(slug: string) {
  const supabase = await createClient();

  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (!portfolio) return null;

  const { data: sections } = await supabase
    .from('portfolio_sections')
    .select('*')
    .eq('portfolio_id', portfolio.id)
    .eq('is_visible', true)
    .order('order', { ascending: true });

  return { ...portfolio, sections: sections || [] };
}

export async function getTemplates() {
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  return templates || [];
}

// Admin actions
export async function getAllPortfolios() {
  const supabase = await createAdminClient();

  const { data: portfolios } = await supabase
    .from('portfolios')
    .select(
      `
      *,
      profiles:user_id (full_name, email)
    `
    )
    .order('created_at', { ascending: false });

  return portfolios || [];
}

export async function getAdminStats() {
  const supabase = await createAdminClient();

  const [{ count: totalUsers }, { count: totalPortfolios }, { count: publishedPortfolios }] =
    await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('portfolios').select('*', { count: 'exact', head: true }),
      supabase
        .from('portfolios')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true),
    ]);

  // Get new users this week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { count: newUsersThisWeek } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', weekAgo.toISOString());

  const { count: portfoliosPublishedThisWeek } = await supabase
    .from('portfolios')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)
    .gte('published_at', weekAgo.toISOString());

  return {
    total_users: totalUsers || 0,
    total_portfolios: totalPortfolios || 0,
    published_portfolios: publishedPortfolios || 0,
    active_users_today: 0, // Would need analytics tracking
    new_users_this_week: newUsersThisWeek || 0,
    portfolios_published_this_week: portfoliosPublishedThisWeek || 0,
  };
}

export async function getAllUsers() {
  const supabase = await createAdminClient();

  const { data: users } = await supabase
    .from('profiles')
    .select(
      `
      *,
      portfolios:portfolios (id, is_published)
    `
    )
    .order('created_at', { ascending: false });

  return (
    users?.map((user) => ({
      ...user,
      portfolio_count: user.portfolios?.length || 0,
      is_admin: false, // Would check admin_users table
      is_banned: false,
    })) || []
  );
}
