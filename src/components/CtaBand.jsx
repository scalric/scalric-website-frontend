import React from 'react';
import { Link } from './UI.jsx';

/** Closing banner: oversized white words on a blue gradient that drift slightly as you scroll, and a yellow Talk to us button that opens the contact form. */
export default function CtaBand() {
  const ref = React.useRef(null);


  return <section className="imp-cta" id="get-involved" ref={ref} aria-labelledby="imp-cta-title">
    <span className="imp-cta-glass one" aria-hidden="true" /><span className="imp-cta-glass two" aria-hidden="true" /><span className="imp-cta-glass three" aria-hidden="true" />
    <div className="imp-cta-row">
      <h2 id="imp-cta-title" className="imp-cta-words">
        <span className="w1">Bring</span> <span className="w2">us the</span> <span className="w3">challenge</span>
      </h2>
      <Link href="/contact" className="imp-pill imp-cta-pill" onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'impact_talk_to_us_click' } }))}><span>Talk to us</span><i aria-hidden="true">→</i></Link>
    </div>
  </section>;
}
