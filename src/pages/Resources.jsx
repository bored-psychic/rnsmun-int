import { useRef } from 'react';
import { SiteHeader, SiteFooter, PageHero, usePageReveal, LBL, H2, WRAP, ROOT } from '../components/Chrome.jsx';
import { sx, ARCHIVO, MONO } from '../lib/sx.js';
import { resources, briefs } from '../data/site.js';

const BROCHURE = resources[0].file;
const DocIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#D9AE52" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l5 5v13H6zM14 3v5h5M9 13h7M9 17h5" /></svg>
);

export default function Resources() {
  const root = useRef(null);
  usePageReveal(root);
  return (
    <div ref={root} style={ROOT}>
      <SiteHeader />
      <PageHero label="RESOURCES · DELEGATE DESK" title={<>Read before<br />you speak.</>} intro="The official documents for RNS MUN 2026, plus a one-page checklist and a shortcut to each committee’s brief." />

      <section style={sx(`${WRAP}; padding: 90px 24px 130px`)}>
        <div data-rv="" style={{ marginBottom: '48px' }}><span style={LBL}>(01) DOCUMENTS</span><span style={H2}>Download<br />the papers.</span></div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap: 22px')}>
          {resources.map((r, i) => (
            <article key={r.t} className="kit" data-rv="" style={{ ...sx('display: flex; flex-direction: column; padding: 32px 30px 30px; border-radius: 24px; border: 1px solid rgba(242,236,226,0.1); background: radial-gradient(120% 100% at 100% 0%, rgba(108,13,44,0.3), rgba(16,9,12,0.5) 60%)'), transitionDelay: (i * 0.1) + 's' }}>
              <div style={sx('display: flex; justify-content: space-between; align-items: flex-start; gap: 16px')}>
                <DocIcon />
                <span style={sx(`padding: 6px 11px; border-radius: 999px; border: 1px solid rgba(217,174,82,0.4); font-family: ${MONO}; font-size: 10px; letter-spacing: 0.18em; color: #D9AE52`)}>{r.kind}</span>
              </div>
              <span style={sx(`display: block; margin-top: 26px; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; font-size: 26px; line-height: 1.05; letter-spacing: -0.02em`)}>{r.t}</span>
              <p style={sx('flex: 1; margin: 14px 0 0; font-size: 16px; line-height: 1.55; color: #B9B1A6')}>{r.d}</p>
              <span style={sx(`display: block; margin-top: 22px; font-family: ${MONO}; font-size: 10.5px; letter-spacing: 0.2em; color: #9A938A`)}>{r.meta}</span>
              <div style={sx('display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px')}>
                <a className="cta" href={r.file} target="_blank" rel="noreferrer" style={sx('display: inline-flex; align-items: center; min-height: 46px; box-sizing: border-box; padding: 0 22px; border-radius: 999px; background: linear-gradient(180deg, #F0CB7A, #D9AE52); color: #070607; font-weight: 600; font-size: 15px')}>Open PDF ↗</a>
                <a className="ghost" href={r.file} download style={sx('display: inline-flex; align-items: center; min-height: 46px; box-sizing: border-box; padding: 0 22px; border-radius: 999px; border: 1px solid rgba(242,236,226,0.25); font-weight: 500; font-size: 15px')}>Download ↓</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 150px`)}>
        <div data-rv="" style={sx('display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; margin-bottom: 40px')}>
          <div><span style={LBL}>(02) COMMITTEE BRIEFS</span><span style={H2}>Know your<br />agenda.</span></div>
          <span style={sx('max-width: 380px; font-size: 16px; line-height: 1.55; color: #B9B1A6')}>Each link opens the brochure at that committee’s page, with the full agenda and award structure.</span>
        </div>
        <div style={{ borderBottom: '1px solid rgba(242,236,226,0.1)' }}>
          {briefs.map((b) => (
            <a key={b.c} className="row brief" data-rv="" href={`${BROCHURE}#page=${b.page}`} target="_blank" rel="noreferrer" style={sx('display: grid; grid-template-columns: minmax(130px, 220px) 1fr auto; align-items: center; gap: 24px; padding: 26px 12px; border-top: 1px solid rgba(242,236,226,0.1)')}>
              <span style={sx(`font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(22px, 2.4vw, 32px); letter-spacing: -0.03em`)}>{b.c}</span>
              <span style={sx('font-size: 17px; line-height: 1.45; color: #D8D1C6')}>{b.d}</span>
              <span style={sx(`font-family: ${MONO}; font-size: 11px; letter-spacing: 0.2em; color: #D9AE52; white-space: nowrap`)}>PAGE {b.page} ↗</span>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
