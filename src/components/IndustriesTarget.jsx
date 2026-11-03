import React from 'react';
import { Link, Reveal } from './UI.jsx';

const icons = {
  dining: <path d="M5 3v8a2 2 0 0 0 2 2v8M9 3v8a2 2 0 0 1-2 2M17 21V3c-2 1-3 4-3 7s1 4 3 4" />,
  care: <path d="M12 21s-7-4.4-9-9.2C1.8 8 4 5 7 5c2 0 3.4 1.2 5 3 1.6-1.8 3-3 5-3 3 0 5.2 3 4 6.8C19 16.6 12 21 12 21z" />,
  home: <path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6" />,
  studio: <><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-3h5L16 7" /></>,
  sport: <><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M5.5 5.5c3 3 3 10 0 13M18.5 5.5c-3 3-3 10 0 13" /></>,
  beauty: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M8.5 8l11 10M8.5 16L19.5 6" /></>,
};

const industries = [
  { title: 'Healthcare & clinics', slug: 'unanswered-clinic-calls', stat: '32%', label: 'of clinic calls go unanswered', fix: 'AI phone agent + reminders', image: '/assets/photos/industry-healthcare.webp', icon: 'care', tone: '#f08aa0' },
  { title: 'Home services', slug: 'booking-more-calls-in-home-services', stat: '50→80%', label: 'calls booked after adding an AI agent', fix: 'AI phone agent', image: '/assets/photos/industry-home-services.webp', icon: 'home', tone: '#ff7a45' },
  { title: 'Restaurants & cafés', slug: 'the-app-behind-the-order', stat: '33%', label: 'of Starbucks US orders come through its app', fix: 'Ordering app + loyalty', image: '/assets/photos/industry-restaurants.webp', icon: 'dining', tone: '#ffba49' },
  { title: 'Gyms & studios', slug: 'branded-apps-for-gyms-and-studios', stat: '62%', label: 'of bookings came through a branded app', fix: 'Booking app', image: '/assets/photos/industry-gyms.webp', icon: 'sport', tone: '#2fb67c' },
  { title: 'Salons & spas', slug: 'replying-to-every-review', stat: '80%', label: 'pick businesses that reply to every review', fix: 'Booking + review replies', image: '/assets/photos/industry-salons.webp', icon: 'beauty', tone: '#8a6cf0' },
];

// Plain photo grid that fills the whole left column. Each tile maps to an industry row (by index) so hover and links stay in sync.
// `pos` keeps faces in frame when a photo is cropped.
const tiles = [
  { industry: 0, image: '/assets/photos/industry-healthcare-new.webp', pos: '45% 52%' },
  { industry: 3, image: '/assets/photos/industry-photographer.webp', pos: '50% 40%' },
  { industry: 2, image: '/assets/photos/industry-restaurants-new.webp', pos: '45% 30%' },
  { industry: 4, image: '/assets/photos/industry-salons-new.webp', pos: '50% 40%' },
  { industry: 1, image: '/assets/photos/industry-home-services.webp', pos: '50% 30%' },
  { industry: 3, image: '/assets/photos/industry-sports-new.webp', pos: '42% 36%' },
];

export default function IndustriesTarget() {
  const [active, setActive] = React.useState(1);
  // Conditional rendering: when the section stacks into one column (tablet/phone), the photos come after the numbers, not before.
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 980px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return <section className="section it-section" id="industries-we-target" aria-labelledby="it-title"><div className="container it-wrap">
    {mobile ? <>
    <Reveal className="it-stats" delay={80}>
      <h2 className="it-heading" id="it-title">Industries we<br />TARGET</h2>
      <p className="it-lede">Each industry comes with one real number that shows the problem, or the gain from fixing it.</p>
      <ul className="it-list">{industries.map((item, i) => <li key={item.title}>
        <Link href={`/insights/${item.slug}`} className={`it-row${active === i ? ' is-active' : ''}`} style={{ '--tone': item.tone }} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
          <span className="it-badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[item.icon]}</svg></span>
          <strong className="it-stat">{item.stat}</strong>
          <span className="it-row-copy"><b>{item.title}</b><span>{item.label}</span><small>{item.fix}</small></span>
        </Link>
      </li>)}</ul>
    </Reveal>
    <Reveal className="it-poster-wrap"><div className="it-grid" role="group" aria-label="Industry photos">
      {tiles.map((tile, i) => { const item = industries[tile.industry]; return <Link key={i} href={`/insights/${item.slug}`} aria-label={`${item.title}: read the insight`} className={`it-photo${active === tile.industry ? ' is-active' : ''}`} onMouseEnter={() => setActive(tile.industry)}>
        <img src={tile.image} alt="" loading="lazy" style={{ objectPosition: tile.pos }} />
      </Link>; })}
    </div></Reveal>
    </> : <>
    <Reveal className="it-poster-wrap"><div className="it-grid" role="group" aria-label="Industry photos">
      {tiles.map((tile, i) => { const item = industries[tile.industry]; return <Link key={i} href={`/insights/${item.slug}`} aria-label={`${item.title}: read the insight`} className={`it-photo${active === tile.industry ? ' is-active' : ''}`} onMouseEnter={() => setActive(tile.industry)}>
        <img src={tile.image} alt="" loading="lazy" style={{ objectPosition: tile.pos }} />
      </Link>; })}
    </div></Reveal>
    <Reveal className="it-stats" delay={80}>
      <h2 className="it-heading" id="it-title">Industries we<br />TARGET</h2>
      <p className="it-lede">Each industry comes with one real number that shows the problem, or the gain from fixing it.</p>
      <ul className="it-list">{industries.map((item, i) => <li key={item.title}>
        <Link href={`/insights/${item.slug}`} className={`it-row${active === i ? ' is-active' : ''}`} style={{ '--tone': item.tone }} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
          <span className="it-badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[item.icon]}</svg></span>
          <strong className="it-stat">{item.stat}</strong>
          <span className="it-row-copy"><b>{item.title}</b><span>{item.label}</span><small>{item.fix}</small></span>
        </Link>
      </li>)}</ul>
    </Reveal>
    </>}
  </div></section>;
}
