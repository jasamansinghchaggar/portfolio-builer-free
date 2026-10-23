import { getUserPortfolios } from '@/actions/portfolio';
import { getProfile } from '@/lib/auth';
import DashboardStats from './DashboardStats';
import PortfolioList from './PortfolioList';

export default async function DashboardPage() {
  const profile = await getProfile();
  const portfolios = await getUserPortfolios();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'there'}!</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your portfolios and track your professional presence.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats portfolios={portfolios} />

      {/* Portfolios List */}
      <PortfolioList portfolios={portfolios} />
    </div>
  );
}
