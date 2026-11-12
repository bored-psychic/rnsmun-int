import { useRef } from 'react';
import { SiteHeader, SiteFooter, PageHero, usePageReveal, LBL, H2, WRAP, ROOT } from '../components/Chrome.jsx';
import { sx, ARCHIVO, MONO } from '../lib/sx.js';
import { about } from '../data/site.js';

export default function About() {
  const root = useRef(null);
  usePageReveal(root);
  return (
    <div ref={root} style={ROOT}>
      <SiteHeader />
      <PageHero label="ABOUT · THE BUILDER" title={<>Hi, I’m<br /><span style={{ color: '#D9AE52' }}>{about.name}.</span></>} intro={about.intro}>
        <span style={sx(`display: inline-block; margin-top: 28px; padding: 9px 14px; border-radius: 999px; border: 1px solid rgba(217,174,82,0.4); background: rgba(16,9,12,0.55); font-family: ${MONO}; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase`)}>{about.line}</span>
      </PageHero>

      <section style={sx(`${WRAP}; padding: 90px 24px 130px`)}>
        <span data-rv="" style={LBL}>(01) WHY THE TECHNICAL TEAM</span>
        <p data-rv="" style={sx(`margin: 26px 0 0; max-width: 1150px; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 700; font-size: clamp(26px, 3.2vw, 48px); line-height: 1.16; letter-spacing: -0.025em`)}>{about.why}</p>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 130px`)}>
        <div data-rv="" style={{ marginBottom: '48px' }}><span style={LBL}>(02) THINGS I’VE BUILT</span><span style={H2}>Projects.</span></div>
        <div style={sx('display: grid; grid-template-columns: repeat(auto-fit, minmax(min(270px, 100%), 1fr)); gap: 20px')}>
          {about.projects.map((p, i) => (
            <div key={p.t} className="kit" data-rv="" style={{ ...sx('padding: 30px 28px; border-radius: 22px; border: 1px solid rgba(242,236,226,0.1); background: rgba(16,9,12,0.45); min-height: 210px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; gap: 30px'), transitionDelay: (i * 0.08) + 's' }}>
              <span style={sx(`font-family: ${MONO}; font-size: 12px; letter-spacing: 0.2em; color: #D9AE52`)}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <span style={sx(`display: block; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; font-size: 24px; letter-spacing: -0.02em`)}>{p.t}</span>
                <span style={sx('display: block; margin-top: 10px; font-size: 16px; line-height: 1.55; color: #B9B1A6')}>{p.d}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 130px`)}>
        <div data-rv="" style={{ marginBottom: '36px' }}><span style={LBL}>(03) TOOLKIT</span><span style={H2}>What I work with.</span></div>
        <div data-rv="" style={sx('display: flex; flex-wrap: wrap; gap: 10px')}>
          {about.skills.map((s) => (
            <span key={s} style={sx(`padding: 12px 18px; border-radius: 999px; border: 1px solid rgba(217,174,82,0.35); background: rgba(16,9,12,0.55); font-family: ${MONO}; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase`)}>{s}</span>
          ))}
        </div>
      </section>

      <section style={sx(`${WRAP}; padding: 0 24px 150px`)}>
        <div data-rv="" style={{ marginBottom: '48px' }}><span style={LBL}>(04) HOW THIS SITE WAS MADE</span><span style={H2}>Under<br />the hood.</span></div>
        <div style={{ borderBottom: '1px solid rgba(242,236,226,0.1)' }}>
          {about.thisSite.map((x, i) => (
            <div key={x.t} className="row stack" data-rv="" style={sx('display: grid; grid-template-columns: 60px minmax(180px, 320px) 1fr; align-items: center; gap: 24px; padding: 26px 12px; border-top: 1px solid rgba(242,236,226,0.1)')}>
              <span style={sx(`font-family: ${MONO}; font-size: 12px; letter-spacing: 0.2em; color: #D9AE52`)}>{String(i + 1).padStart(2, '0')}</span>
              <span style={sx(`font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; font-size: clamp(19px, 1.8vw, 24px); letter-spacing: -0.02em`)}>{x.t}</span>
              <span style={sx('font-size: 16px; line-height: 1.55; color: #B9B1A6')}>{x.d}</span>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
