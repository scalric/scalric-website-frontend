import { insights } from '@/data/siteContent.js';

const SITE_URL = 'https://www.scalric.com';

export default function sitemap() {
  const lastModified = new Date();
  const pages = [
    ['', 1], ['/what-we-do', 0.9], ['/industries', 0.9], ['/insights', 0.8],
    ['/company', 0.7], ['/careers', 0.6], ['/contact', 0.7],
  ].map(([path, priority]) => ({ url: `${SITE_URL}${path}`, lastModified, priority }));
  const articles = insights.map((item) => ({ url: `${SITE_URL}/insights/${item.slug}`, lastModified, priority: 0.6 }));
  return [...pages, ...articles];
}
