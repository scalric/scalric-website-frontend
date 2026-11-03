import React from 'react';
import { Arrow, Link, TypedText } from './UI.jsx';
import ArtHero from './ArtHero.jsx';

/** What We Do hero: the wave banner. */
export default function WhatWeDoHero() {
  return <ArtHero
    art="whatwedo"
    title={<>Make complexity<TypedText phrases={['move forward', 'become clear', 'scale with confidence', 'turn into advantage']} /></>}
    text="Scalric brings technology, consulting and innovation together to help organizations make progress on consequential challenges."
    chips={[]}
  >
    <a href="#capability-overview" className="button button-green">Explore capabilities <Arrow diagonal /></a>
    <Link href="/contact" className="btn-talk"><span>Talk to us</span></Link>
  </ArtHero>;
}
