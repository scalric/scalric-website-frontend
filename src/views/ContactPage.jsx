'use client';
import React from 'react';
import { ContactForm, contactIntents } from '../components/Forms.jsx';
import { Eyebrow, PageIntro, Reveal } from '../components/UI.jsx';

export default function ContactPage({ search }) {
  const intent = new URLSearchParams(search || '').get('intent');
  const [type, setType] = React.useState(contactIntents.some((item) => item.id === intent) ? intent : 'business');
  const title = intent === 'careers' ? 'Tell us what you’d bring' : 'Let’s start with a conversation';
  return <><PageIntro className="page-intro-contact" eyebrow="CONTACT SCALRIC" title={<>{title.split(' ').slice(0, -2).join(' ')}<br /><span className="text-muted">{title.split(' ').slice(-2).join(' ')}</span></>} text="Share the challenge or opportunity on your mind. We’ll use your note to understand where the conversation should begin." />
    <main><section className="section ct-section"><div className="container ct-grid">
      <Reveal className="ct-side">
        <Eyebrow>WHAT ARE YOU THINKING ABOUT?</Eyebrow>
        <h2>One clear<br />starting point</h2>
        <p>Choose the reason that best fits. Your message will be routed with that context so the right conversation can begin.</p>
      </Reveal>
      <Reveal className="ct-card" delay={100}>
        <div className="ct-card-head"><span>YOUR MESSAGE</span><span>{contactIntents.find((item) => item.id === type)?.label}</span></div>
        <ContactForm inquiryType={type} onTypeChange={setType} />
      </Reveal>
    </div></section></main></>;
}
