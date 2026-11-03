import { InsightArticlePage } from '@/views/InsightsPage.jsx';
import { insights } from '@/data/siteContent.js';

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = insights.find((item) => item.slug === slug);
  if (!article) return { title: 'Insight — Scalric' };
  const description = article.dek;
  const images = article.heroImage ? [{ url: article.heroImage }] : undefined;
  return { title: `${article.title} — Scalric`, description, alternates: { canonical: `/insights/${slug}` }, openGraph: { type: 'article', title: article.title, description, url: `/insights/${slug}`, images }, twitter: { card: 'summary_large_image', title: article.title, description, images: article.heroImage ? [article.heroImage] : undefined } };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <InsightArticlePage slug={decodeURIComponent(slug)} />;
}
