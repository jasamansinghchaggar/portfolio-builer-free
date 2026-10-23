import { getAllUsers } from '@/actions/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  User,
  Mail,
  Calendar,
  FileText,
  MoreHorizontal,
  Shield,
  Ban,
  Clock,
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

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="mt-1 text-muted-foreground">View and manage all registered users</p>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="pl-10" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">User</th>
                  <th className="hidden pb-3 font-medium md:table-cell">Email</th>
                  <th className="hidden pb-3 font-medium lg:table-cell">Portfolios</th>
                  <th className="hidden pb-3 font-medium xl:table-cell">Joined</th>
                  <th className="hidden pb-3 font-medium xl:table-cell">Last Active</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.full_name || 'Unnamed'}</p>
                          <p className="text-xs text-muted-foreground">{user.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 md:table-cell">
                      <Mail className="mr-1 inline h-3.5 w-3.5" />
                      {user.email}
                    </td>
                    <td className="hidden py-4 lg:table-cell">
                      <FileText className="mr-1 inline h-3.5 w-3.5" />
                      {user.portfolio_count}
                    </td>
                    <td className="hidden py-4 xl:table-cell">
                      <Calendar className="mr-1 inline h-3.5 w-3.5" />
                      {formatDate(user.created_at)}
                    </td>
                    <td className="hidden py-4 xl:table-cell">
                      {user.last_sign_in_at ? (
                        <>
                          <Clock className="mr-1 inline h-3.5 w-3.5" />
                          {formatDate(user.last_sign_in_at)}
                        </>
                      ) : (
                        <span className="text-muted-foreground">Never</span>
                      )}
                    </td>
                    <td className="py-4">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Active
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
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            View Portfolios
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Ban className="mr-2 h-4 w-4" />
                                Ban User
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Ban User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to ban {user.full_name || user.email}? This
                                  will prevent them from accessing the platform.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex justify-end gap-2">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                  Ban
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

          {users.length === 0 && (
            <div className="py-12 text-center">
              <User className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-semibold">No users found</h3>
              <p className="text-muted-foreground">No users have registered yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
