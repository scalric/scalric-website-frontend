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

function Hero() {
  const videoRef = React.useRef(null);
  const [mobile, setMobile] = React.useState(false);
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
  return <><link rel="preload" as="image" href="/assets/hero-home-poster.webp" media="(min-width: 681px)" fetchPriority="high" /><link rel="preload" as="image" href="/assets/hero-mobile-v2-poster.webp" media="(max-width: 680px)" fetchPriority="high" /><section className={`home-hero hero-city${mobile ? ' hero-m' : ''}`} id="top" aria-labelledby="hero-title">
    {enabled && <video ref={videoRef} className="hero-city-video" src={ready ? (mobile ? '/media/hero-mobile-v2.mp4' : '/media/hero-home.mp4') : undefined} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} key={mobile ? 'm' : 'd'} poster={mobile ? '/assets/hero-mobile-v2-poster.webp' : '/assets/hero-home-poster.webp'} onCanPlay={(event) => { const video = event.currentTarget; video.muted = true; if (video.paused && playing) video.play().catch(() => setPlaying(false)); }} />}
    {mobile ? <div className="container hero-content hero-content-m">
      <div className="hero-m-top">
        <Eyebrow>TECHNOLOGY · CONSULTING · INNOVATION</Eyebrow>
        <SplitHeading as="h1" lines={['Engineering', 'the difference']} accent={1} className="hero-title" startDelay={2} />
      </div>
      <div className="hero-actions hero-m-bottom"><Link href="/what-we-do" className="button button-green">Learn more about what we do</Link><Link href="/industries#impact" className="button button-outline" onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'impact_teaser_click' } }))}>See our impact</Link></div>
    </div> : <div className="container hero-content">
      <Eyebrow>TECHNOLOGY · CONSULTING · INNOVATION</Eyebrow>
      <SplitHeading as="h1" lines={['Engineering', 'the difference']} accent={1} className="hero-title" startDelay={2} />
      <div className="hero-actions"><Link href="/what-we-do" className="button button-green">Learn more about what we do</Link><Link href="/industries#impact" className="button button-outline" onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'impact_teaser_click' } }))}>See our impact</Link></div>
    </div>}
    <button type="button" className="hero-toggle hero-city-toggle" onClick={toggle} aria-pressed={!playing} aria-label={playing ? 'Pause background video' : 'Play background video'}>{playing ? '❚❚' : '▶'}</button>
  </section></>;
}

// Pictures for the cards. They repeat in order (1, 2, 3, 1, 2, 3 ...) until each card gets its own - add more entries here to replace the repeats.
const thinkImages = ['/assets/photos/think-dashboard.webp', '/assets/photos/home-insight-ai.webp', '/assets/photos/think-automation-new.webp'];
// How many cards the row shows.
const THINK_CARD_COUNT = 6;

function InsightsSection() {
  const track = (event, slug) => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event, slug } }));
  const cards = insights.slice(0, THINK_CARD_COUNT);
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
  const goTo = (index) => { const row = rowRef.current; if (row) row.scrollTo({ left: index * stepOf(), behavior: 'smooth' }); };
  React.useEffect(() => { measure(); window.addEventListener('resize', measure); return () => window.removeEventListener('resize', measure); }, []);
  // Slides on its own every few seconds, loops back to the start, and holds still while someone is hovering or focused on it.
  React.useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => goTo(pageRef.current + 1 >= pagesRef.current ? 0 : pageRef.current + 1), 3200);
    return () => window.clearInterval(timer);
  }, [paused]);
  const onScroll = () => { const row = rowRef.current; const step = stepOf(); if (!row || !step) return; const at = Math.min(pagesRef.current - 1, Math.round(row.scrollLeft / step)); pageRef.current = at; setPage(at); };
  return <section className="section think-section" id="insights"><div className="think-grid-lines" aria-hidden="true" /><div className="container">
    <Reveal className="think-head"><span className="think-eyebrow">THINKING AHEAD</span><h2>Ideas for what’s next</h2><Link href="/insights" className="think-all" onClick={() => track('view_all_insights_click')}>View all insights <Arrow diagonal /></Link></Reveal>
    <div className="think-cards" ref={rowRef} onScroll={onScroll} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>{cards.map((item, i) => <Reveal key={item.slug} delay={(i % 3) * 80}><Link href={`/insights/${item.slug}`} className="think-card" onClick={() => track('insight_card_click', item.slug)}>
      <div className="think-card-body"><small>{item.category}</small><h3>{item.title}</h3><span className="think-plus" aria-hidden="true">+</span></div>
      <img src={thinkImages[i % thinkImages.length]} alt="" loading="lazy" decoding="async" />
    </Link></Reveal>)}</div>
    {pages > 1 && <div className="think-dots" role="tablist" aria-label="Slide position">{Array.from({ length: pages }, (_, i) => <button key={i} type="button" role="tab" aria-selected={i === page} aria-label={`Show slide ${i + 1}`} className={i === page ? 'on' : ''} onClick={() => goTo(i)} />)}</div>}
  </div></section>;
}




export default function HomePage() { return <><Hero /><main><WhyChoose /><InsightsSection /><IndustriesTarget /><WorkSteps /><PurposePanel /><ContactBand /></main></>; }
