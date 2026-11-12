import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Liquid from './Liquid.jsx';
import { sx, ARCHIVO, MONO } from '../lib/sx.js';
import { nav } from '../data/site.js';

export const routeOf = (n) => '/' + n.toLowerCase();

// Logo + tabs + Register. `overlay` = floats over the Journey on the home page.
export function SiteHeader({ overlay = false }) {
  return (
    <header style={{
      ...sx('z-index: 20; box-sizing: border-box; padding: 26px 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap'),
      ...(overlay
        ? sx('position: absolute; top: 0; left: 0; right: 0')
        : sx('position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(180deg, rgba(7,6,7,0.92), rgba(7,6,7,0.6)); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(242,236,226,0.06)'))
    }}>
      <Link to="/" style={sx(`font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: 22px; letter-spacing: -0.02em`)}>RNSMUN<span style={{ color: '#D9AE52' }}>’26</span></Link>
      <nav className="nav-pill" aria-label="Primary" style={sx('display: flex; gap: 28px; flex-wrap: wrap; font-size: 15px; padding: 10px 22px; border-radius: 999px; background: rgba(20,12,15,0.45); border: 1px solid rgba(242,236,226,0.12); backdrop-filter: blur(14px)')}>
        {nav.map((n) => (
          <NavLink key={n} to={routeOf(n)} className="tab">{n}</NavLink>
        ))}
      </nav>
      <Link className="cta" to="/contact?topic=Registration" style={sx('display: inline-flex; align-items: center; gap: 12px; min-height: 46px; box-sizing: border-box; padding: 0 24px; border-radius: 999px; background: linear-gradient(180deg, #F0CB7A, #D9AE52); color: #070607; font-weight: 600; font-size: 15px')}>Register ↗</Link>
      {/* phone menu: tabs as a scrollable strip under the logo */}
      <nav className="nav-strip" aria-label="Primary (mobile)">
        {nav.map((n) => <NavLink key={n} to={routeOf(n)} className="tab">{n}</NavLink>)}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer style={sx('border-top: 1px solid rgba(242,236,226,0.08); padding: 80px 40px 44px')}>
      <span data-rv="" style={sx(`display: block; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(48px, 9vw, 150px); line-height: 0.88; letter-spacing: -0.05em; text-transform: uppercase`)}>See you on<br /><span style={{ color: '#D9AE52' }}>the floor.</span></span>
      <div style={sx(`margin-top: 64px; display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.2em; color: #9A938A`)}>
        <span>© 2026 RNSIT MUN SOCIETY · BENGALURU</span>
        <nav aria-label="Footer" style={sx('display: flex; gap: 26px; flex-wrap: wrap')}>
          {nav.map((n) => <Link key={n} to={routeOf(n)}>{n.toUpperCase()}</Link>)}
        </nav>
        <span>VISUALS CREATED WITH AI (GEMINI, VEO)</span>
      </div>
    </footer>
  );
}

// Big title band at the top of each inner page, on the liquid-gold surface.
export function PageHero({ label, title, intro, children }) {
  return (
    <section style={sx('position: relative; min-height: 560px; display: flex; align-items: flex-end; overflow: hidden')}>
      <div style={sx('position: absolute; inset: 0')}><Liquid center={0.8} /></div>
      <div aria-hidden="true" style={sx('position: absolute; inset: 0; background: linear-gradient(180deg, rgba(7,6,7,0.2) 0%, rgba(7,6,7,0.15) 45%, #070607 100%)')} />
      <div className="hero-in" style={sx('position: relative; width: 100%; max-width: 1328px; margin: 0 auto; box-sizing: border-box; padding: 180px 24px 70px')}>
        <span style={sx(`font-family: ${MONO}; font-size: 12px; letter-spacing: 0.3em; color: #D9AE52`)}>{label}</span>
        <h1 style={sx(`margin: 22px 0 0; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(52px, 8vw, 132px); line-height: 0.88; letter-spacing: -0.05em; text-transform: uppercase; text-shadow: 0 6px 40px rgba(0,0,0,0.6)`)}>{title}</h1>
        {intro && <p style={sx('margin: 28px 0 0; max-width: 640px; font-size: 19px; line-height: 1.55; color: #D8D1C6')}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}

// Scroll to top on page change, and reveal [data-rv] blocks as they enter the screen.
export function usePageReveal(rootRef) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) root.classList.add('anim');
    let ticking = false;
    const run = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight || 900;
        root.querySelectorAll('[data-rv]').forEach((el) => {
          if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('in');
        });
      });
    };
    window.addEventListener('scroll', run, true);
    window.addEventListener('resize', run);
    run();
    return () => { window.removeEventListener('scroll', run, true); window.removeEventListener('resize', run); };
  }, [pathname, rootRef]);
}

export const LBL = sx(`font-family: ${MONO}; font-size: 12px; letter-spacing: 0.3em; color: #D9AE52`);
export const H2 = sx(`display: block; margin-top: 22px; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(36px, 4.6vw, 72px); line-height: 0.92; letter-spacing: -0.04em; text-transform: uppercase`);
export const WRAP = 'max-width: 1328px; margin: 0 auto; box-sizing: border-box';
export const ROOT = sx("position: relative; width: 100%; min-height: 100vh; background: #070607; color: #F2ECE2; font-family: 'Inter Tight', system-ui, sans-serif; overflow-x: clip");
