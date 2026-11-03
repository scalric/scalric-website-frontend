import React from 'react';
import { buyerCountries, buyerMarkets, buyerPersonas, personaReads } from '../data/research.js';
import { Eyebrow, Link, Reveal } from './UI.jsx';
import { Count, ReadLink, Ring } from './ResearchViz.jsx';

// Persona market labels use short codes; buyerCountries uses full names.
const fullName = { India: 'India', US: 'United States', UK: 'United Kingdom', Canada: 'Canada' };
const marketsOf = (label) => label.startsWith('All') ? buyerCountries : label.split(' · ').map((code) => fullName[code]);

/** Arrow keys move between tabs in a tablist; `step` keys differ for vertical and horizontal lists. */
const arrowNav = (keys, count, current, pick) => (event) => {
  const step = keys[event.key];
  if (!step) return;
  event.preventDefault();
  const next = (current + step + count) % count;
  pick(next);
  event.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus();
};

/** Industries page: one explorer. Pick a buyer, see their pain, first offer and how we approach each market. */
export default function BuyerSection() {
  const [persona, setPersona] = React.useState(0);
  const [country, setCountry] = React.useState(0);
  const [role, markets, quote, stat, label, offer] = buyerPersonas[persona];
  const focus = marketsOf(markets);
  const track = (detail) => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail }));
  const pickPersona = (i) => {
    setPersona(i);
    const list = marketsOf(buyerPersonas[i][1]);
    if (!list.includes(buyerCountries[country])) setCountry(buyerCountries.indexOf(list[0]));
    track({ event: 'persona_pick', persona: buyerPersonas[i][0] });
  };
  const pickCountry = (i) => { setCountry(i); track({ event: 'market_tab', country: buyerCountries[i] }); };
  return <section className="section rs-buyers" id="who-buys"><div className="container">
    <Reveal className="rs-head">
      <Eyebrow>WHO WE HELP</Eyebrow>
      <h2>Owner-led businesses that already invest in growth</h2>
      <p>Teams of 5–200 who pay for ads, delivery apps or booking sites and still lose leads. Pick a buyer to see how we would start.</p>
    </Reveal>
    <Reveal className="rs-explorer">
      <div className="rs-who" role="tablist" aria-orientation="vertical" aria-label="Buyer" onKeyDown={arrowNav({ ArrowDown: 1, ArrowUp: -1, ArrowRight: 1, ArrowLeft: -1 }, buyerPersonas.length, persona, pickPersona)}>
        {buyerPersonas.map(([name, where], i) => <button key={name} type="button" role="tab" aria-selected={persona === i} tabIndex={persona === i ? 0 : -1} className="rs-who-tab" onClick={() => pickPersona(i)}>
          <b>{name}</b><small>{where}</small>
        </button>)}
      </div>
      <div className="rs-detail">
        <div className="rs-detail-top" key={persona}>
          <q>{quote}</q>
          <div className="rs-persona-stat"><Ring percent={parseFloat(stat)} size={72}><strong><Count value={stat} /></strong></Ring><div><small>{label}</small><ReadLink slug={personaReads[persona]} from="buyer" short /></div></div>
          <Link className="rs-offer" href="/contact"><span><em>First offer</em>{offer}</span><i aria-hidden="true">→</i></Link>
        </div>
        <div className="rs-detail-markets">
          <div className="rs-tabs" role="tablist" aria-label="Country" onKeyDown={arrowNav({ ArrowRight: 1, ArrowLeft: -1 }, buyerCountries.length, country, pickCountry)}>
            {buyerCountries.map((name, i) => <button key={name} type="button" role="tab" aria-selected={country === i} tabIndex={country === i ? 0 : -1} className={`rs-tab${focus.includes(name) ? '' : ' is-off'}`} onClick={() => pickCountry(i)}>{name}</button>)}
          </div>
          <dl className="rs-market-list" role="tabpanel" key={country}>{buyerMarkets.map((row, i) => <div key={row[0]} style={{ '--i': i }}>
            <dt>{row[0]}</dt><dd>{row[country + 1]}</dd>
          </div>)}</dl>
          {!focus.includes(buyerCountries[country]) && <p className="rs-hint">Not a focus market for the {role.toLowerCase()}.</p>}
        </div>
      </div>
    </Reveal>
    <p className="rs-note">Law names are pointers only, not legal advice.</p>
  </div></section>;
}
