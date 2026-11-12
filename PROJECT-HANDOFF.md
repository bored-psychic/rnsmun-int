# RNSMUN 2026 website — project handoff

Status as of 12 Nov 2026. Built for Prajval's RNSIT MUNSoc Technical Team interview (demo on laptop).

## Links
- **Live website (all 6 pages):** https://claude.ai/artifact/BuqP2GZd7pjhTF28vCpL8o
- **Design canvas (home page design, Journey storyboard):** https://claude.ai/artifact/3fUUU9uHk4d4w5NBt4vrNt
- **Project zip:** `rnsmun-site.zip` (sent in chat, ~34 MB). Run: `npm install` then `npm run dev` (http://localhost:5173). For the demo: `npm run build` then `npm run preview` (http://localhost:4173). Needs Node 20+ (`brew install node`). Works offline after install.

## Stack
React 19 + Vite 8 + react-router (HashRouter). Self-hosted fonts (Archivo variable with width axis, Inter Tight, JetBrains Mono via @fontsource). Custom WebGL fragment shader for the liquid-gold surface. No Tailwind/GSAP/Three needed — the design was ported 1:1 with inline styles.

## Pages
| Route | What's on it | Content source |
|---|---|---|
| `/` Home | M·U·N title card (letters cut into three duotone photo tiles; M & N fly out, U grows into Lady Justice), then scroll "Journey" (10 stops, scroll-scrubbed video, hold at each stop) + sponsors, numbers, summit text, why, committees, kit, awards, passes | Brochure + real UN facts |
| `/events` | Timeline: Nexus 2024, Intro MUN 2024, Atlas 2024–25 (170 students, 15+ colleges), Nexus IntraMUN May 2026 (3 editions), Qlue Quiz Club 2026, RNS MUN 2026 | Brochure (official Past Events page is empty) |
| `/members` | Secretariat, Executive Board per committee, 10 Organising Committee teams; initials avatars | Official Team page mun-gold.vercel.app/team (names + roles only, no phone numbers) |
| `/resources` | Brochure PDF, Code of Conduct PDF, Delegate Essentials PDF (made from those two), committee brief links (brochure pages 8–13) | Uploaded PDFs |
| `/about` | Prajval: intro, why Technical Team, projects (CrashGuard, Scam Shield, Kisan OS, Rural Symptom Triage Bot), skills, how the site was built | DRAFT — Prajval to rewrite in his own voice |
| `/contact` | Mock form with validation + thank-you state (sends nothing), official channels (mun@rnsit.ac.in, @rnsit.mun, mun.rnsit.ac.in), venue + transit links | Brochure |

## Where to edit (in the zip)
- All text, prices, team, events, About: `src/data/site.js`
- Journey speed: `TRACK_HEIGHT` (18300 = current, bigger = slower), title-card share `OPEN` (0.06) and pause per stop `HOLD` (0.35) in `src/pages/Home.jsx`
- Title card (M·U·N tiles, headline "Speak like a nation."): `src/components/Opening.jsx`; tile images `public/media/tile-m/u/n.jpg`
- Shared header/footer/page title band: `src/components/Chrome.jsx`
- Media: `public/media/`, PDFs: `public/docs/`

## Journey media (all watermark-cleaned)
01 Lady Justice (still, glide + dive into scales) · 02 clouds (Veo) · 03 New York tower (Veo, trimmed 3.1–6.35s) · 04 Security Council (still) · 05 General Assembly (still) · 06 Geneva palace (Veo) · 07 Vienna towers (Veo, 2nd take) · 08 press room (still) · 09 Parliament of India (Veo; flagpole removed from first frame) · 10 RNSIT auditorium (Gemini still from real photos).
Rejected: Vienna take 1 (drone appeared in frame), Lady→scales Veo push-in (morphed; user reverted).

## Veo prompt lessons
- Say "the camera moves…", never "drone"/"FPV" (Veo draws a drone).
- Small camera moves; "building stays solid and unchanged"; "holds still for the last seconds".
- Negative: drone, aircraft, birds, people, text, flags, cuts, dissolves, morphing, flicker, warped architecture.
- Test on Veo 3.1 Fast (1 output) before Quality (100 credits). Start/end-frame videos only work if the end frame is a zoomed crop of the start frame.
- Avoid State Emblem / lion capital, UN emblem, flags.

## Open items
- Event dates (06–07 Oct 2026) have passed — Register buttons go to the contact form; confirm whether the event is over or postponed.
- Rewrite the About text personally.
- Member photos (currently initials).
- Decide whether to deploy publicly (footprint concern) or demo locally only.
