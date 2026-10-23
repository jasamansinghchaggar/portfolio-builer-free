import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Globe, TrendingUp, Activity, BarChart2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const analyticsData = {
  overview: [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
    { label: 'Active Users (30d)', value: '567', change: '+8%', trend: 'up' },
    { label: 'Total Portfolios', value: '890', change: '+15%', trend: 'up' },
    { label: 'Published Portfolios', value: '445', change: '+22%', trend: 'up' },
    { label: 'Avg. Sections/Portfolio', value: '4.2', change: '+0.3', trend: 'up' },
    { label: 'Publish Rate', value: '50%', change: '+5%', trend: 'up' },
  ],
  userGrowth: [
    { month: 'Jan', users: 120, portfolios: 80 },
    { month: 'Feb', users: 150, portfolios: 95 },
    { month: 'Mar', users: 180, portfolios: 110 },
    { month: 'Apr', users: 220, portfolios: 140 },
    { month: 'May', users: 250, portfolios: 165 },
    { month: 'Jun', users: 280, portfolios: 190 },
  ],
  templateUsage: [
    { template: 'Modern', count: 234, percentage: 35 },
    { template: 'Developer', count: 189, percentage: 28 },
    { template: 'Creative', count: 134, percentage: 20 },
    { template: 'Minimal', count: 89, percentage: 13 },
    { template: 'Executive', count: 44, percentage: 4 },
  ],
  topSections: [
    { section: 'Hero', usage: 98 },
    { section: 'About', usage: 87 },
    { section: 'Projects', usage: 82 },
    { section: 'Skills', usage: 75 },
    { section: 'Experience', usage: 68 },
    { section: 'Contact', usage: 65 },
    { section: 'Education', usage: 42 },
  ],
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-muted-foreground">Platform insights and performance metrics</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {analyticsData.overview.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <TrendingUp
                className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500">{stat.change} vs last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User & Portfolio Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.userGrowth.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-muted-foreground">{month.month}</span>
                  <div className="relative h-2 flex-1 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(month.users / 300) * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-sm font-medium">{month.users}</span>
                  <div className="relative h-2 flex-1 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${(month.portfolios / 200) * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-sm font-medium text-green-500">
                    {month.portfolios}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-primary" />
                Users
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-green-500" />
                Portfolios
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Template Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Template Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.templateUsage.map((template) => (
                <div key={template.template} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{template.template}</span>
                    <span className="text-muted-foreground">
                      {template.count} ({template.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${template.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Usage & Top Portfolios */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Section Usage Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topSections.map((section) => (
                <div key={section.section} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium">{section.section}</span>
                  <div className="h-3 flex-1 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${section.usage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-medium">{section.usage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'New user registered',
                  user: 'john@example.com',
                  time: '2 min ago',
                  type: 'user',
                },
                {
                  action: 'Portfolio published',
                  user: 'Jane Doe',
                  portfolio: 'My Portfolio',
                  time: '15 min ago',
                  type: 'portfolio',
                },
                {
                  action: 'New portfolio created',
                  user: 'Bob Smith',
                  portfolio: 'Developer Portfolio',
                  time: '1 hour ago',
                  type: 'portfolio',
                },
                {
                  action: 'User upgraded to Pro',
                  user: 'alice@example.com',
                  time: '3 hours ago',
                  type: 'upgrade',
                },
                {
                  action: 'Portfolio unpublished',
                  user: 'Charlie Brown',
                  portfolio: 'Old Portfolio',
                  time: '5 hours ago',
                  type: 'portfolio',
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {activity.type === 'user' && <Users className="h-5 w-5 text-primary" />}
                    {activity.type === 'portfolio' && <FileText className="h-5 w-5 text-primary" />}
                    {activity.type === 'upgrade' && <TrendingUp className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} {activity.portfolio ? `• ${activity.portfolio}` : ''}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
