import { getProfile } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardSidebar from './DashboardSidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();

  if (!profile) {
    redirect('/auth/login');
  }

  if (!profile.onboarding_completed) {
    redirect('/onboarding');
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <DashboardSidebar />
      <main className="min-h-screen lg:ml-64">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
