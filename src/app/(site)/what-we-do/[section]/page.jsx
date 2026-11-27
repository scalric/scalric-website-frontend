import { notFound } from 'next/navigation';
import WhatWeDoPage from '@/views/WhatWeDoPage.jsx';
import ScrollToSection from '@/components/ScrollToSection.jsx';

// URL segment -> [element id on the page, page title]
const SECTIONS = {
  overview: ['capability-overview', 'Overview'],
  saas: ['saas', 'SaaS & Software'],
  ai: ['ai', 'Artificial Intelligence'],
  'data-automation': ['data-automation', 'Data & Automation'],
  consulting: ['consulting', 'Consulting'],
};

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(SECTIONS).map((section) => ({ section })); }

export async function generateMetadata({ params }) {
  const { section } = await params;
  const entry = SECTIONS[section];
  if (!entry) return {};
  return { title: `${entry[1]} — What We Do | Scalric`, alternates: { canonical: '/what-we-do' } };
}

export default async function Page({ params }) {
  const { section } = await params;
  const entry = SECTIONS[section];
  if (!entry) notFound();
  return <><WhatWeDoPage /><ScrollToSection id={entry[0]} /></>;
}
