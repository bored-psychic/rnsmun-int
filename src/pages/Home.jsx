import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Liquid from '../components/Liquid.jsx';
import { SiteHeader, SiteFooter } from '../components/Chrome.jsx';
import Opening from '../components/Opening.jsx';
import { sx, ARCHIVO, MONO } from '../lib/sx.js';
import { beats, sponsors, stats, words, why, committees, kit, awards, passes, includes } from '../data/site.js';

// How long the Journey lasts, in pixels of scrolling. Bigger = slower.
const TRACK_HEIGHT = 18300;
// Share of the Journey spent on the M·U·N title card before the statue appears.
const OPEN = 0.06;
// Share of each stop spent holding still at its peak (text fully bright) before moving on.
const HOLD = 0.35;
const N = beats.length;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
// Raw scroll position -> stop position with a pause at every stop.
const withHold = (fr) => {
  const k = Math.floor(fr);
  if (k >= N - 1) return N - 1;
  const u = fr - k;
  return k + (u < HOLD / 2 ? 0 : u > 1 - HOLD / 2 ? 1 : (u - HOLD / 2) / (1 - HOLD));
};

const LBL = sx(`font-family: ${MONO}; font-size: 12px; letter-spacing: 0.3em; color: #D9AE52`);
const H2 = sx(`display: block; margin-top: 22px; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(40px, 5.4vw, 88px); line-height: 0.92; letter-spacing: -0.04em; text-transform: uppercase`);
const WRAP = 'max-width: 1328px; margin: 0 auto; box-sizing: border-box';

export default function Home() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const introRef = useRef(null);
  const openRef = useRef(null);
  const hudN = useRef(null);
  const hudW = useRef(null);
  const hudPlace = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const root = rootRef.current;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (root && !reduce) root.classList.add('anim');

    // Videos are loaded fully into memory first, so scrubbing back and forth is smooth.
    let vidsReady = false;
    const initVids = (t) => {
      if (vidsReady) return;
      const list = t.querySelectorAll('video[data-scrub]');
      if (!list.length) return;
      vidsReady = true;
      list.forEach((v) => {
        const u = v.getAttribute('data-src');
        if (!u) return;
        fetch(u).then((r) => r.blob()).then((bl) => { v.src = URL.createObjectURL(bl); v.load(); }).catch(() => { v.src = u; });
      });
    };

    let ticking = false;
    let lastBeat = -1;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const t = trackRef.current, stage = stageRef.current;
        if (!t || !stage) return;
        initVids(t);
        const r = t.getBoundingClientRect();
        const stageH = stage.offsetHeight;
        const p = clamp(-r.top / Math.max(1, r.height - stageH), 0, 1);

        // M·U·N title card: M and N fly out, U grows into the statue
        const op = openRef.current;
        if (op) {
          const o = clamp(p / OPEN, 0, 1);
          const e = o * o * (3 - 2 * o);
          if (reduce) {
            op.style.opacity = o > 0.5 ? '0' : '1';
          } else {
            op.style.backgroundColor = 'rgba(7,6,7,' + (1 - clamp((o - 0.3) / 0.5, 0, 1)).toFixed(3) + ')';
            const bg = op.querySelector('[data-op-bg]');
            if (bg) bg.style.opacity = String(1 - clamp((o - 0.2) / 0.5, 0, 1));
            const tm = op.querySelector('[data-op-tile="m"]'), tu = op.querySelector('[data-op-tile="u"]'), tn = op.querySelector('[data-op-tile="n"]');
            if (tm) { tm.style.transform = 'translateX(' + (-e * 75).toFixed(2) + 'vw) rotate(' + (-e * 12).toFixed(2) + 'deg)'; tm.style.opacity = String(1 - clamp(o * 1.4, 0, 1)); }
            if (tn) { tn.style.transform = 'translateX(' + (e * 75).toFixed(2) + 'vw) rotate(' + (e * 12).toFixed(2) + 'deg)'; tn.style.opacity = String(1 - clamp(o * 1.4, 0, 1)); }
            if (tu) {
              tu.style.transform = 'scale(' + (1 + e * e * 4.2).toFixed(4) + ')';
              tu.style.opacity = String(1 - clamp((o - 0.42) / 0.26, 0, 1));
              // the U cut-out closes up as the tile grows, so it hands over as a clean picture
              const cut = tu.querySelector('[data-op-cut]');
              if (cut) cut.style.opacity = String(1 - clamp((o - 0.12) / 0.3, 0, 1));
            }
            op.querySelectorAll('[data-op-copy]').forEach((el) => {
              el.style.opacity = String(1 - clamp(o * 2.4, 0, 1));
              el.style.transform = 'translateY(' + (-o * 90).toFixed(1) + 'px)';
            });
          }
          op.style.visibility = o >= 1 ? 'hidden' : 'visible';
        }
        const pj = clamp((p - OPEN) / (1 - OPEN), 0, 1);
        const intro = 0.09;
        const g = clamp(pj / intro, 0, 1);
        const ge = g * g * (3 - 2 * g);
        const fRaw = clamp((pj - intro) / (1 - intro), 0, 1) * (N - 1);
        const f = withHold(fRaw);
        const layers = t.querySelectorAll('[data-beat]');
        const copies = t.querySelectorAll('[data-copy]');
        const hero = t.querySelector('[data-hero]');
        const cue = t.querySelector('[data-hero-cue]');
        if (hero) hero.style.transform = reduce ? 'none' : 'translateX(' + (ge * 10).toFixed(2) + '%)';
        if (cue) cue.style.opacity = String(clamp(1 - g * 3, 0, 1));
        t.querySelectorAll('video[data-scrub]').forEach((vd) => {
          if (reduce || !vd.duration || !isFinite(vd.duration)) return;
          const bi = parseInt(vd.getAttribute('data-scrub'), 10) || 0;
          const tt = clamp((fRaw - (bi - 0.15)) / 0.65, 0, 1) * (vd.duration - 0.05);
          if (Math.abs(vd.currentTime - tt) > 0.03) vd.currentTime = tt;
        });
        for (let i = 0; i < layers.length; i++) {
          const d = f - i;
          let o, s, tf = null;
          if (d < 0) { o = clamp(1 + d * 1.6, 0, 1); s = 0.86 + 0.14 * clamp(1 + d, 0, 1); }
          else { o = clamp(1 - d * 1.6, 0, 1); s = 1 + 0.9 * clamp(d, 0, 1); }
          if (i === 0 && d >= 0) {
            const e0 = clamp(d, 0, 1), ee = e0 * e0 * (3 - 2 * e0);
            o = clamp(1 - (d - 0.4) * 2.2, 0, 1);
            s = 1 + 1.3 * ee;
            tf = 'translate(' + (-24 * ee).toFixed(2) + '%,' + (28.5 * ee).toFixed(2) + '%) scale(' + s.toFixed(4) + ')';
          } else if (i === 1 && d < 0) {
            s = 1 + 0.08 * clamp(-d, 0, 1);
          }
          if (reduce) { s = 1; tf = null; }
          layers[i].style.opacity = String(o);
          layers[i].style.transformOrigin = (i === 0 && !reduce) ? '87.7% 27.5%' : '50% 50%';
          layers[i].style.transform = tf || ('scale(' + s.toFixed(4) + ')');
          if (copies[i]) {
            let co = clamp(1 - Math.abs(d) * 2.6, 0, 1);
            if (i === 0 && !reduce) co *= clamp((g - 0.3) / 0.6, 0, 1);
            copies[i].style.opacity = String(co);
            copies[i].style.transform = reduce ? 'none' : 'translateY(' + (d * -60).toFixed(1) + 'px)';
          }
        }

        // progress bar + stop counter
        const beat = clamp(Math.round(f), 0, N - 1);
        if (hudW.current) hudW.current.style.width = (p * 100).toFixed(1) + '%';
        if (beat !== lastBeat) {
          lastBeat = beat;
          if (hudN.current) hudN.current.textContent = beats[beat].n + ' / 10';
          if (hudPlace.current) hudPlace.current.textContent = beats[beat].place;
        }

        // home content: reveal on scroll + light the summit paragraph word by word
        const vh = window.innerHeight || 900;
        if (root) {
          root.querySelectorAll('[data-rv]').forEach((el) => {
            if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in');
          });
        }
        const it = introRef.current;
        if (it) {
          const ws = it.querySelectorAll('[data-w]');
          const ir = it.getBoundingClientRect();
          const ip = clamp((vh * 0.85 - ir.top) / (ir.height + vh * 0.35), 0, 1);
          ws.forEach((w, wi) => {
            w.style.opacity = String(reduce ? 1 : 0.14 + 0.86 * clamp(ip * (ws.length + 6) - wi, 0, 1));
          });
        }
      });
    };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} style={sx("position: relative; width: 100%; background: #070607; color: #F2ECE2; font-family: 'Inter Tight', system-ui, sans-serif; overflow-x: clip")}>

      {/* ================= THE JOURNEY ================= */}
      <section ref={trackRef} style={{ position: 'relative', height: TRACK_HEIGHT + 'px' }}>
        <div ref={stageRef} style={sx('position: sticky; top: 0; height: 100vh; overflow: hidden')}>

          {/* beat layers */}
          {beats.map((b) => (
            <div key={b.i} data-beat={b.i} aria-hidden="true" style={{ ...sx('position: absolute; inset: 0; will-change: transform, opacity'), opacity: b.i === 0 ? 1 : 0, background: b.bg }}>
              {b.hero && (
                <>
                  <div style={sx('position: absolute; inset: 0')}><Liquid center={0.55} /></div>
                  <div data-hero="1" style={sx('position: absolute; inset: 0; will-change: transform; -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 24%); mask-image: linear-gradient(90deg, transparent 0%, #000 24%)')}>
                    <div style={sx('position: absolute; inset: 0; overflow: hidden')}>
                      <img src={b.heroImg} alt="A brass and chrome statue of Lady Justice, blindfolded, with glass ribbons spiralling around her" fetchPriority="high" style={sx('display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.1); transform-origin: 0% 0%')} />
                    </div>
                  </div>
                  <div data-hero-cue="1" style={sx(`position: absolute; left: 0; right: 0; bottom: 96px; text-align: center; font-family: ${MONO}; font-size: 12px; letter-spacing: 0.4em; color: #D9AE52`)}>SCROLL ↓</div>
                </>
              )}
              {b.img && !b.vid && (
                <div style={sx('position: absolute; inset: 0; overflow: hidden')}>
                  <img src={b.img} alt={b.shot} style={sx('display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.13); transform-origin: 0% 0%')} />
                </div>
              )}
              {b.vid && (
                <div style={sx('position: absolute; inset: 0; overflow: hidden')}>
                  <video data-scrub={b.i} data-src={b.vid} poster={b.img} muted playsInline preload="auto" aria-hidden="true" style={sx('display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.13); transform-origin: 0% 0%')} />
                </div>
              )}
            </div>
          ))}

          {/* M·U·N title card */}
          <Opening ref={openRef} />

          {/* vignette */}
          <div aria-hidden="true" style={sx('position: absolute; inset: 0; pointer-events: none; background: radial-gradient(70% 70% at 50% 50%, rgba(7,6,7,0) 40%, rgba(7,6,7,0.85) 100%)')} />

          {/* nav */}
          <SiteHeader overlay />

          {/* per-beat copy */}
          {beats.map((b) => (
            <div key={b.i} data-copy={b.i} style={{ ...sx('position: absolute; left: 40px; right: 40px; bottom: 120px; z-index: 4; will-change: transform, opacity; display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; pointer-events: none'), opacity: b.i === 0 ? 1 : 0 }}>
              <div style={{ maxWidth: '900px' }}>
                <span style={sx(`display: block; font-family: ${MONO}; font-size: 12px; letter-spacing: 0.3em; color: #D9AE52; margin-bottom: 18px`)}>{b.eyebrow}</span>
                <span style={{ ...sx(`display: block; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; line-height: 0.9; letter-spacing: -0.035em; text-transform: uppercase; text-shadow: 0 6px 40px rgba(0,0,0,0.6)`), fontSize: b.size }}>{b.title}</span>
                <span style={sx('display: block; margin-top: 18px; max-width: 620px; font-size: 18px; line-height: 1.5; color: #D8D1C6')}>{b.line}</span>
                {b.facts.length > 0 && (
                  <div style={sx('display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; max-width: 760px')}>
                    {b.facts.map((x) => (
                      <span key={x} style={sx(`padding: 8px 13px; border-radius: 999px; border: 1px solid rgba(217,174,82,0.35); background: rgba(16,9,12,0.55); backdrop-filter: blur(10px); font-family: ${MONO}; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #F2ECE2`)}>{x}</span>
                    ))}
                  </div>
                )}
              </div>
              {b.hasCard && (
                <div style={sx('width: 380px; max-width: 100%; box-sizing: border-box; padding: 26px 28px; border-radius: 22px; background: rgba(16,9,12,0.55); border: 1px solid rgba(242,236,226,0.14); backdrop-filter: blur(18px); display: flex; flex-direction: column; gap: 12px')}>
                  <span style={sx(`font-family: ${MONO}; font-size: 11px; letter-spacing: 0.24em; color: #D9AE52`)}>{b.code} · AGENDA</span>
                  <span style={sx('font-size: 16px; line-height: 1.5; color: #F2ECE2')}>{b.agenda}</span>
                </div>
              )}
            </div>
          ))}

          {/* HUD */}
          <div style={sx(`position: absolute; left: 40px; right: 40px; bottom: 40px; z-index: 5; display: flex; align-items: center; gap: 24px; font-family: ${MONO}; font-size: 12px; letter-spacing: 0.2em; color: #9A938A`)}>
            <span ref={hudN} style={sx('color: #D9AE52; min-width: 70px')}>01 / 10</span>
            <span style={sx('flex: 1; height: 1px; background: rgba(242,236,226,0.15); position: relative')}>
              <span ref={hudW} style={sx('position: absolute; left: 0; top: -1px; height: 3px; width: 0%; background: #D9AE52; box-shadow: 0 0 12px #D9AE52')} />
            </span>
            <span ref={hudPlace} className="hud-place" style={sx('min-width: 320px; text-align: right')}>{beats[0].place}</span>
          </div>
        </div>
      </section>

      {/* ================= HOME PAGE CONTENT ================= */}
      <section aria-label="Official sponsors" style={sx('border-top: 1px solid rgba(242,236,226,0.08); border-bottom: 1px solid rgba(242,236,226,0.08); padding: 26px 0; overflow: hidden; display: flex; align-items: center')}>
        <span style={sx(`flex: none; padding: 0 40px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.3em; color: #9A938A`)}>OFFICIAL SPONSORS</span>
        <div style={sx('flex: 1; overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)')}>
          <div className="mq" style={sx('display: flex; width: max-content; gap: 72px; padding-right: 72px')}>
            {sponsors.map((s, i) => (
              <span key={i} style={sx(`font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: 22px; letter-spacing: -0.01em; color: #F2ECE2; opacity: 0.72; white-space: nowrap`)}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="RNSMUN 2026 in numbers" style={sx(`${WRAP}; padding: 120px 24px 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px`)}>
        {stats.map((st, i) => (
          <div key={st.l} data-rv="" style={{ ...sx('padding: 32px 30px; border-radius: 22px; border: 1px solid rgba(242,236,226,0.1); background: linear-gradient(160deg, rgba(108,13,44,0.24), rgba(16,9,12,0.4))'), transitionDelay: (i * 0.08) + 's' }}>
            <span style={sx(`display: block; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(44px, 5vw, 76px); line-height: 1; letter-spacing: -0.04em`)}>{st.v}</span>
            <span style={sx(`display: block; margin-top: 16px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.24em; color: #D9AE52`)}>{st.l}</span>
          </div>
        ))}
      </section>

      <section ref={introRef} style={sx(`${WRAP}; padding: 140px 24px 150px`)}>
        <span style={LBL}>(01) THE SUMMIT</span>
        <p style={sx(`margin: 30px 0 0; max-width: 1200px; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 700; font-size: clamp(30px, 3.7vw, 58px); line-height: 1.14; letter-spacing: -0.025em`)}>
          {words.map((w, i) => (
            <span key={i} data-w="" style={{ opacity: 0.14, transition: 'opacity 0.25s', color: w.c }}>{w.t + ' '}</span>
          ))}
        </p>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 160px`)}>
        <div data-rv="" style={sx('display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; margin-bottom: 52px')}>
          <div><span style={LBL}>(02) WHY RNSMUN 2026</span><span style={H2}>Built for<br />the floor.</span></div>
        </div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 20px')}>
          {why.map((wy, i) => (
            <div key={wy.n} className="kit" data-rv="" style={{ ...sx('padding: 30px 28px 34px; border-radius: 22px; border: 1px solid rgba(242,236,226,0.1); background: rgba(16,9,12,0.45); min-height: 250px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; gap: 40px'), transitionDelay: (i * 0.1) + 's' }}>
              <span style={sx(`font-family: ${MONO}; font-size: 13px; letter-spacing: 0.2em; color: #D9AE52`)}>{wy.n}</span>
              <div>
                <span style={sx(`display: block; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; font-size: 26px; line-height: 1.05; letter-spacing: -0.02em`)}>{wy.t}</span>
                <span style={sx('display: block; margin-top: 12px; font-size: 16px; line-height: 1.55; color: #B9B1A6')}>{wy.d}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 160px`)}>
        <div data-rv="" style={{ marginBottom: '52px' }}><span style={LBL}>(03) COMMITTEES</span><span style={H2}>Six rooms.<br />Six crises.</span></div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fill, minmax(min(380px, 100%), 1fr)); gap: 22px')}>
          {committees.map((c, i) => (
            <article key={c.code} className="cc" data-rv="" style={{ ...sx('border-radius: 24px; overflow: hidden; border: 1px solid rgba(242,236,226,0.12); background: #0E080B'), transitionDelay: ((i % 3) * 0.1) + 's' }}>
              <div style={sx('position: relative; aspect-ratio: 16 / 10; overflow: hidden')}>
                <img className="cc-img" src={c.img} alt={c.alt} loading="lazy" style={sx('display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.13); transform-origin: 0% 0%; transition: transform 1.2s cubic-bezier(.2,.7,.2,1)')} />
                <div style={sx('position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,6,7,0.15) 0%, rgba(7,6,7,0) 35%, rgba(7,6,7,0.92) 100%)')} />
                <span style={sx(`position: absolute; left: 24px; top: 22px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.24em; color: #D9AE52`)}>{c.n} / 06 · {c.city}</span>
                <span style={sx(`position: absolute; left: 24px; bottom: 16px; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: 44px; line-height: 1; letter-spacing: -0.03em; text-transform: uppercase`)}>{c.code}</span>
              </div>
              <div style={{ padding: '22px 24px 30px' }}>
                <span style={sx(`font-family: ${MONO}; font-size: 11px; letter-spacing: 0.2em; color: #9A938A`)}>{c.full}</span>
                <p style={sx('margin: 12px 0 0; font-size: 16px; line-height: 1.55; color: #D8D1C6')}>{c.agenda}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 160px`)}>
        <div data-rv="" style={{ marginBottom: '52px' }}><span style={LBL}>(04) DELEGATE EXPERIENCE</span><span style={H2}>What’s in<br />the kit.</span></div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 20px')}>
          {kit.map((k, i) => (
            <div key={k.t} className="kit" data-rv="" style={{ ...sx('padding: 30px 28px; border-radius: 22px; border: 1px solid rgba(242,236,226,0.1); background: rgba(16,9,12,0.45)'), transitionDelay: (i * 0.1) + 's' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D9AE52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={k.icon} /></svg>
              <span style={sx(`display: block; margin-top: 28px; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; font-size: 22px; letter-spacing: -0.02em`)}>{k.t}</span>
              <span style={sx('display: block; margin-top: 10px; font-size: 16px; line-height: 1.55; color: #B9B1A6')}>{k.d}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 160px`)}>
        <div data-rv="" style={sx('display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; margin-bottom: 40px')}>
          <div><span style={LBL}>(05) AWARDS</span><span style={H2}>₹1,00,000+<br />on the table.</span></div>
          <span style={sx('max-width: 360px; font-size: 16px; line-height: 1.55; color: #B9B1A6')}>Awards in every committee, plus Best Delegation for groups of nine or more.</span>
        </div>
        <div style={{ borderBottom: '1px solid rgba(242,236,226,0.1)' }}>
          {awards.map((a, i) => (
            <div key={i} className="row" data-rv="" style={sx('display: grid; grid-template-columns: minmax(150px, 220px) 1fr auto; align-items: center; gap: 24px; padding: 26px 12px; border-top: 1px solid rgba(242,236,226,0.1)')}>
              <span style={sx(`font-family: ${MONO}; font-size: 11px; letter-spacing: 0.22em; color: #9A938A`)}>{a.scope}</span>
              <span style={sx(`font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 700; font-size: clamp(20px, 2vw, 28px); letter-spacing: -0.02em`)}>{a.t}</span>
              <span style={sx(`font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(24px, 2.6vw, 38px); letter-spacing: -0.03em; color: #D9AE52`)}>{a.p}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 170px`)}>
        <div data-rv="" style={{ marginBottom: '52px' }}><span style={LBL}>(06) REGISTRATION</span><span style={H2}>Claim your<br />seat.</span></div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap: 22px')}>
          {passes.map((ps) => (
            <div key={ps.who} data-rv="" style={{ ...sx('position: relative; padding: 40px 36px 38px; border-radius: 26px; background: radial-gradient(120% 90% at 0% 0%, rgba(108,13,44,0.45), rgba(16,9,12,0.6) 60%); overflow: hidden'), border: '1px solid ' + ps.edge, transitionDelay: ps.delay }}>
              <span style={sx(`font-family: ${MONO}; font-size: 12px; letter-spacing: 0.26em; color: #D9AE52`)}>{ps.who}</span>
              <span style={sx(`display: block; margin-top: 18px; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(64px, 7vw, 112px); line-height: 0.9; letter-spacing: -0.05em`)}>{ps.price}</span>
              <ul style={sx('margin: 30px 0 34px; padding: 0; list-style: none; display: grid; gap: 12px; font-size: 16px; line-height: 1.45; color: #D8D1C6')}>
                {includes.map((inc) => <li key={inc} style={{ display: 'flex', gap: '12px' }}><span style={{ color: '#D9AE52' }}>—</span><span>{inc}</span></li>)}
              </ul>
              <Link className="cta" to="/contact?topic=Registration" style={sx('display: inline-flex; align-items: center; gap: 12px; min-height: 50px; box-sizing: border-box; padding: 0 28px; border-radius: 999px; background: linear-gradient(180deg, #F0CB7A, #D9AE52); color: #070607; font-weight: 600; font-size: 16px')}>Register ↗</Link>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
