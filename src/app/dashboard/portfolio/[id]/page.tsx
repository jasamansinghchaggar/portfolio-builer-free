import { getPortfolioWithSections } from '@/actions/portfolio';
import { getProfile } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PortfolioEditor from './PortfolioEditor';

export default async function PortfolioEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getProfile();

  if (!profile) {
    redirect('/auth/login');
  }

  const portfolio = await getPortfolioWithSections(id);

  if (!portfolio || portfolio.user_id !== profile.id) {
    redirect('/dashboard');
  }

  return <PortfolioEditor portfolio={portfolio} />;
}
