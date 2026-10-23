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

  const fullName = formData.get('full_name') as string;
  const headline = formData.get('headline') as string;
  const bio = formData.get('bio') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const location = formData.get('location') as string;
  const website = formData.get('website') as string;
  const linkedin = formData.get('linkedin') as string;
  const github = formData.get('github') as string;
  const twitter = formData.get('twitter') as string;

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      headline,
      bio,
      email,
      phone,
      location,
      website,
      linkedin,
      github,
      twitter,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
