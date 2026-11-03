import React from 'react';
import { useInsights } from '../lib/posts.js';
import { Link, useInView } from './UI.jsx';

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Counts a figure like "+8.4%" or "₹22 cr" up once it scrolls into view. Ranges ("+10–15%") render as-is. */
export function Count({ value, duration = 1600 }) {
  const [ref, seen] = useInView({ threshold: 0.3 });
  const m = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const live = m && !/\d/.test(m[3]);
  const target = live ? parseFloat(m[2]) : 0;
  const places = live ? (m[2].split('.')[1] || '').length : 0;
  const [now, setNow] = React.useState(0);
  React.useEffect(() => {
    if (!live || !seen) return undefined;
    if (reduced()) { setNow(target); return undefined; }
    let frame;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      setNow(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [live, seen, target, duration]);
  if (!live) return <span ref={ref}>{value}</span>;
  return <span ref={ref} aria-label={value}><span aria-hidden="true">{m[1]}{now.toFixed(places)}{m[3]}</span></span>;
}

/** Circular gauge that fills to `percent` when seen; children sit in the middle. */
export function Ring({ percent, children, size = 132 }) {
  const [ref, seen] = useInView({ threshold: 0.3 });
  const r = 44;
  const c = 2 * Math.PI * r;
  return <div ref={ref} className="rs-ring" style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle className="rs-ring-track" cx="50" cy="50" r={r} />
      <circle className="rs-ring-fill" cx="50" cy="50" r={r} strokeDasharray={c} strokeDashoffset={seen ? c * (1 - percent / 100) : c} />
    </svg>
    <div className="rs-ring-label">{children}</div>
  </div>;
}

/** Multi-segment donut: each `{ name, value }` arc draws in (in order) when seen; `active` dims the others; children sit in the middle. */
export function Donut({ segments, active = null, size = 140, label, children }) {
  const [ref, seen] = useInView({ threshold: 0.3 });
  const r = 38;
  const c = 2 * Math.PI * r;
  const gap = 1.4; // space between arcs
  const minLength = 3; // keeps a tiny share (Canada, about 1%) visible
  const total = segments.reduce((sum, { value }) => sum + value, 0);
  let offset = 0;
  const arcs = segments.map(({ name, value }) => {
    const share = value / total * c;
    const length = Math.max(minLength, share - gap);
    const arc = { name, length, start: offset + (share - length) / 2 }; // centred in its share so a minimum-length arc doesn't crowd its neighbour
    offset += share;
    return arc;
  });
  return <div ref={ref} className="rs-donut" style={{ width: size, height: size }} role="img" aria-label={label}>
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle className="rs-donut-track" cx="50" cy="50" r={r} />
      {arcs.map(({ name, length, start }, i) => <circle key={name} cx="50" cy="50" r={r}
        className={`rs-donut-seg rs-donut-seg-${i}${active !== null && active !== i ? ' is-dim' : ''}`} style={{ '--i': i }}
        strokeDasharray={seen ? `${length} ${c - length}` : `0 ${c}`} strokeDashoffset={-start} />)}
    </svg>
    <div className="rs-donut-label">{children}</div>
  </div>;
}

/** Horizontal gauge: a single fill, or before → after when `from` is given. */
export function Gauge({ percent, from, down = false }) {
  const [ref, seen] = useInView({ threshold: 0.3 });
  if (from != null) return <div ref={ref} className="rs-gauge rs-ba">
    <div><span>Before</span><i className="rs-bar" style={{ width: seen ? `${from}%` : 0 }} /><em>{from}%</em></div>
    <div><span>Now</span><i className="rs-bar rs-bar-hi" style={{ width: seen ? `${percent}%` : 0 }} /><em>{percent}%</em></div>
  </div>;
  return <div ref={ref} className={`rs-gauge${down ? ' rs-down' : ''}`}><i className="rs-bar" style={{ width: seen ? `${percent}%` : 0 }} /></div>;
}

/** "Read: <article title>" link to the insight that covers a figure; renders nothing without a slug. `short` shows "Read the story" instead of the title. */
export function ReadLink({ slug, from, short = false }) {
  const { insights } = useInsights();
  const article = insights.find((item) => item.slug === slug);
  if (!article) return null;
  const track = () => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'research_read_click', slug, from } }));
  return <Link href={`/insights/${slug}`} className="rs-read" onClick={track} title={article.title}><span>{short ? 'Read the story' : `Read: ${article.title}`}</span><i aria-hidden="true">→</i></Link>;
}
