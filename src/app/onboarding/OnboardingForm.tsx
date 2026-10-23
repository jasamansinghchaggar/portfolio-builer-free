'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface ProfileData {
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  website: string | null;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
}

interface OnboardingFormProps {
  initialData: ProfileData;
}

export default function OnboardingForm({ initialData }: OnboardingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    full_name: initialData.full_name || '',
    headline: initialData.headline || '',
    bio: initialData.bio || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    location: initialData.location || '',
    website: initialData.website || '',
    linkedin: initialData.linkedin || '',
    github: initialData.github || '',
    twitter: initialData.twitter || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });

      const res = await fetch('/api/onboarding', {
        method: 'POST',
        body: formDataToSubmit,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete onboarding');
      }

      toast.success('Profile completed! Redirecting to dashboard...');
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: 'full_name', label: 'Full Name', placeholder: 'John Doe', icon: User, required: true },
    {
      name: 'headline',
      label: 'Professional Headline',
      placeholder: 'Senior Software Engineer | React & Node.js Specialist',
      icon: User,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'john@example.com',
      icon: Mail,
      required: true,
    },
    { name: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', icon: Phone },
    { name: 'location', label: 'Location', placeholder: 'San Francisco, CA', icon: MapPin },
    {
      name: 'website',
      label: 'Website',
      type: 'url',
      placeholder: 'https://johndoe.com',
      icon: Globe,
    },
    {
      name: 'linkedin',
      label: 'LinkedIn URL',
      placeholder: 'https://linkedin.com/in/johndoe',
      icon: Linkedin,
    },
    {
      name: 'github',
      label: 'GitHub URL',
      placeholder: 'https://github.com/johndoe',
      icon: Github,
    },
    {
      name: 'twitter',
      label: 'Twitter/X URL',
      placeholder: 'https://twitter.com/johndoe',
      icon: Twitter,
    },
  ];

  return (
    <div className="min-h-screen bg-muted/50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            This information will be used to personalize your portfolio. You can edit it later.
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

              {/* Basic Info */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <User className="h-5 w-5 text-primary" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {inputFields.slice(0, 3).map((field) => (
                    <div
                      key={field.name}
                      className={field.name === 'full_name' ? 'md:col-span-2' : ''}
                    >
                      <Label htmlFor={field.name} className="flex items-center gap-2">
                        <field.icon className="h-4 w-4 text-muted-foreground" />
                        {field.label}{' '}
                        {field.required && <span className="text-destructive">*</span>}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        required={field.required}
                        disabled={isLoading}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Professional Info */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Globe className="h-5 w-5 text-primary" />
                  Professional Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="headline" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Professional Headline
                    </Label>
                    <Input
                      id="headline"
                      name="headline"
                      placeholder="Senior Software Engineer | React & Node.js Specialist"
                      value={formData.headline}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      A brief tagline that appears under your name
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="bio" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Bio / About Me
                    </Label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell visitors about yourself, your experience, and what you're passionate about..."
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      A short paragraph about your professional background
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact & Social */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact & Social Links
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {inputFields.slice(3).map((field) => (
                    <div key={field.name}>
                      <Label htmlFor={field.name} className="flex items-center gap-2">
                        <field.icon className="h-4 w-4 text-muted-foreground" />
                        {field.label}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  'Complete Onboarding & Continue to Dashboard'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
