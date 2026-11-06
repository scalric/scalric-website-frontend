import React from 'react';
import { Link } from './UI.jsx';
import { usePathname } from '../lib/router.js';

const legalLinks = [['Terms', '/terms'], ['Security', '/security'], ['DPA', '/dpa'], ['Responsible Disclosure', '/responsible-disclosure']];

const footerGroups = [
  ['What we do', ['Overview', '/what-we-do'], ['SaaS & software', '/what-we-do#saas'], ['Artificial intelligence', '/what-we-do#ai'], ['Data & automation', '/what-we-do#data-automation'], ['Consulting', '/what-we-do#consulting']],
  ['Company', ['About Scalric', '/company'], ['Careers', '/careers/openings'], ['Life at Scalric', '/careers/life']],
  ['Explore', ['Industries', '/industries'], ['Insights', '/insights'], ['Talk to us', '/contact']],
];

/** Placeholder profile URLs — replace with Scalric's confirmed accounts before launch. */
const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/scalric', path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.12v5.88h-4v-5.21c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.3h-4V9.75Z' },
  { name: 'Instagram', href: 'https://www.instagram.com/scalric', path: 'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z' },
  { name: 'X', href: 'https://x.com/scalric', path: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.48 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.58l11.09 14.44Z' },
  { name: 'YouTube', href: 'https://www.youtube.com/@scalric', path: 'M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.77 2 12 2 12s0 3.23.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.23 22 12 22 12s0-3.23-.4-4.8ZM10 15V9l5.2 3-5.2 3Z' },
];

/** Footer: a fade from pale blue to deep navy, brand and socials on the left, link columns on the right, and an oversized faint wordmark. */
/** Reads the colour the page ends on so the footer can fade out of it instead of starting with a hard edge. */
const COLOUR = /(rgba?([^)]*)|color([^)]*)|oklab([^)]*)|oklch([^)]*)|#[0-9a-f]{3,8})/i;

/** Normalises any CSS colour string (including modern syntaxes) to [r, g, b, a] using a 1x1 canvas. */
function toRgba(css) {
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  ctx.canvas.width = 1; ctx.canvas.height = 1;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = css;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b, a / 255];
}

function colourAbove() {
  const last = document.querySelector('main')?.lastElementChild;
  for (const el of [last, last?.firstElementChild].filter(Boolean)) {
    const style = getComputedStyle(el);
    const solid = toRgba(style.backgroundColor);
    if (solid[3] > 0.5) return solid.slice(0, 3);
    const grad = [...style.backgroundImage.matchAll(new RegExp(COLOUR.source, "gi"))].pop();
    if (grad) { const c = toRgba(grad[1]); if (c[3] > 0.5) return c.slice(0, 3); }
  }
  return [255, 255, 255];
}

export default function Footer() {
  const pathname = usePathname();
  const ref = React.useRef(null);
  React.useEffect(() => {
    const apply = () => {
      const [r, g, b] = colourAbove();
      const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      ref.current?.style.setProperty('--sf-from', `rgb(${r}, ${g}, ${b})`);
      ref.current?.classList.toggle('sf-from-dark', luma < 0.6);
    };
    const timers = [60, 500, 1400].map((ms) => window.setTimeout(apply, ms));
    return () => timers.forEach(window.clearTimeout);
  }, [pathname]);
  return <footer className="sf" ref={ref}>
    <div className="container sf-top">
      <div className="sf-brand">
        <Link href="/" className="sf-logo" aria-label="Scalric home"><img src="/assets/scalric-wordmark-white.webp" alt="Scalric" width="150" height="37" loading="lazy" /></Link>
        <p>We study complex problems and build technology and consulting solutions for meaningful impact</p>
        <ul className="sf-social" aria-label="Scalric on social media">{socials.map((s) => <li key={s.name}><a data-brand={s.name.toLowerCase()} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Scalric on ${s.name}`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={s.path} fill="currentColor" /></svg></a></li>)}</ul>
      </div>
      <nav className="sf-cols" aria-label="Footer">
        {footerGroups.map(([title, ...links]) => <div className="sf-col" key={title}><h3>{title}</h3><ul>{links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul></div>)}
      </nav>
    </div>
    <div className="container sf-bottom"><span className="sf-copy">© {new Date().getFullYear()} Scalric. All rights reserved</span><ul className="sf-legal" aria-label="Legal">{legalLinks.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul><span className="sf-tag">Technology · Consulting · Innovation</span></div>
  </footer>;
}
