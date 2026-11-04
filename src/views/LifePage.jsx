'use client';
import React from 'react';
import { Link, Reveal } from '../components/UI.jsx';
import { useMobile } from '../lib/useMobile.js';

const heroSlides = ['/assets/photos/life-3.webp', '/assets/photos/life-1.webp', '/assets/photos/life-2.webp'];

const stories = [
  {
    image: '/assets/photos/life-1.webp',
    alt: 'A group of Scalric colleagues smiling up at the camera with their thumbs raised',
    title: 'People who back each other',
    text: 'Colleagues here ask for help early and give it freely. A hard question goes to whoever knows the answer, whatever their title. When a project lands, everyone who touched it shares the credit.',
  },
  {
    image: '/assets/photos/life-2.webp',
    alt: 'Colleagues laughing together in front of a wall of sticky notes',
    title: 'Ideas get a fair hearing',
    text: 'Our best work often starts on a wall of sticky notes. Anyone can bring an idea to the room, and the room tests it against the client’s real problem. The idea that holds up wins, whoever raised it.',
  },
  {
    image: '/assets/photos/life-3.webp',
    alt: 'A team cheering as confetti falls over them',
    title: 'Wins are worth marking',
    text: 'We build for businesses, and through the Scalric Impact initiative we do pro-bono technology work for NGOs. When a launch goes live or a partner reaches more people, we stop and celebrate it together.',
  },
];

const expect = [
  ['A clear goal on every project', 'You know the outcome we are working toward before you write a line of code or build a slide.'],
  ['Real problems from the start', 'New colleagues work on live client and NGO projects, with someone experienced alongside them.'],
  ['Work that reaches further', 'The Impact initiative puts technology in front of NGOs and local businesses that could not otherwise afford it.'],
  ['Feedback while it still helps', 'You hear what is working and what is not while there is time to change the work, not once a year.'],
];

/** Life at Scalric: a banner, then alternating photo and text rows, then what to expect. */
export default function LifePage() {
  const mobile = useMobile();
  return <main className="life">
    {mobile ? <section className="life-hero-m">
      <div className="m-over-media">
        <img src={heroSlides[0]} alt="" fetchPriority="high" decoding="async" />
        <div className="m-over-text"><span className="ah-eyebrow"><i />CAREERS</span><h1>Life at Scalric</h1></div>
      </div>
      <div className="life-hero-m-box">
        <p>Good work comes from people who trust each other. Here is what that looks like day to day.</p>
      </div>
    </section> : <section className="life-hero">
      <div className="life-hero-bg" aria-hidden="true">{heroSlides.map((src, i) => <img key={src} className="life-slide" style={{ '--n': i }} src={src} alt="" decoding="async" fetchPriority={i === 0 ? 'high' : undefined} />)}</div>
      <div className="life-hero-inner">
        <div className="life-hero-box">
          <h1>Life at Scalric</h1>
          <p>Good work comes from people who trust each other. Here is what that looks like day to day.</p>
        </div>
      </div>
    </section>}
    <section className="life-intro">
      <Reveal>
        <h2>What it is like to work here</h2>
        <p>Scalric is a technology and consulting team. We solve problems for businesses and take on pro-bono projects for NGOs, and we hold both to the same standard. How we work together matters as much as what we deliver.</p>
      </Reveal>
    </section>
    <section className="life-stories">
      {stories.map((story, i) => <Reveal key={story.title} className={`life-row${i % 2 ? ' is-flipped' : ''}`}>
        <div className="life-row-copy"><h3>{story.title}</h3><p>{story.text}</p></div>
        <div className="life-row-photo"><img src={story.image} alt={story.alt} loading="lazy" decoding="async" /></div>
      </Reveal>)}
    </section>
    <section className="life-expect">
      <Reveal>
        <h2>What you can expect</h2>
        <div className="life-cards">{expect.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </Reveal>
    </section>
    <section className="life-cta">
      <Reveal>
        <h2>See where you could fit</h2>
        <p>Browse the roles we are hiring for right now and apply in a few minutes.</p>
        <Link href="/careers/openings" className="life-cta-btn">View open roles</Link>
      </Reveal>
    </section>
  </main>;
}
