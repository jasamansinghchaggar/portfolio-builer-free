'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

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
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/onboarding');
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function uploadAvatar(file: File) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Not authenticated');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath('/onboarding');
  revalidatePath('/dashboard');
  revalidatePath('/settings');

  return publicUrl;
}

export async function completeOnboarding() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }

  const { error } = await supabase
    .from('profiles')
    .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/onboarding');
  redirect('/dashboard');
}
