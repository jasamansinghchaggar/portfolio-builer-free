import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ sectionId: string }> }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { sectionId } = await params;

  // Get section with portfolio info
  const { data: section } = await supabase
    .from('portfolio_sections')
    .select('portfolio_id, portfolios!inner(user_id)')
    .eq('id', sectionId)
    .single();

  if (!section || section.portfolios.user_id !== user.id) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  const { error } = await supabase.from('portfolio_sections').delete().eq('id', sectionId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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

  return NextResponse.json({ success: true });
}
