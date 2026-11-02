'use client';
import React from 'react';
import { useRoles } from '../lib/roles.js';
import { RoleApplyForm } from '../components/Forms.jsx';
import { Link, Arrow, Eyebrow } from '../components/UI.jsx';
import { useMobile } from '../lib/useMobile.js';

const roleMeta = (role) => [role.team, role.location, role.workMode].filter(Boolean).join(' · ');

export function RoleDetailPage({ slug }) {
  const { roles: openRoles, loaded } = useRoles();
  const mobile = useMobile();
  const role = openRoles.find((entry) => entry.slug === slug);
  if (!loaded) return <main className="role-detail"><div className="container"><p>Loading…</p></div></main>;
  if (!role) return <section className="not-found"><Eyebrow>CAREERS</Eyebrow><h1>This role isn’t available yet</h1><p>Open roles will appear here once they’re confirmed.</p><Link href="/careers/openings" className="button button-green">View careers <Arrow /></Link></section>;
  return <main className="role-detail">{mobile && <img className="m-banner-photo" src="/assets/photos/careers-banner.webp" alt="" fetchPriority="high" decoding="async" />}<section className={`role-banner${mobile ? ' role-banner-m' : ''}`}><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/careers/openings">Careers</Link><span>/</span><span>{role.title}</span></div><Eyebrow>{roleMeta(role)}</Eyebrow><h1>{role.title}</h1></div></section><div className="container role-body role-split"><div className="role-description"><Eyebrow>ABOUT THE ROLE</Eyebrow>{role.description.split(/\n{2,}/).map((block, index) => <p key={index}>{block}</p>)}</div><div className="role-apply-card" id="apply"><Eyebrow>APPLY</Eyebrow><h2>Apply for {role.title}</h2><p>Tell us a little about yourself. Your application goes straight to the Scalric team.</p><RoleApplyForm role={role} /></div></div>
  </main>;
}
