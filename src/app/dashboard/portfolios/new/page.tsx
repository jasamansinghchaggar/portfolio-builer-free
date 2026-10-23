import { getTemplates } from '@/actions/portfolio';
import CreatePortfolioForm from './CreatePortfolioForm';

export default async function NewPortfolioPage() {
  const templates = await getTemplates();
  return <CreatePortfolioForm templates={templates} />;
}
