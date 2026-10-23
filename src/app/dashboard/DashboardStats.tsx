import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Globe, Eye, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface DashboardStatsProps {
  portfolios: Portfolio[];
}

export default function DashboardStats({ portfolios }: DashboardStatsProps) {
  const totalPortfolios = portfolios.length;
  const publishedPortfolios = portfolios.filter((p) => p.is_published).length;
  const draftPortfolios = totalPortfolios - publishedPortfolios;
  const recentPortfolios = portfolios.slice(0, 5);

  const stats = [
    {
      name: 'Total Portfolios',
      value: totalPortfolios,
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      name: 'Published',
      value: publishedPortfolios,
      icon: Globe,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      name: 'Drafts',
      value: draftPortfolios,
      icon: FileText,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <p className="mt-1 text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={cn('rounded-xl p-3', stat.bg)}>
                <stat.icon className={cn('h-6 w-6', stat.color)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quick Actions</p>
              <p className="mt-1 text-lg font-semibold">Create new portfolio</p>
            </div>
            <Link href="/dashboard/portfolios/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Portfolio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
