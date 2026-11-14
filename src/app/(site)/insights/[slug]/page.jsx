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

const SITE_URL = 'https://www.scalric.com';

// Article and breadcrumb structured data so Google can show the article with its title, image and path.
function articleJsonLd(article, slug) {
  const url = `${SITE_URL}/insights/${slug}`;
  const image = article.heroImage ? `${SITE_URL}${article.heroImage}` : undefined;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        headline: article.title,
        description: article.dek,
        ...(image ? { image } : {}),
        ...(article.publishDate ? { datePublished: new Date(article.publishDate).toISOString() } : {}),
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/insights` },
          { '@type': 'ListItem', position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
}

export default async function Page({ params }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const article = insights.find((item) => item.slug === slug);
  return <>
    {article && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, slug)) }} />}
    <InsightArticlePage slug={slug} />
  </>;
}
