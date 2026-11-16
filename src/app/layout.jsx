import { Manrope } from 'next/font/google';
import Analytics from '@/components/Analytics.jsx';
import GapGuard from '@/components/GapGuard.jsx';
import TitleCase from '@/components/TitleCase.jsx';
import '@/styles/styles.css';
import '@/styles/premium.css';
import '@/styles/theme.css';
import '@/styles/impact.css';
import '@/styles/ngo.css';
import '@/styles/cta.css';
import '@/banners-fit.css';
import '@/industries-target.css';
import '@/costly-mistakes.css';
import '@/success-stories.css';
import '@/styles/typography.css';
import '@/styles/impact-detail.css';
import '@/styles/mobile-hero.css';

const description = 'Scalric is a product engineering company in Hyderabad, India, building AI-powered software products and applications.';

const SITE_URL = 'https://www.scalric.com';
const title = 'Scalric — Technology & Consulting for Measurable Impact';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s' },
  description,
  openGraph: { type: 'website', siteName: 'Scalric', title, description, locale: 'en_US', images: [{ url: '/assets/hero-home-poster.jpg', width: 1200, height: 630, alt: 'Scalric — Engineering the difference' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/assets/hero-home-poster.jpg'] },
  icons: { icon: [{ url: '/assets/favicon-64.png', sizes: '64x64', type: 'image/png' }, { url: '/assets/favicon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/assets/favicon-192.png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Scalric', url: SITE_URL, logo: `${SITE_URL}/assets/favicon-512.png`, description,
      address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressRegion: 'Telangana', addressCountry: 'IN' },
      sameAs: ['https://www.linkedin.com/company/scalric', 'https://www.instagram.com/scalric'] },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Scalric', publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: 'en' },
  ],
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

// Self-hosted at build time: no request to Google, no late font swap (which made text jump after first paint).
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], display: 'swap', variable: '--font-manrope' });

export default function RootLayout({ children }) {
  return <html lang="en" className={manrope.variable}>
    <head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </head>
    <body><Analytics /><GapGuard /><TitleCase />{children}</body>
  </html>;
}
