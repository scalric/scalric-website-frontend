'use client';
import React from 'react';
import SplitHero from '../components/SplitHero.jsx';
import TopicChips from '../components/TopicChips.jsx';
import SuccessStories from '../components/SuccessStories.jsx';
import { articleContent } from '../data/insightArticles.js';
import { relatedBySlug } from '../data/relatedArticles.js';
import { insights, topics } from '../data/siteContent.js';
import { Link, Arrow, Eyebrow, PageIntro, Reveal, TypedText } from '../components/UI.jsx';

// Where each photo is anchored when it is cropped, so the people in it keep their faces in frame.
const heroFocus = {
  '/assets/photos/insight-automation.webp': '30% 30%',
  '/assets/photos/insight-ai-team.webp': '45% 25%',
  '/assets/photos/insight-data-team.webp': '40% 22%',
  '/assets/photos/insight-cloud.webp': '55% 25%',
  '/assets/photos/insight-saas.webp': '72% 35%',
};
const focusOf = (src) => ({ objectPosition: heroFocus[src] || '50% 50%' });

function useIsMobile(query = '(max-width: 680px)') { const [mobile, setMobile] = React.useState(false); React.useEffect(() => { const mq = window.matchMedia(query); const update = () => setMobile(mq.matches); update(); mq.addEventListener('change', update); return () => mq.removeEventListener('change', update); }, [query]); return mobile; }
function InsightCard({ article, index }) { const isMobile = useIsMobile(); return <Reveal delay={(index % 3) * 65}><article className="insight-card"><Link href={`/insights/${article.slug}`} className="insight-visual" aria-label={article.title} onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'insight_card_click', slug: article.slug } }))}><img className="art-img" src={article.heroImage} style={focusOf(article.heroImage)} alt="" loading="lazy" decoding="async" /></Link><div className="insight-card-copy"><span className="topic-pill">{article.category}</span><span className="draft-badge"></span><h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3><p>{article.dek}</p><Link className="text-link" href={`/insights/${article.slug}`}>Read more{!isMobile && <> <Arrow diagonal /></>}</Link></div></article></Reveal>; }

export default function InsightsPage({ search }) { const queryTopic = new URLSearchParams(search || '').get('topic'); const [topic, setTopic] = React.useState(queryTopic || 'All topics'); React.useEffect(() => { if (queryTopic) { setTopic(queryTopic); const timer = window.setTimeout(() => document.getElementById('insights-topics')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120); return () => window.clearTimeout(timer); } return undefined; }, [queryTopic]); const matching = topic === 'All topics' ? insights : insights.filter(item => item.category === topic); const visible = matching; return <><SplitHero art="insights" title={<>A little further<TypedText phrases={["into what’s next","into the data","into the market","into the future"]}/></>} text="Perspectives on the opportunities and questions where business and technology meet." /><main><SuccessStories /><section className="section topic-filter-section" id="insights-topics"><div className="container"><div className="topic-filter-heading"><Eyebrow>EXPLORE A TOPIC</Eyebrow><span>{topics.length} topic areas · initial taxonomy</span></div><TopicChips items={['All topics', ...topics]} topic={topic} onSelect={setTopic} /></div></section><section className="section insights-list-section"><div className="container"><div className="insights-results-head"><h2>{topic === 'All topics' ? 'Latest perspectives' : topic}</h2><span>{visible.length} {visible.length === 1 ? 'preview' : 'previews'}</span></div>{visible.length ? <div className="insight-cards">{visible.map((item, i) => <InsightCard key={item.slug} article={item} index={i} />)}</div> : <div className="empty-content"><span>✳</span><h3>More perspectives are taking shape</h3><p>We’ll add approved content for {topic} as it becomes available.</p><button className="text-link" onClick={() => setTopic('All topics')}>Browse all previews <Arrow /></button></div>}</div></section></main></>; }

/** Bottom of an article: three more articles, hand-picked related reading first, then others from the same topic. */
function MoreInsights({ slug, category }) {
  const picks = relatedBySlug[slug] || [];
  const rank = (item) => { const at = picks.indexOf(item.slug); return at === -1 ? picks.length : at; };
  const pool = insights.filter(item => item.slug !== slug).sort((x, y) => rank(x) - rank(y));
  // Three articles from three different topics, none from this article's own topic. Hand-picked reading comes first.
  const seen = new Set([category]);
  const shown = [];
  pool.forEach((item) => { if (shown.length < 3 && !seen.has(item.category)) { seen.add(item.category); shown.push(item); } });
  return <section className="section more-insights insights-list-section" aria-labelledby="keep-exploring"><div className="container">
    <div className="section-heading"><div><h2 id="keep-exploring">Keep exploring</h2></div><Link href="/insights" className="text-link" onClick={() => window.dispatchEvent(new CustomEvent('scalric:analytics', { detail: { event: 'view_all_insights_click' } }))}>View all insights <Arrow diagonal /></Link></div>
    <div className="insight-cards">{shown.map((item, i) => <InsightCard key={item.slug} article={item} index={i} />)}</div>
  </div></section>;
}

export function InsightArticlePage({ slug }) { const article = insights.find(item => item.slug === slug); if (!article) return <main className="not-found"><Eyebrow>INSIGHTS</Eyebrow><h1>This perspective isn’t here yet</h1><p>The article may have moved or is still being prepared.</p><Link href="/insights" className="button button-green">Back to insights <Arrow /></Link></main>; const extra = articleContent[slug]; const sections = extra ? extra.sections.map(([heading, ...paras]) => ({ heading, paras })) : article.body.map(({ heading, text }) => ({ heading, paras: [text] })); const anchor = (heading) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-'); const sameTopic = insights.filter(item => item.slug !== slug && item.tags.some(tag => article.tags.includes(tag))); const picked = (relatedBySlug[slug] || []).map(s => insights.find(item => item.slug === s)).filter(Boolean); const related = picked.length ? picked : (sameTopic.length ? sameTopic : insights.filter(item => item.slug !== slug)).slice(0, 3); return <main className="article-page"><div className="container article-top"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/insights">Insights</Link><span>/</span><span>{article.category}</span></div><span className="topic-pill">{article.category}</span><span className="draft-badge"></span><h1>{article.title}</h1><p className="article-dek">{article.dek}</p><div className="article-meta"><span>{article.author}</span><span>·</span><span>{article.publishDate || 'Editorial preview'}</span></div></div><div className="article-hero-art"><img className="art-img" src={article.heroImage} style={focusOf(article.heroImage)} alt="" loading="lazy" decoding="async" /></div><div className="container article-body"><aside><span>IN THIS ARTICLE</span>{sections.map(({ heading }) => <a key={heading} href={`#${anchor(heading)}`}>{heading}</a>)}</aside><div className="article-content">{extra && <p className="article-lead">{extra.lead}</p>}{sections.map(({ heading, paras }) => <section key={heading} id={anchor(heading)}><h2>{heading}</h2>{paras.map((text) => <p key={text}>{text}</p>)}</section>)}{extra && <div className="article-takeaways"><span>KEY TAKEAWAYS</span><ul>{extra.takeaways.map((point) => <li key={point}>{point}</li>)}</ul></div>}<p className="draft-disclaimer"></p></div></div><MoreInsights slug={slug} category={article.category} /><div className="article-cta"><div className="container article-cta-inner"><p>Working through a similar question?</p><Link href="/contact" className="btn-talk"><span>Talk to us</span></Link></div></div></main>; }
