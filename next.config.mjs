const isProd = process.env.NODE_ENV === 'production';
// Where /api requests go: the local API during development, the deployed backend in production.
const apiOrigin = process.env.API_ORIGIN || (isProd ? 'https://scalric-website-backend.vercel.app' : 'http://127.0.0.1:3001');
const cache = (value) => [{ key: 'Cache-Control', value }];

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  devIndicators: false,
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${apiOrigin}/api/:path*` }];
  },
  async headers() {
    return [
      { source: '/media/:path*', headers: cache('public, max-age=86400, stale-while-revalidate=604800') },
      { source: '/assets/:path*', headers: cache('public, max-age=86400, stale-while-revalidate=604800') },
    ];
  },
};
