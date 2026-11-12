import { useRef } from 'react';
import { SiteHeader, SiteFooter, PageHero, usePageReveal, LBL, H2, WRAP, ROOT } from '../components/Chrome.jsx';
import { sx, ARCHIVO, MONO } from '../lib/sx.js';
import { secretariat, board, organising } from '../data/site.js';

// Placeholder avatar: initials on a maroon-to-brass gradient (swap for real photos later).
const initials = (n) => n.split(' ').filter((w) => w.length > 1 || /[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const hue = (n) => { let h = 0; for (const ch of n) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };
function Avatar({ name, size = 56 }) {
  const a = hue(name) % 40;
  return (
    <span aria-hidden="true" style={{
      ...sx(`flex: none; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; color: #F2ECE2; letter-spacing: -0.02em; border: 1px solid rgba(217,174,82,0.35)`),
      width: size, height: size, fontSize: size * 0.34,
      background: `radial-gradient(120% 120% at 25% 15%, hsl(${38 + a * 0.2} 62% 52%) 0%, hsl(${338 + a * 0.3} 78% 24%) 55%, #120509 100%)`
    }}>{initials(name)}</span>
  );
}

function Person({ n, r }) {
  return (
    <div style={sx('display: flex; align-items: center; gap: 14px; padding: 12px 0')}>
      <Avatar name={n} size={46} />
      <div>
        <span style={sx('display: block; font-size: 17px; font-weight: 600; color: #F2ECE2')}>{n}</span>
        <span style={sx(`display: block; margin-top: 3px; font-family: ${MONO}; font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #D9AE52`)}>{r}</span>
      </div>
    </div>
  );
}

export default function Members() {
  const root = useRef(null);
  usePageReveal(root);
  return (
    <div ref={root} style={ROOT}>
      <SiteHeader />
      <PageHero label="MEMBERS · RNS MUN 2026" title={<>The people<br />behind the floor.</>} intro="The Secretariat, the Executive Board that chairs each committee, and the Organising Committee that builds the conference." />

      <section style={sx(`${WRAP}; padding: 90px 24px 130px`)}>
        <div data-rv="" style={{ marginBottom: '48px' }}><span style={LBL}>(01) SECRETARIAT</span><span style={H2}>Core<br />Secretariat.</span></div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap: 20px')}>
          {secretariat.map((p, i) => (
            <div key={p.n} className="kit" data-rv="" style={{ ...sx('padding: 34px 28px 30px; border-radius: 24px; border: 1px solid rgba(242,236,226,0.1); background: radial-gradient(120% 100% at 0% 0%, rgba(108,13,44,0.32), rgba(16,9,12,0.5) 60%)'), transitionDelay: (i * 0.08) + 's', ...(i === 0 ? { borderColor: 'rgba(217,174,82,0.55)' } : {}) }}>
              <Avatar name={p.n} size={84} />
              <span style={sx(`display: block; margin-top: 26px; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; font-size: 24px; letter-spacing: -0.02em`)}>{p.n}</span>
              <span style={sx(`display: block; margin-top: 8px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #D9AE52`)}>{p.r}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 130px`)}>
        <div data-rv="" style={{ marginBottom: '48px' }}><span style={LBL}>(02) EXECUTIVE BOARD</span><span style={H2}>Chairs of<br />every room.</span></div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fill, minmax(min(380px, 100%), 1fr)); gap: 22px')}>
          {board.map((b, i) => (
            <div key={b.c} className="kit" data-rv="" style={{ ...sx('padding: 28px 28px 18px; border-radius: 24px; border: 1px solid rgba(242,236,226,0.1); background: rgba(16,9,12,0.45)'), transitionDelay: ((i % 3) * 0.08) + 's' }}>
              <span style={sx(`display: block; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: 34px; line-height: 1; letter-spacing: -0.03em`)}>{b.c}</span>
              <span style={sx(`display: block; margin: 10px 0 10px; font-family: ${MONO}; font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: #9A938A`)}>{b.full}</span>
              {b.p.map(([n, r]) => <Person key={n + r} n={n} r={r} />)}
            </div>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 150px`)}>
        <div data-rv="" style={{ marginBottom: '48px' }}><span style={LBL}>(03) ORGANISING COMMITTEE</span><span style={H2}>Ten teams,<br />one conference.</span></div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); gap: 18px')}>
          {organising.map((o, i) => (
            <div key={o.d} className="kit" data-rv="" style={{ ...sx('padding: 24px 24px 14px; border-radius: 22px; border: 1px solid rgba(242,236,226,0.1); background: rgba(16,9,12,0.45)'), transitionDelay: ((i % 4) * 0.06) + 's' }}>
              <span style={sx(`font-family: ${MONO}; font-size: 11px; letter-spacing: 0.22em; color: #D9AE52`)}>{String(i + 1).padStart(2, '0')}</span>
              <span style={sx(`display: block; margin-top: 10px; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; font-size: 22px; letter-spacing: -0.02em`)}>{o.d}</span>
              <div style={{ marginTop: '6px' }}>{o.p.map(([n, r]) => <Person key={n + r} n={n} r={r} />)}</div>
            </div>
          ))}
        </div>
        <p data-rv="" style={sx(`margin: 40px 0 0; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.2em; color: #9A938A`)}>NAMES AND ROLES AS LISTED ON THE SOCIETY’S OFFICIAL TEAM PAGE · PHOTOS COMING SOON</p>
      </section>
      <SiteFooter />
    </div>
  );
}
