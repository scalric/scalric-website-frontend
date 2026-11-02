'use client';
import React from 'react';
import { useRoles } from '../lib/roles.js';
import { Link, Eyebrow } from '../components/UI.jsx';
import { useMobile } from '../lib/useMobile.js';

const PAGE_SIZES = [5, 10, 20];
const FILTERS = [['location', 'Location', 'All locations'], ['team', 'Team', 'All teams'], ['workMode', 'Work mode', 'All work modes']];

function readParams(params) {
  const size = Number(params.get('size'));
  return {
    q: params.get('q') || '', location: params.get('location') || '', team: params.get('team') || '', workMode: params.get('mode') || '',
    sort: params.get('sort') === 'title' ? 'title' : 'newest', size: PAGE_SIZES.includes(size) ? size : 10, page: Math.max(1, Number(params.get('page')) || 1),
  };
}

function writeParams(state) {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  if (state.location) params.set('location', state.location);
  if (state.team) params.set('team', state.team);
  if (state.workMode) params.set('mode', state.workMode);
  if (state.sort !== 'newest') params.set('sort', state.sort);
  if (state.size !== 10) params.set('size', state.size);
  if (state.page > 1) params.set('page', state.page);
  const query = params.toString();
  window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
}

const unique = (roles, key) => [...new Set(roles.map((role) => role[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b));

export default function OpeningsPage({ search = '' }) {
  const { roles, loaded } = useRoles();
  const mobile = useMobile();
  const [state, setState] = React.useState(() => readParams(new URLSearchParams(search)));
  const update = (changes) => setState((current) => ({ ...current, page: 1, ...changes }));
  React.useEffect(() => writeParams(state), [state]);

  const results = React.useMemo(() => {
    const needle = state.q.trim().toLowerCase();
    const found = roles.filter((role) => (!needle || [role.title, role.team, role.location, role.workMode].some((value) => value.toLowerCase().includes(needle)))
      && (!state.location || role.location === state.location) && (!state.team || role.team === state.team) && (!state.workMode || role.workMode === state.workMode));
    return state.sort === 'title' ? [...found].sort((a, b) => a.title.localeCompare(b.title)) : found;
  }, [roles, state.q, state.location, state.team, state.workMode, state.sort]);

  const pages = Math.max(1, Math.ceil(results.length / state.size));
  const page = Math.min(state.page, pages);
  const start = (page - 1) * state.size;
  const visible = results.slice(start, start + state.size);
  const filtered = state.q || state.location || state.team || state.workMode;
  const options = { location: unique(roles, 'location'), team: unique(roles, 'team'), workMode: unique(roles, 'workMode') };
  const clear = () => update({ q: '', location: '', team: '', workMode: '' });
  const track = (slug) => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'careers_view_role_click', slug } }));

  return <main className="opn">
    {mobile && <img className="m-banner-photo" src="/assets/photos/careers-banner.webp" alt="" fetchPriority="high" decoding="async" />}
    <section className={`opn-hero${mobile ? ' opn-hero-m' : ''}`}><div className="container">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/careers/openings">Careers</Link><span>/</span><span>Open roles</span></div>
      <Eyebrow>OPEN OPPORTUNITIES</Eyebrow>
      <h1>Find your role</h1>
      <p>Search every current opening at Scalric. Filter by location, team or how you like to work, then apply in a few minutes.</p>
      <form className="opn-filters" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="opn-search"><span>Job title or keyword</span><input type="search" value={state.q} onChange={(event) => update({ q: event.target.value })} placeholder="Search roles" /></label>
        {FILTERS.map(([key, label, all]) => <label key={key}><span>{label}</span>
          <select value={state[key]} onChange={(event) => update({ [key]: event.target.value })}><option value="">{all}</option>{options[key].map((value) => <option key={value} value={value}>{value}</option>)}</select></label>)}
        <button type="button" className="button button-green opn-clear" onClick={clear} disabled={!filtered}>Clear all</button>
      </form>
    </div></section>

    <section className="opn-results"><div className="container">
      {!loaded ? <div className="opn-table opn-skeleton" aria-hidden="true">{[0, 1, 2, 3, 4].map((i) => <div key={i} className="opn-row"><span /><span /><span /><span /><span /></div>)}</div> : !roles.length ? <div className="opn-empty"><h2>No open roles right now</h2><p>We’re growing with intention. Tell us what you’d bring and we’ll be in touch.</p><Link href="/contact?intent=careers" className="button button-green">Express your interest</Link></div> : <>
        <div className="opn-bar" aria-live="polite">
          <p>{results.length ? <>Showing <b>{start + 1}–{start + visible.length}</b> of <b>{results.length}</b> {results.length === 1 ? 'role' : 'roles'}</> : 'No roles match your search'}</p>
          <div className="opn-controls">
            <label>Sort <select value={state.sort} onChange={(event) => update({ sort: event.target.value })}><option value="newest">Newest first</option><option value="title">Title A–Z</option></select></label>
            <label>Per page <select value={state.size} onChange={(event) => update({ size: Number(event.target.value) })}>{PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
          </div>
        </div>
        {filtered && <div className="opn-chips">{[['q', state.q, `“${state.q}”`], ['location', state.location, state.location], ['team', state.team, state.team], ['workMode', state.workMode, state.workMode]].filter(([, value]) => value).map(([key, , text]) =>
          <button key={key} type="button" onClick={() => update({ [key]: '' })} aria-label={`Remove filter ${text}`}>{text} <span aria-hidden="true">×</span></button>)}</div>}
        {results.length ? <div className="opn-table" role="table" aria-label="Open roles">
          <div className="opn-row opn-head" role="row"><span role="columnheader">Role</span><span role="columnheader">Location</span><span role="columnheader">Team</span><span role="columnheader">Work mode</span><span role="columnheader" /></div>
          {visible.map((role) => <div key={role.slug} className="opn-row" role="row">
            <Link href={`/careers/${role.slug}`} className="opn-title" onClick={() => track(role.slug)}><b>{role.title}</b></Link>
            <span data-label="Location" role="cell">{role.location || '—'}</span>
            <span data-label="Team" role="cell">{role.team || '—'}</span>
            <span data-label="Work mode" role="cell">{role.workMode || '—'}</span>
            <span className="opn-apply" role="cell"><Link href={`/careers/${role.slug}#apply`} className="button button-green" onClick={() => track(role.slug)}>Apply</Link></span>
          </div>)}
        </div> : <div className="opn-empty"><h2>No roles match your search</h2><p>Try removing a filter or searching for something broader.</p><button type="button" className="button button-green" onClick={clear}>Clear all filters</button></div>}
        {pages > 1 && <nav className="opn-pager" aria-label="Pagination">
          <button className="button" disabled={page <= 1} onClick={() => setState({ ...state, page: page - 1 })}>Previous</button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => <button key={number} className={`opn-page ${number === page ? 'on' : ''}`} aria-current={number === page ? 'page' : undefined} onClick={() => setState({ ...state, page: number })}>{number}</button>)}
          <button className="button" disabled={page >= pages} onClick={() => setState({ ...state, page: page + 1 })}>Next</button>
        </nav>}
      </>}
    </div></section>
  </main>;
}
