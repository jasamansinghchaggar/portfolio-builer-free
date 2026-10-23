# Portfolio Builder

A modern, full-stack portfolio builder application built with Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, and Supabase.

## Features

- **User Authentication**: Email/password authentication with Supabase Auth
- **Onboarding Flow**: Guided profile setup for new users
- **5 Professional Templates**: Modern, Creative, Minimal, Developer, Executive
- **Drag & Drop Editor**: Reorder, add, remove, and customize portfolio sections
- **Section Types**: Hero, About, Skills, Projects, Experience, Education, Contact, Custom
- **Instant Publishing**: One-click publish with unique public URLs
- **Admin Dashboard**: User management, portfolio monitoring, analytics
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: System-aware dark/light theme support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI (Radix UI primitives)
- **Database & Auth**: Supabase (PostgreSQL)
- **State Management**: React Hook Form + Zod
- **Drag & Drop**: @dnd-kit
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner (toast notifications)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials in `.env.local`

4. **Set up Supabase Database**
   - Create a new Supabase project
   - Run the SQL migrations in `supabase/schema.sql` in the Supabase SQL Editor
   - Run the seed data in `supabase/seed.sql` to create default templates

5. **Configure Supabase Storage**
   - Create two public buckets: `avatars` and `portfolio-images`
   - Set up the storage policies (included in schema.sql)

6. **Run the development server**

   ```bash
   npm run dev
   ```

7. **Open http://localhost:3000** in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── admin/             # Admin panel
│   ├── p/[slug]/          # Public portfolio pages
│   └── onboarding/        # User onboarding
├── components/
│   ├── ui/                # Shadcn UI components
│   └── providers.tsx      # Theme provider
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── utils.ts           # Utility functions
│   └── auth.ts            # Auth helpers
├── actions/               # Server actions
├── types/                 # TypeScript types
└── middleware.ts          # Auth middleware
```

## Database Schema

Key tables:

- `profiles` - Extended user profiles
- `portfolios` - User portfolios
- `portfolio_sections` - Portfolio sections with content
- `templates` - Portfolio templates
- `admin_users` - Admin user roles

## API Routes

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/callback` - OAuth callback
- `POST /api/onboarding` - Complete onboarding
- `POST /api/portfolios` - Create portfolio
- `POST /api/portfolios/[id]/sections` - Add section
- `POST /api/portfolio/reorder` - Reorder sections
- `POST /api/portfolios/[id]/publish` - Publish portfolio
- `POST /api/portfolios/[id]/unpublish` - Unpublish portfolio
- `DELETE /api/portfolios/[id]` - Delete portfolio
- `DELETE /api/portfolio/sections/[sectionId]` - Delete section

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t portfolio-builder .
docker run -p 3000:3000 portfolio-builder
```

## Environment Variables

| Variable                        | Description               | Required |
| ------------------------------- | ------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL      | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key    | Yes      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role key | Yes      |
| `NEXT_PUBLIC_SITE_URL`          | Your site URL             | Yes      |

## Customization

### Adding New Templates

1. Add template to `supabase/seed.sql`
2. Run the seed SQL in Supabase
3. Template will appear in the template selector

### Adding New Section Types

1. Add type to `SectionType` in `src/types/index.ts`
2. Add rendering logic in `PortfolioRenderer.tsx`
3. Add editor fields in `SectionEditor.tsx`
4. Add to `sectionTypes` array in `AddSectionDialog.tsx`

## License

MIT License - feel free to use this for your own projects!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues and feature requests, please open a GitHub issue.
