'use client';
import React from 'react';
import SplitHero from '../components/SplitHero.jsx';
import { Link, Arrow, Eyebrow, PageIntro, Reveal, TypedText } from '../components/UI.jsx';
import { processSteps, workingPrinciples } from '../data/siteContent.js';

const principles = [
  ['Start with the problem', 'Understand the market, people and operating context before choosing a solution.', '/assets/photos/principle-start.webp'],
  ['Connect the disciplines', 'Bring business thinking and technology into one clear path from intent to implementation.', '/assets/photos/principle-connect.webp'],
  ['Build with care', 'Design for the people who will use, run and evolve what we put into the world.', '/assets/photos/principle-care.webp'],
];

export default function CompanyPage() {
  return <><SplitHero art="team" title={<>A wider view<TypedText phrases={["A clearer way forward","A sharper focus","A stronger foundation"]}/></>} text="Scalric is a technology-and-consulting organization that studies problems and opportunities across industries, then brings SaaS, AI, data and automation together around measurable business and social impact." />
    <main><section className="company-statement"><div className="container"><ol className="why-list">{[["01", "Senior attention", "Senior people on the work from start to finish."], ["02", "Modern, not legacy", "Current tools, chosen for the problem."], ["03", "Visible progress", "Clear milestones, so you always know what’s next."], ["04", "Plain-English updates", "Regular reviews, with no jargon."], ["05", "Partnership, not lock-in", "We earn continued work by adding value."], ["06", "You own the outcome", "Code, data and content handed over to you."]].map(([n,t,x],i)=><Reveal key={n} delay={i*50}><li className="why-item"><span className="why-num">{n}</span><div><h3>{t}</h3><p>{x}</p></div></li></Reveal>)}</ol></div></section>
    <section className="section process-section" id="process"><div className="container"><div className="section-heading"><div><Eyebrow>HOW WE WORK</Eyebrow><h2>From question<br/><span className="text-muted">to measurable outcome</span></h2></div><p className="section-lead">A clear, repeatable path that keeps every engagement accountable.</p></div><div className="process-track" role="list">{processSteps.map(([title,text],i)=><Reveal key={title} delay={i*60}><div className="process-step" role="listitem"><span className="process-num">{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div></section>
    <section className="company-manifesto"><div className="container manifesto-inner"><Reveal className="mf-block"><Eyebrow light>WHAT WE’RE BUILDING TOWARD</Eyebrow><h2><span className="mf-l1">Better questions</span><span className="mf-l2">Better possibilities</span></h2><p>We’re building a company for people who want to take on complex problems with curiosity, craft and a sense of responsibility for what comes next.</p><Link href="/careers" className="btn-talk"><span>Build with us</span><i aria-hidden="true">→</i></Link></Reveal></div></section>
    </main></>;
}
