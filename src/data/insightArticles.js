/**
 * Full article copy for each insight, keyed by slug. Each entry has a lead paragraph, sections of one or more paragraphs,
 * and a short list of key takeaways. These are editorial previews written in general terms: no client names or statistics.
 */
export const articleContent = {
  'from-data-to-decisions': {
    lead: 'Most organizations already hold more data than they use. The gap is rarely storage or tooling; it is the missing link between a number and the choice someone has to make on Monday morning.',
    sections: [
      ['A better question to start with', 'The value of data is measured in the decisions it helps people make. Begin by listing the decisions that matter most: which customers to prioritise, where to invest, what to fix first.', 'Then work backwards. For each decision, ask what a good answer would look like, what information would change it, and who needs to see that information in time to act.'],
      ['Connect the operating model', 'Technology choices matter, but so do trusted definitions, clear accountability and the routines that turn insight into action. A dashboard nobody owns becomes a poster on the wall.', 'Give each important measure an owner, a plain-language definition and a regular moment where it is reviewed and acted on.'],
      ['Bring people and data into the same room', 'Analysts understand what the data can say; operators understand what is actually happening on the ground. Decisions improve when both are part of the conversation early, not after a report is finished.', 'Short, regular working sessions beat long reports. They surface questions while there is still time to answer them.'],
      ['Build for learning', 'A useful data capability improves through use. Start with one focused outcome, watch what changes, and expand the approach once it has proved its value.', 'Treat every release as a small experiment: what did we expect, what happened, and what will we do differently next time?'],
    ],
    takeaways: ['Start from the decision, not the dataset.', 'Give every key measure an owner and one definition.', 'Keep analysts and operators working together.', 'Begin small, learn, then expand.'],
  },
  'ai-with-purpose': {
    lead: 'Almost every organization is being asked what it is doing with AI. The more useful question is what problem it is trying to solve, and whether AI is the right tool for it.',
    sections: [
      ['Frame the problem first', 'AI works best when it is pointed at a clear business problem: a slow process, a costly error, a decision that takes too long. Starting from the technology tends to produce demos rather than outcomes.', 'Write the problem in one sentence, name who feels it and describe what better would look like. If that is hard to do, the idea is not ready yet.'],
      ['Move from possibility to operating value', 'A prototype shows what is possible; operating value comes from fitting the result into daily work. That means integrating with existing systems, agreeing who reviews the output and deciding what happens when it is wrong.', 'Plan for these steps from the beginning. They are usually the largest part of the effort.'],
      ['Choose measures that reflect the work', 'Technical accuracy is only part of the picture. Measure time saved, errors avoided, customer response or the quality of decisions, whichever the original problem called for.', 'Agree on the measure before building so the result can be judged on evidence rather than enthusiasm.'],
      ['Keep a clear path to scale', 'Start with a contained use case, learn what works, then extend carefully. Each step should leave behind reusable foundations: data access, review routines, monitoring and guidance for the people involved.', 'This turns individual projects into a capability the organization can build on.'],
    ],
    takeaways: ['Begin with a business problem, not a model.', 'Plan integration and review from day one.', 'Measure outcomes that matter to the work.', 'Scale in steps, reusing what you learn.'],
  },
  'automation-and-the-customer-journey': {
    lead: 'Customers do not experience your organization as a set of departments. They experience a journey, and every manual hand-off, repeated question and lost detail makes that journey harder.',
    sections: [
      ['See the whole journey', 'Map what a customer actually goes through, from first enquiry to ongoing support. Include the waiting, the repetition and the moments where they have to chase for an update.', 'These friction points, not individual tasks, are where automation earns its place.'],
      ['Remove the repeated work', 'Look for information that people type more than once, requests that wait in queues and reminders that depend on memory. These are good candidates for simple, reliable automation.', 'Small automations that work every time are worth more than ambitious ones that need constant attention.'],
      ['Keep the human moments human', 'Automate the routine so people have more time for the conversations that need judgement and care. Customers notice the difference between efficient and impersonal.', 'Make it easy to reach a person at the points where the situation is unusual or emotional.'],
      ['Measure the experience, not just the process', 'Track how long customers wait, how often they need to repeat themselves and how many issues are resolved first time. These show whether the whole journey is getting simpler.', 'Use them to decide what to improve next.'],
    ],
    takeaways: ['Design around the journey, not the departments.', 'Automate repeated work first.', 'Protect the moments that need a person.', 'Measure how the experience feels to customers.'],
  },
  'saas-products-built-around-the-task': {
    lead: 'People keep using software when it makes a specific job easier. Features that sit beside the job, however impressive, tend to be ignored.',
    sections: [
      ['Start with the task', 'Describe the job your users are trying to get done, in their words. What triggers it, what gets in the way and what does a good result look like?', 'Every screen and setting should earn its place by helping with that task.'],
      ['Make the first use effortless', 'The first few minutes decide whether someone returns. Reduce the steps to a first useful result, and explain what is needed only when it is needed.', 'A simple, confident start builds trust in the rest of the product.'],
      ['Design for repeat use', 'Products that stick fit into a routine. Think about what people do daily or weekly, and make those paths fast, predictable and forgiving of mistakes.', 'Shortcuts, saved choices and clear status updates add up over hundreds of uses.'],
      ['Let usage guide the roadmap', 'Watch where people succeed and where they stall. Combine what they say with what they do, and let that evidence shape what you build next.', 'The result is a product that grows with the work it supports.'],
    ],
    takeaways: ['Define the job before the feature.', 'Make the first use quick and clear.', 'Optimise the paths people repeat.', 'Prioritise using real usage evidence.'],
  },
  'cloud-foundations-that-grow': {
    lead: 'A cloud platform is easy to start and surprisingly hard to untangle later. The choices made in the first few months tend to shape what the business can do for years.',
    sections: [
      ['Set a few clear principles', 'Agree how environments are organised, how access is granted and how changes reach production. A short set of shared rules prevents each team from inventing its own.', 'Keep them simple enough that people actually follow them.'],
      ['Build security in from the start', 'Identity, access and data protection are far easier to design early than to retrofit. Use the smallest permissions that let people do their work, and make sensitive actions visible.', 'Good defaults protect the organization without slowing teams down.'],
      ['Automate repeatable work', 'Describe infrastructure in code so environments can be created, reviewed and rebuilt in a consistent way. It reduces surprises and makes recovery faster.', 'The same habit makes it easier to add new teams and services as the business grows.'],
      ['Plan for growth and change', 'Choose services and designs that can scale up and be adapted without a rewrite. Revisit the foundations regularly as needs evolve.', 'A platform that grows gracefully lets the business move faster rather than slowing it down.'],
    ],
    takeaways: ['Agree a few shared rules early.', 'Treat security as a foundation, not an add-on.', 'Describe infrastructure as code.', 'Review the platform as the business changes.'],
  },
  'responsible-ai-in-daily-operations': {
    lead: 'Responsible AI is not a separate project. It is a set of everyday habits that keep systems useful, fair and understandable once they are part of the working day.',
    sections: [
      ['Be clear about purpose and limits', 'Document what each AI-assisted process is for, what information it uses and where it should not be relied on. Make this easy for staff and customers to find.', 'Clear boundaries reduce misuse and build confidence.'],
      ['Keep people accountable', 'Decide who is responsible for outcomes, who can override a result and how concerns are raised. Technology can support a decision, but a person remains accountable for it.', 'Make escalation simple and expected.'],
      ['Check quality on an ongoing basis', 'Performance changes as data and conditions change. Review samples of results regularly, look for patterns of error and record what you learn.', 'Small, routine checks catch problems long before they become incidents.'],
      ['Handle information with care', 'Limit the data used to what is needed, protect it properly and be open about how it is handled. Respecting privacy is part of delivering a trustworthy service.', 'Good practice here also makes the system easier to explain and maintain.'],
    ],
    takeaways: ['State the purpose and limits of each use.', 'Keep a named person accountable.', 'Review results routinely, not only at launch.', 'Use only the information you need.'],
  },
  'trusted-data-before-dashboards': {
    lead: 'A dashboard is only as persuasive as the numbers behind it. When people doubt the data, they stop using the tool, however polished it looks.',
    sections: [
      ['Agree what the numbers mean', 'Settle definitions for the handful of measures that matter most, such as what counts as an active customer or a completed order. Write them down where everyone can see them.', 'Shared definitions end the meetings spent arguing about whose figure is right.'],
      ['Know where data comes from', 'Track how each important figure is produced: the source, the transformations and the owner. When something looks wrong, the answer should be quick to find.', 'This visibility is what turns data into something people are willing to rely on.'],
      ['Fix quality at the source', 'Most problems start where data is entered or collected. Simple checks, clearer forms and feedback to the people who enter the data prevent errors rather than cleaning them up later.', 'The effort pays back every time the data is used.'],
      ['Then build the dashboard', 'With trusted definitions and reliable sources, a dashboard can be simple and quick to build. Design it around the decisions it supports.', 'Showing fewer measures that people trust beats showing many they question.'],
    ],
    takeaways: ['Define the key measures once, clearly.', 'Make the origin of each figure traceable.', 'Improve data where it is captured.', 'Build dashboards last, and keep them focused.'],
  },
  'pricing-as-product-design': {
    lead: 'Pricing is part of the product. It shapes who signs up, how they use the software and whether they stay, so it deserves the same care as any feature.',
    sections: [
      ['Price around the value customers receive', 'Look for the measure that rises as customers get more benefit, such as people supported, work completed or volume handled. When price follows value, customers feel it is fair.', 'It also aligns your success with theirs.'],
      ['Keep the structure easy to understand', 'Customers should be able to explain your pricing to a colleague in a sentence or two. A few clear options usually serve better than a long list of variations.', 'Simplicity reduces hesitation and sales effort alike.'],
      ['Make the next step obvious', 'Think about how customers move from a trial or small plan to a larger one. The upgrade should feel like a natural response to growth, not a penalty.', 'Be transparent about what changes at each step.'],
      ['Treat pricing as something you learn from', 'Watch which plans people choose, where they hesitate and what they ask about. Make small, deliberate changes and review the effect.', 'Over time the structure becomes a reflection of how customers really use the product.'],
    ],
    takeaways: ['Link price to the value customers gain.', 'Keep options few and clear.', 'Design the upgrade path deliberately.', 'Review and adjust based on evidence.'],
  },
  'automating-the-exceptions': {
    lead: 'Routine cases are the easy part of automation. The real test of a process is how it handles the exceptions, the cases that do not fit the rules.',
    sections: [
      ['Expect that exceptions will happen', 'Every process has unusual cases. Plan for them at the design stage rather than discovering them in production, so that they have a defined route instead of an improvised one.', 'List the likely exceptions and decide who handles each.'],
      ['Make exceptions visible', 'Route unusual items to a clear queue with the context needed to decide quickly. Hidden or silent failures are far more costly than visible ones.', 'Good visibility keeps small issues small.'],
      ['Give people the right information', 'When a case is handed over, include what the system did, what it could not determine and what is needed next. People should not have to start from scratch.', 'This keeps resolution times short and customers informed.'],
      ['Use exceptions to improve the process', 'Review exception patterns on a regular basis. Frequent ones may justify a new rule, a better form or a change upstream.', 'Over time, the process becomes more robust and the exceptions become rarer.'],
    ],
    takeaways: ['Design the exception path from the beginning.', 'Surface unusual cases clearly.', 'Hand over with full context.', 'Learn from exception patterns.'],
  },
  'observability-knowing-what-your-systems-do': {
    lead: 'You cannot improve systems you cannot see. Good monitoring turns incidents into learning and gives teams the confidence to change things.',
    sections: [
      ['Measure what users experience', 'Track response times, errors and completed tasks from the user’s point of view, not only server health. A system can look healthy while users struggle.', 'Start with the few journeys that matter most to the business.'],
      ['Make logs and traces useful', 'Structured logs and traces tied to a single request make it much faster to find the cause of a problem. Consistent naming and context pay off when time is short.', 'Aim for the ability to follow one request through every service it touches.'],
      ['Alert on what needs action', 'Too many alerts teach people to ignore them. Choose a small set of signals that clearly indicate a problem worth acting on, and agree who responds.', 'Quiet, meaningful alerts keep teams alert for the real thing.'],
      ['Plan for incidents and learn from them', 'Agree on thresholds, owners and a short review routine so that each incident leads to a specific improvement.', 'A blame-free review that results in one concrete change is worth more than a long report.'],
    ],
    takeaways: ['Measure from the user’s point of view.', 'Connect logs and traces to single requests.', 'Keep alerts few and meaningful.', 'Turn every incident into an improvement.'],
  },
  'metrics-people-actually-use': {
    lead: 'A good measure answers a question someone is already asking. When a metric exists only because it is easy to count, it quietly drops out of use.',
    sections: [
      ['Start from the decision', 'List the decisions a team makes each week, then choose the few numbers that would change what they do. If a measure would not change any decision, it is probably not needed.', 'This keeps the set small and relevant.'],
      ['Agree on one definition', 'When two teams define the same metric differently, trust drops quickly. Write the definition once, include how it is calculated, and share it widely.', 'A single source makes conversations about the number far more productive.'],
      ['Show context, not just a figure', 'A number is easier to act on when it is compared with a target, a previous period or a similar group. Add the context people need to judge whether it is good or bad.', 'Simple comparisons often tell the story better than complex charts.'],
      ['Review and retire', 'Revisit measures regularly. Remove the ones nobody acts on so the important ones stay visible.', 'A shorter list that people use is better than a long list that people ignore.'],
    ],
    takeaways: ['Tie each metric to a decision.', 'Define it once and share it.', 'Add context so people can act.', 'Retire measures that are no longer used.'],
  },
  'choosing-the-first-ai-use-case': {
    lead: 'The first AI project sets the tone for everything that follows. A well-chosen one builds confidence and skills; a poorly chosen one makes the next approval harder.',
    sections: [
      ['Look for repeatable work', 'Tasks that follow a pattern, use available information and have a clear definition of done are good candidates. Examples include sorting requests, drafting standard replies or summarising long documents.', 'Avoid starting with something that depends on rare judgement or sensitive decisions.'],
      ['Keep people in charge', 'Design the first release so a person reviews the output before it is used, and capture where they make corrections. Those corrections are valuable feedback.', 'This approach also helps staff build trust in the tool.'],
      ['Check the information is ready', 'AI is only as useful as the information it can reach. Make sure the data or documents are accessible, reasonably accurate and permitted for this use.', 'Fixing this early avoids delays later.'],
      ['Decide how you will know', 'Agree on what success looks like before building, such as time saved or fewer errors, so that the result can be judged on evidence.', 'Share the outcome openly, including what did not work, to guide the next step.'],
    ],
    takeaways: ['Pick bounded, repeatable work.', 'Start with human review.', 'Confirm the information is ready.', 'Define success before you build.'],
  },
  'people-in-the-loop-automation': {
    lead: 'Automation works best when it handles the routine and hands the unusual to a person with the right context. Knowing when to hand over is a design choice, not an afterthought.',
    sections: [
      ['Map the routine and the exception', 'Separate the steps that always follow the same rules from those that need judgement. The first group is a natural fit for automation; the second needs people.', 'Be honest about where the boundary really lies.'],
      ['Make the handover clear', 'When work moves to a person, include what has been done, what is uncertain and what is needed next. A clear summary saves time and avoids repeated questions.', 'Think of it as handing a colleague a well-prepared file.'],
      ['Give people the controls', 'Allow staff to pause, correct or override automated steps without needing specialist help. Control builds trust and keeps quality high.', 'It also gives you valuable signals about where the automation can improve.'],
      ['Learn from the exceptions', 'Each exception shows where the process or the rules can improve. Review them on a regular rhythm and decide which should become part of the automation.', 'Over time the balance shifts as the system learns what it can safely handle.'],
    ],
    takeaways: ['Separate rule-based steps from judgement calls.', 'Hand over with full context.', 'Let people pause and override.', 'Review exceptions to refine the system.'],
  },
  'unanswered-clinic-calls': {
    lead: 'The number to keep in mind is 32%: that share of clinic calls goes unanswered. Each one is a patient who wanted an appointment or an answer and did not get one.',
    sections: [
      ['Why calls go missing', 'Reception teams are rarely careless. They are helping someone at the desk, handling a payment or stepping away for lunch when the phone rings. Calls cluster in the morning, at lunchtime and just after closing, which is exactly when staff are busiest or gone.', 'A caller who reaches voicemail often rings the next clinic instead. The cost is not one missed call but a patient who may never come back.'],
      ['What an AI phone agent can take on', 'An AI phone agent answers straight away, asks the reason for the call, offers open appointment slots and handles routine questions such as opening hours, location and how to prepare for a visit. It can book the visit and send a confirmation by text.', 'Anything urgent, sensitive or unclear should pass to a person quickly, with the details already captured so the caller does not have to repeat themselves.'],
      ['Reminders close the other gap', 'Getting the booking is only half of it. Text reminders help patients turn up: in a set of 21 clinic studies, missed visits fell from 21% to 15% once reminders were in place.', 'Reminders also give patients an easy way to confirm or rearrange, which frees the slot for someone else.'],
      ['Start small and keep people in charge', 'Begin with the calls that are hardest to staff, such as after hours or lunchtime. Agree what the agent may say, when it hands over and how patient information is protected.', 'Read a sample of calls every week. The first month shows which questions come up most and which hand-offs need smoothing.'],
    ],
    takeaways: ['32% of clinic calls go unanswered; each is a lost chance to help.', 'An AI phone agent can answer, book and confirm routine calls.', 'Text reminders cut missed visits (21% to 15% across 21 clinic studies).', 'Start with after-hours calls and review conversations weekly.'],
  },
  'booking-more-calls-in-home-services': {
    lead: 'For electricians, plumbers and other home-service teams, the phone is the shop front. When it goes unanswered, the job goes to whoever picks up next. In one example, calls booked rose from 50% to 80% after adding an AI agent.',
    sections: [
      ['The phone is the shop front', 'Most home-service work still starts with a call, and callers want an answer now: a leak, a power cut, a broken boiler. Someone on a ladder or under a sink cannot take it.', 'A missed call is rarely followed by a voicemail and a patient wait. The caller simply tries the next number on the list.'],
      ['What the agent does', 'The agent answers every call, asks what is wrong, collects the address and how urgent it is, and offers the next free slot. It can then text the customer a confirmation with the time and the visit details.', 'Riley Plumbing is one example of the effect: calls booked went from under 50% to 80% once the agent was answering.'],
      ['Keep the human parts human', 'Quotes for bigger jobs, emergencies and anything that sounds unusual should go straight to a person. The agent’s job is to catch the call and gather the facts, not to replace the tradesperson’s judgement.', 'Decide in advance which words or situations trigger an immediate hand-over, and test them with real call examples.'],
      ['Measure calls booked', 'The simplest measure is the share of calls that end in a booked visit. Track it before the change and after, and look at when the remaining unbooked calls happen.', 'If most of them arrive at the same times, that tells you where staffing or opening hours need attention next.'],
    ],
    takeaways: ['Calls booked rose from 50% to 80% in one home-services example.', 'Answer every call, collect the job details, offer a slot.', 'Send emergencies and quotes straight to a person.', 'Track the share of calls that end in a booking.'],
  },
  'the-app-behind-the-order': {
    lead: 'Starbucks is far larger than most cafés, but one number shows what an ordering app can do: 33% of its US orders come through the app. The ideas behind that number scale down.',
    sections: [
      ['Ordering ahead removes friction', 'Customers who can order and pay before they arrive skip the queue and the decision made under pressure. For the café, orders arrive in an orderly stream instead of a rush at the counter.', 'Saved favourites matter as much as speed. A repeat customer can reorder in a couple of taps.'],
      ['Loyalty gives a reason to come back', 'A simple points or stamp scheme inside the same app means every order builds towards something. It also tells the business who its regulars are and what they like.', 'Keep the reward easy to understand. A scheme customers cannot explain to a friend is not working.'],
      ['What a smaller place can take from it', 'A local restaurant does not need a flagship app to benefit. A branded ordering page with saved orders and a basic loyalty scheme captures most of the value.', 'Own the customer relationship where you can: your own channel keeps the customer’s details and avoids paying a commission on every repeat order.'],
      ['Start with the busiest hour', 'Pick the time of day when queues are longest and put ordering ahead in front of it first. Measure how many orders arrive that way and how the queue changes.', 'Once the habit forms in one slot, extend it to the rest of the day.'],
    ],
    takeaways: ['33% of Starbucks US orders come through its app.', 'Ordering ahead and saved favourites remove friction.', 'Loyalty rewards should be simple enough to explain in a sentence.', 'Start with the busiest hour, then grow.'],
  },
  'branded-apps-for-gyms-and-studios': {
    lead: 'For classes and sessions, booking is the product’s front door. In one example, 62% of bookings came through the studio’s own branded app, a sign of how quickly members adopt a booking tool that is easy to use.',
    sections: [
      ['Booking is the front door', 'Members want to see what is on, reserve a place and cancel in a few seconds. Every extra step, such as a phone call, an email or a message to a coach, is a reason to skip the session.', 'An app that shows live availability replaces dozens of small back-and-forth messages with one tap.'],
      ['What a branded app adds', 'Because the app belongs to the studio, it carries the studio’s name, timetable, memberships and notices. Members find class reminders, waiting-list updates and changes in one place.', 'It also gives the studio a direct line to members without relying on a third-party marketplace.'],
      ['Make the first booking effortless', 'The first booking decides whether the habit forms. Keep sign-up short, show the next available class on the first screen and confirm instantly.', 'A reminder shortly before each class lowers no-shows and lets the studio fill cancelled places from the waiting list.'],
      ['Measure what members actually use', 'Track the share of bookings made in the app, the no-show rate and how often waiting lists are filled. These show whether the app is carrying the load.', 'If a large share still comes in by phone, ask those members what stops them using the app.'],
    ],
    takeaways: ['62% of bookings came through a branded app in one case.', 'Live availability and one-tap booking beat phone and email.', 'Keep first-time sign-up short and confirm instantly.', 'Track in-app share, no-shows and waiting-list fills.'],
  },
  'replying-to-every-review': {
    lead: 'A review is read by the next customer long before they ever call. The figure to remember is 80%: that share of people pick businesses that reply to every review.',
    sections: [
      ['Replies are read by future customers', 'A reply is written to the reviewer, but the audience is everyone who reads the page afterwards. A calm, specific answer to a complaint says more about a salon than the complaint does.', 'Replying to praise matters too. A short thank-you shows that someone is paying attention.'],
      ['Make replying part of the routine', 'The reason replies slip is simple: nobody owns them. Give the task to one person, set aside a short slot each day and use a few reply templates as starting points rather than finished text.', 'Light automation can alert the team when a new review arrives and draft a first reply for a person to check and send.'],
      ['Connect reviews to booking', 'The best moment to ask for a review is just after a good visit, and the easiest place is the booking and confirmation message. A link in the thank-you text turns happy customers into reviews.', 'Booking and review replies feed each other: more visits create more reviews, and visible replies bring more bookings.'],
      ['Handle the hard ones well', 'For a negative review, thank the person, acknowledge what went wrong without arguing and offer a way to continue the conversation privately. Keep it short and never defensive.', 'Review the complaints each month; patterns point to a fix in the process, not just in the reply.'],
    ],
    takeaways: ['80% of people pick businesses that reply to every review.', 'Give review replies a single owner and a daily slot.', 'Use booking confirmations to ask for reviews.', 'Answer negative reviews briefly, calmly and without arguing.'],
  },
  'target-canada-exit': {
    lead: 'In 2015 Target left Canada, and the loss came to $5.4B. Behind a number that size sit many decisions, but one thread runs through accounts of the episode: the technology and data that keep stores stocked were not trusted enough before the stores opened.',
    sections: [
      ['What happened', 'Target entered Canada with a fast roll-out of stores and left in 2015 with a loss of $5.4B. As widely reported at the time, stock and supply-chain problems left customers facing gaps on the shelves.', 'When a retailer cannot reliably show customers what it sells, they stop coming, and recovery is slow.'],
      ['Where an independent check was missing', 'A supply chain runs on data: what each product is, how it is packed, how much is on hand and when more arrives. If that data is wrong, every system built on it is wrong too, however modern the software looks.', 'An outside review of data quality and system readiness, done before launch and with the power to delay it, is the check that gets skipped when the schedule is tight.'],
      ['What to do differently', 'Treat data accuracy as a launch condition. Test the whole chain from supplier to shelf on a small number of locations before expanding, and fix what the pilot shows.', 'Set simple go or no-go measures, such as the share of products with correct records, and let someone outside the delivery team confirm them.'],
      ['Grow in steps', 'A staged roll-out turns a possible $5.4B surprise into a series of small, recoverable ones. Each step teaches the team something the plan could not.', 'Speed to market matters, but speed with unreliable data only moves the problem to customers.'],
    ],
    takeaways: ['The 2015 exit from Canada cost Target $5.4B.', 'Data accuracy is a launch condition, not a clean-up task.', 'Pilot the full supply chain on a few locations first.', 'Let someone outside the delivery team confirm readiness.'],
  },
  'southwest-holiday-breakdown': {
    lead: 'The holiday breakdown at Southwest Airlines in 2022 cost $1.2B. Weather started it, but the lasting damage came from systems that could not recover quickly once the disruption spread.',
    sections: [
      ['What happened', 'Over the 2022 holiday period a wave of disruption turned into a system breakdown, and the airline lost $1.2B. Travellers were stranded, and the operation took days to return to normal.', 'The cost was not only refunds and compensation. It was trust, in a business where customers plan around the one week they most need the service to work.'],
      ['Where an independent check was missing', 'Systems are usually tested on ordinary days. The question that decides resilience is what happens on the worst day, when many things fail together and people need the tools most.', 'An independent stress test, which deliberately simulates a large disruption and watches where the tools and the manual workarounds break, is the check that finds the weak point before the weather does.'],
      ['What to do differently', 'Identify the few systems the whole operation depends on, and rehearse their failure. Keep a manual fallback that people have actually practised, not one that exists only on paper.', 'Measure recovery time, not just uptime: how long does it take to get back to normal after a bad day?'],
      ['Invest before the crisis', 'Upgrades to critical systems are easy to defer because nothing visibly breaks until it does. Putting a price on a bad day, such as the $1.2B here, makes the case for investing ahead of it.', 'Review the list of critical systems every year and ask which ones would hurt most if they failed at the busiest moment.'],
    ],
    takeaways: ['The 2022 holiday breakdown cost Southwest $1.2B.', 'Test the worst day, not the average day.', 'Practise the manual fallback.', 'Track recovery time as well as uptime.'],
  },
  'knight-capital-one-morning': {
    lead: 'In 2012 Knight Capital lost $440M in one morning because of bad code. It is one of the clearest examples of how little time it takes for a software mistake to become a financial one.',
    sections: [
      ['What happened', 'A faulty software release reached live trading in 2012. Within a single morning the firm had lost $440M.', 'Trading systems act in fractions of a second and at scale, so a mistake does not wait for a human to notice. By the time it is seen, the damage is done.'],
      ['Where an independent check was missing', 'The risk sat in the release itself: how the new code was put live, whether every system received the same version and whether anyone could stop it quickly once it misbehaved.', 'An independent review of the release process, with a checklist signed off by someone who did not write the change, is cheap compared with $440M.'],
      ['What to do differently', 'Release in small steps and watch each one. Use a kill switch that anyone on the team can pull, and set limits that stop the system automatically when behaviour looks wrong.', 'Rehearse the rollback. A team that has practised undoing a release acts in minutes rather than debating in the middle of an incident.'],
      ['Match the care to the stakes', 'The more money or safety a system controls, the more checks its releases deserve. That applies to a trading platform, a payments flow or anything customers rely on.', 'Make the release process boring on purpose: repeatable, reviewed and reversible.'],
    ],
    takeaways: ['One morning of bad code cost Knight Capital $440M.', 'Have a second person review how a release goes live.', 'Add automatic limits and a kill switch.', 'Practise rollback before you need it.'],
  },
  'zillow-offers-pricing-model': {
    lead: 'Zillow Offers lost $422M in one quarter of 2021 on a pricing model loss. A model that can buy things is a different kind of tool from a model that only informs a report, and it needs a different level of scrutiny.',
    sections: [
      ['What happened', 'Zillow Offers relied on a pricing model to set the prices it paid, and in the third quarter of 2021 the losses from that model reached $422M.', 'The model did what it was built to do: produce prices. The problem was that the prices were then acted on at scale, so any error was multiplied by every purchase.'],
      ['Where an independent check was missing', 'A model is only as good as the conditions it was built in. When the market shifts, a model trained on earlier patterns can be confidently wrong, and the people closest to it may be the last to question it.', 'An independent challenge function, whose job is to ask when the model would fail and how that would show up early, is the check that was needed.'],
      ['What to do differently', 'Set limits on how much a model can commit before a person reviews the results, and compare its predictions with outcomes continuously rather than quarterly.', 'Define in advance what would make you pause: a run of misses, a widening gap between forecast and result, or a sudden change in the market.'],
      ['Keep a person accountable', 'Someone should own the decision to keep a model running and have the authority to switch it off. Without a named owner, a model keeps running because nobody is responsible for stopping it.', 'The goal is not to distrust models but to give their output the same scrutiny as any other large financial decision.'],
    ],
    takeaways: ['A pricing model loss cost Zillow Offers $422M in Q3 2021.', 'A model that spends money needs independent challenge.', 'Compare forecasts with outcomes all the time.', 'Name an owner who can pause the model.'],
  },
  'revlon-orders-it-could-not-ship': {
    lead: 'In 2018 Revlon could not ship orders it had already taken, and the cost came to $64M. A business that cannot deliver what it has sold loses twice: the revenue now and the customers later.',
    sections: [
      ['What happened', 'Orders piled up that the company could not ship, at a cost of $64M. As widely reported, the trouble followed a major change to the systems that run operations.', 'When the systems that plan, make and ship products change all at once, small mismatches show up as stopped production lines and waiting customers.'],
      ['Where an independent check was missing', 'Big system changes are usually tested in pieces, and each piece passes. What often goes untested is the whole flow, from order to warehouse to delivery, under real volume.', 'An independent readiness review that asks what happens if the new system is slower, wrong or down on day one, and checks that there is a plan for each, is the safeguard that is easy to skip.'],
      ['What to do differently', 'Move over in stages where you can, and run old and new side by side for the most important flows until the new one has proved itself.', 'Decide before the switch what would trigger a rollback, and keep the old path available until that point has passed.'],
      ['Protect the customer first', 'Whatever else happens in a migration, the customer should still get the order. Identify the handful of flows that must never stop and give them the most testing and the closest watching.', 'Plan extra support for the first weeks. The problems that matter appear only when real orders arrive.'],
    ],
    takeaways: ['Orders that could not ship cost Revlon $64M in 2018.', 'Test the whole order-to-delivery flow, not only the parts.', 'Run old and new side by side where possible.', 'Agree rollback triggers before go-live.'],
  },
  'hertz-website-thrown-away': {
    lead: 'Hertz paid $32M in 2018 for a website it ended up throwing away. The sum is smaller than the other cases here, but the pattern is familiar: a long digital project judged only at the end.',
    sections: [
      ['What happened', 'Hertz spent $32M on a new website that it ultimately discarded rather than launch.', 'A build that big is rarely a single failure. It is months of work in which early warning signs were either missed or were not acted on.'],
      ['Where an independent check was missing', 'In long projects the supplier reports progress and the client mostly sees status reports. Without someone independent looking at the actual product, the gap between what is reported and what exists can grow unseen.', 'Regular working demonstrations, reviewed by someone who is not paid on delivery, show quickly whether the work is heading somewhere useful.'],
      ['What to do differently', 'Break a large build into releases that real users can try within weeks. If the first release does not work, the cost is small and the lesson is early.', 'Tie payments to working software that has passed agreed checks, not to documents or time spent.'],
      ['Decide what good looks like', 'Write down at the start what the new site must do and how that will be measured, such as booking completion or page speed. Without agreed measures, every status report can be read as success.', 'Review the plan at fixed points and be willing to stop early. Stopping at month three costs far less than stopping after $32M.'],
    ],
    takeaways: ['Hertz paid $32M for a website it threw away.', 'Ask for working demonstrations, not status reports.', 'Release small and let real users test early.', 'Pay against working software and agreed measures.'],
  },
};
