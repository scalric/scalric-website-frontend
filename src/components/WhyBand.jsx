import React from 'react';
import { Link, Reveal } from './UI.jsx';

/** "Why choose Scalric" band: copy and two buttons on blue, team photo on the right. */
export default function WhyBand() {
  return <section className="why-band" id="why-choose-us"><div className="why-band-inner">
    <Reveal className="why-band-copy">
      <span className="why-band-eyebrow">WHY CHOOSE SCALRIC</span>
      <h2>Technology and strategy, built around your outcome</h2>
      <p>A technology and consulting team that starts with your goal and works back to the right solution.</p>
      <div className="why-band-actions"><Link href="/what-we-do" className="why-btn why-btn-solid">Explore what we do</Link><Link href="/industries#impact" className="why-btn why-btn-outline">Our impact</Link></div>
    </Reveal>
    <Reveal className="why-band-media" delay={80}><img src="/assets/photos/why-team.webp" alt="Colleagues reviewing data together in a meeting room" loading="lazy" decoding="async" /></Reveal>
  </div></section>;
}
