import LegalPage from '@/views/LegalPage.jsx';
import { legalPages } from '@/data/legalPages.js';

const page = legalPages.find((p) => p.slug === 'security');

export const metadata = { title: `${page.title} | Scalric`, description: page.description, alternates: { canonical: '/security' } };

export default function Page() {
  return <LegalPage slug="security" />;
}
