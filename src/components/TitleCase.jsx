'use client';
import React from 'react';

// Small connecting words stay lower case inside titles and headings: "Talk to Us", "Data and Analytics".
const SMALL = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'so', 'yet', 'as', 'at', 'by', 'in', 'of', 'on', 'to', 'via', 'with', 'from', 'into', 'per', 'vs', 'if']);
const SKIP = 'script,style,noscript,textarea,input,select,option,svg,.adm-root,[data-no-titlecase]';
const TEXT_PARENTS = 'h1,h2,h3,h4,h5,h6,p,li,a,button,label,span,small,b,strong,em,td,th,dt,dd,blockquote,figcaption,summary,legend';
const BLOCKS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'DIV', 'SECTION', 'TD', 'TH', 'DT', 'DD', 'A', 'BUTTON', 'LABEL', 'FIGCAPTION', 'BLOCKQUOTE', 'SUMMARY', 'LEGEND', 'ARTICLE', 'HEADER', 'FOOTER', 'MAIN', 'NAV', 'UL', 'OL']);

const blockOf = (el) => { let e = el; while (e && !BLOCKS.has(e.tagName)) e = e.parentElement; return e; };

/** True when no text comes before this node inside its block, so its first word is the start of a title. */
function startsBlock(node, walker) {
  walker.currentNode = node;
  let prev = walker.previousNode();
  while (prev && !prev.data.trim()) prev = walker.previousNode();
  return !prev || blockOf(prev.parentElement) !== blockOf(node.parentElement);
}

export function titleCase(text, atStart) {
  if (!/[a-z]/.test(text)) return text; // all-caps labels stay as they are
  const parts = text.split(/([\s\-–—/]+)/);
  let first = atStart;
  for (let i = 0; i < parts.length; i += 2) {
    const word = parts[i];
    const at = word.search(/[A-Za-z]/);
    if (at === -1) continue;
    const core = word.replace(/[^A-Za-z]/g, '').toLowerCase();
    const lower = SMALL.has(core) && !first;
    const letter = lower ? word[at].toLowerCase() : word[at].toUpperCase();
    parts[i] = word.slice(0, at) + letter + word.slice(at + 1);
    first = /[.!?:]$/.test(word);
  }
  return parts.join('');
}

/** Applies title case with lower-case connectors to all site text, on desktop and mobile alike, including text that React adds later. */
export default function TitleCase() {
  React.useEffect(() => {
    const root = document.body;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const fix = (node) => {
      const parent = node.parentElement;
      if (!parent || !node.data.trim() || parent.closest(SKIP) || !parent.closest(TEXT_PARENTS)) return;
      const next = titleCase(node.data, startsBlock(node, walker));
      if (next !== node.data) node.data = next;
    };
    const fixTree = (start) => {
      if (start.nodeType === 3) return fix(start);
      if (start.nodeType !== 1) return;
      const inner = document.createTreeWalker(start, NodeFilter.SHOW_TEXT);
      const list = [];
      while (inner.nextNode()) list.push(inner.currentNode);
      list.forEach(fix);
    };
    fixTree(root);
    document.documentElement.classList.add('tc-ready');
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === 'characterData') fix(record.target);
        else record.addedNodes.forEach(fixTree);
      });
    });
    observer.observe(root, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
