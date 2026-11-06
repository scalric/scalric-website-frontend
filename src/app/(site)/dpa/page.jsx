import LegalPage from '@/views/LegalPage.jsx';
import { legalPages } from '@/data/legalPages.js';

const page = legalPages.find((p) => p.slug === 'dpa');

export const metadata = { title: `${page.title} | Scalric`, description: page.description, alternates: { canonical: '/dpa' } };

export default function Page() {
  return <LegalPage slug="dpa" />;
}
