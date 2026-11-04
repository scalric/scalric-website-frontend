import React from 'react';
import { Link } from './UI.jsx';
import { topics } from '../data/siteContent.js';
import { useMobile, Responsive } from '../lib/useMobile.js';

/** Per-page art: which abstract image to use, how it is framed, the default eyebrow and the glass chips that float beside the copy. */
const ART = {
  wave: { src: '/assets/photos/art-wave.webp', eyebrow: 'WHAT WE DO' },
  ripple: { src: '/assets/photos/art-ripple.webp', eyebrow: 'INDUSTRIES', tone: 'light', chips: [] },
  teal: { src: '/assets/photos/art-teal.webp', eyebrow: 'INDUSTRIES', chips: [] },
  stripes: { src: '/assets/photos/art-stripes.webp', eyebrow: 'INSIGHTS', chips: topics.slice(0, 4).map((topic) => [topic, `/insights?topic=${encodeURIComponent(topic)}`]) },
  insights: { src: '/assets/photos/insights-banner.webp', eyebrow: 'INSIGHTS', chips: [] },
  whatwedo: { src: '/assets/photos/whatwedo-team.webp', eyebrow: 'WHAT WE DO', chips: [] },
  impactshow: { src: '/assets/photos/impact-slide-1.webp', slides: ['/assets/photos/impact-slide-1.webp', '/assets/photos/impact-slide-2.webp', '/assets/photos/impact-slide-3.webp'], eyebrow: 'THE IMPACT INITIATIVE', chips: [] },
  glass: { src: '/assets/photos/art-glass.webp', eyebrow: 'COMPANY', tone: 'light', chips: [] },
  team: { src: '/assets/photos/company-banner.webp', eyebrow: 'COMPANY', chips: [] },
  peach: { src: '/assets/photos/art-peach.webp', eyebrow: 'COMPANY', tone: 'light', chips: [] },
  arcs: { src: '/assets/photos/art-arcs.webp', eyebrow: 'CAREERS', chips: [['Life at Scalric', '/careers/openings'], ['How we hire', '/careers/openings'], ['Open roles', '/careers/openings']] },
  ribbon: { src: '/assets/photos/art-ribbon.webp', eyebrow: 'CAREERS', tone: 'light', chips: [['Life at Scalric', '/careers/openings'], ['How we hire', '/careers/openings'], ['Open roles', '/careers/openings']] },
  orbit: { src: '/assets/photos/art-orbit.webp', eyebrow: 'THE IMPACT INITIATIVE', tone: 'light', chips: [['How the programme works', '#how'], ['Talk to us', '/contact']] },
  wave2: { src: '/assets/photos/art-wave.webp', eyebrow: 'THE IMPACT INITIATIVE', chips: [['How the programme works', '#how'], ['Talk to us', '/contact']] },
};

const PHOTO_ARTS = ['whatwedo', 'insights', 'team', 'impactshow'];

/**
 * Page banner built on a full-bleed abstract image. The image stays still; only the copy and chips fade in once on load.
 */
export default function ArtHero({ art = 'wave', eyebrow, title, text, children, chips }) {
  const config = ART[art] || ART.wave;
  const list = chips || config.chips || [];
  const mobile = useMobile();
  // Phones: the people-photo banners show the whole photo at its natural size (every face in view) with the text box underneath, never on top of it.
  const phone = PHOTO_ARTS.includes(art) && <section className={`ah-m ah-m-${art}`}>
      <div className="m-over-media">
        <img className="ah-m-img" src={config.slides ? config.slides[0] : config.src} alt="" fetchPriority="high" decoding="async" />
        <div className="m-over-text">
          <span className="ah-eyebrow"><i />{eyebrow || config.eyebrow}</span>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="ah-m-copy">
        <p>{text}</p>
        {children && <div className="ah-actions">{children}</div>}
      </div>
    </section>;
  const desktop = <section className={`ah ah-${art}${config.tone === 'light' ? ' ah-light' : ''}`}>
    <div className="ah-bg" aria-hidden="true">{config.slides
      ? config.slides.map((src, i) => <img key={src} className="ah-slide" style={{ '--n': i }} src={src} alt="" fetchPriority={i === 0 ? 'high' : undefined} decoding="async" />)
      : <img src={config.src} alt="" fetchPriority="high" decoding="async" />}</div>
    <div className="ah-shade" aria-hidden="true" />
    <div className="container ah-inner">
      <div className="ah-copy">
        <span className="ah-eyebrow"><i />{eyebrow || config.eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        {children && <div className="ah-actions">{children}</div>}
      </div>
      {list.length > 0 && <ul className="ah-chips" aria-label="Quick links">{list.map(([label, href], i) => <li key={label} style={{ '--d': i }}>
        {label === 'Talk to us' ? <Link href={href} className="ah-yellow"><span>{label}</span></Link> : href.startsWith('#') ? <a href={href}>{label}</a> : <Link href={href}>{label}</Link>}
      </li>)}</ul>}
    </div>
  </section>;
  return phone ? <Responsive mobile={mobile} m={phone} d={desktop} /> : desktop;
}
