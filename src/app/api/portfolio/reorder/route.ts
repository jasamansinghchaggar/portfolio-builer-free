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

  const { portfolioId, sections } = await request.json();

  if (!portfolioId || !sections) {
    return NextResponse.json({ error: 'Missing portfolioId or sections' }, { status: 400 });
  }

  // Verify ownership
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('id')
    .eq('id', portfolioId)
    .eq('user_id', user.id)
    .single();

  if (!portfolio) {
    return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
  }

  // Update order for each section
  const updates = sections.map(({ id, order }: { id: string; order: number }) =>
    supabase.from('portfolio_sections').update({ order }).eq('id', id)
  );

  await Promise.all(updates);

  return NextResponse.json({ success: true });
}
