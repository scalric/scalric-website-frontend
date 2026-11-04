import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from './UI.jsx';
import { impactIndustries, impactSteps, impactKey } from '../data/impactIndustries.js';

const FOCUSABLE = 'a[href],button:not([disabled]),video[controls],[tabindex]:not([tabindex="-1"])';

/** Video for the open industry. Remounts per industry so it starts fresh; respects reduced motion by not autoplaying. */
function DetailVideo({ item }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video.play?.().catch(() => {});
  }, []);
  return <video ref={ref} className="imd-video" src={item.video} poster={item.thumb} muted loop playsInline controls preload="auto"
    aria-label={`Video: ${item.title}`} />;
}

function Copy({ item, copy, titleId }) {
  return <>
    <p className="imd-tag">{item.tag}</p>
    <h2 className="imd-title" id={titleId}>{copy.headline}</h2>
    <p className="imd-industry">For {item.title.toLowerCase()}</p>
    <p className="imd-lead">{copy.lead}</p>
    <h3 className="imd-label">What we would build with you</h3>
    <ol className="imd-build">{copy.build.map(([title, text], index) => <li key={title}>
      <span className="imd-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div><b>{title}</b><p>{text}</p></div>
    </li>)}</ol>
    <h3 className="imd-label">What gets easier</h3>
    <ul className="imd-easier">{copy.easier.map((line) => <li key={line}>{line}</li>)}</ul>
  </>;
}

function Steps() {
  return <div className="imd-steps">
    <h3 className="imd-label">How it starts</h3>
    <ol>{impactSteps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span><p>{step}</p></li>)}</ol>
  </div>;
}

const Chevron = ({ flip }) => <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Close = () => <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>;

/**
 * Detail view for one Scalric Impact card: an accessible modal with the industry's video and how Scalric can help.
 * Phones get a full-height bottom sheet, larger screens a two-column dialog. `mobile` comes from the parent so the
 * layout is right on the first frame.
 */
export default function ImpactDetail({ items, index, onChange, onClose, mobile }) {
  const dialogRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const item = items[index];
  const copy = impactIndustries[impactKey(item.video)];
  const count = items.length;
  const prev = items[(index - 1 + count) % count];
  const next = items[(index + 1) % count];
  const go = React.useCallback((step) => onChange((index + step + count) % count), [index, count, onChange]);
  const titleId = 'imd-title';

  // focus in on open, restore on close, lock page scroll underneath
  React.useEffect(() => {
    const opener = document.activeElement;
    const { overflow } = document.body.style;
    const { overflow: htmlOverflow } = document.documentElement.style;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      document.documentElement.style.overflow = htmlOverflow;
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  // keep the content pane at the top when switching industry
  React.useEffect(() => { dialogRef.current?.querySelectorAll('.imd-scroll').forEach((el) => { el.scrollTop = 0; }); }, [index]);

  // keys are handled on the document so they still work after a click on plain text inside the dialog
  const onKeyDown = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
    const inMedia = event.target.closest?.('video,input,textarea,select');
    if (!inMedia && !event.altKey && !event.metaKey && !event.ctrlKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) { event.preventDefault(); go(event.key === 'ArrowRight' ? 1 : -1); return; }
    if (event.key === 'Tab') {
      const dialog = dialogRef.current;
      const nodes = [...dialog.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const inside = dialog.contains(document.activeElement) && document.activeElement !== dialog;
      if (event.shiftKey && (!inside || document.activeElement === first)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (!inside || document.activeElement === last)) { event.preventDefault(); first.focus(); }
    }
  };
  const keyRef = React.useRef(onKeyDown);
  keyRef.current = onKeyDown;
  React.useEffect(() => {
    const listener = (event) => keyRef.current(event);
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);

  if (!copy) return null;

  const position = <span className="imd-count" aria-live="polite">{index + 1} / {count}</span>;
  const closeButton = <button type="button" ref={closeRef} className="imd-close" onClick={onClose} aria-label="Close"><Close /></button>;
  const cta = <Link href="/contact?intent=impact" className="imd-cta" onClick={onClose}>Talk to us <span aria-hidden="true">→</span></Link>;
  // Round previous / next arrows, the same on phones and larger screens
  const prevBtn = <button type="button" className="imd-step-btn" onClick={() => go(-1)} aria-label={`Previous industry: ${prev.title}`}><Chevron flip /></button>;
  const nextBtn = <button type="button" className="imd-step-btn" onClick={() => go(1)} aria-label={`Next industry: ${next.title}`}><Chevron /></button>;

  const body = mobile
    ? <div className="imd-sheet" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex="-1">
      <div className="imd-sheet-head"><span className="imd-grip" aria-hidden="true" />{position}{closeButton}</div>
      <div className="imd-sheet-media"><DetailVideo key={item.video} item={item} /></div>
      <div className="imd-scroll imd-sheet-scroll">
        <Copy item={item} copy={copy} titleId={titleId} />
        <Steps />
      </div>
      <div className="imd-sheet-foot">
        {prevBtn}
        {cta}
        {nextBtn}
      </div>
    </div>
    : <div className="imd-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex="-1">
      <div className="imd-media">
        <div className="imd-media-frame"><DetailVideo key={item.video} item={item} /></div>
        <Steps />
      </div>
      <div className="imd-content">
        <div className="imd-content-head">{position}{closeButton}</div>
        <div className="imd-scroll"><Copy item={item} copy={copy} titleId={titleId} /></div>
        <div className="imd-content-foot">{prevBtn}{cta}{nextBtn}</div>
      </div>
    </div>;

  return createPortal(<div className={`imd-root ${mobile ? 'is-mobile' : 'is-desktop'}`}>
    <div className="imd-backdrop" onClick={onClose} aria-hidden="true" />
    {body}
  </div>, document.body);
}
