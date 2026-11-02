import React from 'react';
import { apiUrl } from './api.js';
import { sampleRoles } from '../data/sampleRoles.js';

let cache = null;

// Shown when the API is unreachable (static hosting), so the openings page still lists the starter roles.
const fallbackRoles = sampleRoles.map(([slug, title, team, location, workMode, description]) => ({ slug, title, team, location, workMode, description }));

let inflight = null;

/** Fetches the roles once and shares the request, so every caller (and the early prefetch from the header) uses the same one. */
function fetchRoles() {
  if (!inflight) {
    inflight = fetch(apiUrl('/api/roles'))
      .then((response) => (response.ok ? response.json() : { items: fallbackRoles }))
      .catch(() => ({ items: fallbackRoles }))
      .then((data) => { cache = data.items; return cache; })
      .finally(() => { window.setTimeout(() => { inflight = null; }, 30000); });
  }
  return inflight;
}

/** Warms the roles cache as soon as the site opens, so the openings page already has them when you get there. */
export function prefetchRoles() { if (!cache) fetchRoles(); }

/** Published roles from the admin-managed API; starter roles if the API is unreachable. Shows cached roles instantly and refreshes quietly. */
export function useRoles() {
  const [state, setState] = React.useState({ roles: cache || [], loaded: Boolean(cache) });
  React.useEffect(() => {
    let active = true;
    fetchRoles().then((items) => { if (active) setState({ roles: items, loaded: true }); });
    return () => { active = false; };
  }, []);
  return state;
}
