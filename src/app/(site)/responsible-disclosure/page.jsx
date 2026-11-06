import LegalPage from '@/views/LegalPage.jsx';
import { legalPages } from '@/data/legalPages.js';

const page = legalPages.find((p) => p.slug === 'responsible-disclosure');

export const metadata = { title: `${page.title} | Scalric`, description: page.description, alternates: { canonical: '/responsible-disclosure' } };

export default function Page() {
  return <LegalPage slug="responsible-disclosure" />;
}
