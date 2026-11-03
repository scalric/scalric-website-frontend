import { InsightArticlePage } from '@/views/InsightsPage.jsx';
import { insights } from '@/data/siteContent.js';

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return { title: 'Insight — Scalric' };
  return { title: `${article.title} — Scalric`, alternates: { canonical: `/insights/${slug}` }, openGraph: { type: 'article', title: article.title, url: `/insights/${slug}` } };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <InsightArticlePage slug={decodeURIComponent(slug)} />;
}
