import { getProfile } from '@/lib/auth';
import { redirect } from 'next/navigation';
import OnboardingForm from './OnboardingForm';

export default async function OnboardingPage() {
  const profile = await getProfile();

  if (!profile) {
    redirect('/auth/login');
  }

  if (profile.onboarding_completed) {
    redirect('/dashboard');
  }

  return <OnboardingForm initialData={profile} />;
}
