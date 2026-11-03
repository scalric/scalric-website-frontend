import React from 'react';
import { proofStats } from '../data/siteContent.js';
import { Link, Arrow, Reveal, CountUp } from './UI.jsx';

/** "Why choose Scalric" grid: headline card, photo and two proof stats. */
export default function WhyChoose() {
  const [businesses, ngos] = proofStats;
  return <section className="section why-section" id="why-choose-us"><div className="container">
    <div className="why-grid">
      <Reveal className="why-hero">
        <img className="why-hero-bg" src="/assets/photos/why-handshake.webp" alt="" loading="lazy" decoding="async" />
        <span className="why-pill">Why choose Scalric</span>
        <h2>Technology and strategy,<br />built around your outcome</h2>
        <Link href="/what-we-do" className="why-link">Explore what we do <Arrow diagonal /></Link>
      </Reveal>
      <Reveal className="why-photo" delay={60}><img src="/assets/photos/consulting-office.webp" alt="" loading="lazy" decoding="async" /></Reveal>
      <Reveal className="why-stat" delay={100}><div><b><CountUp value={businesses.value} suffix={businesses.suffix} /></b><small>{businesses.label}</small></div></Reveal>
      <Reveal className="why-note" delay={140}><div><b><CountUp value={ngos.value} suffix={ngos.suffix} /></b><small>{ngos.label}</small></div><p>We connect the why with the how, bringing business understanding and technology together around a clear outcome.</p></Reveal>
    </div>
  </div></section>;
}
