export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }],
    sitemap: 'https://www.scalric.com/sitemap.xml',
    host: 'https://www.scalric.com',
  };
}
