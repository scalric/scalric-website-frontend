import React from 'react';
import { Link, Reveal } from './UI.jsx';

/** Closing call to action: team photo on the left, a solid blue card overlapping it on the right. */
export default function ContactBand() {
  return <section className="cx-section"><div className="cx-stage">
    <div className="cx-photo"><img src="/assets/photos/contact-band-team.webp" alt="" loading="lazy" decoding="async" /></div>
    <Reveal className="cx-card">
      <span className="cx-eyebrow">START A CONVERSATION</span>
      <h2>What could we make possible?</h2>
      <p className="cx-sub">Bring us the challenge you’re working through. We’ll bring curiosity and a clear point of view.</p>
      <Link href="/contact" className="cx-btn">Talk to us</Link>
    </Reveal>
  </div></section>;
}
