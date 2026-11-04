/**
 * Copy for the Scalric Impact detail view on the Industries page, keyed by the card's video basename
 * (public/assets/videos/<key>.mp4, thumbnail public/assets/photos/thumb-<key>.webp).
 *
 * headline   one line in sentence case (the site's TitleCase script styles it on screen)
 * lead       two sentences on how Scalric can help this trade
 * build      three [title, one sentence] pairs for "What we would build with you"
 * easier     one or two short outcomes for "What gets easier"
 * focus      optional object-position for the card thumbnail, so faces stay in frame
 *
 * Rules: no statistics, customer names, prices, timeframes or guarantees. Clinics: booking and communication only.
 */
export const impactIndustries = {
  'local-businesses': {
    headline: 'Good tools for the business you already run',
    lead: 'Through Scalric Impact, local businesses get our technology and consulting team at a discounted rate. We start with the jobs that eat into your week, like bookings, customer messages and paperwork, and build around the way you already work.',
    build: [
      ['A clear website with booking', 'Customers can see what you offer, check your opening hours and book a slot without phoning.'],
      ['Reminders and updates for customers', 'Automatic messages confirm a booking, say when the work is ready and let people know when they are due again.'],
      ['Simple job and invoice tracking', 'One place to log each job, what was done and what is still owed.'],
    ],
    easier: ['Fewer calls to answer in the middle of busy hours', 'A clearer picture of which work brings the money in'],
    focus: '45% 50%',
  },
  'practical-technology': {
    headline: 'Technology shaped around one real problem',
    lead: 'Some of the most useful tools are small ones that fix a single daily headache. We sit with the people who will use the tool, see where their time goes and build the simplest thing that helps.',
    build: [
      ['A working session with your team', 'We map the task as it happens today, including the workarounds nobody has written down.'],
      ['A focused first tool', 'A form, dashboard or small app that handles that one job properly.'],
      ['Links to what you already use', 'Where it makes sense we connect to your spreadsheets, email or accounting software, so information is typed in once.'],
    ],
    easier: ['Staff spend less time on the task that used to slow them down', 'Decisions rest on information people can actually find'],
  },
  'impact-artists': {
    headline: 'A home online for your work and your buyers',
    lead: 'Many artists juggle social posts, direct messages and bank transfers just to sell one piece. We help you set up a place where people can see your work, ask about commissions and pay in one go.',
    build: [
      ['A portfolio you can update from your phone', 'Add new pieces as you finish them and group them by series, medium or availability.'],
      ['Commission and booking requests', 'A short form asks for size, budget and deadline, so you can reply with a clear quote.'],
      ['Simple online sales', 'Sell prints or originals through a secure checkout and get an email the moment something sells.'],
    ],
    easier: ['More of your week goes into making work', 'Buyers can find you and pay you without a long message thread'],
  },
  'impact-photo-studios': {
    headline: 'Bookings, galleries and delivery in one flow',
    lead: 'Every shoot comes wrapped in admin, from the first date check to the final download. We help studios connect booking, the session and the finished gallery so clients always know what happens next.',
    build: [
      ['Session booking with deposits', 'Clients choose a session type and time, then pay a deposit to hold it.'],
      ['Private client galleries', 'Each client gets a secure link to view, favourite and download their photos.'],
      ['Print and extras ordering', 'Clients can order prints, frames or extra edits straight from their gallery.'],
    ],
    easier: ['Fewer emails about dates and file transfers', 'A studio calendar that shows what is really booked'],
  },
  'impact-event-photographers': {
    headline: 'From first enquiry to the final album',
    lead: 'Wedding and event work stretches over months, with plenty of back and forth along the way. We help you keep each couple’s package, timeline and payments together, so nothing relies on memory.',
    build: [
      ['Enquiries and package proposals', 'Couples choose their coverage and extras online and receive a clear proposal to accept.'],
      ['Contracts and staged payments', 'Contracts are signed digitally, and reminders go out before each deposit or balance is due.'],
      ['Proofing and album selection', 'Clients mark their favourites in an online gallery, and you see every choice in a single list.'],
    ],
    easier: ['Less digging through old emails to check what was agreed', 'Clients always know which payment is coming up'],
  },
  'impact-yoga': {
    headline: 'Keep classes full and students returning',
    lead: 'A yoga studio runs on a steady rhythm of classes, passes and familiar faces. We help you bring the timetable, memberships and reminders into one place your students can use from their phone.',
    build: [
      ['A live class timetable', 'Students see what is on this week, who is teaching and how many spaces are left.'],
      ['Memberships and class packs', 'Sell monthly memberships or packs of classes, with each student’s balance tracked for you.'],
      ['Gentle reminders', 'A note before class, and a friendly message to students who have not been in for a while.'],
    ],
    easier: ['Less time at the front desk ticking names off a list', 'A clearer sense of which classes your students love'],
  },
  'impact-dental': {
    headline: 'Easier booking and clearer contact with patients',
    lead: 'A dental practice depends on appointments being kept and patients returning for their check-ups. We help you set up booking, reminders and follow-ups that patients find easy and your front desk can manage.',
    build: [
      ['Online appointment booking', 'Patients pick a time that suits them, with slots matched to each clinician’s diary.'],
      ['Reminders and confirmations', 'A text or email before each visit, with a simple way to confirm or move the appointment.'],
      ['Recall of lapsed patients', 'A list of patients who are due a check-up, and a friendly message inviting them to book.'],
    ],
    easier: ['Fewer gaps in the diary from forgotten appointments', 'Reception spends less of the day on the phone'],
  },
  'impact-hair-clinics': {
    headline: 'A clear path from first question to consultation',
    lead: 'People thinking about a hair transplant often read up for a long time before they get in touch. We help you answer their questions clearly, make the consultation easy to book and keep their records handled securely.',
    build: [
      ['A consultation request flow', 'A guided form gathers the details your team needs and offers the consultation times you have free.'],
      ['Secure patient records', 'Notes, photos and documents are stored with access limited to the staff who need them.'],
      ['Clear patient communication', 'Messages before and after each appointment tell people what to bring and who to contact.'],
    ],
    easier: ['Enquiries reach the right person on your team sooner', 'Patients know where they stand at each step'],
  },
  'impact-interiors': {
    headline: 'Projects, quotes and approvals in one shared place',
    lead: 'An interior project involves a long list of small decisions, from fabric samples to the final invoice. We help you build a workspace where clients can see the plan, approve choices and follow progress.',
    build: [
      ['A project portfolio', 'Show finished rooms by style or scope, so new clients get a feel for your work before you meet.'],
      ['Itemised quotes', 'Send quotes with product images and let clients approve each item or ask for an alternative.'],
      ['A page for every project', 'A private client page holds the mood boards, decisions made so far and the next steps.'],
    ],
    easier: ['Every approval is written down where you can find it', 'Clients can check progress without needing to call'],
  },
  'impact-electrical': {
    headline: 'Jobs booked, done and paid with less paperwork',
    lead: 'Small electrical crews lose hours to phone tag, scribbled notes and invoices that wait until the weekend. We help you capture each job request, plan the week and send the invoice while you are still on site.',
    build: [
      ['Online job requests', 'Customers describe the problem, add a photo and choose a time that suits them.'],
      ['Crew scheduling', 'See who is where each day and move jobs around when an urgent call comes in.'],
      ['Quotes and invoices from your phone', 'Turn an accepted quote into an invoice and let the customer pay by card or a payment link.'],
    ],
    easier: ['Invoices can go out the same day as the job', 'Evenings spent catching up on admin get shorter'],
  },
  'impact-cafes': {
    headline: 'Give your regulars an easier way to order',
    lead: 'A neighbourhood café lives on its regulars and its morning rush. We help you add online ordering, a menu you control and simple reservations, so locals can order ahead and you can plan the day.',
    build: [
      ['Order ahead and collect', 'Customers order and pay from their phone, then pick up without joining the queue.'],
      ['A menu you can edit yourself', 'Change prices, specials and allergen notes whenever you need to.'],
      ['Bookings for brunch and groups', 'Take reservations for the busy slots while keeping tables free for walk-ins.'],
    ],
    easier: ['A calmer counter during the morning rush', 'A clearer view of what sells on which days'],
  },
  'impact-fine-dining': {
    headline: 'Calmer services and guests who feel remembered',
    lead: 'In a busy restaurant, the floor plan and the guest list shape how the whole night goes. We help you manage tables, bookings and guest notes in one system your front of house can rely on.',
    build: [
      ['Table and booking management', 'A live floor plan shows covers, timings and which tables are about to turn.'],
      ['Guest notes and preferences', 'Record allergies, favourite tables and special occasions so the team can prepare ahead.'],
      ['Deposits for larger bookings', 'Take a deposit for groups and busy dates, with clear terms that guests see when they book.'],
    ],
    easier: ['Front of house can see the whole evening at a glance', 'Returning guests get a more personal welcome'],
  },
  'impact-football': {
    headline: 'Run the club without chasing spreadsheets',
    lead: 'Grassroots football is kept going by volunteers, coaches and parents, often from a laptop full of spreadsheets. We help you bring squads, fixtures and subs together so everyone can see what is happening this week.',
    build: [
      ['Player registration', 'Parents and players sign up online, with contact and consent details kept in one place.'],
      ['Fixtures and availability', 'Publish the fixture list and let players confirm whether they can make each match.'],
      ['Subs and match fees', 'Collect fees online and see at a glance who has paid and who still owes.'],
    ],
    easier: ['Coaches know who is available well before matchday', 'Treasurers spend less time chasing payments by text'],
  },
  'impact-tennis': {
    headline: 'Book courts and lessons from one simple screen',
    lead: 'A tennis academy juggles court time, coaching groups and memberships every single week. We help you build one system where players book, coaches see their day and the office knows who has paid.',
    build: [
      ['Court booking', 'Members book courts online, with your rules for peak hours and guest players built in.'],
      ['Coaching schedules', 'Group and private lessons with coach calendars, class lists and a waiting list for popular sessions.'],
      ['Memberships and renewals', 'Annual or monthly plans with reminders that go out before each renewal.'],
    ],
    easier: ['Players, coaches and the office see the same court calendar', 'Coaches spend more of their time on court'],
  },
  'impact-dance': {
    headline: 'Classes, recitals and parent updates without the scramble',
    lead: 'Dance studios balance weekly classes with show season, costume orders and plenty of questions from parents. We help you keep sign-ups, recital plans and messages together in one place.',
    build: [
      ['Online class sign-ups', 'Families choose classes by age and level, then pay for the term in the same step.'],
      ['Recital planning', 'Track routines, costume orders and rehearsal times for every group in the show.'],
      ['Updates for parents', 'Message one class or the whole studio and keep a record of everything that went out.'],
    ],
    easier: ['Parents have the answer before they need to ask', 'Show season feels organised from the first rehearsal'],
  },
  'impact-music': {
    headline: 'Give teachers more of their week for teaching',
    lead: 'A music school has a lot of moving parts, from lesson slots and rooms to practice between lessons and termly fees. We help you organise them so students, parents and teachers all work from the same plan.',
    build: [
      ['Lesson scheduling', 'Match students to teachers and rooms, and handle a reschedule without a long chain of messages.'],
      ['Practice tracking', 'Students log their practice at home and teachers leave notes to pick up next lesson.'],
      ['Termly payments', 'Send invoices, take card payments and remind families about anything outstanding.'],
    ],
    easier: ['Parents can follow how their child is getting on', 'Teachers spend less time sorting out the timetable'],
  },
  'impact-gyms': {
    headline: 'Help members keep showing up',
    lead: 'A gym does well when members feel welcome and keep coming back. We help you run memberships, check-ins and progress tracking in a way that feels simple to staff and members alike.',
    build: [
      ['Membership sign-up and billing', 'People join online, pick a plan and manage their own payment details.'],
      ['Quick check-in', 'Members scan a code on their phone at the door, so you can see who trains and when.'],
      ['Progress tracking', 'Members and trainers record workouts and goals together in one place.'],
    ],
    easier: ['Staff can spot members who have stopped coming and get in touch', 'Fewer billing questions at the desk'],
  },
  'impact-salons': {
    headline: 'A fuller diary and clients who come back',
    lead: 'A salon depends on a well-kept appointment book and clients who return. We help you set up online booking, a calendar for each stylist and a loyalty scheme that rewards your regulars.',
    build: [
      ['Online booking by service', 'Clients choose a treatment, a stylist and a time, even after you have closed for the day.'],
      ['Stylist calendars', 'Each stylist sees their own day, with treatment lengths and breaks already built in.'],
      ['Loyalty rewards', 'Points or perks for regular visits, added automatically when a client pays.'],
    ],
    easier: ['Bookings keep arriving while the salon is closed', 'Regulars feel looked after'],
  },
};

/** The same three steps for every industry, matching the Listen, build, learn section further down the page. */
export const impactSteps = ['Tell us about the business', 'We shape a small first version together', 'We learn and improve'];

/** Basename of a card's video path, used as the key into impactIndustries. */
export const impactKey = (video = '') => video.split('/').pop().replace(/\.[a-z0-9]+$/i, '');
