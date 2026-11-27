'use client';
import React from 'react';
import { useRoles } from '../lib/roles.js';
import { RoleApplyForm } from '../components/Forms.jsx';
import { Link, Arrow, Eyebrow } from '../components/UI.jsx';
import { useMobile } from '../lib/useMobile.js';
import ScrollToSection from '../components/ScrollToSection.jsx';

const roleMeta = (role) => [role.team, role.location, role.workMode].filter(Boolean).join(' · ');

/** Renders the admin-written description: bullet lines (•, -, *) become lists, short lines before a list become headings, the rest are paragraphs. */
function RoleDescription({ text }) {
  const bullet = /^\s*[•\-*]\s+/;
  const root = React.useRef(null);
  const [armed, setArmed] = React.useState(false);
  // Fade sections in as they scroll into view. Content stays visible if IntersectionObserver is missing or motion is reduced.
  React.useEffect(() => {
    const nodes = root.current ? root.current.querySelectorAll('.role-section') : [];
    if (!nodes.length || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    setArmed(true);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } }), { threshold: 0.15 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [text]);
  return <div ref={root} className={armed ? 'role-flow armed' : 'role-flow'}>{renderBlocks(text, bullet)}</div>;
}

function renderBlocks(text, bullet) {
  return text.trim().split(/\n{2,}/).map((block, index) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    const items = lines.filter((line) => bullet.test(line));
    if (!items.length) return <p key={index}>{lines.join(' ')}</p>;
    const lead = lines.filter((line) => !bullet.test(line));
    return <div key={index} className="role-section">
      {lead.length > 0 && <h3>{lead.join(' ')}</h3>}
      <ul>{items.map((line, i) => <li key={i}>{line.replace(bullet, '')}</li>)}</ul>
    </div>;
  });
}

/** /careers/<slug>/apply: the exact same page as the role (full description on the left, Apply card on the right), reached by its own clean URL. */
export function RoleApplyPage({ slug }) {
  return <RoleDetailPage slug={slug} apply />;
}

export function RoleDetailPage({ slug, apply = false }) {
  const { roles: openRoles, loaded } = useRoles();
  const mobile = useMobile();
  const role = openRoles.find((entry) => entry.slug === slug);
  if (!loaded) return <main className="role-detail"><div className="container"><p>Loading…</p></div></main>;
  if (!role) return <section className="not-found"><Eyebrow>CAREERS</Eyebrow><h1>This role isn’t available yet</h1><p>Open roles will appear here once they’re confirmed.</p><Link href="/careers/openings" className="button button-green">View careers <Arrow /></Link></section>;
  return <main className="role-detail">{mobile && <img className="m-banner-photo" src="/assets/photos/careers-banner.webp" alt="" fetchPriority="high" decoding="async" />}<section className={`role-banner${mobile ? ' role-banner-m' : ''}`}><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/careers/openings">Careers</Link><span>/</span>{apply ? <><Link href={`/careers/${role.slug}`}>{role.title}</Link><span>/</span><span>Apply</span></> : <span>{role.title}</span>}</div><Eyebrow>{roleMeta(role)}</Eyebrow><h1>{role.title}</h1></div></section><div className="container role-body role-split"><div className="role-description"><Eyebrow>ABOUT THE ROLE</Eyebrow><ul className="role-facts" aria-label="Role details">{[['Team', role.team], ['Location', role.location], ['Work mode', role.workMode], ['Experience', (role.description.match(/\b\d+\s*[–-]\s*\d+\s*years?/i) || [''])[0]]].filter(([, value]) => value).map(([label, value]) => <li key={label}><span>{label}</span><b>{value}</b></li>)}</ul><RoleDescription text={role.description} />{!apply && <Link href={`/careers/${role.slug}/apply`} className="button button-green role-apply-cta">Apply now <Arrow /></Link>}</div><div className="role-apply-card" id="apply"><Eyebrow>APPLY</Eyebrow><h2>Apply for {role.title}</h2><p>Tell us a little about yourself. Your application goes straight to the Scalric team.</p><RoleApplyForm role={role} /></div></div>
    {apply && mobile && <ScrollToSection id="apply" />}
  </main>;
}
