import React from 'react';
import { researchSources } from '../data/research.js';
import { Link } from './UI.jsx';

const WEEKS_PER_MONTH = 52 / 12;
const NEVER_CALL_BACK = 0.85; // CallRail 2025: callers who get no answer and never call back

// Slider ranges and starting points are illustrative, so each one is labelled as the visitor's own estimate.
const CURRENCIES = {
  inr: { label: '₹ India', locale: 'en-IN', code: 'INR', value: { min: 500, max: 50000, step: 500, start: 5000 }, round: 100 },
  usd: { label: '$ US · UK · Canada', locale: 'en-US', code: 'USD', value: { min: 50, max: 5000, step: 50, start: 300 }, round: 10 },
};

const track = (event) => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event } }));

function Slider({ id, label, shown, min, max, step, value, onChange }) {
  return <div className="rs-calc-field">
    <label htmlFor={id}><span>{label}</span><output htmlFor={id}>{shown}</output></label>
    <input id={id} type="range" min={min} max={max} step={step} value={value} aria-valuetext={shown}
      style={{ '--p': `${(value - min) / (max - min) * 100}%` }} onChange={(event) => onChange(Number(event.target.value))} />
  </div>;
}

/** Overview tool: turns the "85% of unanswered callers never call back" figure into a monthly loss for the visitor's own numbers. Runs in the browser only. */
export default function MissedCallCalculator() {
  const [currency, setCurrency] = React.useState('inr');
  const [calls, setCalls] = React.useState(10);
  const [booking, setBooking] = React.useState(50);
  const [jobValue, setJobValue] = React.useState(CURRENCIES.inr.value.start);
  const cur = CURRENCIES[currency];
  const money = (amount) => new Intl.NumberFormat(cur.locale, { style: 'currency', currency: cur.code, maximumFractionDigits: 0 }).format(Math.round(amount / cur.round) * cur.round);
  const monthly = calls * WEEKS_PER_MONTH * NEVER_CALL_BACK * (booking / 100) * jobValue;
  const pick = (next) => { setCurrency(next); setJobValue(CURRENCIES[next].value.start); };
  return <div className="rs-calc">
    <div className="rs-calc-in">
      <div className="rs-calc-head">
        <span className="rs-calc-eyebrow">TRY IT WITH YOUR NUMBERS</span>
        <h3>What could missed calls be costing you?</h3>
      </div>
      <div className="rs-calc-cur" role="group" aria-label="Currency">
        {Object.entries(CURRENCIES).map(([key, { label }]) => <button key={key} type="button" aria-pressed={currency === key} onClick={() => pick(key)}>{label}</button>)}
      </div>
      <Slider id="calc-calls" label="Calls you miss each week" shown={calls} min={1} max={100} step={1} value={calls} onChange={setCalls} />
      <Slider id="calc-booking" label="Of those callers, how many would have booked" shown={`${booking}%`} min={5} max={100} step={5} value={booking} onChange={setBooking} />
      <Slider id="calc-value" label="Average value of one job or booking" shown={money(jobValue)} min={cur.value.min} max={cur.value.max} step={cur.value.step} value={jobValue} onChange={setJobValue} />
    </div>
    <div className="rs-calc-out">
      <span className="rs-calc-kicker">Walking away each month</span>
      <b role="status" aria-live="polite">{money(monthly)}</b>
      <span className="rs-calc-year">about {money(monthly * 12)} a year</span>
      <span className="rs-calc-sum">{calls} calls a week × 85% never call back × {booking}% would book × {money(jobValue)}</span>
      <Link href="/contact" className="rs-offer" onClick={() => track('missed_call_calc_cta_click')}><span><em>First offer</em>24/7 AI phone agent + online booking</span><i aria-hidden="true">→</i></Link>
      <small>An estimate from one industry figure, <a href={researchSources.callrail} target="_blank" rel="noopener noreferrer">CallRail 2025 ↗</a>, not a promise or a Scalric result. Nothing you enter leaves this page.</small>
    </div>
  </div>;
}
