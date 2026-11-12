# RNSMUN 2026 — website

**Live site:** https://rnsmun-boredpsychic.netlify.app

The RNSIT Model United Nations home page: a scroll-driven "Journey" through the six committees, followed by the full home page (sponsors, numbers, committees, delegate kit, awards, passes).

Built with **React + Vite**. Runs fully offline: fonts, images and videos are all inside this folder.

---

## Run it on your laptop

You need **Node.js 20 or newer** (download from nodejs.org, the "LTS" version).

Open a terminal in this folder, then:

```bash
npm install        # first time only: downloads the libraries (about 10 seconds)
npm run dev        # starts the site while you edit it
```

Open the address it prints (usually http://localhost:5173). Any change you save shows up instantly.

To run the final, optimised version (the one to show at the interview):

```bash
npm run build      # makes the finished site in the "dist" folder
npm run preview    # serves it at http://localhost:4173
```

No internet is needed after `npm install`.

---

## Where things live

| What | File |
|---|---|
| All text, prices, agendas, facts, sponsors | `src/data/site.js` |
| The home page layout and scroll animation | `src/pages/Home.jsx` |
| The moving liquid-gold background | `src/components/Liquid.jsx` |
| Hover effects, reveal animation, fonts | `src/styles.css` |
| Images and videos | `public/media/` |
| Events, Members, Resources, About, Contact pages | `src/pages/` |
| Shared header, footer, page title band | `src/components/Chrome.jsx` |
| PDFs on the Resources page | `public/docs/` |
| Page list (routes) | `src/main.jsx` |

### Common edits

- **Make the About page yours:** edit the `about` section at the bottom of `src/data/site.js` (intro, why the Technical Team, projects, skills).
- **Team names:** `secretariat`, `board` and `organising` in `src/data/site.js` (taken from the Society's official Team page).
- **Contact form:** it checks every field and shows a confirmation, but it does not send anything. Nothing you type leaves the browser.

- **Change any wording or price:** edit `src/data/site.js` and save.
- **Make the Journey scroll slower or faster:** in `src/pages/Home.jsx`, change `TRACK_HEIGHT` (bigger = slower).
- **Make each stop pause longer or shorter:** change `HOLD` in the same file (0.35 means 35% of each stop is a pause; 0 means no pause).
- **Swap an image or video:** replace the file in `public/media/` with one of the same name.

---

## How the Journey works (in plain words)

The Journey is one tall section of the page. While you scroll through it, the screen stays pinned and the code turns your scroll position into a number from 0 to 9, one per stop. Each stop's picture fades and zooms based on how far that number is from it, and each video is "scrubbed": its playback position follows your scroll instead of playing on its own. Videos are loaded fully into memory first, so scrubbing backwards is smooth.

Visuals were created with AI (Gemini for images, Veo for video), as credited in the footer.
