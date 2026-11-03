// Industry research behind the proof strip, numbers grid and buyer section. Every figure links to its source.
export const researchSources = {
  sba: 'https://advocacy.sba.gov/?p=30239',
  mmm: 'https://web.dev/case-studies/milliseconds-make-millions',
  rak: 'https://web.dev/case-studies/rakuten',
  target: 'https://retail-insider.com/retail-insider/2025/01/10-years-since-targets-exit-from-canada-lessons-learned/',
  mck: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
  baymard: 'https://baymard.com/blog/current-state-of-checkout-ux',
  perso: 'https://www.mckinsey.com.br/capabilities/growth-marketing-and-sales/our-insights/the-value-of-getting-personalization-right-or-wrong-is-multiplying',
  litmus: 'https://www.litmus.com/blog/infographic-the-roi-of-email-marketing',
  gbp: 'https://support.google.com/business/answer/10515606?hl=en',
  bright: 'https://brightlocal.com/research/local-consumer-review-survey/',
  callrail: 'https://www.businesswire.com/news/home/20250114793850/en/CallRail-Releases-Report-Benchmarking-Marketing-Efforts-for-Small-Businesses',
  gartner: 'https://www.gartner.com/en/newsroom/press-releases/2025-03-05-gartner-predicts-agentic-ai-will-autonomously-resolve-80-percent-of-common-customer-service-issues-without-human-intervention-by-20290',
  pdm: 'https://reliamag.com/topics/guides/predictive-maintenance-roi-benchmarks-what-the-studies-show',
  dbir: 'https://infosecurity-magazine.com/news/verizon-dbir-smb-ransomware-attacks',
  ibm: 'https://in.newsroom.ibm.com/2025-08-07-India-Records-Highest-Average-Cost-of-a-Data-Breach-IBM',
  remind: 'https://www.entagl.com/blog/reduce-no-shows-reminders-confirmation-calls',
};

// [value, label, source key, source label]
export const researchKpis = [
  ['116M+', 'small businesses in India, the US, the UK and Canada', 'sba', 'SBA · MSME · DBT · ISED'],
  ['85%', 'of callers who reach no one never call back', 'callrail', 'CallRail 2025'],
  ['+8.4%', 'more retail sales for every 0.1s faster mobile site', 'mmm', 'Deloitte for Google'],
  ['+53%', 'more money per visitor from speed fixes alone', 'rak', 'Rakuten 24 test'],
  ['$7.6B', 'lost by six companies to untested software', 'target', 'Company filings'],
  ['37%', 'of firms using AI actually earn more from it', 'mck', 'McKinsey 2026'],
];

export const numberGroups = [
  ['all', 'Highlights'], ['mkt', 'Marketing'], ['dev', 'Development'], ['ai', 'AI & automation'], ['risk', 'Security'],
];

// [group, topic, value, text, source key, source label + year]
export const researchNumbers = [
  ['dev', 'Website speed', '+8.4%', 'more retail sales for each 0.1s faster mobile site', 'mmm', 'Deloitte for Google · 2019'],
  ['dev', 'Website speed', '+53%', 'more money per visitor, from speed alone', 'rak', 'Rakuten 24'],
  ['dev', 'Online store', '70%', 'of shoppers leave their cart', 'baymard', 'Baymard · 2025'],
  ['dev', 'Online store', '+35%', 'more sales possible from a better checkout', 'baymard', 'Baymard · 2025'],
  ['dev', 'Online store', '18%', 'leave if forced to create an account', 'baymard', 'Baymard · 2025'],
  ['mkt', 'Personal offers', '+10–15%', 'more revenue when offers fit each customer', 'perso', 'McKinsey · 2021'],
  ['mkt', 'Email', '$36–50', 'earned per $1 spent, for 30% of marketers', 'litmus', 'Litmus · 2025'],
  ['mkt', 'Google profile', '+70%', 'more visits with a complete profile', 'gbp', 'Google'],
  ['mkt', 'Reviews', '97%', 'of people read reviews of local businesses', 'bright', 'BrightLocal · 2026'],
  ['mkt', 'AI search', '6% → 45%', 'people using AI tools to find local businesses, in one year', 'bright', 'BrightLocal · 2026'],
  ['mkt', 'Google Ads', '47%', 'of good phone leads come from Google Ads', 'callrail', 'CallRail · 2025'],
  ['ai', 'AI phone agent', '85%', 'of callers who get no answer never call back', 'callrail', 'CallRail · 2025'],
  ['ai', 'AI chat', '80%', 'of common questions solved by AI agents by 2029 (forecast)', 'gartner', 'Gartner · 2025'],
  ['ai', 'AI planning', '37%', 'of firms using AI earn more from it', 'mck', 'McKinsey · 2026'],
  ['ai', 'Reminders', '−25%', 'fewer missed appointments with text reminders', 'remind', 'BMJ Open · 2016'],
  ['ai', 'Smart maintenance', '−30–50%', 'less machine downtime', 'pdm', 'McKinsey · 2017'],
  ['risk', 'Security', '88%', 'of small-business breaches involve ransomware', 'dbir', 'Verizon · 2025'],
  ['risk', 'Security', '₹22 cr', 'average cost of one data breach in India', 'ibm', 'IBM · 2025'],
];

// [role, markets, quote, stat, stat label, first offer]
export const buyerPersonas = [
  ['Clinic owner', 'India · US', 'Phones ring all day; patients don’t show.', '32%', 'of clinic calls missed', 'Missed-call check + AI receptionist trial'],
  ['Online store founder', 'India · UK', 'Ads cost more each month; sales are flat.', '70%', 'of carts left behind', 'Speed check + 30-day sales sprint'],
  ['Service business owner', 'US · Canada · UK', 'We can’t answer every call after 5 pm.', '85%', 'of missed callers lost', '24/7 AI phone agent + online booking'],
  ['Operations head', 'All 4 markets', 'We tried AI; it didn’t make money.', '37%', 'earn from their AI', 'AI workshop + one automated task'],
];

export const buyerCountries = ['India', 'United States', 'United Kingdom', 'Canada'];

// [row label, India, US, UK, Canada]
export const buyerMarkets = [
  ['Lead with', 'Leads + WhatsApp + Google profile', 'AI phone and chat agents', 'Speed, online sales, safe AI', 'AI agents + English/French sites'],
  ['Top industries', 'Clinics, real estate, online stores, coaching', 'Home services, law firms, clinics', 'Online stores, hotels, services', 'Gyms, home services, clinics'],
  ['Where to find them', 'LinkedIn, WhatsApp, local search, accountant referrals', 'LinkedIn, industry email lists', 'LinkedIn, Clutch, referrals', 'LinkedIn, Clutch, business groups'],
  ['Rules to know', 'DPDP Act 2023', 'HIPAA (health), TCPA (calls)', 'UK GDPR, PECR', 'PIPEDA, CASL, Quebec Law 25'],
  ['Proof to show', 'redBus, Nykaa, Bombay Shaving Co', 'Riley Plumbing, Clio data', 'Vodafone, Rakuten, Baymard', 'Oxygen Yoga, Air Canada lesson'],
];

// How each number in researchNumbers is drawn, keyed by row index: share = filled gauge, ba = before → after, down = shrinking gauge.
export const numberViz = {
  2: { kind: 'share', v: 70 }, 4: { kind: 'share', v: 18 }, 8: { kind: 'share', v: 97 }, 9: { kind: 'ba', from: 6, v: 45 },
  10: { kind: 'share', v: 47 }, 11: { kind: 'share', v: 85 }, 12: { kind: 'share', v: 80 }, 13: { kind: 'share', v: 37 },
  14: { kind: 'down', v: 25 }, 16: { kind: 'share', v: 88 },
};

// Small businesses by country, in millions: India registered MSMEs (Dec 2025), US (2025), UK (2025), Canada (Dec 2024).
export const marketSizes = [['India', 73], ['United States', 36.2], ['United Kingdom', 5.68], ['Canada', 1.08]];

// "Highlights" tab: the row index of one headline number per topic, in chip order. The other tabs list every number in their topic.
export const numberHighlights = [8, 0, 11, 17];

// Article each number links to, only where an existing insight genuinely covers it. Keyed by row index in researchNumbers.
export const numberReads = {
  5: 'automation-and-the-customer-journey', 8: 'replying-to-every-review', 11: 'booking-more-calls-in-home-services',
  12: 'ai-with-purpose', 13: 'choosing-the-first-ai-use-case', 14: 'unanswered-clinic-calls',
};

// Same idea for the home proof band (keyed by the headline value) and for each buyer, in buyerPersonas order.
export const kpiReads = { '85%': 'booking-more-calls-in-home-services', '$7.6B': 'target-canada-exit', '37%': 'choosing-the-first-ai-use-case' };
export const personaReads = ['unanswered-clinic-calls', null, 'booking-more-calls-in-home-services', 'choosing-the-first-ai-use-case'];
