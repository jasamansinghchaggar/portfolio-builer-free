import { getAllPortfolios } from '@/actions/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  FileText,
  Globe,
  User,
  Calendar,
  MoreHorizontal,
  Eye,
  ExternalLink,
  Trash2,
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

export default async function AdminPortfoliosPage() {
  const portfolios = await getAllPortfolios();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <p className="mt-1 text-muted-foreground">View and manage all portfolios</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search portfolios..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Portfolios ({portfolios.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Portfolio</th>
                  <th className="hidden pb-3 font-medium md:table-cell">Owner</th>
                  <th className="hidden pb-3 font-medium lg:table-cell">Template</th>
                  <th className="hidden pb-3 font-medium xl:table-cell">Created</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {portfolios.map((portfolio) => (
                  <tr key={portfolio.id} className="hover:bg-muted/50">
                    <td className="py-4">
                      <div>
                        <p className="max-w-xs truncate font-medium">{portfolio.title}</p>
                        <p className="text-xs text-muted-foreground">/p/{portfolio.slug}</p>
                      </div>
                    </td>
                    <td className="hidden py-4 md:table-cell">
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        <span>{portfolio.profiles?.full_name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="hidden py-4 lg:table-cell">
                      <span className="rounded bg-muted px-2 py-1 text-xs">
                        {portfolio.template_id}
                      </span>
                    </td>
                    <td className="hidden py-4 xl:table-cell">
                      <Calendar className="mr-1 inline h-3.5 w-3.5" />
                      {formatDate(portfolio.created_at)}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          portfolio.is_published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {portfolio.is_published ? (
                          <>
                            <Globe className="mr-1 h-3.5 w-3.5" />
                            Published
                          </>
                        ) : (
                          <>
                            <FileText className="mr-1 h-3.5 w-3.5" />
                            Draft
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {portfolio.is_published && (
                            <>
                              <DropdownMenuItem
                                onClick={() => window.open(`/p/${portfolio.slug}`, '_blank')}
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Live
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
                                  Are you sure you want to delete "{portfolio.title}"? This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex justify-end gap-2">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                  Delete
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {portfolios.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-semibold">No portfolios found</h3>
              <p className="text-muted-foreground">No portfolios have been created yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
