'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Edit,
  Globe,
  Trash2,
  Eye,
  ExternalLink,
  Copy,
  CheckCircle,
  Clock,
  FileText,
  MoreHorizontal,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PortfolioListProps {
  portfolios: Portfolio[];
}

export default function PortfolioList({ portfolios }: PortfolioListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const copyUrl = (slug: string) => {
    const url = `${window.location.origin}/p/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolios/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Portfolio deleted');
      window.location.reload();
    } catch {
      toast.error('Failed to delete portfolio');
    } finally {
      setDeletingId(null);
    }
  };

  if (portfolios.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="mb-2 text-lg font-semibold">No portfolios yet</h3>
          <p className="mb-6 text-muted-foreground">Create your first portfolio to get started</p>
          <Link href="/dashboard/portfolios/new">
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Create Portfolio
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl">Your Portfolios</CardTitle>
        <Link href="/dashboard/portfolios/new">
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            New Portfolio
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{portfolio.title}</CardTitle>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>/p/{portfolio.slug}</span>
                    {portfolio.is_published ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-green-600 dark:text-green-400">Published</span>
                        {portfolio.published_at && (
                          <>
                            <span>•</span>
                            <span>Published {formatDate(portfolio.published_at)}</span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Clock className="h-3.5 w-3.5 text-yellow-500" />
                        <span className="text-yellow-600 dark:text-yellow-400">Draft</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                <Link href={`/dashboard/portfolio/${portfolio.id}`}>
                  <Button variant="outline" size="sm" className="min-w-[120px] flex-1 gap-1">
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </Link>
                {portfolio.is_published ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => window.open(`/p/${portfolio.slug}`, '_blank')}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => copyUrl(portfolio.slug)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy URL
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" className="gap-1" disabled>
                    <Globe className="h-3.5 w-3.5" />
                    Not Published
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/dashboard/portfolio/${portfolio.id}`}>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Portfolio
                      </DropdownMenuItem>
                    </Link>
                    {portfolio.is_published && (
                      <>
                        <DropdownMenuItem
                          onClick={() => window.open(`/p/${portfolio.slug}`, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyUrl(portfolio.slug)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Portfolio</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{portfolio.title}"? This action cannot
                            be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex justify-end gap-2">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(portfolio.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
