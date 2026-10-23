import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { id } = await params;

  // Verify ownership
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!portfolio) {
    return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
  }

  const formData = await request.formData();
  const type = formData.get('type') as string;
  const title = formData.get('title') as string;
  const content = (formData.get('content') as string) || '{}';

  // Get max order
  const { data: maxOrder } = await supabase
    .from('portfolio_sections')
    .select('order')
    .eq('portfolio_id', id)
    .order('order', { ascending: false })
    .limit(1)
    .single();

  const order = (maxOrder?.order ?? -1) + 1;

  const { data: section, error } = await supabase
    .from('portfolio_sections')
    .insert({
      portfolio_id: id,
      type,
      title,
      content: JSON.parse(content),
      order,
      is_visible: true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(section);
}
