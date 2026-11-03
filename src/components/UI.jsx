import React from 'react';
import { navigate } from '../lib/router.js';

export function Link({ href, children, className, onClick, ...props }) {
  return <a href={href} className={className} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (href?.startsWith('/') && !href.startsWith('//')) {
      event.preventDefault();
      navigate(href);
    }
  }} {...props}>{children}</a>;
}

export function Arrow({ diagonal = false }) {
  if (diagonal) return null;
  return <span className="arrow" aria-hidden="true">→</span>;
}

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) {
      element?.classList.add('is-visible');
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>{children}</div>;
}

export function Eyebrow({ children, light = false }) {
  return <span className={`eyebrow${light ? ' eyebrow-light' : ''}`}><i />{children}</span>;
}

export function PageIntro({ eyebrow, title, text, dark = false, className = '' }) {
  return <section className={`page-intro${dark ? ' page-intro-dark' : ''}${className ? ` ${className}` : ''}`}>
    <div className="container page-intro-inner"><Eyebrow light={dark}>{eyebrow}</Eyebrow>
      <h1>{title}</h1><p>{text}</p></div>
  </section>;
}

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


export function useInView(options = { threshold: 0.3 }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (!('IntersectionObserver' in window)) { setSeen(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); observer.disconnect(); }
    }, options);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, seen];
}
export function CountUp({ value, suffix = '', prefix = '', duration = 1800, immediate = false }) {
  const [ref, inView] = useInView();
  const seen = immediate || inView;
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    if (!seen) return undefined;
    if (prefersReducedMotion()) { setDisplay(value); return undefined; }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, value, duration]);
  return <span ref={ref} className="count-up" aria-label={`${prefix}${value.toLocaleString()}${suffix}`}><span aria-hidden="true">{prefix}{display.toLocaleString()}{suffix}</span></span>;
}

export function SplitHeading({ as: Tag = 'h2', lines, accent, className = '', startDelay = 0 }) {
  let n = 0;
  return <Tag className={`split-heading ${className}`}>
    {lines.map((line, li) => <span className={`split-line${accent === li ? ' is-accent' : ''}`} key={li}>
      {line.split(' ').map((word) => <span className="split-word" key={`${li}-${word}-${n}`}><span style={{ '--i': n++ + startDelay }}>{word}&nbsp;</span></span>)}
    </span>)}
  </Tag>;
}

export function Parallax({ children, speed = 0.12, className = '' }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [speed]);
  return <div ref={ref} className={`parallax ${className}`}>{children}</div>;
}

export function Visual({ src, alt = '', variant = 1, className = '', children }) {
  return <div className={`visual ${className}`}>
    {src ? <img src={src} alt={alt} loading="lazy" decoding="async" /> : <div className={`abstract-art abstract-${variant}`} aria-hidden="true"><i /><i /><i /></div>}
    {children}
  </div>;
}


export function useScrolled(offset = 40) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}

/** Static headline line: renders the first phrase, with no typing animation. */
export function TypedText({ phrases, className = '' }) {
  return <span className={`typed ${className}`}>{phrases[0]}</span>;
}
