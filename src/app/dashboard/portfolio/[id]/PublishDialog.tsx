'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Globe, Loader2, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPublished: boolean;
  onPublish: () => void;
  onUnpublish: () => void;
  portfolioUrl: string;
}

export function PublishDialog({
  open,
  onOpenChange,
  isPublished,
  onPublish,
  onUnpublish,
  portfolioUrl,
}: PublishDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const fullUrl = `${origin}${portfolioUrl}`;

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      onPublish();
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpublish = async () => {
    setIsLoading(true);
    try {
      onUnpublish();
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(fullUrl);
    toast.success('URL copied to clipboard!');
  };

  if (!isPublished) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Publish Portfolio</DialogTitle>
            <DialogDescription>
              Your portfolio will be publicly accessible at the URL below. You can unpublish at any
              time.
            </DialogDescription>
          </DialogHeader>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                <Globe className="h-5 w-5 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{fullUrl}</p>
                  <p className="text-xs text-muted-foreground">Your public portfolio URL</p>
                </div>
                <Button variant="ghost" size="icon" onClick={copyUrl}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>SEO Title (Optional)</Label>
              <Input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="John Doe - Senior Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label>SEO Description (Optional)</Label>
              <Input
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Portfolio of John Doe, Senior Software Engineer specializing in React and Node.js"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handlePublish} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Globe className="h-4 w-4" />
              )}
              Publish Portfolio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Portfolio Published</DialogTitle>
          <DialogDescription>
            Your portfolio is live! Manage publishing settings below.
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-green-800">Published</p>
                <p className="truncate text-xs text-green-600">{fullUrl}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={copyUrl}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => window.open(fullUrl, '_blank')}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Custom Domain (Coming Soon)</Label>
            <Input
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="portfolio.yourdomain.com"
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Custom domain support will be available in a future update.
            </p>
          </div>

          <div className="space-y-2">
            <Label>SEO Title</Label>
            <Input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="John Doe - Senior Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label>SEO Description</Label>
            <Input
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Portfolio of John Doe, Senior Software Engineer..."
            />
          </div>
        </div>

        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-destructive">Unpublish Portfolio</p>
              <p className="text-sm text-muted-foreground">
                This will make your portfolio private and inaccessible via the public URL.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={handleUnpublish}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              Unpublish
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
