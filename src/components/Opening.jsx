import { forwardRef } from 'react';
import Liquid from './Liquid.jsx';
import { sx, ARCHIVO, MONO } from '../lib/sx.js';

// Opening title card: three photo tiles with the letters M · U · N cut out of them.
// Scrolling sends M and N off to the sides while U (Lady Justice) grows into the Journey.
const M = import.meta.env.BASE_URL + 'media/';
const tiles = [
  { key: 'm', img: M + 'tile-m2.jpg', alt: 'Assembly hall with brass desk lamps', cut: ['37,0 63,0 50,56', '24,100 40,100 31,22', '60,100 76,100 69,22'] },
  { key: 'u', img: M + 'tile-u.jpg', alt: 'Lady Justice', cut: ['36,0 64,0 58,60 55,68 50,71 45,68 42,60'] },
  { key: 'n', img: M + 'tile-n.jpg', alt: 'Parliament of India', cut: ['40,0 70,0 70,80', '30,20 30,100 60,100'] }
];

const Opening = forwardRef(function Opening(_, ref) {
  return (
    <div ref={ref} data-opening="" style={sx('position: absolute; inset: 0; z-index: 6; pointer-events: none; background: #070607; overflow: hidden')}>
      <div data-op-bg="" style={sx('position: absolute; inset: 0')}>
        <Liquid center={1} />
        <div style={sx('position: absolute; inset: 0; background: radial-gradient(62% 70% at 50% 46%, rgba(7,6,7,0.96) 0%, rgba(7,6,7,0.88) 55%, rgba(7,6,7,0.35) 85%, rgba(7,6,7,0) 100%)')} />
      </div>

      <div className="op-labels" data-op-copy="" style={sx(`position: absolute; left: 40px; bottom: 90px; display: grid; gap: 12px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.3em; color: #B9B1A6`)}>
        <span>POINT OF ORDER</span><span>MOTION TO CAUCUS</span><span>RIGHT OF REPLY</span>
      </div>

      <div style={sx('position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(28px, 5vh, 56px); padding: 90px 24px 80px; box-sizing: border-box')}>
        <div className="op-row" style={sx('display: flex; gap: clamp(10px, 2.2vw, 34px); width: min(1080px, 80vw); justify-content: center')}>
          {tiles.map((t, i) => (
            <div key={t.key} data-op-tile={t.key} style={sx('position: relative; flex: 1; aspect-ratio: 1 / 1; will-change: transform, opacity')}>
              <div className="op-in" style={{ position: 'absolute', inset: 0, animationDelay: (0.15 + i * 0.14) + 's' }}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={`Letter ${t.key.toUpperCase()}: ${t.alt}`} style={sx('position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible')}>
                <defs>
                  <mask id={'op-mask-' + t.key} maskContentUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="100" height="100" rx="6.5" fill="#fff" />
                    <g data-op-cut="">{t.cut.map((pts) => <polygon key={pts} points={pts} fill="#000" />)}</g>
                  </mask>
                </defs>
                <image href={t.img} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid slice" mask={`url(#op-mask-${t.key})`} />
                <rect x="0.25" y="0.25" width="99.5" height="99.5" rx="6.4" fill="none" stroke="rgba(217,174,82,0.45)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" mask={`url(#op-mask-${t.key})`} />
              </svg>
              </div>
            </div>
          ))}
        </div>

        <div data-op-copy="" style={sx('text-align: center')}>
          <h1 className="op-title" style={sx(`margin: 0; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 800; font-size: clamp(40px, 7.4vw, 124px); line-height: 0.92; letter-spacing: -0.045em; text-transform: uppercase; white-space: nowrap`)}>
            <span className="op-chrome">The</span>{' '}<span className="op-brass">floor</span>{' '}<span className="op-chrome">is yours</span><span style={{ color: '#D9AE52' }}>.</span>
          </h1>
          <p style={sx('margin: 22px auto 0; max-width: 560px; font-size: clamp(15px, 1.3vw, 18px); line-height: 1.55; color: #B9B1A6')}>RNSIT Model United Nations · 2026. Six committees, two days, one room. Scroll to begin.</p>
        </div>
      </div>

      <div data-op-copy="" style={sx(`position: absolute; left: 0; right: 0; bottom: 96px; text-align: center; font-family: ${MONO}; font-size: 12px; letter-spacing: 0.4em; color: #D9AE52`)}>SCROLL ↓</div>
    </div>
  );
});

export default Opening;
