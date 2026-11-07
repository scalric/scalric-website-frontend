'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { usePathname, scrollToAnchor, registerRouter } from '../lib/router.js';
import { autoReveal } from '../lib/autoReveal.js';

const scrollPositions = new Map();
let cameBack = false;

/** Header, footer and the per-navigation behaviour (scroll reset, reveals, article scroll analytics) around every public page. */
export default function SiteShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  registerRouter(router);
  // Remember where each page was scrolled to, so Back/Forward returns to that spot (for example the footer) instead of the top.
  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const save = () => scrollPositions.set(window.location.pathname, window.scrollY);
    const onPop = () => { cameBack = true; };
    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('popstate', onPop);
    return () => { window.removeEventListener('scroll', save); window.removeEventListener('popstate', onPop); };
  }, []);
  React.useEffect(() => {
    const back = cameBack;
    cameBack = false;
    if (!back) {
      if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }
    // Back/Forward: jump (never glide) to the saved position, re-checking while images and reveals settle, unless the visitor scrolls first.
    const target = scrollPositions.get(window.location.pathname) ?? 0;
    let cancelled = false;
    const cancel = () => { cancelled = true; };
    ['wheel', 'touchstart', 'keydown'].forEach((type) => window.addEventListener(type, cancel, { passive: true, once: true }));
    const timers = [0, 80, 250, 600, 1200, 2200].map((ms) => window.setTimeout(() => {
      if (!cancelled && Math.abs(window.scrollY - target) > 4) window.scrollTo({ top: target, behavior: 'instant' });
    }, ms));
    return () => { timers.forEach(window.clearTimeout); ['wheel', 'touchstart', 'keydown'].forEach((type) => window.removeEventListener(type, cancel)); };
  }, [pathname]);
  React.useEffect(() => {
    // autoReveal edits server-rendered elements directly, so it waits until the page has loaded and hydrated.
    let stop = () => {};
    let timer = 0;
    const start = () => { timer = window.setTimeout(() => { stop = autoReveal(); }, 600); };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
    return () => { window.removeEventListener('load', start); window.clearTimeout(timer); stop(); };
  }, [pathname]);
  React.useEffect(() => {
    if (window.location.hash) scrollToAnchor(window.location.hash.slice(1));
  }, []);
  React.useEffect(() => {
    if (!pathname.startsWith('/insights/')) return undefined;
    const sent = new Set();
    const reportDepth = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.floor((window.scrollY / scrollable) * 100);
      [25, 50, 75, 90].forEach((threshold) => {
        if (depth >= threshold && !sent.has(threshold)) {
          sent.add(threshold);
          window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'article_scroll_depth', depth: threshold } }));
        }
      });
    };
    window.addEventListener('scroll', reportDepth, { passive: true });
    reportDepth();
    return () => window.removeEventListener('scroll', reportDepth);
  }, [pathname]);
  return <div className="app-shell" id="top"><Header currentPath={pathname} />{children}<Footer /></div>;
}
