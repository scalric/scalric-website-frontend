'use client';
import { usePathname as useNextPathname } from 'next/navigation';

/** Scrolls to an element id, retrying while lazy images and reveals above it settle and shift the layout. */
export function scrollToAnchor(id) {
  const find = () => document.getElementById(decodeURIComponent(id));
  [100, 800, 1700, 2800].forEach((delay, i) => window.setTimeout(() => {
    const el = find();
    if (!el) return;
    if (i === 0) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    const top = el.getBoundingClientRect().top;
    if (Math.abs(top - 110) > 40) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, delay));
}

// The Next.js router instance, registered by SiteShell so plain functions (not just hooks) can navigate.
let router = null;
export function registerRouter(instance) { router = instance; }

export function navigate(path) {
  const target = new URL(path, window.location.origin);
  const url = `${target.pathname}${target.search}${target.hash}`;
  const samePage = target.pathname === window.location.pathname;
  if (router) router.push(url, { scroll: false }); else window.location.assign(url);
  if (target.hash) {
    scrollToAnchor(target.hash.slice(1));
  } else if (samePage) {
    // Same page: glide back to the top. A different page starts at the top by itself once it has loaded (SiteShell),
    // so scrolling the page you are leaving first made the screen jump before the new one appeared.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export const usePathname = useNextPathname;
