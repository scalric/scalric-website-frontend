'use client';
import React from 'react';
import { capabilities } from '../data/siteContent.js';
import { Link, Arrow, Eyebrow, PageIntro, Reveal } from '../components/UI.jsx';
import WhyBand from '../components/WhyBand.jsx';
import WhatWeDoHero from '../components/WhatWeDoHero.jsx';

const details=[
 {id:'saas',num:'01',title:'Products built around a problem',intro:'SaaS & software',text:'Digital products should make a valuable task easier to understand, complete and improve. We help connect product direction to the technical choices that bring it to life.',points:['Product discovery and direction','Experience and service design','Software architecture and delivery']},
 {id:'ai',num:'02',title:'AI with a reason to exist',intro:'Artificial intelligence',text:'We frame AI around decisions and work that can benefit from it, with responsible data, human oversight and a practical path from exploration to use.',points:['Opportunity and use-case framing','AI product and workflow design','Responsible adoption and governance']},
 {id:'data-automation',num:'03',title:'Information into action',intro:'Data & automation',text:'Connected data and purposeful automation can help people spend less time navigating process and more time moving work forward.',points:['Data foundations and analytics','Process redesign and automation','Operational intelligence']},
 {id:'consulting',num:'04',title:'Strategy that reaches delivery',intro:'Consulting',text:'We bring market understanding, business strategy and technology delivery into one conversation—so each decision supports the outcome ahead.',points:['Market and opportunity assessment','Transformation roadmaps','Operating-model alignment']},
];
export default function WhatWeDoPage(){return <><WhatWeDoHero/><main><WhyBand/><section className="section capability-details"><div className="container">{details.map((item,i)=><Reveal key={item.id}><article className={`detail-row${i%2?' detail-reverse':''}`} id={item.id}><div className="detail-number"><span>{item.num}</span><i/></div><div className="detail-copy"><Eyebrow>{item.intro}</Eyebrow><h2>{item.title}</h2><p>{item.text}</p></div><div className="detail-art"><img className="art-img" src={['/assets/photos/insight-saas.webp','/assets/photos/insight-ai-team.webp','/assets/photos/insight-automation.webp','/assets/photos/insight-data-team.webp'][i]} alt="" loading="lazy" decoding="async"/></div></article></Reveal>)}</div></section></main></>;}
