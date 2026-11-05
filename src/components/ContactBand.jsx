import React from 'react';
import { Link, Reveal } from './UI.jsx';

/** Closing call to action: team photo on the left, a solid blue card overlapping it on the right. */
export default function ContactBand() {
  // Conditional rendering: on phones the photo is cropped to the two people talking in the middle and shown large, edge to edge, below the card.
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return <section className="cx-section"><div className="cx-stage">
    <div className={`cx-photo${mobile ? ' cx-photo-m' : ''}`}><img src={mobile ? '/assets/photos/contact-band-mobile.webp' : '/assets/photos/contact-band-team.webp'} alt="" loading="lazy" decoding="async" /></div>
    <Reveal className="cx-card">
      <span className="cx-eyebrow">START A CONVERSATION</span>
      <h2>What could we make possible?</h2>
      <p className="cx-sub">Bring us the challenge you’re working through. We’ll bring curiosity and a clear point of view.</p>
      <Link href="/contact" className="cx-btn">Talk to us</Link>
    </Reveal>
  </div></section>;
}
