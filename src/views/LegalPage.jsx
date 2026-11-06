'use client';
import React from 'react';
import { PageIntro } from '../components/UI.jsx';
import { legalPages } from '../data/legalPages.js';

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** **bold** lead-ins and [bracketed] placeholders (highlighted so they are easy to find before launch). */
function Inline({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return part.split(/(\[[^\]]+\])/g).map((bit, j) => bit.startsWith('[') ? <mark key={`${i}-${j}`}>{bit}</mark> : bit);
  });
}

function Block({ b }) {
  if (b.t === 'h3') return <h3>{b.x}</h3>;
  if (b.t === 'ul') return <ul>{b.items.map((item, j) => <li key={j}><Inline text={item} /></li>)}</ul>;
  if (b.t === 'table') {
    const [head, ...rows] = b.rows;
    return <div className="legal-table" tabIndex={0}><table><thead><tr>{head.map((c, j) => <th key={j} scope="col"><Inline text={c} /></th>)}</tr></thead><tbody>{rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}><Inline text={c} /></td>)}</tr>)}</tbody></table></div>;
  }
  return <p><Inline text={b.x} /></p>;
}

/** Splits the page into an intro plus one section per heading (annexes get their own section). */
function toSections(blocks) {
  const intro = [];
  const sections = [];
  blocks.forEach((b) => {
    if (b.t === 'h2' || (b.t === 'h3' && /^Annex/.test(b.x))) sections.push({ title: b.x, id: slugify(b.x), blocks: [] });
    else (sections.length ? sections[sections.length - 1].blocks : intro).push(b);
  });
  return { intro, sections };
}

export default function LegalPage({ slug }) {
  const page = legalPages.find((p) => p.slug === slug);
  const { intro, sections } = React.useMemo(() => toSections(page.blocks), [page]);
  const [open, setOpen] = React.useState(() => new Set([0]));
  const allOpen = open.size === sections.length;
  const toggle = (i) => setOpen((prev) => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; });
  // Opens the section a link like /dpa#annex-3-authorised-sub-processors points at.
  React.useEffect(() => {
    const id = window.location.hash.slice(1);
    const at = sections.findIndex((s) => s.id === id);
    if (at >= 0) {
      setOpen((prev) => new Set(prev).add(at));
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
  }, [sections]);
  return <>
    <PageIntro eyebrow="LEGAL AND TRUST" title={page.title} text={page.meta} className="legal-intro" />
    <main><section className="legal-section"><div className="container">
      <div className="legal-body">
        {intro.map((b, i) => <Block key={i} b={b} />)}
        <div className="legal-toolbar"><span>{sections.length} sections</span><button type="button" onClick={() => setOpen(allOpen ? new Set() : new Set(sections.map((_, i) => i)))}>{allOpen ? 'Collapse all' : 'Expand all'}</button></div>
        {sections.map((s, i) => {
          const isOpen = open.has(i);
          return <div className={`legal-item${isOpen ? ' is-open' : ''}`} key={s.id} id={s.id}>
            <h2><button type="button" id={`${s.id}-btn`} aria-expanded={isOpen} aria-controls={`${s.id}-panel`} onClick={() => toggle(i)}><span>{s.title}</span><i aria-hidden="true" /></button></h2>
            <div className="legal-panel" id={`${s.id}-panel`} role="region" aria-labelledby={`${s.id}-btn`}><div><div className="legal-panel-inner">{s.blocks.map((b, j) => <Block key={j} b={b} />)}</div></div></div>
          </div>;
        })}
      </div>
    </div></section></main>
  </>;
}
