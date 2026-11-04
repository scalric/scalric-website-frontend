import React from 'react';
import { CountUp, Eyebrow } from './UI.jsx';
import { proofStats } from '../data/siteContent.js';
import { useMobile } from '../lib/useMobile.js';

// Each niche: [label, title, text, [three points]]. Copy is placeholder text; replace it with what Scalric will actually offer
const niches = [
  { id: 'ngo', name: 'NGOs', tag: 'FOR NGOs', cta: 'Apply as an NGO', type: 'ngo', goalMatch: /ngo/i, goalLabel: 'NGO goal',
    lead: 'Pro-bono technology work that helps mission-led organisations do more of what they set out to do',
    areas: [
      ['Donors & fundraising', 'Make giving simple', 'Clear donation pages and supporter records, so more of every contribution reaches the mission', ['Donation and campaign pages', 'Supporter and donor records', 'Automatic thank-you messages']],
      ['Programme tracking', 'Know what is working', 'Lightweight tools to record activity and outcomes without spreadsheets', ['Beneficiary and activity logs', 'Outcome tracking by programme', 'Shared team dashboards']],
      ['Volunteers', 'Coordinate people', 'Sign-ups, shifts and reminders that keep volunteers informed and engaged', ['Sign-up and shift planning', 'Reminders and updates', 'Hours and contribution tracking']],
      ['Reporting', 'Tell your story', 'Turn day-to-day data into clear reports for funders, boards and partners', ['Funder-ready reports', 'Visual impact summaries', 'One source of truth for data']],
    ] },
  { id: 'business', name: 'Local businesses', tag: 'FOR LOCAL BUSINESSES', cta: 'Apply as a business', type: 'business', goalMatch: /business/i, goalLabel: 'Business goal',
    lead: 'Discounted digital and SaaS support, so growing businesses can use good technology without the usual cost',
    areas: [
      ['Online presence', 'Be easy to find', 'A clear website and listings that turn local searches into enquiries', ['Simple, fast website', 'Online booking and enquiries', 'Local search visibility']],
      ['Customers', 'Know your customers', 'Keep every customer and conversation in one tidy place', ['Customer records', 'Offers and loyalty', 'Follow-up reminders']],
      ['Operations', 'Run with less effort', 'Replace paperwork and spreadsheets with a few dependable tools', ['Scheduling and staff rotas', 'Basic stock tracking', 'Invoices and payments']],
      ['Insights', 'See what is growing', 'Simple dashboards that show what is working this month', ['Easy sales dashboards', 'Monthly summaries', 'Growth tracking']],
    ] },
  { id: 'food', name: 'Restaurants & cafés', tag: 'FOR RESTAURANTS & CAFÉS', cta: 'Apply as a restaurant', type: 'business',
    lead: 'Tools that fill tables, speed up service and keep regulars coming back',
    areas: [
      ['Ordering', 'Make ordering effortless', 'Menus and ordering that work for dine-in, pickup and delivery', ['Online menu and ordering', 'QR ordering at the table', 'Delivery partner links']],
      ['Reservations', 'Fill every table', 'Bookings and waitlists that cut no-shows', ['Booking calendar', 'Waitlist management', 'Guest reminders']],
      ['Kitchen & stock', 'Keep service smooth', 'Clear orders for the kitchen and early warnings for stock', ['Order routing to the kitchen', 'Low-stock alerts', 'Waste tracking']],
      ['Loyalty', 'Reward regulars', 'Turn happy guests into repeat visits and good reviews', ['Rewards for regulars', 'Review requests', 'Seasonal offers']],
    ] },
  { id: 'wellness', name: 'Clinics & wellness', tag: 'FOR CLINICS & WELLNESS', cta: 'Apply as a clinic', type: 'business',
    lead: 'Calm, secure tools for dental and hair clinics, yoga studios and wellness practices',
    areas: [
      ['Appointments', 'Fewer missed visits', 'Easy booking with reminders that keep the diary full', ['Online appointment booking', 'SMS and email reminders', 'Rescheduling in one tap']],
      ['Patient records', 'Keep records safe', 'Secure notes and histories that are quick to find', ['Secure patient profiles', 'Treatment notes', 'Consent and forms']],
      ['Follow-ups', 'Care that continues', 'Check-ins after a visit that build trust and results', ['Post-visit messages', 'Treatment plans', 'Feedback requests']],
      ['Memberships', 'Support regulars', 'Class packs and memberships without manual tracking', ['Class schedules', 'Membership plans', 'Attendance tracking']],
    ] },
  { id: 'creative', name: 'Creative studios', tag: 'FOR CREATIVE STUDIOS', cta: 'Apply as a studio', type: 'business',
    lead: 'For artists, photographers, dancers and musicians: tools that let the work take centre stage',
    areas: [
      ['Portfolio', 'Show your best work', 'Beautiful, fast galleries that do your work justice', ['Portfolio and gallery pages', 'Shareable collections', 'Simple online store']],
      ['Bookings', 'Take bookings easily', 'Enquiries, packages and dates handled in one flow', ['Package pricing', 'Booking calendar', 'Enquiry follow-ups']],
      ['Client delivery', 'Delight your clients', 'Proofing and delivery that feel professional', ['Private client galleries', 'Proofing and approvals', 'Easy file delivery']],
      ['Payments', 'Get paid on time', 'Deposits, invoices and reminders handled for you', ['Deposits and invoices', 'Payment reminders', 'Simple income reports']],
    ] },
  { id: 'sports', name: 'Sports & fitness', tag: 'FOR SPORTS & FITNESS', cta: 'Apply as a club', type: 'business',
    lead: 'For gyms, football clubs and tennis academies: less admin, more time on the field and the floor',
    areas: [
      ['Memberships', 'Simplify sign-ups', 'Join, renew and pay online without paperwork', ['Online sign-up and renewals', 'Fee collection', 'Member check-ins']],
      ['Schedules', 'Keep everyone on time', 'Classes, courts and fixtures in one shared calendar', ['Class and court booking', 'Fixture planning', 'Coach schedules']],
      ['Team admin', 'Organise the squad', 'Rosters, availability and messages in one place', ['Rosters and availability', 'Team announcements', 'Attendance records']],
      ['Progress', 'Celebrate improvement', 'Track results that keep members motivated', ['Progress tracking', 'Goals and milestones', 'Member insights']],
    ] },
  { id: 'beauty', name: 'Salons & beauty', tag: 'FOR SALONS & BEAUTY', cta: 'Apply as a salon', type: 'business',
    lead: 'Booking and loyalty tools that keep chairs full and clients returning',
    areas: [
      ['Booking', 'Always-open booking', 'Clients book their own slot, any time of day', ['Online booking page', 'Service menus and pricing', 'Deposits for no-show control']],
      ['Stylists', 'Keep calendars clear', 'Every stylist’s day organised without double bookings', ['Stylist calendars', 'Break and leave planning', 'Walk-in management']],
      ['Loyalty', 'Bring clients back', 'Rewards and reminders for repeat visits', ['Visit rewards', 'Rebooking reminders', 'Birthday offers']],
      ['Products', 'Track what sells', 'Stock and retail sales kept simple', ['Product stock levels', 'Retail sales tracking', 'Reorder alerts']],
    ] },
  { id: 'home', name: 'Home services & design', tag: 'FOR HOME SERVICES & DESIGN', cta: 'Apply as a service business', type: 'business',
    lead: 'For interior designers, electricians and local trades: win the job, run the job, get paid',
    areas: [
      ['Quotes & jobs', 'Win more work', 'Fast, clear quotes that customers can approve online', ['Quote builder', 'Online approval', 'Job tracking']],
      ['Scheduling', 'Keep crews moving', 'Visits and routes organised so no day is wasted', ['Job calendar', 'Customer reminders', 'Team assignments']],
      ['Showcase', 'Show finished work', 'Before-and-after galleries that build trust', ['Project portfolio', 'Customer reviews', 'Shareable case pages']],
      ['Invoicing', 'Get paid faster', 'Invoices and payments that go out as soon as the job is done', ['Invoices on the spot', 'Payment links', 'Overdue reminders']],
    ] },
];

const barLevels = [[82, 64, 90], [70, 88, 60], [92, 66, 78], [64, 90, 76]];

/** One big rounded blue box per niche, with arrows to move between them and a rotating focus panel inside each. */
export default function NicheSpotlight() {
  const mobile = useMobile();
  const [niche, setNiche] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const current = niches[niche];
  const area = current.areas[active];
  const goal = current.goalMatch && proofStats.find((item) => current.goalMatch.test(item.label));

  React.useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setActive((index) => (index + 1) % current.areas.length), 5500);
    return () => clearInterval(timer);
  }, [paused, active, current]);

  const go = (index) => { setNiche(index); setActive(0); };
  const choose = () => {
    window.dispatchEvent(new CustomEvent('scalric:impact-type', { detail: { type: current.type } }));
    window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'impact_niche_cta_click', niche: current.id } }));
  };

  return <section className="imp-ngo" aria-label="Who the initiative supports, by niche"><div className="container">
    <div className="imp-niche-head"><Eyebrow>WHO WE SUPPORT</Eyebrow><h2>Technology for every<br />kind of mission</h2></div>
    <div className={`imp-niche-nav${mobile ? ' is-row' : ''}`} role="tablist" aria-label="Choose a niche">
      {niches.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === niche} className={index === niche ? 'on' : ''} onClick={(event) => { go(index); if (mobile) event.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); }}>{item.name}</button>)}
    </div>

    <div className="imp-ngo-box" key={current.id} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <span className="imp-ngo-blob one" aria-hidden="true" /><span className="imp-ngo-blob two" aria-hidden="true" />
      <div className="imp-ngo-copy">
        <span className="imp-ngo-tag">{current.tag}</span>
        <h2 className={current.name.length > 9 ? 'long' : ''}>{current.name}</h2>
        <p className="imp-ngo-lead">{current.lead}</p>
        <div className="imp-ngo-actions">
          <a href="#get-involved" className="imp-pill" onClick={choose}><span>{current.cta}</span><i aria-hidden="true">→</i></a>
          {goal && <div className="imp-ngo-goal"><b><CountUp value={goal.value} suffix={goal.suffix} immediate duration={2200} /></b><span>{current.goalLabel}</span></div>}
        </div>
      </div>
      <div className="imp-ngo-panel">
        <div className={`imp-ngo-tabs${mobile ? ' is-row' : ''}`} role="tablist" aria-label={`Ways we support ${current.name}`}>
          {current.areas.map(([label], index) => <button key={label} type="button" role="tab" aria-selected={index === active} className={index === active ? 'on' : ''} onClick={() => { setActive(index); setPaused(true); }}>{label}</button>)}
        </div>
        <div className="imp-ngo-card" key={`${current.id}-${area[0]}`} role="tabpanel">
          <h3>{area[1]}</h3>
          <p>{area[2]}</p>
          <ul>{area[3].map((point, index) => <li key={point}><span>{point}</span><i style={{ '--w': `${barLevels[active % barLevels.length][index]}%`, animationDelay: `${index * 120}ms` }} /></li>)}</ul>
        </div>
        <div className="imp-ngo-dots" aria-hidden="true">{current.areas.map(([label], index) => <i key={label} className={index === active ? 'on' : ''} />)}</div>
      </div>
    </div>
  </div></section>;
}
