import { getAdminStats, getAllUsers, getAllPortfolios } from '@/actions/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Globe, TrendingUp, UserPlus, Clock, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

const statCards = [
  { name: 'Total Users', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Total Portfolios', icon: FileText, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Published Portfolios', icon: Globe, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'New Users This Week', icon: UserPlus, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

export default async function AdminOverviewPage() {
  const stats = await getAdminStats();
  const users = await getAllUsers();
  const portfolios = await getAllPortfolios();

  const recentUsers = users.slice(0, 5);
  const recentPortfolios = portfolios.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Monitor and manage your portfolio builder platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_users}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolios</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_portfolios}</div>
            <p className="text-xs text-muted-foreground">All portfolios created</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published_portfolios}</div>
            <p className="text-xs text-muted-foreground">Live portfolios</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new_users_this_week}</div>
            <p className="text-xs text-muted-foreground">New user registrations</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Users</CardTitle>
              <Link href="/admin/users" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentUsers.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">No users yet</p>
            ) : (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between border-b py-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-medium text-primary">
                          {user.full_name?.[0] || user.email[0]}.toUpperCase()
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.full_name || 'Unnamed'}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Joined</p>
                      <p className="text-sm">{formatDate(user.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Portfolios */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Portfolios</CardTitle>
              <Link href="/admin/portfolios" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentPortfolios.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">No portfolios yet</p>
            ) : (
              <div className="space-y-4">
                {recentPortfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className="flex items-center justify-between border-b py-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{portfolio.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {portfolio.profiles?.full_name || 'Unknown'} • {portfolio.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          portfolio.is_published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {portfolio.is_published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(portfolio.created_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/users">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/portfolios">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Manage Portfolios
              </Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="outline" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                View Analytics
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                Platform Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
