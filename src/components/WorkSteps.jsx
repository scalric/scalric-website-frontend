import React from 'react';
import { Link, Arrow, useInView } from './UI.jsx';

const steps = [
  { title: 'Understand the problem', text: 'We start with discovery: your business, customers and goals, shaped into a clear problem and a prioritised plan.' },
  { title: 'Define and build together', text: 'Requirements are agreed with you, then design and engineering move in short, tested iterations with regular reviews.' },
  { title: 'Deliver and keep improving', text: 'We validate with real users, launch in phases and keep refining until the product delivers the outcome you set out to achieve.' },
];

/** Three-step summary of how Scalric works, with a yellow line that draws itself as the section scrolls into view. */
export default function WorkSteps() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  // Conditional rendering: phones get the same drawn yellow line, laid out vertically with the steps hanging off it.
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  if (mobile) return <section className="section work-steps" id="how-we-work"><div className="container">
    <div className={`ws-stage ws-stage-m${inView ? ' is-in' : ''}`} ref={ref}>
      <span className="ws-circle" aria-hidden="true" />
      <div className="ws-intro ws-intro-m">
        <span className="ws-eyebrow" style={{ '--k': 0 }}>HOW WE WORK</span>
        <h2 style={{ '--k': 1 }}>From question<br />to measurable outcome</h2>
        <p style={{ '--k': 2 }}>Three clear steps, one shared goal: understand the problem, agree what matters, and build a product that delivers.</p>
        <Link href="/contact" className="button button-green ws-cta" style={{ '--k': 3 }}>Get started</Link>
      </div>
      <div className="ws-m-track">
        <svg className="ws-m-line" viewBox="0 0 44 1000" preserveAspectRatio="none" aria-hidden="true">
          <path className="ws-line-glow" pathLength="1" d="M22 -40 C22 -10 22 -10 22 0 C46 110 -2 230 22 333 C46 436 -2 560 22 667 C46 774 -2 890 22 1000" />
          <path className="ws-line-path" pathLength="1" d="M22 -40 C22 -10 22 -10 22 0 C46 110 -2 230 22 333 C46 436 -2 560 22 667 C46 774 -2 890 22 1000" />
        </svg>
        <ol className="ws-m-steps">{steps.map((step, i) => <li key={step.title} className="ws-m-step ws-m-step-fast" style={{ '--i': i }}>
          <span className="ws-m-dot" aria-hidden="true" />
          <h3>{step.title}</h3><p>{step.text}</p>
        </li>)}</ol>
      </div>
    </div>
  </div></section>;
  return <section className="section work-steps" id="how-we-work"><div className="container">
    <div className={`ws-stage${inView ? ' is-in' : ''}`} ref={ref}>
      <span className="ws-circle" aria-hidden="true" />
      <div className="ws-intro">
        <span className="ws-eyebrow">HOW WE WORK</span>
        <h2>From question<br />to measurable outcome</h2>
        <p>Three clear steps, one shared goal: understand the problem, agree what matters, and build a product that delivers.</p>
        <Link href="/contact" className="button button-green ws-cta">Get started</Link>
      </div>
      <svg className="ws-line" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
        <path className="ws-line-glow" pathLength="1" d="M0 330 C100 400 200 420 300 410 C420 398 480 300 640 300 C800 300 840 130 980 130 C1040 130 1070 128 1110 135" />
        <path className="ws-line-path" pathLength="1" d="M0 330 C100 400 200 420 300 410 C420 398 480 300 640 300 C800 300 840 130 980 130 C1040 130 1070 128 1110 135" />
      </svg>
      <ol className="ws-steps">{steps.map((step, i) => <li key={step.title} className={`ws-step ws-step-${i + 1}`} style={{ '--i': i }}>
        <span className="ws-dot" aria-hidden="true" /><span className="ws-num" aria-hidden="true">{i + 1}</span>
        <h3>{step.title}</h3><p>{step.text}</p>
      </li>)}</ol>
    </div>
  </div></section>;
}
