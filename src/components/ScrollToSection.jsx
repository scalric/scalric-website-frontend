'use client';
import React from 'react';
import { scrollToAnchor } from '../lib/router.js';

/** Used by section routes such as /what-we-do/saas: shows the parent page, then brings the named section into view. */
export default function ScrollToSection({ id }) {
  React.useEffect(() => { scrollToAnchor(id); }, [id]);
  return null;
}
