import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Code, Globe, Palette, Zap, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Beautiful Templates',
    description:
      'Choose from 5 professionally designed templates, each with unique styles and layouts tailored for different professions.',
  },
  {
    icon: Zap,
    title: 'Drag & Drop Customization',
    description:
      'Easily reorder, add, or remove sections with our intuitive drag-and-drop interface. No coding required.',
  },
  {
    icon: Globe,
    title: 'Instant Publishing',
    description:
      'Publish your portfolio with one click and get a unique public URL. Custom domain support coming soon.',
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description:
      'Built with modern tech stack: Next.js, TypeScript, Tailwind CSS, and Supabase. Clean, performant code.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Your data is protected with Supabase authentication and row-level security. You own your content.',
  },
  {
    icon: Sparkles,
    title: 'Admin Dashboard',
    description: 'Comprehensive admin panel to monitor users, portfolios, and platform analytics.',
  },
];

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and minimal design with focus on content',
    color: 'bg-blue-500',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and expressive design for creative professionals',
    color: 'bg-purple-500',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design with maximum whitespace',
    color: 'bg-gray-900',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Technical-focused design with code highlighting',
    color: 'bg-emerald-600',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional design for senior leaders and executives',
    color: 'bg-blue-900',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">Portfolio Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium hover:underline">
              Sign In
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>New: 5 New Templates & Drag-Drop Editor</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Build Your Professional <span className="text-primary">Portfolio</span> in Minutes
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Create a stunning personal portfolio website without writing code. Choose from
              beautiful templates, customize every section, and publish instantly with your own URL.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  Start Building Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Templates
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required · Free forever · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Stand Out
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Powerful features to help you create a portfolio that gets noticed
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Choose Your Perfect Template
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Each template is fully customizable with pre-built sections tailored for your
              profession
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="h-full overflow-hidden transition-shadow hover:shadow-xl"
              >
                <div className={`h-32 ${template.color}`} />
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/auth/signup" className="w-full">
                    <Button className="w-full">Select Template</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-muted/50 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Get Started in 3 Simple Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Sign Up & Onboard',
                description:
                  'Create your account and fill in your professional details through our guided onboarding process.',
              },
              {
                step: '02',
                title: 'Customize Your Portfolio',
                description:
                  'Choose a template, add your projects, experience, skills, and arrange sections with drag-and-drop.',
              },
              {
                step: '03',
                title: 'Publish & Share',
                description:
                  'Hit publish and get your unique portfolio URL. Share it with employers, clients, and your network.',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 text-4xl font-bold text-primary/20">{step.step}</div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center lg:p-16">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Build Your Portfolio?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
                Join thousands of professionals who have created their portfolios with us. Start
                free, upgrade when you need more features.
              </p>
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="gap-2">
                  Create Your Portfolio Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold">Portfolio Builder</h3>
              <p className="text-sm text-muted-foreground">
                Build beautiful, professional portfolios without code. Stand out and showcase your
                work.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-medium">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/signup" className="hover:underline">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:underline">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:underline">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-medium">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-medium">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Portfolio Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
