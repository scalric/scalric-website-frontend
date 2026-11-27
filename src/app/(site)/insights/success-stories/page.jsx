import InsightsPage from '@/views/InsightsPage.jsx';
import ScrollToSection from '@/components/ScrollToSection.jsx';

export const metadata = {
  title: 'Success Stories — Insights | Scalric',
  description: 'Real examples of what worked, from Scalric projects across technology, data and automation.',
  alternates: { canonical: '/insights' },
};

// A fixed folder wins over insights/[slug], so this never gets treated as an article.
export default function Page() {
  return <><InsightsPage search="" /><ScrollToSection id="success-stories" /></>;
}
