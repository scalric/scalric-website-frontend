'use client';
import React from 'react';
import { capabilities, insights, proofStats } from '../data/siteContent.js';
import { Link, Arrow, Eyebrow, Reveal, CountUp, SplitHeading, Parallax } from '../components/UI.jsx';
import WhyChoose from '../components/WhyChoose.jsx';
import { ArtImage, MiniBars } from '../components/Showcase.jsx';
import WorkSteps from '../components/WorkSteps.jsx';
import ContactBand from '../components/ContactBand.jsx';
import PurposePanel from '../components/PurposePanel.jsx';
import IndustriesTarget from '../components/IndustriesTarget.jsx';
import { useMobile } from '../lib/useMobile.js';

function Hero() {
  const videoRef = React.useRef(null);
  // null until the screen width is known (server HTML / first frame): then both layouts are sent and CSS shows the right one, so phones never flash the desktop hero.
  const [mobile, setMobile] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);
  const [playing, setPlaying] = React.useState(true);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    setMobile(window.matchMedia('(max-width: 680px)').matches);
    setReady(true);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) { setEnabled(false); setPlaying(false); }
  }, []);
  const toggle = () => {
    if (!enabled) { setEnabled(true); setPlaying(true); return; }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play().catch(() => { }); setPlaying(true); } else { video.pause(); setPlaying(false); }
  };
  const renderHero = (m) => <section className={`home-hero hero-city${m ? ' hero-m' : ''}`} id="top" aria-labelledby="hero-title">
    {enabled && <video ref={videoRef} className="hero-city-video" src={ready ? (m ? '/media/hero-mobile-v2.mp4' : '/media/hero-home.mp4') : undefined} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} key={m ? 'm' : 'd'} poster={m ? '/assets/hero-mobile-v2-poster.webp' : '/assets/hero-home-poster.webp'} onCanPlay={(event) => { const video = event.currentTarget; video.muted = true; if (video.paused && playing) video.play().catch(() => setPlaying(false)); }} />}
    {m ? <div className="container hero-content hero-content-m">
      <div className="hero-m-top">
        <Eyebrow>GLOBAL RESEARCH · CONSULTANCY · AI SOLUTIONS</Eyebrow>
        <SplitHeading as="h1" lines={['Engineering', 'the difference']} accent={1} className="hero-title" startDelay={2} />
      </div>
      <div className="hero-actions hero-m-bottom"><Link href="/what-we-do" className="button button-green">What we do</Link><Link href="/industries#impact" className="button button-outline" onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'impact_teaser_click' } }))}>See our impact</Link></div>
    </div> : <div className="container hero-content">
      <Eyebrow>GLOBAL RESEARCH · CONSULTANCY · AI SOLUTIONS</Eyebrow>
      <SplitHeading as="h1" lines={['Engineering', 'the difference']} accent={1} className="hero-title" startDelay={2} />
      <div className="hero-actions"><Link href="/what-we-do" className="button button-green">What we do</Link><Link href="/industries#impact" className="button button-outline" onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'impact_teaser_click' } }))}>See our impact</Link></div>
    </div>}
  </section>;
  return <><link rel="preload" as="image" href="/assets/hero-home-poster.webp" media="(min-width: 681px)" fetchPriority="high" /><link rel="preload" as="image" href="/assets/hero-mobile-v2-poster.webp" media="(max-width: 680px)" fetchPriority="high" />{mobile === null ? <><div className="ssr-m-680">{renderHero(true)}</div><div className="ssr-d-680">{renderHero(false)}</div></> : renderHero(mobile)}</>;
}

// Pictures for the cards. They repeat in order (1, 2, 3, 1, 2, 3 ...) until each card gets its own - add more entries here to replace the repeats.
const thinkImages = ['/assets/photos/think-dashboard.webp', '/assets/photos/home-insight-ai.webp', '/assets/photos/think-automation-new.webp'];
// Cards that use their own picture (by article slug). `pos` keeps the face in frame when the photo is cropped; `fit: 'contain'` shows the whole picture inside the same-size box, with nothing cropped.
const thinkOwnImages = { 'from-data-to-decisions': { src: '/assets/photos/insight-data.webp', pos: '30% 40%' }, 'cloud-foundations-that-grow': { src: '/assets/photos/insight-cloud.webp', pos: '52% 30%' }, 'saas-products-built-around-the-task': { src: '/assets/photos/insight-saas.webp', pos: '72% 40%' }, 'automation-and-the-customer-journey': { src: '/assets/photos/insight-automation.webp', pos: '28% 35%' } };
// How many cards the row shows.
const THINK_CARD_COUNT = 6;
// Extra card after the insight articles. It opens the Insights page; add `slug` and `image` to point one at its own article.
const thinkExtras = [
  { category: 'Marketing & Research', title: 'Marketing and research that start with what customers actually do', image: '/assets/photos/data-analytics.webp', href: '/insights' },
];

function InsightsSection() {
  const track = (event, slug) => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event, slug } }));
  const FIRST = ['from-data-to-decisions', 'saas-products-built-around-the-task', 'cloud-foundations-that-grow'];
  const pool = insights.filter((item) => FIRST.includes(item.slug) || insights.indexOf(item) < THINK_CARD_COUNT);
  // Data & Analytics, SaaS & Software and Cloud & Infrastructure lead the row, then the remaining cards in their usual order.
  const cards = [...FIRST.map((slug) => pool.find((item) => item.slug === slug)), ...pool.filter((item) => !FIRST.includes(item.slug)), ...thinkExtras];
  // Conditional rendering: on phones the row shows exactly one card at a time.
  const one = useMobile('(max-width: 760px)');
  const oneRef = React.useRef(false);
  oneRef.current = one;
  const rowRef = React.useRef(null);
  const [page, setPage] = React.useState(0);
  const [pages, setPages] = React.useState(1);
  const [paused, setPaused] = React.useState(false);
  const pageRef = React.useRef(0);
  const pagesRef = React.useRef(1);
  // One step = one card plus the gap. "Pages" = how many positions the row can rest at.
  const stepOf = () => { const row = rowRef.current; const first = row && row.children[0]; return first ? first.getBoundingClientRect().width + 20 : 0; };
  const measure = () => {
    const row = rowRef.current; const step = stepOf();
    if (!row || !step) return;
    const visible = Math.max(1, Math.round(row.clientWidth / step));
    pagesRef.current = Math.max(1, cards.length - visible + 1); setPages(pagesRef.current);
  };
  const goTo = (index) => {
    const row = rowRef.current; if (!row) return;
    row.scrollTo({ left: index * stepOf(), behavior: 'smooth' });
    if (!oneRef.current) return;
    // Phones: a copy of the first card sits after the last one. Sliding onto it and then jumping (unseen) to the real first card makes the loop keep moving forward instead of racing backwards.
    if (index >= pagesRef.current) window.setTimeout(() => { const r = rowRef.current; if (!r) return; r.style.scrollSnapType = 'none'; r.scrollTo({ left: 0, behavior: 'auto' }); window.requestAnimationFrame(() => { r.style.scrollSnapType = ''; }); }, 900);
  };
  React.useEffect(() => { measure(); window.addEventListener('resize', measure); return () => window.removeEventListener('resize', measure); }, [one]);
  // Slides on its own every few seconds, loops back to the start, and holds still while someone is hovering or focused on it.
  React.useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => goTo(oneRef.current ? pageRef.current + 1 : (pageRef.current + 1 >= pagesRef.current ? 0 : pageRef.current + 1)), 3200);
    return () => window.clearInterval(timer);
  }, [paused]);
  const onScroll = () => { const row = rowRef.current; const step = stepOf(); if (!row || !step) return; const raw = Math.round(row.scrollLeft / step); const at = raw >= pagesRef.current ? (oneRef.current ? 0 : pagesRef.current - 1) : raw; pageRef.current = at; setPage(at); };
  return <section className="section think-section" id="insights"><div className="think-grid-lines" aria-hidden="true" /><div className="container">
    <Reveal className="think-head"><span className="think-eyebrow">THINKING AHEAD</span><h2>Ideas for what’s next</h2><Link href="/insights" className="think-all" onClick={() => track('view_all_insights_click')}>View all insights <Arrow diagonal /></Link></Reveal>
    <div className={`think-cards${one ? ' think-one' : ''}`} ref={rowRef} onScroll={onScroll} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>{(one ? [...cards, cards[0]] : cards).map((item, i) => React.createElement(one ? 'div' : Reveal, one ? { key: `${item.slug || item.category}${i >= cards.length ? '-copy' : ''}`, className: 'think-slot' } : { key: item.slug || item.category, delay: (i % 3) * 80 },<Link href={item.href || `/insights/${item.slug}`} {...(i >= cards.length ? { tabIndex: -1, 'aria-hidden': true } : {})} className="think-card" onClick={() => track('insight_card_click', item.slug || item.category)}>
      <div className="think-card-body"><small>{item.category}</small><h3>{item.title}</h3><span className="think-plus" aria-hidden="true">+</span></div>
      <img src={item.image || thinkOwnImages[item.slug]?.src || thinkImages[i % thinkImages.length]} style={thinkOwnImages[item.slug] ? { objectPosition: thinkOwnImages[item.slug].pos, ...(thinkOwnImages[item.slug].fit ? { objectFit: thinkOwnImages[item.slug].fit, background: '#0e2a4a' } : {}) } : undefined} alt="" loading="lazy" decoding="async" />
    </Link>))}</div>
    {pages > 1 && <div className="think-dots" role="tablist" aria-label="Slide position">{Array.from({ length: pages }, (_, i) => <button key={i} type="button" role="tab" aria-selected={i === page} aria-label={`Show slide ${i + 1}`} className={i === page ? 'on' : ''} onClick={() => goTo(i)} />)}</div>}
  </div></section>;
}




export default function HomePage() { return <><Hero /><main><WhyChoose /><InsightsSection /><IndustriesTarget /><WorkSteps /><PurposePanel /><ContactBand /></main></>; }
