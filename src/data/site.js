// All page text and media in one place.
// Edit this file to change any wording, price, agenda or image — the page updates automatically.

const M = import.meta.env.BASE_URL + 'media/';
const big = 'clamp(48px, 7.5vw, 116px)';
const mid = 'clamp(40px, 5.6vw, 84px)';

// The scroll Journey: one entry per stop.
export const journeyRaw = [
  { shot: 'Lady Justice in brass & chrome', place: 'RNSMUN 2026 · RNSIT, BENGALURU', eyebrow: 'RNSIT MODEL UNITED NATIONS · 2026', title: 'The world is in session.', line: 'Six committees, two days, one room at RNSIT. Scroll to take the floor.', size: mid, hero: true, heroImg: M + '01-justice.jpg',
    bg: '#070607' },
  { shot: 'Pull back · rise through the clouds', img: M + '02-scales.jpg', vid: M + '02-clouds.mp4', place: 'ALTITUDE 9,000 M · ASCENDING', eyebrow: 'TAKEOFF', title: 'Start at the top.', line: 'Rise above the noise, toward the rooms where the big decisions are made.', size: mid,
    bg: 'radial-gradient(60% 50% at 50% 70%, #3A0716, #070607 75%)' },
  { shot: 'FPV dive · UN Headquarters at dusk', img: M + '03-poster.jpg', vid: M + '03-un-hq.mp4', place: 'NEW YORK · 40.75° N 73.97° W', eyebrow: 'FIRST STOP · NEW YORK', title: 'It begins in New York.', line: '193 nations share one building. Our committees are modelled on its rooms.', size: mid,
    bg: 'linear-gradient(180deg, #1B0A12 0%, #4A0B22 55%, #070607 100%)' },
  { shot: 'Council chamber · from above', img: M + '04-council.jpg', place: 'NEW YORK · SECURITY COUNCIL CHAMBER', eyebrow: '01 / 06 · UN SECURITY COUNCIL', title: 'Where a crisis lands first.', line: 'A civil war splits a country in two. Which government does the world recognise?', size: mid, hasCard: true,
    agenda: 'Addressing Parallel Governments and De Facto Authorities in Civil Wars: Sovereignty, Territorial Control and International Recognition',
    bg: 'radial-gradient(50% 50% at 50% 50%, #5A0A26, #120509 80%)' },
  { shot: 'General Assembly hall · aisle glide', img: M + '05-assembly.jpg', place: 'NEW YORK · GENERAL ASSEMBLY HALL', eyebrow: '02 / 06 · DISEC', title: 'Next, the sky.', line: 'Satellites can now be targets. DISEC has to decide what the rules should be.', size: mid, hasCard: true,
    agenda: 'Regulating the Militarisation of Outer Space and the Development of Anti-Satellite (ASAT) Weapons',
    bg: 'radial-gradient(70% 60% at 50% 20%, #6B4A16, #120A06 80%)' },
  { shot: 'Palais des Nations · dawn drone approach', img: M + '06-poster.jpg', vid: M + '06-geneva.mp4', place: 'GENEVA · 46.23° N 6.14° E', eyebrow: '03 / 06 · UN HUMAN RIGHTS COUNCIL', title: 'Then to Geneva.', line: 'Freedom of expression, and the journalists reporting from conflict zones.', size: mid, hasCard: true,
    agenda: 'Safeguarding Freedom of Expression and the Safety of Journalists in Conflict and Post-Conflict Zones',
    bg: 'linear-gradient(180deg, #2A1A10 0%, #6E4A1C 60%, #0D0807 100%)' },
  { shot: 'Vienna International Centre · dusk aerial push-in', img: M + '07-poster.jpg', vid: M + '07-vienna.mp4', place: 'VIENNA · 48.23° N 16.42° E', eyebrow: '04 / 06 · UNODC', title: 'Vienna follows the money.', line: 'Trafficking and online exploitation, and the illicit money that funds them.', size: mid, hasCard: true,
    agenda: 'Combating Technology-Facilitated Human Trafficking, Online Child Exploitation, and Illicit Financial Flows',
    bg: 'radial-gradient(60% 60% at 50% 60%, #3B1A08, #070607 80%)' },
  { shot: 'Press room · camera flashes', img: M + '08-press.jpg', place: 'PRESS GALLERY · ON THE RECORD', eyebrow: '05 / 06 · INTERNATIONAL PRESS CORPS', title: 'And someone has to report it.', line: 'The Press Corps investigates, covers crises live and publishes the daily report.', size: mid, hasCard: true,
    agenda: 'Unfiltered Investigative Journalism, Real-Time Crisis Coverage, Press Conferences, and Daily Report Publications',
    bg: 'radial-gradient(40% 40% at 50% 45%, #F2ECE2 0%, #6C0D2C 40%, #070607 85%)' },
  { shot: 'Parliament of India · dusk aerial push-in', img: M + '09-poster.jpg', vid: M + '09-parliament.mp4', place: 'NEW DELHI · 28.62° N 77.21° E', eyebrow: '06 / 06 · LOK SABHA', title: 'Then it comes home.', line: 'In the Lok Sabha: after the census, how should seats and funds be shared between states?', size: mid, hasCard: true,
    agenda: 'Post-Census Delimitation and Fiscal Redistribution: Addressing Regional Representation and Inter-State Fiscal Equity',
    bg: 'linear-gradient(180deg, #3A1020 0%, #7A3A14 60%, #070607 100%)' },
  { shot: 'RNSIT auditorium at dusk', img: M + '10-rnsit.jpg', place: 'BENGALURU · 12.90° N 77.52° E', eyebrow: 'FINAL DESTINATION · RNSIT, BENGALURU', title: 'Now it’s your turn.', line: 'Take a seat at RNSIT. ₹999 for RNSIT students, ₹1,349 for external delegates, and a ₹1,00,000+ prize pool.', size: big,
    bg: 'radial-gradient(70% 60% at 50% 80%, #6C0D2C, #070607 80%)' }
];

// Real-world facts about each body (UN Charter / rules) and details from the RNSMUN brochure.
const facts = [
  ['6 committees', '2 days', '₹1,00,000+ prize pool'],
  ['Research a nation', 'Negotiate with rivals', 'Draft the resolution'],
  ['UN founded 1945', '193 member states', '6 principal organs'],
  ['15 members', '5 permanent seats with veto'],
  ['First Committee of the General Assembly', 'All 193 members', 'One nation, one vote'],
  ['47 member states', 'Created 2006', 'Meets in Geneva'],
  ['Based in Vienna', 'Guardian of the UN anti-trafficking protocol'],
  ['Investigative reporting', 'Live crisis coverage', 'Press conferences', 'Daily report'],
  ['543 elected seats', 'Seat shares frozen on the 1971 census'],
  ['Every committee session, both days', 'High tea and buffet', 'Delegate kit and certificate']
];
const codes = ['', '', '', 'UNSC', 'DISEC', 'UNHRC', 'UNODC', 'IPC', 'LOK SABHA', ''];

export const beats = journeyRaw.map((b, i) => ({
  ...b,
  i,
  n: (i + 1 < 10 ? '0' : '') + (i + 1),
  code: codes[i] || '',
  facts: facts[i] || [],
  agenda: b.agenda || ''
}));

// ---------------- Home page content below the Journey ----------------
const sp = ['KUNAFA BYTES', 'VASTRA CORE', 'MALNADS AROGYA'];
export const sponsors = sp.concat(sp, sp, sp);

export const stats = [
  { v: '06', l: 'COMMITTEES' }, { v: '02', l: 'DAYS OF DEBATE' },
  { v: '₹1L+', l: 'PRIZE POOL' }, { v: '₹999', l: 'PASSES FROM' }
];

const intro = 'Model United Nations puts you in a delegate’s seat. You research a nation, defend its interests, negotiate with rivals and draft the resolution that carries the room. No experience needed. Only the nerve to raise your placard.';
const lit = { 'nation,': 1, 'resolution': 1, 'placard.': 1 };
export const words = intro.split(' ').map((t) => ({ t, c: lit[t] ? '#D9AE52' : '#F2ECE2' }));

export const why = [
  { n: '01', t: 'Six committees', d: 'From the Security Council to the Lok Sabha, plus an International Press Corps.' },
  { n: '02', t: 'Delegates across colleges', d: 'Debate peers from campuses well beyond RNSIT.' },
  { n: '03', t: 'Experienced Executive Board', d: 'Chairs who have run committees before guide every session.' },
  { n: '04', t: '₹1,00,000+ prize pool', d: 'Awards in every committee, and a Best Delegation prize.' }
];

const full = ['UNITED NATIONS SECURITY COUNCIL', 'DISARMAMENT & INTERNATIONAL SECURITY', 'UN HUMAN RIGHTS COUNCIL', 'UN OFFICE ON DRUGS AND CRIME', 'INTERNATIONAL PRESS CORPS', 'HOUSE OF THE PEOPLE'];
const city = ['NEW YORK', 'NEW YORK', 'GENEVA', 'VIENNA', 'PRESS GALLERY', 'NEW DELHI'];
const cardImg = [M + '04-council.jpg', M + '05-assembly.jpg', M + '06-poster.jpg', M + '07-vienna-still.jpg', M + '08-press.jpg', M + '09-parliament-still.jpg'];
export const committees = [3, 4, 5, 6, 7, 8].map((bi, i) => ({
  n: '0' + (i + 1), code: beats[bi].code, full: full[i], city: city[i],
  agenda: beats[bi].agenda, img: cardImg[i], alt: beats[bi].shot
}));

export const kit = [
  { t: 'Conference access', d: 'Every committee session, across both days.', icon: 'M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6' },
  { t: 'Hospitality', d: 'High tea and a buffet to keep the debate fuelled.', icon: 'M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3' },
  { t: 'Delegate kit', d: 'Background guides to research your stance before day one.', icon: 'M4 4h11l5 5v11H4zM15 4v5h5M8 13h8M8 17h6' },
  { t: 'Recognition', d: 'A physical certificate and eligibility for every award.', icon: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 14l-1.5 7 5-3 5 3-1.5-7' }
];

export const awards = [
  { scope: 'PER COMMITTEE', t: 'Best Delegate', p: '₹8,000' },
  { scope: 'PER COMMITTEE', t: 'High Commendation', p: '₹5,000' },
  { scope: 'PER COMMITTEE', t: 'Special Mention', p: '₹3,000' },
  { scope: 'IPC', t: 'Best Reporter', p: '₹6,000' },
  { scope: 'IPC', t: 'High Commendation', p: '₹4,000' },
  { scope: 'GROUPS OF 9+', t: 'Best Delegation + trophy', p: '₹10,000' }
];

export const passes = [
  { who: 'RNSIT STUDENTS', price: '₹999', edge: 'rgba(240,203,122,0.7)', delay: '0s' },
  { who: 'EXTERNAL DELEGATES', price: '₹1,349', edge: 'rgba(156,26,67,0.9)', delay: '.12s' }
];

export const includes = ['Access to all committee sessions, both days', 'High tea and buffet', 'Delegate kit with background guides', 'Physical certificate and award eligibility'];

export const nav = ['Events', 'Members', 'Resources', 'About', 'Contact'];

// ======================= OTHER PAGES =======================
const D = import.meta.env.BASE_URL + 'docs/';

// Society history, from the RNSMUN 2026 Conference Brochure ("About RNSIT MUN Society")
export const society = {
  founded: '2023',
  members: '30+',
  intro: 'The RNSIT Model United Nations Society (RNSIT MUNSoc) was established in 2023 to give students a platform for global affairs, meaningful debate, diplomacy and public speaking. It welcomes students irrespective of their prior experience with MUN.',
  beyond: 'Alongside diplomacy and debate, the Society runs community engagement, environmental initiatives, cycling activities and nature experiences.'
};

export const events = [
  { year: '2024', tag: 'INAUGURAL EVENT', name: 'Nexus', d: 'The Society’s inaugural event, organised in its first full year.', img: M + '04-council.jpg' },
  { year: '2024', tag: 'INTRO CONFERENCE', name: 'Two-day Introductory MUN', d: 'A two-day conference that gave students first-hand experience of committee proceedings, research, debate and resolution-building.', img: M + '05-assembly.jpg' },
  { year: '2024 · 2025', tag: 'INTERCOLLEGIATE QUIZ', name: 'Atlas', d: 'An intercollegiate World Affairs Quiz. Across both editions, 170 students from more than 15 colleges took part.', stats: [{ v: '170', l: 'STUDENTS' }, { v: '15+', l: 'COLLEGES' }, { v: '02', l: 'EDITIONS' }], img: M + '06-poster.jpg' },
  { year: 'MAY 2026', tag: 'INTRAMUN', name: 'Nexus IntraMUN', d: 'The latest edition of the Society’s IntraMUN, which has now completed three editions.', stats: [{ v: '03', l: 'EDITIONS' }], img: M + '08-press.jpg' },
  { year: '2026', tag: 'NEW CLUB', name: 'Qlue Quiz Club', d: 'A new platform bringing students together through quizzes, curiosity and a shared interest in knowledge across fields.', img: M + '07-vienna-still.jpg' },
  { year: '06–07 OCT 2026', tag: 'FIRST EDITION', name: 'RNS MUN 2026', d: 'The first edition of RNS MUN at RNS Institute of Technology: two days, six committees and a ₹1,00,000+ prize pool.', stats: [{ v: '06', l: 'COMMITTEES' }, { v: '02', l: 'DAYS' }, { v: '₹1L+', l: 'PRIZES' }], img: M + '10-rnsit.jpg', flagship: true }
];

// Team, as listed on the Society's official Team page (names and roles only)
export const secretariat = [
  { n: 'Nikhil Nayak', r: 'Secretary-General' },
  { n: 'V Koushik', r: 'Secretariat' },
  { n: 'Karthik Prasad M', r: 'Secretariat' },
  { n: 'Vamshi Ganesh', r: 'Secretariat' }
];
export const board = [
  { c: 'UNSC', full: 'United Nations Security Council', p: [['Shishir Simha', 'Chair'], ['Sathya Shiva', 'Vice Chair'], ['Kapil Pal', 'Moderator']] },
  { c: 'UNHRC', full: 'United Nations Human Rights Council', p: [['Kshitij Saha', 'Co-Chair'], ['Sahit Bangre', 'Co-Chair'], ['Tanmay P Shetty', 'Vice Chair']] },
  { c: 'DISEC', full: 'Disarmament & International Security Committee', p: [['Sumit Shingare', 'Co-Chair'], ['Sanchya Prathish', 'Co-Chair'], ['Vachan B Hindiskere', 'Vice Chair']] },
  { c: 'LOK SABHA', full: 'House of the People', p: [['Anshuman Pandey', 'Chair'], ['Rajath R', 'Vice Chair'], ['Jayanth N', 'Moderator']] },
  { c: 'UNODC', full: 'United Nations Office on Drugs and Crime', p: [['Phani Sreevatsa', 'Chair'], ['Pranathi Naik', 'Vice Chair'], ['Divya Sharma', 'Moderator']] },
  { c: 'IPC', full: 'International Press', p: [['Pranav Sivakumar', 'Head'], ['Nuha Alishba', 'Deputy Head']] }
];
export const organising = [
  { d: 'Technical', p: [['Karthik Prasad M', 'Head'], ['Shriyanshu Kumar Kapsime', 'Co-Head']] },
  { d: 'Delegate Affairs', p: [['Zeyan Shahid Khan', 'USG'], ['Adith D H', 'USG']] },
  { d: 'EB Affairs', p: [['Vachan B Hindiskere', 'USG'], ['Tanmay P Shetty', 'USG']] },
  { d: 'Finance', p: [['Poorvika Nagaraj', 'USG']] },
  { d: 'Media & Design', p: [['Vamshi Ganesh B', 'Head']] },
  { d: 'Operations', p: [['Manu T', 'USG'], ['R J Varsha', 'USG']] },
  { d: 'Creatives & Décor', p: [['Nuha Alishba', 'Head'], ['Divya Sharma', 'Head']] },
  { d: 'Outreach & Marketing', p: [['Rudra Chakraborty', 'USG'], ['Kapil Pal', 'USG']] },
  { d: 'Partnerships & Sponsorship', p: [['Anantha Narayan Prabhu', 'Head']] },
  { d: 'Content', p: [['Dhatri V A', 'Head']] }
];

// Committee briefs: page numbers point into the brochure PDF
export const briefs = [
  { c: 'UNSC', page: 8, d: 'How should the world respond when rival governments both claim a country in civil war?' },
  { c: 'UNHRC', page: 9, d: 'Protecting journalists and free expression in conflict and post-conflict zones.' },
  { c: 'DISEC', page: 10, d: 'Rules for military activity in orbit, anti-satellite weapons and space debris.' },
  { c: 'LOK SABHA', page: 11, d: 'Redrawing seats after the census, and sharing funds fairly between states.' },
  { c: 'UNODC', page: 12, d: 'Tech-enabled trafficking, online child exploitation and illicit money flows.' },
  { c: 'IPC', page: 13, d: 'Investigate, report live and publish the conference’s daily coverage.' }
];

export const resources = [
  { t: 'Conference Brochure', d: 'Everything about RNS MUN 2026: the Society, the Secretary-General’s letter, eligibility, fees, prizes, all six committees and their agendas, and the venue.', file: D + 'RNSMUN-2026-Conference-Brochure.pdf', meta: 'PDF · 15 PAGES · 4.8 MB', kind: 'OFFICIAL' },
  { t: 'Equity Policy & Code of Conduct', d: 'The decorum charter every participant agrees to: conduct, committee procedure, dress code, online conduct, academic integrity and AI use, awards and the refund policy.', file: D + 'RNSMUN-2026-Code-of-Conduct.pdf', meta: 'PDF · 2 PAGES · 0.4 MB', kind: 'OFFICIAL' },
  { t: 'Delegate Essentials', d: 'A one-page checklist drawn from the brochure and the code of conduct: dates, venue and how to get there, eligibility, fees, dress code and what to bring.', file: D + 'RNSMUN-2026-Delegate-Essentials.pdf', meta: 'PDF · 1 PAGE', kind: 'QUICK GUIDE' }
];

// Contact: official channels only (from the brochure)
export const contact = {
  email: 'mun@rnsit.ac.in',
  instagram: 'rnsit.mun',
  site: 'mun.rnsit.ac.in',
  venue: ['RNS Institute of Technology', 'Dr. Vishnuvardhan Road, Channasandra, RR Nagar', 'Bengaluru, Karnataka 560098'],
  transit: [
    { t: 'Metro', v: 'Rajarajeshwari Nagar', href: 'https://maps.app.goo.gl/UqYERxbgVV54VqWD6' },
    { t: 'Railway', v: 'Kengeri (KGI)', href: 'https://maps.app.goo.gl/D3iZRbX6kBdAs8dN6' },
    { t: 'Bus stop', v: 'Channasandra – RR Nagar', href: 'https://maps.app.goo.gl/fFAt4LmNqPboqK4x7' }
  ],
  topics: ['Registration', 'Committees & agendas', 'Institutional delegation', 'Payments', 'Sponsorship', 'Something else']
};

// About the site's builder. EDIT THIS to make it yours.
export const about = {
  name: 'Prajval',
  line: 'BTech, Artificial Intelligence & Machine Learning · RNSIT',
  intro: 'I build things that start as an idea and end as something people can use: computer-vision systems, decision tools and websites like this one. I designed and built this site for my RNSIT MUNSoc Technical Team interview.',
  why: 'MUN runs on preparation and presentation, and so does good technology. On the Technical Team I want to build the Society’s digital front door: registration that just works, pages that make delegates want to show up, and tools that save the organising committee time.',
  projects: [
    { t: 'CrashGuard', d: 'Computer-vision accident detection, built for the India CV Hackathon 2026.' },
    { t: 'Scam Shield', d: 'An India-specific scam detector, built as my VTU community project.' },
    { t: 'Kisan OS', d: 'A crop-advisory decision-support app for farmers.' },
    { t: 'Rural Symptom Triage Bot', d: 'A hackathon build for symptom triage in rural healthcare.' }
  ],
  skills: ['Python', 'Machine learning', 'Computer vision', 'React', 'JavaScript', 'WebGL', 'Prompting & AI tools', 'Video & image pipelines'],
  thisSite: [
    { t: 'Scroll-scrubbed video', d: 'Each video’s playback position follows your scroll, so you drive the camera.' },
    { t: 'Custom WebGL shader', d: 'The liquid-gold surface is a hand-written fragment shader that bends around your cursor.' },
    { t: 'AI art direction', d: 'Every image and clip was art-directed and generated with Gemini and Veo, then cleaned and graded.' },
    { t: 'Built to run offline', d: 'Fonts, images and video ship with the site. No internet needed to demo it.' }
  ]
};
