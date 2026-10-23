import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Shield, Database, Mail, Globe, Key, Save, Loader2 } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Platform Settings</h1>
        <p className="mt-1 text-muted-foreground">Configure platform-wide settings and features</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Shield className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="auth">
            <Key className="mr-2 h-4 w-4" />
            Authentication
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="features">
            <Globe className="mr-2 h-4 w-4" />
            Features
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="Portfolio Builder" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">Site URL</Label>
                <Input id="site-url" defaultValue="https://portfolio-builder.app" type="url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Input
                  id="site-description"
                  defaultValue="Build beautiful professional portfolios"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put the platform in maintenance mode
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Allow Registration</Label>
                  <p className="text-sm text-muted-foreground">Enable new user registrations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" /> Save General Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Settings</CardTitle>
              <CardDescription>Database connection and backup settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Auto Backup</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                <Input id="backup-retention" type="number" defaultValue="30" />
              </div>
              <Button variant="outline" className="gap-2">
                <Database className="h-4 w-4" />
                Run Manual Backup
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Providers</CardTitle>
              <CardDescription>Configure login methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email / Password</p>
                    <p className="text-sm text-muted-foreground">
                      Traditional email and password authentication
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">GitHub OAuth</p>
                    <p className="text-sm text-muted-foreground">Allow sign in with GitHub</p>
                  </div>
                  <Switch />
                </div>
                <div className="ml-10 grid grid-cols-2 gap-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label>Client ID</Label>
                    <Input placeholder="github_client_id" />
                  </div>
                  <div className="space-y-2">
                    <Label>Client Secret</Label>
                    <Input type="password" placeholder="github_client_secret" />
                  </div>
                </div>
              </div>
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Google OAuth</p>
                    <p className="text-sm text-muted-foreground">Allow sign in with Google</p>
                  </div>
                  <Switch />
                </div>
                <div className="ml-10 grid grid-cols-2 gap-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label>Client ID</Label>
                    <Input placeholder="google_client_id" />
                  </div>
                  <div className="space-y-2">
                    <Label>Client Secret</Label>
                    <Input type="password" placeholder="google_client_secret" />
                  </div>
                </div>
              </div>
              <Button className="gap-2">
                <Save className="h-4 w-4" /> Save Auth Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-duration">Session Duration (hours)</Label>
                  <Input id="session-duration" type="number" defaultValue="24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refresh-threshold">Refresh Threshold (minutes)</Label>
                  <Input id="refresh-threshold" type="number" defaultValue="5" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Secure Cookies</Label>
                  <p className="text-sm text-muted-foreground">Only transmit cookies over HTTPS</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>SameSite Cookies</Label>
                  <p className="text-sm text-muted-foreground">Prevent CSRF attacks</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>SMTP settings for transactional emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" placeholder="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" type="number" defaultValue="587" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">SMTP Username</Label>
                  <Input id="smtp-user" placeholder="username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-pass">SMTP Password</Label>
                  <Input id="smtp-pass" type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email">From Email</Label>
                <Input id="from-email" placeholder="noreply@portfolio-builder.app" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-name">From Name</Label>
                <Input id="from-name" defaultValue="Portfolio Builder" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Enable Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require email verification for new accounts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Send Test Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select defaultValue="welcome">
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome Email</SelectItem>
                  <SelectItem value="verify">Email Verification</SelectItem>
                  <SelectItem value="reset">Password Reset</SelectItem>
                  <SelectItem value="publish">Portfolio Published</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input defaultValue="Welcome to Portfolio Builder!" />
              </div>
              <div className="space-y-2">
                <Label>Template (HTML)</Label>
                <textarea
                  className="min-h-[200px] w-full rounded-md border p-3 font-mono text-sm"
                  defaultValue="<h1>Welcome!</h1><p>Thanks for joining...</p>"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
              <CardDescription>Enable or disable platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    name: 'Custom Domains',
                    desc: 'Allow users to connect custom domains',
                    enabled: false,
                  },
                  {
                    name: 'Analytics Dashboard',
                    desc: 'Show portfolio view analytics to users',
                    enabled: false,
                  },
                  {
                    name: 'Blog Section',
                    desc: 'Enable blog section in portfolios',
                    enabled: true,
                  },
                  {
                    name: 'Dark Mode',
                    desc: 'Allow users to toggle dark mode on their portfolios',
                    enabled: true,
                  },
                  {
                    name: 'SEO Controls',
                    desc: 'Allow users to customize SEO meta tags',
                    enabled: true,
                  },
                  {
                    name: 'Password Protection',
                    desc: 'Allow password-protected portfolios',
                    enabled: false,
                  },
                  { name: 'Multi-language', desc: 'Support multiple languages', enabled: false },
                  { name: 'API Access', desc: 'Provide API for portfolio data', enabled: false },
                ].map((feature) => (
                  <div key={feature.name} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{feature.name}</p>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                      <Switch defaultChecked={feature.enabled} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-portfolios">Max Portfolios per User</Label>
                  <Input id="max-portfolios" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-sections">Max Sections per Portfolio</Label>
                  <Input id="max-sections" type="number" defaultValue="20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-file-size">Max Upload Size (MB)</Label>
                  <Input id="max-file-size" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-custom-domains">Max Custom Domains (Pro)</Label>
                  <Input id="max-custom-domains" type="number" defaultValue="3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
