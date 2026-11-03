'use client';
import { useEffect } from 'react';

const SELECTOR = 'p,li,blockquote,dd,figcaption';
const MAX_GAP_EM = 0.5; // a normal word space is about 0.25em

/** Largest gap between neighbouring words on a (non-final) line of the element, in px. */
function widestGap(el) {
  const lines = {};
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let node;
  while ((node = walker.nextNode())) {
    const re = /\S+/g;
    let m;
    while ((m = re.exec(node.textContent))) {
      range.setStart(node, m.index);
      range.setEnd(node, m.index + m[0].length);
      const box = range.getClientRects()[0];
      if (box) (lines[Math.round(box.top / 4)] ||= []).push(box);
    }
  }
  const keys = Object.keys(lines).sort((a, b) => a - b);
  let max = 0;
  keys.slice(0, -1).forEach((key) => {
    const line = lines[key].sort((a, b) => a.left - b.left);
    for (let i = 1; i < line.length; i += 1) max = Math.max(max, line[i].left - line[i - 1].right);
  });
  return max;
}

function check() {
  const vh = window.innerHeight;
  document.querySelectorAll(SELECTOR).forEach((el) => {
    // Only measure blocks near the viewport; the rest are checked when scrolled into range.
    const r = el.getBoundingClientRect();
    if (r.bottom < -vh || r.top > vh * 2) return;
    if (!el.textContent || el.textContent.trim().length < 25) return;
    el.classList.remove('no-justify');
    const cs = getComputedStyle(el);
    if (cs.textAlign !== 'justify') return;
    if (widestGap(el) > parseFloat(cs.fontSize) * MAX_GAP_EM) el.classList.add('no-justify');
  });
}

/** Keeps justified copy free of stretched word gaps on every screen size by left-aligning any block that would show them. */
export default function GapGuard() {
  useEffect(() => {
    let timer = 0;
    const schedule = () => { clearTimeout(timer); timer = window.setTimeout(() => (window.requestIdleCallback || window.setTimeout)(check), 800); };
    schedule();
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    document.fonts?.ready.then(schedule);
    return () => { clearTimeout(timer); window.removeEventListener('resize', schedule); window.removeEventListener('scroll', schedule); observer.disconnect(); };
  }, []);
  return null;
}
