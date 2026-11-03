'use client';
import React from 'react';
import ImpactSections from '../components/ImpactSections.jsx';
import IndustrySlideshow from '../components/IndustrySlideshow.jsx';
import { Link, Arrow, Eyebrow, PageIntro, Reveal, TypedText } from '../components/UI.jsx';
const icons = ['◉', '✳', '▦', '◌', '⌁', '↗'];
export default function IndustriesPage() { return <><section className="ind-banner"><div className="ind-banner-copy"><span className="ind-banner-eyebrow">INDUSTRIES</span><h1>Understand the context Unlock<br/>what’s possible</h1><p>Industry knowledge helps put the right questions on the table.</p></div><IndustrySlideshow /></section><main><ImpactSections /></main></>; }
