import React from 'react';
import TopicChips from './TopicChips.jsx';
import { numberGroups, numberHighlights, numberReads, numberViz, researchNumbers, researchSources } from '../data/research.js';
import { Arrow, Eyebrow, Reveal } from './UI.jsx';
import { Count, Gauge, ReadLink, Ring } from './ResearchViz.jsx';
import MissedCallCalculator from './MissedCallCalculator.jsx';

const COLUMNS = 3;

function Stat({ entry, large, order, more }) {
  const [group, topic, value, text, key, source] = entry.row;
  const viz = numberViz[entry.index];
  const share = viz?.kind === 'share';
  return <article className={`rs-stat rs-${group}${large ? ' rs-stat-lg' : ''}`} style={{ '--i': order }}>
    <span className="rs-stat-topic">{topic}</span>
    {large && share ? <div className="rs-stat-hero"><Ring percent={viz.v}><b><Count value={value} /></b></Ring><p>{text}</p></div>
      : <><b><Count value={value} /></b><p>{text}</p></>}
    {viz && !(large && share) && <Gauge percent={viz.v} from={viz.from} down={viz.kind === 'down'} />}
    <ReadLink slug={numberReads[entry.index]} from="numbers" />
    {more && <button type="button" className="rs-topic-link" onClick={more.open}>{more.label} <span aria-hidden="true">→</span></button>}
    <a className="rs-src" href={researchSources[key]} target="_blank" rel="noopener noreferrer" aria-label={`Source: ${source}`}><span>Source ↗</span><em>{source}</em></a>
  </article>;
}

/** Filterable grid of sourced statistics for the Insights page: big tiles lead, each number drawn to suit it. */
export default function NumbersGrid() {
  const [view, setView] = React.useState('calculator'); // 'calculator' by default; 'data' replaces it with the figures
  const [label, setLabel] = React.useState(numberGroups[0][1]);
  const group = numberGroups.find(([, name]) => name === label)[0];
  // "Highlights" shows one headline number per topic; each other tab lists every number in its topic.
  const entries = (group === 'all' ? numberHighlights.map((index) => ({ row: researchNumbers[index], index }))
    : researchNumbers.map((row, index) => ({ row, index })).filter(({ row }) => row[0] === group));
  // Enlarge just enough leading tiles (each spans two columns) that the last row of the grid is full.
  // Gauge-backed numbers get the big tiles, since they have the most to show.
  const larges = (COLUMNS - (entries.length % COLUMNS)) % COLUMNS;
  const bigOnes = [...new Set(entries.filter(({ index }) => numberViz[index]?.kind === 'share').concat(entries).map(({ index }) => index))].slice(0, larges);
  const show = (next) => {
    setView(next);
    window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'numbers_view', view: next } }));
  };
  const select = (next) => {
    setLabel(next);
    window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'numbers_filter', group: next } }));
  };
  // On "Highlights", each tile opens its topic's full list.
  const topicLink = (key) => ({ label: `See all ${researchNumbers.filter(([g]) => g === key).length} ${numberGroups.find(([k]) => k === key)[1]} numbers`, open: () => select(numberGroups.find(([k]) => k === key)[1]) });
  return <section className="section rs-numbers" id="numbers"><div className="container">
    <Reveal className="rs-head">
      <Eyebrow>18 NUMBERS THAT MATTER</Eyebrow>
      <h2>The evidence behind better digital</h2>
      <p>Industry figures on speed, sales, marketing, AI and security, each with its source and year.</p>
    </Reveal>
    {view === 'calculator'
      ? <>
        <MissedCallCalculator />
        <div className="rs-more"><button type="button" className="button" onClick={() => show('data')}>See the data behind it <Arrow /></button></div>
      </>
      : <>
        <button type="button" className="rs-back" onClick={() => show('calculator')}>← Back to the calculator</button>
        <TopicChips items={numberGroups.map(([, name]) => name)} topic={label} onSelect={select} />
        <div className="rs-stats" key={group}>{entries.map((entry, i) => <Stat key={entry.index} entry={entry} large={bigOnes.includes(entry.index)} order={i} more={group === 'all' ? topicLink(entry.row[0]) : null} />)}</div>
      </>}
  </div></section>;
}
