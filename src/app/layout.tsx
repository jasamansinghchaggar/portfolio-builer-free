import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Portfolio Builder - Create Your Professional Portfolio',
  description:
    'Build a beautiful, personalized portfolio website in minutes. Choose from multiple templates, customize sections, and publish with your own URL.',
  keywords: [
    'portfolio',
    'website builder',
    'personal website',
    'professional portfolio',
    'templates',
  ],
  authors: [{ name: 'Portfolio Builder' }],
  creator: 'Portfolio Builder',
  publisher: 'Portfolio Builder',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-builder.app',
    title: 'Portfolio Builder - Create Your Professional Portfolio',
    description: 'Build a beautiful, personalized portfolio website in minutes.',
    siteName: 'Portfolio Builder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Builder - Create Your Professional Portfolio',
    description: 'Build a beautiful, personalized portfolio website in minutes.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
