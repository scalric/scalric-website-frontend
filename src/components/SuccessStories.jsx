'use client';
import React from 'react';
import { Reveal } from './UI.jsx';

// One entry per company. Logos are read from /assets/logos/<slug>.svg (or .png); until a file exists the company name is shown instead.
const stories = [
  { name: 'Bombay Shaving Co', logo: true, title: 'Sales rate up', accent: '+150%', text: 'A new store platform lifted Bombay Shaving Co’s sales rate by 150%.', metric: 'Sales rate', fix: 'New store platform' },
  { name: 'redBus', logo: true, title: 'Mobile sales up', accent: '+80–100%', text: 'Faster pages lifted redBus mobile sales by 80–100%.', metric: 'Mobile sales', fix: 'Faster pages' },
  { name: 'Rakuten 24', logo: true, title: 'Money per visitor up', accent: '+53%', text: 'Speed alone lifted money per visitor by 53% and sales rate by 33%.', metric: 'Money per visitor, sales rate', fix: 'Speed only' },
  { name: 'Nykaa', logo: true, title: 'Visitors from smaller cities', accent: '+28%', text: 'Nykaa grew its visitors from smaller cities by 28%.', metric: 'Visitors from smaller cities', fix: 'A small, specific fix' },
  { name: 'Vodafone Italy', logo: true, title: 'Sales after faster pages', accent: '+8%', text: 'Vodafone Italy saw sales rise 8% once its pages got faster.', metric: 'Sales', fix: 'Faster pages' },
  { name: 'Ispahani Tea', logo: true, title: 'Sales rate', accent: '5–10% to 40–50%', text: 'Ispahani Tea’s sales rate climbed from 5–10% to 40–50%.', metric: 'Sales rate', fix: 'WhatsApp shop' },
  { name: 'Riley Plumbing', logo: true, title: 'Calls booked', accent: 'under 50% to 80%', text: 'Riley Plumbing now books 80% of its calls, up from under 50%.', metric: 'Calls booked', fix: 'AI phone agent' },
];

const PER_PAGE = 3;
const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function Chevron({ flip = false }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/** The company logo once its file has been found, otherwise the company name set as a wordmark. Near-square artwork (research cards) gets a taller box than wide wordmarks. */
function Logo({ story }) {
  const [found, setFound] = React.useState(null);
  React.useEffect(() => {
    if (!story.logo) return undefined;
    let cancelled = false;
    const options = [`/assets/logos/${slug(story.name)}.svg`, `/assets/logos/${slug(story.name)}.webp`];
    const probe = (index) => {
      if (index >= options.length) return;
      const image = new Image();
      image.onload = () => { if (!cancelled) setFound({ src: options[index], card: image.naturalWidth / image.naturalHeight < 2.2 }); };
      image.onerror = () => probe(index + 1);
      image.src = options[index];
    };
    probe(0);
    return () => { cancelled = true; };
  }, [story.name, story.logo]);
  return <span className={`ss-logo-box${found?.card ? ' is-card' : ''}`}>{found ? <img className="ss-logo" src={found.src} alt={story.name} decoding="async" /> : <span className="ss-wordmark">{story.name}</span>}</span>;
}

/** The info shown in the white panel for one company. */
function PanelBody({ story, layer }) {
  return <div className={`ss-panel-in ${layer}`}>
    <p className="ss-panel-company">{story.name}</p>
    <h3>{story.title} <span>{story.accent}</span></h3>
    <p className="ss-panel-text" lang="en">{story.text}</p>
    <ul className="ss-panel-facts">
      <li><small>Measured</small><b>{story.metric}</b></li>
      <li><small>The fix</small><b>{story.fix}</b></li>
    </ul>
  </div>;
}

/** "Success stories": three company logos form a circle with an info panel beside them; picking a logo shows that company's result. */
export default function SuccessStories() {
  const [selected, setSelected] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const story = stories[selected];
  // `leaving` is the story sliding out of the panel while the new one slides in; it is cleared once the slide has finished.
  const [view, setView] = React.useState({ current: selected, leaving: null });
  if (view.current !== selected) setView({ current: selected, leaving: view.current });
  React.useEffect(() => {
    if (view.leaving === null) return undefined;
    const timer = window.setTimeout(() => setView((value) => ({ ...value, leaving: null })), 420);
    return () => window.clearTimeout(timer);
  }, [view]);
  const page = Math.floor(selected / PER_PAGE);
  // The last page shows the final three, so a page never has empty quadrants.
  const first = Math.min(page * PER_PAGE, stories.length - PER_PAGE);
  const tiles = stories.slice(first, first + PER_PAGE);
  const go = React.useCallback((step) => setSelected((value) => (value + step + stories.length) % stories.length), []);

  // The selection moves on by itself; hovering does not stop it, only keyboard focus does.
  React.useEffect(() => {
    if (paused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => go(1), 3000);
    return () => window.clearInterval(timer);
  }, [paused, go]);

  return <section className="section ss-section" id="success-stories" aria-labelledby="ss-title"><div className="container ss-layout">
    <div className="ss-intro">
      <Reveal>
        <h2 id="ss-title">Success stories:<br />what worked</h2>
        <p className="ss-lede">Small, specific fixes created large, measured results.</p>
      </Reveal>
      <div className="ss-controls">
        <div className="ss-arrows">
          <button type="button" className="ss-round" aria-label="Previous story" onClick={() => go(-1)}><Chevron flip /></button>
          <button type="button" className="ss-round" aria-label="Next story" onClick={() => go(1)}><Chevron /></button>
        </div>
        <span className="ss-count" aria-live="polite">{String(selected + 1).padStart(2, '0')} <i>/</i> {String(stories.length).padStart(2, '0')}</span>
        <div className="ss-dots" role="group" aria-label="Choose a story">
          {stories.map((item, i) => <button key={item.name} type="button" className={i === selected ? 'is-on' : ''} aria-label={item.name} aria-pressed={i === selected} onClick={() => setSelected(i)} />)}
        </div>
      </div>
    </div>

    <Reveal><div className="ss-poster" role="group" aria-label="Company results" onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      {tiles.map((item, i) => <button key={item.name} type="button" className={`ss-tile ss-tile-${i + 1}${item.name === story.name ? ' is-on' : ''}`} aria-pressed={item.name === story.name} onClick={() => setSelected(stories.indexOf(item))}>
        <Logo story={item} />
      </button>)}

      <div className="ss-panel" aria-live="polite">
        {view.leaving !== null && <PanelBody key={`out-${view.leaving}`} story={stories[view.leaving]} layer="is-out" />}
        <PanelBody key={`in-${story.name}`} story={story} layer={view.leaving !== null ? 'is-swap' : ''} />
      </div>
    </div></Reveal>
  </div></section>;
}
