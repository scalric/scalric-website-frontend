import React from 'react';
import NicheSpotlight from './NicheSpotlight.jsx';
import CtaBand from './CtaBand.jsx';
import { sampleFeedback } from './FeedbackCarousel.jsx';
import { Eyebrow, Reveal } from './UI.jsx';
import ImpactDetail from './ImpactDetail.jsx';
import { useMobile } from '../lib/useMobile.js';
import { impactIndustries, impactKey } from '../data/impactIndustries.js';

const statement = [
  ['We build with local businesses and NGOs, ', false],
  ['listening first', true],
  [', creating ', false],
  ['practical technology', true],
  [' together and learning as things change', false],
];

/** Words fill in from grey as the block scrolls through the viewport. */
function ScrollStatement() {
  const ref = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const words = statement.flatMap(([text, accent]) => text.split(/(\s+)/).filter(Boolean).map((word) => ({ word, accent })));
  const total = words.filter((item) => item.word.trim()).length;

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setProgress(1); return undefined; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.35;
      // once the statement has reached the upper part of the screen (e.g. after jumping to #impact) show it fully lit
      if (box.top <= window.innerHeight * 0.5) { setProgress(1); return; }
      setProgress(Math.min(1, Math.max(0, (start - box.top) / (start - end + box.height * 0.4))));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);

  let seen = 0;
  return <p className="imp-statement" ref={ref}>{words.map((item, index) => {
    if (!item.word.trim()) return item.word;
    const lit = seen / total < progress;
    seen += 1;
    return <span key={index} className={`${lit ? 'lit' : ''} ${item.accent ? 'accent' : ''}`}>{item.word}</span>;
  })}</p>;
}

const audiences = [
  { title: 'Local businesses', text: 'Discounted digital and SaaS support, so growing businesses can use good technology without the usual cost', image: '/assets/photos/metric-businesses.webp', video: '/assets/videos/local-businesses.mp4', tag: 'Discounted support' },
  { title: 'Practical technology', text: 'Tools designed around a real need, shaped with the people who will use them every day', image: '/assets/photos/metric-tech.webp', video: '/assets/videos/practical-technology.mp4', tag: 'Built around need' },
  { title: 'Artists & creators', text: 'Simple digital tools so artists can show their work, take bookings and reach buyers', image: '/assets/photos/impact-artists.webp', video: '/assets/videos/impact-artists.mp4', tag: 'Creative' },
  { title: 'Photography studios', text: 'Online booking, galleries and client delivery that save studios hours every week', image: '/assets/photos/impact-photo-studios.webp', video: '/assets/videos/impact-photo-studios.mp4', tag: 'Creative' },
  { title: 'Event & wedding photographers', text: 'Packages, proofing and payments handled in one place, from first enquiry to final album', image: '/assets/photos/impact-event-photographers.webp', video: '/assets/videos/impact-event-photographers.mp4', tag: 'Creative' },
  { title: 'Yoga studios', text: 'Class schedules, memberships and reminders that keep students coming back', image: '/assets/photos/impact-yoga.webp', video: '/assets/videos/impact-yoga.mp4', tag: 'Health & wellness' },
  { title: 'Dental clinics', text: 'Appointment booking and patient follow-ups that cut missed visits', image: '/assets/photos/impact-dental.webp', video: '/assets/videos/impact-dental.mp4', tag: 'Health & wellness' },
  { title: 'Hair transplant clinics', text: 'Consultation flows and secure patient records that build trust before the first visit', image: '/assets/photos/impact-hair-clinics.webp', video: '/assets/videos/impact-hair-clinics.mp4', tag: 'Health & wellness' },
  { title: 'Interior designers', text: 'Project portfolios, quotes and client approvals brought together in one clear workspace', image: '/assets/photos/impact-interiors.webp', video: '/assets/videos/impact-interiors.mp4', tag: 'Home & design' },
  { title: 'Electrical services', text: 'Job requests, scheduling and invoicing that keep small crews organised and paid on time', image: '/assets/photos/impact-electrical.webp', video: '/assets/videos/impact-electrical.mp4', tag: 'Home services' },
  { title: 'Cafés & casual dining', text: 'Online ordering, menus and reservations that turn local regulars into steady revenue', image: '/assets/photos/impact-cafes.webp', video: '/assets/videos/impact-cafes.mp4', tag: 'Hospitality' },
  { title: 'Restaurants', text: 'Table management and guest insights that make every service run smoother', image: '/assets/photos/impact-fine-dining.webp', video: '/assets/videos/impact-fine-dining.mp4', tag: 'Hospitality' },
  { title: 'Football clubs', text: 'Team rosters, fixtures and fee collection without the spreadsheets', image: '/assets/photos/impact-football.webp', video: '/assets/videos/impact-football.mp4', tag: 'Sports' },
  { title: 'Tennis academies', text: 'Court bookings, coaching schedules and memberships in a single easy system', image: '/assets/photos/impact-tennis.webp', video: '/assets/videos/impact-tennis.mp4', tag: 'Sports' },
  { title: 'Dance studios', text: 'Class sign-ups, recital planning and parent updates handled with less effort', image: '/assets/photos/impact-dance.webp', video: '/assets/videos/impact-dance.mp4', tag: 'Creative' },
  { title: 'Music schools', text: 'Lesson scheduling, practice tracking and payments that let teachers focus on teaching', image: '/assets/photos/impact-music.webp', video: '/assets/videos/impact-music.mp4', tag: 'Creative' },
  { title: 'Gyms & fitness centres', text: 'Memberships, check-ins and progress tracking that help members stay on course', image: '/assets/photos/impact-gyms.webp', video: '/assets/videos/impact-gyms.mp4', tag: 'Health & wellness' },
  { title: 'Salons & beauty', text: 'Online booking, stylist calendars and loyalty rewards that fill the diary', image: '/assets/photos/impact-salons.webp', video: '/assets/videos/impact-salons.mp4', tag: 'Beauty' },
];

// Each card shows a still thumbnail (thumb-<video basename>.webp); the video plays in the detail view only.
const cards = audiences.map((item) => {
  const key = impactKey(item.video);
  return { ...item, key, thumb: item.video ? `/assets/photos/thumb-${key}.webp` : item.image, focus: impactIndustries[key]?.focus };
});

const PlayIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" /></svg>;

function Showcase() {
  const mobile = useMobile();
  const [open, setOpen] = React.useState(-1);
  const scroller = React.useRef(null);
  const [ratio, setRatio] = React.useState(0.33);
  const [edge, setEdge] = React.useState({ start: true, end: false });

  const measure = React.useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setRatio(el.scrollWidth ? Math.min(1, el.clientWidth / el.scrollWidth) : 1);
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
    el.parentElement.style.setProperty('--imp-progress', max > 0 ? el.scrollLeft / max : 0);
  }, []);
  React.useEffect(() => { measure(); window.addEventListener('resize', measure); return () => window.removeEventListener('resize', measure); }, [measure]);
  const move = (direction) => { const el = scroller.current; el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' }); };

  return <section className="imp-showcase" aria-label="Who the initiative supports">
    <div className="imp-showcase-track" ref={scroller} onScroll={measure} tabIndex="0">
      {cards.map((item, index) => {
        const detail = Boolean(impactIndustries[item.key]);
        // Conditional rendering: phones get a compact caption so the thumbnail stays visible
        return <article key={item.title} className={`imp-card ${detail ? 'has-detail' : ''}${mobile ? ' imp-card-m' : ''}`}>
          <img src={item.thumb} alt="" loading={index < 3 ? 'eager' : 'lazy'} decoding="async" style={item.focus ? { objectPosition: item.focus } : undefined} />
          <div className="imp-card-shade" />
          <span className="imp-card-tag">{item.tag}</span>
          {detail && <span className="imp-card-play" aria-hidden="true"><i><PlayIcon /></i><b>Watch</b></span>}
          <div className="imp-card-body"><h3>{item.title}</h3><p>{item.text}</p></div>
          {detail && <button type="button" className="imp-card-open" aria-haspopup="dialog" onClick={() => setOpen(index)}
            aria-label={`${item.title}: watch the video and see how Scalric can help`} />}
        </article>;
      })}
    </div>
    {open >= 0 && <ImpactDetail items={cards} index={open} onChange={setOpen} onClose={() => setOpen(-1)} mobile={mobile} />}
    <div className="imp-showcase-bar">
      <div className="imp-progress" aria-hidden="true"><i style={{ width: `${ratio * 100}%`, left: `calc((100% - ${ratio * 100}%) * var(--imp-progress, 0))` }} /></div>
      <div className="imp-arrows"><button type="button" onClick={() => move(-1)} disabled={edge.start} aria-label="Previous">←</button><button type="button" onClick={() => move(1)} disabled={edge.end} aria-label="Next">→</button></div>
    </div>
  </section>;
}

/** Expanding panels: the active story opens wide, the rest fold down to a name strip. Hover, focus or tap to switch. */
function StoryPanels() {
  const [active, setActive] = React.useState(0);
  return <div className="imp-panels" role="list">
    {sampleFeedback.map((item, index) => {
      const open = index === active;
      return <article key={item.company} role="listitem" className={`imp-panel ${open ? 'open' : ''}`} style={{ '--tone': item.tone }}
        onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setActive(index)}>
        <button type="button" className="imp-panel-head" aria-expanded={open} onClick={() => setActive(index)} onFocus={() => setActive(index)}>
          <span className="imp-panel-name">{item.company}</span>
          <span className="imp-panel-plus" aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
        <div className="imp-panel-body">
          <div>
            <h3>{item.company}</h3>
            <span className="fb-stars" aria-label="Five stars">★★★★★</span>
            <p className="imp-panel-quote">“{item.quote}”</p>
            <p className="imp-panel-person"><b>{item.name}</b><span>{item.role}</span></p>
          </div>
        </div>
      </article>;
    })}
  </div>;
}

const steps = [
  ['01', 'Listen closely', 'Understand the people, goals and constraints behind the challenge', '/assets/photos/impact-listen-new.webp'],
  ['02', 'Build together', 'Shape an appropriate technology response with the organisation', '/assets/photos/impact-build-new.webp'],
  ['03', 'Learn and improve', 'Review what is working and identify what should happen next', '/assets/photos/impact-learn-new.webp'],
];

export default function ImpactSections({ children }) {
  return <div className="imp" id="impact">
    <section className="imp-intro"><div className="container">
      <p className="imp-kicker">Scalric Impact</p>
      <ScrollStatement />
      <a href="#how" className="imp-link">See how the program works <span aria-hidden="true">→</span></a>
    </div></section>

    <Showcase />

    <NicheSpotlight />

    <section className="imp-how" id="how"><div className="container">
      <div className="imp-how-head"><Eyebrow>HOW IT WORKS</Eyebrow><h2>Listen, build, learn</h2><p>A thoughtful path from a real need to technology that can keep making a difference</p></div>
      <div className="imp-steps">{steps.map(([number, title, text, image], index) => <Reveal key={number} delay={index * 80}><article className="imp-step">
        <div className="imp-step-photo"><img src={image} alt="" loading="lazy" decoding="async" /></div>
        <span>{number}</span><h3>{title}</h3><p>{text}</p>
      </article></Reveal>)}</div>
    </div></section>

    <section className="imp-stories"><div className="container">
      <div className="imp-stories-head">
        <div><Eyebrow>STORIES OF PROGRESS</Eyebrow><h2>Real stories<br />and testimonials</h2></div>
      </div>
      <StoryPanels />
    </div></section>

    {children}

    <CtaBand />
  </div>;
}
