'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createSection(portfolioId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  // Verify ownership
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('id')
    .eq('id', portfolioId)
    .eq('user_id', user.id)
    .single();

  if (!portfolio) {
    throw new Error('Portfolio not found');
  }

  const type = formData.get('type') as string;
  const title = formData.get('title') as string;
  const content = JSON.parse((formData.get('content') as string) || '{}');

  // Get max order
  const { data: maxOrder } = await supabase
    .from('portfolio_sections')
    .select('order')
    .eq('portfolio_id', portfolioId)
    .order('order', { ascending: false })
    .limit(1)
    .single();

  const order = (maxOrder?.order ?? -1) + 1;

  const { data: section, error } = await supabase
    .from('portfolio_sections')
    .insert({
      portfolio_id: portfolioId,
      type,
      title,
      content,
      order,
      is_visible: true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/portfolio/${portfolioId}`);
  return section;
}

export async function updateSection(sectionId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  // Verify ownership through portfolio
  const { data: section } = await supabase
    .from('portfolio_sections')
    .select('portfolio_id, portfolios!inner(user_id)')
    .eq('id', sectionId)
    .single();

  if (!section || section.portfolios.user_id !== user.id) {
    throw new Error('Section not found');
  }

  const title = formData.get('title') as string;
  const content = JSON.parse((formData.get('content') as string) || '{}');
  const isVisible = formData.get('is_visible') === 'true';

  const { error } = await supabase
    .from('portfolio_sections')
    .update({
      title,
      content,
      is_visible: isVisible,
      updated_at: new Date().toISOString(),
    })
    .eq('id', sectionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/portfolio/${section.portfolio_id}`);
}

export async function deleteSection(sectionId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  // Verify ownership through portfolio
  const { data: section } = await supabase
    .from('portfolio_sections')
    .select('portfolio_id, portfolios!inner(user_id)')
    .eq('id', sectionId)
    .single();

  if (!section || section.portfolios.user_id !== user.id) {
    throw new Error('Section not found');
  }

  const { error } = await supabase.from('portfolio_sections').delete().eq('id', sectionId);

  if (error) {
    throw new Error(error.message);
  }

  // Reorder remaining sections
  const { data: sections } = await supabase
    .from('portfolio_sections')
    .select('id')
    .eq('portfolio_id', section.portfolio_id)
    .order('order', { ascending: true });

  if (sections) {
    const updates = sections.map((s, index) =>
      supabase.from('portfolio_sections').update({ order: index }).eq('id', s.id)
    );
    await Promise.all(updates);
  }

  revalidatePath(`/dashboard/portfolio/${section.portfolio_id}`);
}

export async function reorderSections(portfolioId: string, sectionIds: string[]) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  // Verify ownership
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('id')
    .eq('id', portfolioId)
    .eq('user_id', user.id)
    .single();

  if (!portfolio) {
    throw new Error('Portfolio not found');
  }

  const updates = sectionIds.map((id, index) =>
    supabase.from('portfolio_sections').update({ order: index }).eq('id', id)
  );

  await Promise.all(updates);

  revalidatePath(`/dashboard/portfolio/${portfolioId}`);
}

export async function toggleSectionVisibility(sectionId: string, isVisible: boolean) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  // Verify ownership through portfolio
  const { data: section } = await supabase
    .from('portfolio_sections')
    .select('portfolio_id, portfolios!inner(user_id)')
    .eq('id', sectionId)
    .single();

  if (!section || section.portfolios.user_id !== user.id) {
    throw new Error('Section not found');
  }

  const { error } = await supabase
    .from('portfolio_sections')
    .update({
      is_visible: isVisible,
      updated_at: new Date().toISOString(),
    })
    .eq('id', sectionId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/dashboard/portfolio/${section.portfolio_id}`);
}
