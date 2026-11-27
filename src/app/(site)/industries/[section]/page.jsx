import { notFound } from 'next/navigation';
import IndustriesPage from '@/views/IndustriesPage.jsx';
import ScrollToSection from '@/components/ScrollToSection.jsx';

// URL segment -> [element id on the page, page title]
const SECTIONS = {
  impact: ['impact', 'Our Impact'],
  how: ['how', 'How We Deliver'],
};

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(SECTIONS).map((section) => ({ section })); }

export async function generateMetadata({ params }) {
  const { section } = await params;
  const entry = SECTIONS[section];
  if (!entry) return {};
  return { title: `${entry[1]} — Industries | Scalric`, alternates: { canonical: '/industries' } };
}

export default async function Page({ params }) {
  const { section } = await params;
  const entry = SECTIONS[section];
  if (!entry) notFound();
  return <><IndustriesPage /><ScrollToSection id={entry[0]} /></>;
}
