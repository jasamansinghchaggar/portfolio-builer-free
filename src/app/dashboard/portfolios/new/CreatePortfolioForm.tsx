'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, AlertCircle, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import { Template } from '@/types';
import { cn } from '@/lib/utils';

interface CreatePortfolioFormProps {
  templates: Template[];
}

export default function CreatePortfolioForm({ templates }: CreatePortfolioFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    template_id: templates[0]?.id || 'modern',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Portfolio title is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('template_id', formData.template_id);

      const res = await fetch('/api/portfolios', {
        method: 'POST',
        body: formDataToSubmit,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create portfolio');
      }

      toast.success('Portfolio created!');
      router.push(`/dashboard/portfolio/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Portfolio</h1>
        <p className="mt-1 text-muted-foreground">
          Choose a template and give your portfolio a title to get started.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Portfolio Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="My Professional Portfolio"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                This will be used to generate your portfolio URL (e.g.,
                portfolio-builder.app/p/my-professional-portfolio)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Choose a Template</Label>
              <RadioGroup
                value={formData.template_id}
                onValueChange={(value) => setFormData({ ...formData, template_id: value })}
                disabled={isLoading}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={cn(
                        'relative cursor-pointer border-2 transition-all',
                        formData.template_id === template.id
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent hover:border-primary/50'
                      )}
                    >
                      <RadioGroupItem
                        value={template.id}
                        className="absolute inset-0 peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2"
                      />
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                            <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Portfolio'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
