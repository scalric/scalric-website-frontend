export const capabilities = [
  { number: '01', title: 'SaaS & software', text: 'Digital products designed around the business outcomes that matter.', icon: '◒', href: '/what-we-do#saas', image: '/assets/cards/cap-saas.svg' },
  { number: '02', title: 'Artificial intelligence', text: 'AI applied to decisions, services and operations with purpose.', icon: '✳', href: '/what-we-do#ai', image: '/assets/cards/cap-ai.svg' },
  { number: '03', title: 'Data & automation', text: 'Turn fragmented processes and information into forward motion.', icon: '⌘', href: '/what-we-do#data-automation', image: '/assets/cards/cap-data.svg' },
  { number: '04', title: 'Consulting', text: 'Connect market understanding, strategy and technology delivery.', icon: '↗', href: '/what-we-do#consulting', image: '/assets/cards/cap-consulting.svg' },
];

export const topics = [
  'Artificial Intelligence', 'SaaS & Software', 'Data & Analytics', 'Automation', 'Cloud & Infrastructure',
];

export const insights = [
  {
    slug: 'from-data-to-decisions', category: 'Data & Analytics',
    tags: ['Data & Analytics'], status: 'editorial-preview', publishDate: null,
    title: 'From data to decisions: making information work harder',
    dek: 'A practical perspective on bringing data, people and business priorities into one decision system.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-data-team.webp', featured: true, source: null,
    body: [
      { heading: 'A better question to start with', text: 'The value of data is measured in the decisions it helps people make. Begin with the decision, then work backwards to the information, ownership and process it needs.' },
      { heading: 'Connect the operating model', text: 'Technology choices matter, but so do trusted definitions, clear accountability and the routines that turn insight into action.' },
      { heading: 'Build for learning', text: 'A useful data capability improves through use. Start with a focused outcome, observe what changes and expand the approach when it proves its value.' },
    ],
  },
  {
    slug: 'ai-with-purpose', category: 'Artificial Intelligence',
    tags: ['Artificial Intelligence'], status: 'editorial-preview', publishDate: null,
    title: 'AI with purpose: moving from possibility to operating value',
    dek: 'How organizations can frame AI around a meaningful business problem and a responsible path to scale.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-ai-team.webp', featured: true, source: null,
    body: [
      { heading: 'Start with the work', text: 'A useful AI opportunity starts with a task, decision or service that can be made clearer, faster or more helpful.' },
      { heading: 'Design the conditions', text: 'Data access, human oversight, security and adoption need to be considered alongside model selection.' },
      { heading: 'Scale with evidence', text: 'Small, observable releases help teams learn what works and build confidence before expanding into more consequential use cases.' },
    ],
  },
  {
    slug: 'automation-and-the-customer-journey', category: 'Automation',
    tags: ['Automation'], status: 'editorial-preview', publishDate: null,
    title: 'Automation that makes the whole journey simpler',
    dek: 'A systems view of automation can reduce friction for customers and the teams who support them.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-automation.webp', featured: true, source: null,
    body: [
      { heading: 'Look across the journey', text: 'Automating one step can move effort somewhere else. Map the end-to-end experience before deciding where technology can help.' },
      { heading: 'Keep people in the loop', text: 'Design clear ways to review exceptions and improve the process as conditions change.' },
      { heading: 'Make improvement visible', text: 'Pair workflow measures with the experience they are meant to improve, then adjust the design with the people closest to the work.' },
    ],
  },
  {
    slug: 'saas-products-built-around-the-task', category: 'SaaS & Software',
    tags: ['SaaS & Software'], status: 'editorial-preview', publishDate: null,
    title: 'Software people keep using: building around the task',
    dek: 'What separates a SaaS product people rely on from one they tolerate, and how to design for it from the start.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-saas.webp', featured: false, source: null,
    body: [
      { heading: 'Start from the task', text: 'A useful product makes one valuable task easier to understand, complete and improve. Map that task in detail before deciding which features it needs.' },
      { heading: 'Design for the whole lifecycle', text: 'Onboarding, daily use, support and upgrades shape retention as much as the core functionality. Plan each stage deliberately.' },
      { heading: 'Measure what customers feel', text: 'Adoption, time to first value and repeat use reveal more than feature counts. Review them with the team at every release.' },
    ],
  },
  {
    slug: 'cloud-foundations-that-grow', category: 'Cloud & Infrastructure',
    tags: ['Cloud & Infrastructure'], status: 'editorial-preview', publishDate: null,
    title: 'Cloud foundations that can grow with the business',
    dek: 'Practical choices about architecture, cost and reliability, made before scale makes them expensive to change.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-cloud.webp', featured: false, source: null,
    body: [
      { heading: 'Design for change', text: 'Modular services, clear interfaces and infrastructure defined as code make systems easier to evolve without disruption.' },
      { heading: 'Balance cost and resilience', text: 'Right-size capacity, track spend by workload, and decide deliberately which services need high availability.' },
      { heading: 'Secure by default', text: 'Identity controls, encryption and regular access reviews belong in the foundation, not added after launch.' },
    ],
  },
  {
    slug: 'responsible-ai-in-daily-operations', category: 'Artificial Intelligence',
    tags: ['Artificial Intelligence'], status: 'editorial-preview', publishDate: null,
    title: 'Responsible AI in everyday operations',
    dek: 'How teams can bring AI into routine work with clear ownership, human review and measurable results.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-ai-team.webp', featured: false, source: null,
    body: [
      { heading: 'Pick a task, not a technology', text: 'Start with a repeated task where speed, accuracy or consistency matters, and define what success looks like before testing any tool.' },
      { heading: 'Keep a human in the loop', text: 'Decide where people review, approve or override AI output, and make those points visible in the workflow.' },
      { heading: 'Monitor quality over time', text: 'Track errors, drift and user feedback. Models and data change, so the review process must keep running after launch.' },
    ],
  },
  {
    slug: 'trusted-data-before-dashboards', category: 'Data & Analytics',
    tags: ['Data & Analytics'], status: 'editorial-preview', publishDate: null,
    title: 'Trusted data before dashboards',
    dek: 'Agreed definitions and clear ownership matter more than the next chart. Here is where to start.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-data-team.webp', featured: false, source: null,
    body: [
      { heading: 'Agree on definitions', text: 'When two teams report the same metric differently, decisions slow down. Write down what each key measure means and how it is calculated.' },
      { heading: 'Assign data ownership', text: 'Every critical dataset needs a named owner who is accountable for quality, access and updates.' },
      { heading: 'Design for the decision', text: 'Start from the question a leader needs to answer, then work backwards to the data and visuals that answer it.' },
    ],
  },
  {
    slug: 'pricing-as-product-design', category: 'SaaS & Software',
    tags: ['SaaS & Software'], status: 'editorial-preview', publishDate: null,
    title: 'Pricing as part of product design',
    dek: 'Packaging and pricing shape what customers value and how the product grows. Treat them as design decisions.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-saas.webp', featured: false, source: null,
    body: [
      { heading: 'Price the value, not the features', text: 'Customers buy outcomes. Group capabilities around the results they deliver, so each tier has a clear purpose.' },
      { heading: 'Keep the path to upgrade clear', text: 'Users should understand when and why to move up a tier, without surprises or artificial limits.' },
      { heading: 'Test with real usage', text: 'Use usage data and customer conversations to refine packaging. Pricing changes deserve the same care as feature changes.' },
    ],
  },
  {
    slug: 'automating-the-exceptions', category: 'Automation',
    tags: ['Automation'], status: 'editorial-preview', publishDate: null,
    title: 'Automate the exceptions, not just the rules',
    dek: 'Routine cases are the easy part. Designing for the exceptions is where automation earns trust.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-automation.webp', featured: false, source: null,
    body: [
      { heading: 'Map the edge cases first', text: 'Before automating a process, list the unusual cases that break the standard path and decide how each should be handled.' },
      { heading: 'Route exceptions to people', text: 'Build clear handoffs, with context attached, so a person can resolve the case without starting again.' },
      { heading: 'Learn from what gets escalated', text: 'Escalations show where the process needs redesign. Review them regularly and simplify the rules that cause the most friction.' },
    ],
  },
  {
    slug: 'observability-knowing-what-your-systems-do', category: 'Cloud & Infrastructure',
    tags: ['Cloud & Infrastructure'], status: 'editorial-preview', publishDate: null,
    title: 'Observability: knowing what your systems are doing',
    dek: 'You cannot improve systems you cannot see. Good monitoring turns incidents into learning.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-cloud.webp', featured: false, source: null,
    body: [
      { heading: 'Measure what users experience', text: 'Track response times, errors and completed tasks from the user’s point of view, not only server health.' },
      { heading: 'Make logs and traces useful', text: 'Structured logs and traces tied to a single request make it faster to find the cause of a problem.' },
      { heading: 'Plan for incidents', text: 'Agree on alert thresholds, owners and a review routine, so each incident leads to a specific improvement.' },
    ],
  },
  {
    slug: 'metrics-people-actually-use', category: 'Data & Analytics',
    tags: ['Data & Analytics'], status: 'editorial-preview', publishDate: null,
    title: 'Metrics people actually use: measuring what matters to the decision',
    dek: 'A good measure answers a question someone is already asking. Start there and keep the set small.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-data-team.webp', featured: false, source: null,
    body: [
      { heading: 'Start from the decision', text: 'List the decisions a team makes each week, then choose the few numbers that would change what they do.' },
      { heading: 'Agree on one definition', text: 'When two teams define the same metric differently, trust drops. Write the definition once and share it.' },
      { heading: 'Review and retire', text: 'Revisit measures regularly. Remove the ones nobody acts on so the important ones stay visible.' },
    ],
  },
  {
    slug: 'choosing-the-first-ai-use-case', category: 'Artificial Intelligence',
    tags: ['Artificial Intelligence'], status: 'editorial-preview', publishDate: null,
    title: 'Choosing the first AI use case: start where the work is repeatable',
    dek: 'The best first project is a clear, bounded task where better speed or consistency is easy to recognise.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-ai-team.webp', featured: false, source: null,
    body: [
      { heading: 'Look for repeatable work', text: 'Tasks that follow a pattern, use available information and have a clear definition of done are good candidates.' },
      { heading: 'Keep people in charge', text: 'Design the first release so a person reviews the output, and capture where they correct it.' },
      { heading: 'Decide how you will know', text: 'Agree on what success looks like before building, so the result can be judged on evidence.' },
    ],
  },
  {
    slug: 'people-in-the-loop-automation', category: 'Automation',
    tags: ['Automation'], status: 'editorial-preview', publishDate: null,
    title: 'Automation with people in the loop: knowing when to hand over',
    dek: 'Automation works best when it handles the routine and hands the unusual to a person with the right context.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-automation.webp', featured: false, source: null,
    body: [
      { heading: 'Map the routine and the exception', text: 'Separate the steps that always follow the same rules from those that need judgement.' },
      { heading: 'Make the handover clear', text: 'When work moves to a person, include what has been done, what is uncertain and what is needed next.' },
      { heading: 'Learn from the exceptions', text: 'Each exception shows where the process or the rules can improve. Review them on a regular rhythm.' },
    ],
  },
  {
    slug: 'unanswered-clinic-calls', category: 'Artificial Intelligence',
    tags: ['Artificial Intelligence'], status: 'editorial-preview', publishDate: null,
    title: 'Unanswered calls: the quiet leak in clinic bookings',
    dek: 'When 32% of clinic calls go unanswered, the fix is often a better first response, not more staff.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-ai-team.webp', featured: false, source: null,
    body: [
      { heading: 'Why calls go missing', text: 'Reception teams are rarely careless. They are helping someone at the desk, handling a payment or stepping away for lunch when the phone rings. Calls cluster in the morning, at lunchtime and just after closing, which is exactly when staff are busiest or gone.' },
      { heading: 'What an AI phone agent can take on', text: 'An AI phone agent answers straight away, asks the reason for the call, offers open appointment slots and handles routine questions such as opening hours, location and how to prepare for a visit. It can book the visit and send a confirmation by text.' },
      { heading: 'Reminders close the other gap', text: 'Getting the booking is only half of it. Text reminders help patients turn up: in a set of 21 clinic studies, missed visits fell from 21% to 15% once reminders were in place.' },
    ],
  },
  {
    slug: 'booking-more-calls-in-home-services', category: 'Artificial Intelligence',
    tags: ['Artificial Intelligence'], status: 'editorial-preview', publishDate: null,
    title: 'From missed calls to booked jobs in home services',
    dek: 'A plumber’s hands are busy when the phone rings. One example shows calls booked rising from 50% to 80% after an AI agent started answering.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-ai-team.webp', featured: false, source: null,
    body: [
      { heading: 'The phone is the shop front', text: 'Most home-service work still starts with a call, and callers want an answer now: a leak, a power cut, a broken boiler. Someone on a ladder or under a sink cannot take it.' },
      { heading: 'What the agent does', text: 'The agent answers every call, asks what is wrong, collects the address and how urgent it is, and offers the next free slot. It can then text the customer a confirmation with the time and the visit details.' },
      { heading: 'Keep the human parts human', text: 'Quotes for bigger jobs, emergencies and anything that sounds unusual should go straight to a person. The agent’s job is to catch the call and gather the facts, not to replace the tradesperson’s judgement.' },
    ],
  },
  {
    slug: 'the-app-behind-the-order', category: 'SaaS & Software',
    tags: ['SaaS & Software'], status: 'editorial-preview', publishDate: null,
    title: 'The app behind the order: ordering and loyalty for restaurants',
    dek: 'Around 33% of Starbucks US orders come through its app. The pattern is worth understanding even for a single café.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-saas.webp', featured: false, source: null,
    body: [
      { heading: 'Ordering ahead removes friction', text: 'Customers who can order and pay before they arrive skip the queue and the decision made under pressure. For the café, orders arrive in an orderly stream instead of a rush at the counter.' },
      { heading: 'Loyalty gives a reason to come back', text: 'A simple points or stamp scheme inside the same app means every order builds towards something. It also tells the business who its regulars are and what they like.' },
      { heading: 'What a smaller place can take from it', text: 'A local restaurant does not need a flagship app to benefit. A branded ordering page with saved orders and a basic loyalty scheme captures most of the value.' },
    ],
  },
  {
    slug: 'branded-apps-for-gyms-and-studios', category: 'SaaS & Software',
    tags: ['SaaS & Software'], status: 'editorial-preview', publishDate: null,
    title: 'Why gyms and studios are booking through their own app',
    dek: 'In one case, 62% of bookings came through a branded app. Here is why members prefer it.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-saas.webp', featured: false, source: null,
    body: [
      { heading: 'Booking is the front door', text: 'Members want to see what is on, reserve a place and cancel in a few seconds. Every extra step, such as a phone call, an email or a message to a coach, is a reason to skip the session.' },
      { heading: 'What a branded app adds', text: 'Because the app belongs to the studio, it carries the studio’s name, timetable, memberships and notices. Members find class reminders, waiting-list updates and changes in one place.' },
      { heading: 'Make the first booking effortless', text: 'The first booking decides whether the habit forms. Keep sign-up short, show the next available class on the first screen and confirm instantly.' },
    ],
  },
  {
    slug: 'replying-to-every-review', category: 'Automation',
    tags: ['Automation'], status: 'editorial-preview', publishDate: null,
    title: 'Reply to every review: a small habit for salons and spas',
    dek: '80% of people pick businesses that reply to every review. Booking and review replies work best together.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-automation.webp', featured: false, source: null,
    body: [
      { heading: 'Replies are read by future customers', text: 'A reply is written to the reviewer, but the audience is everyone who reads the page afterwards. A calm, specific answer to a complaint says more about a salon than the complaint does.' },
      { heading: 'Make replying part of the routine', text: 'The reason replies slip is simple: nobody owns them. Give the task to one person, set aside a short slot each day and use a few reply templates as starting points rather than finished text.' },
      { heading: 'Connect reviews to booking', text: 'The best moment to ask for a review is just after a good visit, and the easiest place is the booking and confirmation message. A link in the thank-you text turns happy customers into reviews.' },
    ],
  },
  {
    slug: 'target-canada-exit', category: 'Data & Analytics',
    tags: ['Data & Analytics'], status: 'editorial-preview', publishDate: null,
    title: 'Target Canada: a $5.4B lesson in launching before the systems are ready',
    dek: 'The 2015 exit from Canada cost $5.4B. The lesson is about checking the systems behind the shelves before opening the doors.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-data-team.webp', featured: false, source: null,
    body: [
      { heading: 'What happened', text: 'Target entered Canada with a fast roll-out of stores and left in 2015 with a loss of $5.4B. As widely reported at the time, stock and supply-chain problems left customers facing gaps on the shelves.' },
      { heading: 'Where an independent check was missing', text: 'A supply chain runs on data: what each product is, how it is packed, how much is on hand and when more arrives. If that data is wrong, every system built on it is wrong too, however modern the software looks.' },
      { heading: 'What to do differently', text: 'Treat data accuracy as a launch condition. Test the whole chain from supplier to shelf on a small number of locations before expanding, and fix what the pilot shows.' },
    ],
  },
  {
    slug: 'southwest-holiday-breakdown', category: 'Cloud & Infrastructure',
    tags: ['Cloud & Infrastructure'], status: 'editorial-preview', publishDate: null,
    title: 'Southwest Airlines: when one system could not recover from disruption',
    dek: 'The 2022 holiday breakdown cost $1.2B. Resilience means planning for the day everything goes wrong at once.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-cloud.webp', featured: false, source: null,
    body: [
      { heading: 'What happened', text: 'Over the 2022 holiday period a wave of disruption turned into a system breakdown, and the airline lost $1.2B. Travellers were stranded, and the operation took days to return to normal.' },
      { heading: 'Where an independent check was missing', text: 'Systems are usually tested on ordinary days. The question that decides resilience is what happens on the worst day, when many things fail together and people need the tools most.' },
      { heading: 'What to do differently', text: 'Identify the few systems the whole operation depends on, and rehearse their failure. Keep a manual fallback that people have actually practised, not one that exists only on paper.' },
    ],
  },
  {
    slug: 'knight-capital-one-morning', category: 'Cloud & Infrastructure',
    tags: ['Cloud & Infrastructure'], status: 'editorial-preview', publishDate: null,
    title: 'Knight Capital: $440M in one morning of bad code',
    dek: 'In 2012 a single software release cost $440M in one morning. Releases need the same care as the money they touch.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-cloud.webp', featured: false, source: null,
    body: [
      { heading: 'What happened', text: 'A faulty software release reached live trading in 2012. Within a single morning the firm had lost $440M.' },
      { heading: 'Where an independent check was missing', text: 'The risk sat in the release itself: how the new code was put live, whether every system received the same version and whether anyone could stop it quickly once it misbehaved.' },
      { heading: 'What to do differently', text: 'Release in small steps and watch each one. Use a kill switch that anyone on the team can pull, and set limits that stop the system automatically when behaviour looks wrong.' },
    ],
  },
  {
    slug: 'zillow-offers-pricing-model', category: 'Data & Analytics',
    tags: ['Data & Analytics'], status: 'editorial-preview', publishDate: null,
    title: 'Zillow Offers: when the pricing model was trusted too far',
    dek: 'A $422M pricing-model loss in 2021 shows why models need independent challenge, especially when they spend real money.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-data-team.webp', featured: false, source: null,
    body: [
      { heading: 'What happened', text: 'Zillow Offers relied on a pricing model to set the prices it paid, and in the third quarter of 2021 the losses from that model reached $422M.' },
      { heading: 'Where an independent check was missing', text: 'A model is only as good as the conditions it was built in. When the market shifts, a model trained on earlier patterns can be confidently wrong, and the people closest to it may be the last to question it.' },
      { heading: 'What to do differently', text: 'Set limits on how much a model can commit before a person reviews the results, and compare its predictions with outcomes continuously rather than quarterly.' },
    ],
  },
  {
    slug: 'revlon-orders-it-could-not-ship', category: 'SaaS & Software',
    tags: ['SaaS & Software'], status: 'editorial-preview', publishDate: null,
    title: 'Revlon: the orders it could not ship',
    dek: 'In 2018 orders that could not ship cost Revlon $64M. A big system change needs a way back.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-saas.webp', featured: false, source: null,
    body: [
      { heading: 'What happened', text: 'Orders piled up that the company could not ship, at a cost of $64M. As widely reported, the trouble followed a major change to the systems that run operations.' },
      { heading: 'Where an independent check was missing', text: 'Big system changes are usually tested in pieces, and each piece passes. What often goes untested is the whole flow, from order to warehouse to delivery, under real volume.' },
      { heading: 'What to do differently', text: 'Move over in stages where you can, and run old and new side by side for the most important flows until the new one has proved itself.' },
    ],
  },
  {
    slug: 'hertz-website-thrown-away', category: 'SaaS & Software',
    tags: ['SaaS & Software'], status: 'editorial-preview', publishDate: null,
    title: 'Hertz: paying for a website it threw away',
    dek: 'In 2018 Hertz paid $32M for a site it discarded. Judging a digital build early is cheaper than judging it at the end.',
    author: 'Scalric Editorial', heroImage: '/assets/photos/insight-saas.webp', featured: false, source: null,
    body: [
      { heading: 'What happened', text: 'Hertz spent $32M on a new website that it ultimately discarded rather than launch.' },
      { heading: 'Where an independent check was missing', text: 'In long projects the supplier reports progress and the client mostly sees status reports. Without someone independent looking at the actual product, the gap between what is reported and what exists can grow unseen.' },
      { heading: 'What to do differently', text: 'Break a large build into releases that real users can try within weeks. If the first release does not work, the cost is small and the lesson is early.' },
    ],
  },
];

export const proposedIndustries = [
  { title: 'Financial services', image: '/assets/photos/finance-trading.webp', text: 'Explore opportunities across digital services, data and operations.' },
  { title: 'Healthcare & life sciences', image: '/assets/photos/ind2-healthcare.webp', text: 'Consider how connected information can support better experiences.' },
  { title: 'Manufacturing', image: '/assets/photos/ind2-manufacturing.webp', text: 'Examine the role of intelligence and automation in complex operations.' },
  { title: 'Retail & consumer', image: '/assets/photos/ind2-retail.webp', text: 'Connect customer insight with the systems that serve demand.' },
  { title: 'Public sector', image: '/assets/photos/ind2-public.webp', text: 'Design technology around accessible, dependable services.' },
  { title: 'Emerging businesses', image: '/assets/photos/ind2-emerging.webp', text: 'Build the digital foundations that support a changing market.' },
];

export const openRoles = [];

export const pagesForSearch = [
  ['What We Do', '/what-we-do'], ['Industries', '/industries'], ['Insights', '/insights'],
  ['Company', '/company'], ['Careers', '/careers'], ['Contact', '/contact'],
];


export const proofStats = [
  { value: 500, suffix: '+', label: 'Businesses targeted', sub: 'Discounted digital and SaaS support', verified: false },
  { value: 100, suffix: '+', label: 'NGOs targeted', sub: 'Technology and digital support, pro bono', verified: false },
  { value: 1000, suffix: '+', label: 'Impact target', sub: 'Long-term goal for the initiative', verified: false },
];

export const dashboardKpis = [
  ['Outcomes tracked', '24', 'Six added this quarter'],
  ['Stakeholders aligned', '8', 'Across three workstreams'],
  ['Milestones on plan', '92%', 'Reviewed weekly'],
];
export const dashboardMilestones = [
  ['Discovery', 'Complete', 'ok'],
  ['Strategy', 'In review', 'warn'],
  ['Build', 'In progress', 'ok'],
  ['Launch readiness', 'Scheduled', 'idle'],
];
export const dashboardTrend = [12, 18, 16, 24, 22, 31, 29, 38, 41, 39, 47, 55];
export const dashboardNav = ['Overview', 'Roadmap', 'Outcomes', 'Reports'];

export const workstreams = [
  ['Product direction', 82], ['Data foundations', 64], ['AI use-case design', 47], ['Operating model', 33],
];

export const workingPrinciples = [
  ['Outcome-first', 'Every engagement is framed around a measurable goal, not generic activity metrics.'],
  ['Full transparency', 'Regular reporting, live visibility and open conversations throughout.'],
  ['Realistic timelines', 'Honest expectations up front, with visible progress along the way.'],
  ['One point of contact', 'A dedicated lead for continuity, consistency and quality.'],
];

export const processSteps = [
  ['Discovery', 'We start with your business, your users and the goals behind the request. No assumptions.'],
  ['Audit & research', 'We examine what exists today: systems, customers, competitors and where the real opportunities sit.'],
  ['Custom strategy', 'A prioritised roadmap with realistic timelines and measurable targets.'],
  ['Execution', 'Specialist teams build in tested, iterative releases, with attention to detail at every step.'],
  ['Monitor & optimise', 'We track results, learn from real data and refine the approach as we go.'],
  ['Report & scale', 'Clear reviews, and a plan to scale what is working.'],
];

export const sectorsServed = [
  'Real estate', 'E-commerce', 'Healthcare & clinics', 'Education & coaching', 'B2B & manufacturing',
  'Travel & hospitality', 'Legal & consulting', 'Retail', 'Fitness & wellness', 'Home services',
];

/** Delivery journey shown on the home page. Each step: kicker, title, summary and key deliverables. */
export const journeySteps = [
  { kicker: 'Understand', title: 'Discovery', text: 'We learn how your business, customers, competitors and goals fit together before any solution is shaped.', points: ['Stakeholder interviews', 'Market and competitor review', 'Success criteria agreed'] },
  { kicker: 'Direct', title: 'Strategy', text: 'Insight becomes a prioritised plan, with clear options, trade-offs and measurable targets.', points: ['Opportunity assessment', 'Prioritised roadmap', 'Measurable outcomes'] },
  { kicker: 'Define', title: 'Requirements', text: 'Working sessions turn ambitions into a clear, agreed scope: what the product must do, for whom, and why.', points: ['Workshops with decision-makers', 'User journeys and scope', 'Agreed requirements document'] },
  { kicker: 'Collaborate', title: 'Client interaction', text: 'You stay close to the work through shared workspaces, regular reviews and one accountable lead.', points: ['Shared project workspace', 'Regular review sessions', 'One accountable point of contact'] },
  { kicker: 'Build', title: 'Development', text: 'Design and engineering move in short, tested iterations, so progress is visible and feedback is built in.', points: ['Architecture and UX design', 'Iterative, tested releases', 'Quality and security checks'] },
  { kicker: 'Deliver', title: 'The perfect product', text: 'We validate with real users, launch in phases and keep refining until the product delivers the outcome you set out to achieve.', points: ['User validation', 'Phased launch', 'Outcome tracking and refinement'] },
];
