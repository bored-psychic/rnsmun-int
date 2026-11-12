import { useRef } from 'react';
import { SiteHeader, SiteFooter, PageHero, usePageReveal, LBL, H2, WRAP, ROOT } from '../components/Chrome.jsx';
import { sx, ARCHIVO, MONO } from '../lib/sx.js';
import { events, society } from '../data/site.js';

export default function Events() {
  const root = useRef(null);
  usePageReveal(root);
  return (
    <div ref={root} style={ROOT}>
      <SiteHeader />
      <PageHero label="EVENTS · SINCE 2023" title={<>Three years<br />on the floor.</>} intro={society.intro}>
        <div style={sx('display: flex; gap: 40px; flex-wrap: wrap; margin-top: 40px')}>
          {[['2023', 'FOUNDED'], [society.members, 'CLUB MEMBERS'], ['170', 'ATLAS QUIZZERS'], ['03', 'NEXUS EDITIONS']].map(([v, l]) => (
            <div key={l}>
              <span style={sx(`display: block; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(34px, 3.6vw, 52px); line-height: 1; letter-spacing: -0.04em`)}>{v}</span>
              <span style={sx(`display: block; margin-top: 10px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.24em; color: #D9AE52`)}>{l}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <section style={sx(`${WRAP}; padding: 90px 24px 140px`)}>
        <div data-rv="" style={{ marginBottom: '64px' }}><span style={LBL}>(01) TIMELINE</span><span style={H2}>From Nexus<br />to RNS MUN.</span></div>
        <ol className="tl" style={sx('list-style: none; margin: 0; padding: 0; position: relative')}>
          {events.map((e, i) => (
            <li key={e.name} data-rv="" className={'tl-item' + (i % 2 ? ' tl-r' : '')} style={{ transitionDelay: '0.05s' }}>
              <div className="tl-dot" aria-hidden="true" style={e.flagship ? { background: '#D9AE52', boxShadow: '0 0 0 6px rgba(217,174,82,0.18), 0 0 24px #D9AE52' } : undefined} />
              <article className="cc tl-card" style={{ ...sx('border-radius: 24px; overflow: hidden; border: 1px solid rgba(242,236,226,0.12); background: #0E080B'), ...(e.flagship ? { borderColor: 'rgba(217,174,82,0.55)' } : {}) }}>
                <div style={sx('position: relative; aspect-ratio: 16 / 8; overflow: hidden')}>
                  <img className="cc-img" src={e.img} alt="" loading="lazy" style={sx('display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.13); transform-origin: 0% 0%; transition: transform 1.2s cubic-bezier(.2,.7,.2,1)')} />
                  <div style={sx('position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,6,7,0.1), rgba(7,6,7,0.9))')} />
                  <span style={sx(`position: absolute; left: 24px; top: 20px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.24em; color: #D9AE52`)}>{e.year}</span>
                  <span style={sx(`position: absolute; right: 20px; top: 16px; padding: 6px 11px; border-radius: 999px; border: 1px solid rgba(217,174,82,0.4); background: rgba(16,9,12,0.6); font-family: ${MONO}; font-size: 10px; letter-spacing: 0.18em; color: #F2ECE2`)}>{e.tag}</span>
                  <span style={sx(`position: absolute; left: 24px; bottom: 16px; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(30px, 3vw, 44px); line-height: 1; letter-spacing: -0.03em; text-transform: uppercase`)}>{e.name}</span>
                </div>
                <div style={{ padding: '22px 24px 26px' }}>
                  <p style={sx('margin: 0; font-size: 16px; line-height: 1.55; color: #D8D1C6')}>{e.d}</p>
                  {e.stats && (
                    <div style={sx('display: flex; gap: 28px; flex-wrap: wrap; margin-top: 20px; padding-top: 18px; border-top: 1px solid rgba(242,236,226,0.08)')}>
                      {e.stats.map((s) => (
                        <div key={s.l}>
                          <span style={sx(`display: block; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: 28px; letter-spacing: -0.03em; color: #D9AE52`)}>{s.v}</span>
                          <span style={sx(`display: block; margin-top: 4px; font-family: ${MONO}; font-size: 10px; letter-spacing: 0.22em; color: #9A938A`)}>{s.l}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 150px`)}>
        <div data-rv="" style={sx('padding: 48px 44px; border-radius: 26px; border: 1px solid rgba(242,236,226,0.1); background: radial-gradient(120% 120% at 0% 0%, rgba(108,13,44,0.35), rgba(16,9,12,0.5) 60%); display: flex; justify-content: space-between; align-items: center; gap: 30px; flex-wrap: wrap')}>
          <div style={{ maxWidth: '720px' }}>
            <span style={LBL}>(02) BEYOND THE COMMITTEE ROOM</span>
            <p style={sx(`margin: 18px 0 0; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 700; font-size: clamp(22px, 2.4vw, 34px); line-height: 1.2; letter-spacing: -0.02em`)}>{society.beyond}</p>
          </div>
          <span style={sx(`font-family: ${MONO}; font-size: 11px; letter-spacing: 0.24em; color: #9A938A`)}>SOURCE · RNS MUN 2026 BROCHURE</span>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
