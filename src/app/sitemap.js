import { insights } from '@/data/siteContent.js';

const SITE_URL = 'https://www.scalric.com';
const PAGES_UPDATED = '2026-11-03';

export default function sitemap() {
  // Fixed date: bump it when the pages actually change, so crawlers aren't told everything changed on every request.
  const lastModified = new Date(PAGES_UPDATED);
  const pages = [
    ['', 1], ['/what-we-do', 0.9], ['/industries', 0.9], ['/insights', 0.8],
    ['/company', 0.7], ['/careers', 0.6], ['/careers/openings', 0.6], ['/careers/life', 0.5], ['/contact', 0.7],
    ['/terms', 0.3], ['/security', 0.4], ['/dpa', 0.3], ['/responsible-disclosure', 0.3],
  ].map(([path, priority]) => ({ url: `${SITE_URL}${path}`, lastModified, priority }));
  const articles = insights.map((item) => ({ url: `${SITE_URL}/insights/${item.slug}`, ...(item.publishDate ? { lastModified: new Date(item.publishDate) } : {}), priority: 0.6 }));
  return [...pages, ...articles];
}
