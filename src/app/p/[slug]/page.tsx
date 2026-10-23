import { getPublicPortfolio } from '@/actions/portfolio';
import { notFound } from 'next/navigation';
import PortfolioRenderer from './PortfolioRenderer';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await getPublicPortfolio(slug);

  if (!portfolio) {
    return { title: 'Portfolio Not Found' };
  }

  return {
    title: portfolio.seo_title || portfolio.title,
    description: portfolio.seo_description || `View ${portfolio.title}'s professional portfolio`,
    openGraph: {
      title: portfolio.seo_title || portfolio.title,
      description: portfolio.seo_description || `View ${portfolio.title}'s professional portfolio`,
      type: 'website',
      url: `/p/${slug}`,
    },
  };
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { slug } = await params;
  const portfolio = await getPublicPortfolio(slug);

  if (!portfolio) {
    notFound();
  }

  return <PortfolioRenderer portfolio={portfolio} />;
}
