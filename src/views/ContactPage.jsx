'use client';
import React from 'react';
import { ContactForm, contactIntents } from '../components/Forms.jsx';
import { Eyebrow, PageIntro, Reveal } from '../components/UI.jsx';
import { useMobile, Responsive } from '../lib/useMobile.js';

export default function ContactPage({ search }) {
  const intent = new URLSearchParams(search || '').get('intent');
  const [type, setType] = React.useState(contactIntents.some((item) => item.id === intent) ? intent : 'business');
  const title = intent === 'careers' ? 'Tell us what you’d bring' : 'Let’s start with a conversation';
  const mobile = useMobile();
  const intro = 'Share the challenge or opportunity on your mind. We’ll use your note to understand where the conversation should begin.';
  return <><Responsive mobile={mobile}
    m={<section className="ah-m"><div className="m-over-media"><img className="ah-m-img" src="/assets/photos/contact-hero.webp" alt="" fetchPriority="high" decoding="async" /><div className="m-over-text"><span className="ah-eyebrow"><i />CONTACT SCALRIC</span><h1>{title}</h1></div></div><div className="ah-m-copy"><p>{intro}</p></div></section>}
    d={<PageIntro className="page-intro-contact" eyebrow="CONTACT SCALRIC" title={<>{title.split(' ').slice(0, -2).join(' ')}<br /><span className="text-muted">{title.split(' ').slice(-2).join(' ')}</span></>} text={intro} />} />
    <main><section className="section ct-section"><div className="container ct-grid">
      <Reveal className="ct-side">
        <Eyebrow>WHAT ARE YOU THINKING ABOUT?</Eyebrow>
        <h2>One clear<br />starting point</h2>
        <p className="ct-lead">Pick the reason closest to yours. We send your message with that context attached, so the person who reads it already knows what you are asking.</p>
        <ol className="ct-next" aria-label="What happens next">
          <li><b>Choose a reason</b><span className="no-justify">Business, NGO, careers or something else. Not sure? Pick the nearest one and we will sort it out together.</span></li>
          <li><b>Tell us what you are working on</b><span className="no-justify">Two or three lines on the challenge, the goal and who it affects is plenty.</span></li>
          <li><b>A person replies</b><span className="no-justify">A member of the Scalric team writes back to the message you send us and suggests what to do next.</span></li>
        </ol>
      </Reveal>
      <Reveal className="ct-card" delay={100}>
        <div className="ct-card-head"><span>YOUR MESSAGE</span><span>{contactIntents.find((item) => item.id === type)?.label}</span></div>
        <ContactForm inquiryType={type} onTypeChange={setType} />
      </Reveal>
    </div></section></main></>;
}
