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
  React.useEffect(() => {
    setMobile(window.matchMedia('(max-width: 680px)').matches);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) { setEnabled(false); setPlaying(false); }
  }, []);
  const toggle = () => {
    if (!enabled) { setEnabled(true); setPlaying(true); return; }
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play().catch(() => { }); setPlaying(true); } else { video.pause(); setPlaying(false); }
  };
  return <section className={`home-hero hero-city${mobile ? ' hero-m' : ''}`} id="top" aria-labelledby="hero-title">
    {enabled && <video ref={videoRef} className="hero-city-video" src={mobile ? '/media/hero-mobile-v2.mp4' : '/media/hero-home.mp4'} autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} key={mobile ? 'm' : 'd'} poster={mobile ? '/assets/hero-mobile-v2-poster.webp' : '/assets/hero-home-poster.webp'} onCanPlay={(event) => { const video = event.currentTarget; video.muted = true; if (video.paused && playing) video.play().catch(() => setPlaying(false)); }} />}
    {mobile ? <div className="container hero-content hero-content-m">
      <div className="hero-m-top">
        <Eyebrow>TECHNOLOGY · CONSULTING · INNOVATION</Eyebrow>
        <SplitHeading as="h1" lines={['Engineering', 'the difference']} accent={1} className="hero-title" startDelay={2} />
      </div>
      <div className="hero-actions hero-m-bottom"><Link href="/what-we-do" className="button button-green">Learn more</Link><Link href="/industries#impact" className="button button-outline" onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'impact_teaser_click' } }))}>See our impact</Link></div>
    </div> : <div className="container hero-content">
      <Eyebrow>TECHNOLOGY · CONSULTING · INNOVATION</Eyebrow>
      <SplitHeading as="h1" lines={['Engineering', 'the difference']} accent={1} className="hero-title" startDelay={2} />
      <div className="hero-actions"><Link href="/what-we-do" className="button button-green">Learn more</Link><Link href="/industries#impact" className="button button-outline" onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'impact_teaser_click' } }))}>See our impact</Link></div>
    </div>}
    <button type="button" className="hero-toggle hero-city-toggle" onClick={toggle} aria-pressed={!playing} aria-label={playing ? 'Pause background video' : 'Play background video'}>{playing ? '❚❚' : '▶'}</button>
  </section>;
}

const thinkImages = ['/assets/photos/think-dashboard.webp', '/assets/photos/home-insight-ai.webp', '/assets/photos/think-automation-new.webp'];

function InsightsSection() {
  const track = (event, slug) => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event, slug } }));
  return <section className="section think-section" id="insights"><div className="think-grid-lines" aria-hidden="true" /><div className="container">
    <Reveal className="think-head"><span className="think-eyebrow">THINKING AHEAD</span><h2>Ideas for what’s next</h2><Link href="/insights" className="think-all" onClick={() => track('view_all_insights_click')}>View all insights <Arrow diagonal /></Link></Reveal>
    <div className="think-cards">{insights.slice(0, 3).map((item, i) => <Reveal key={item.slug} delay={i * 80}><Link href={`/insights/${item.slug}`} className="think-card" onClick={() => track('insight_card_click', item.slug)}>
      <div className="think-card-body"><small>{item.category}</small><h3>{item.title}</h3><span className="think-plus" aria-hidden="true">+</span></div>
      <img src={thinkImages[i]} alt="" loading="lazy" decoding="async" />
    </Link></Reveal>)}</div>
  </div></section>;
}




export default function HomePage() { return <><Hero /><main><WhyChoose /><InsightsSection /><IndustriesTarget /><WorkSteps /><PurposePanel /><ContactBand /></main></>; }
