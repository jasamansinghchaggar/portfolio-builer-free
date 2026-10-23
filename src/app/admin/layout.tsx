import { requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import { getAdminStats, getAllUsers, getAllPortfolios } from '@/actions/portfolio';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <AdminSidebar />
      <main className="min-h-screen lg:ml-64">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
