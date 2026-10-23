import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const templateId = (formData.get('template_id') as string) || 'modern';

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  // Generate unique slug
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let counter = 1;

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
    return NextResponse.json({ error: error.message }, { status: 500 });
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

  return NextResponse.json(portfolio);
}
