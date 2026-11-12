import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SiteHeader, SiteFooter, PageHero, usePageReveal, LBL, WRAP, ROOT } from '../components/Chrome.jsx';
import { sx, ARCHIVO, MONO } from '../lib/sx.js';
import { contact } from '../data/site.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email, like name@college.edu.';
  if (!v.topic) e.topic = 'Pick what your message is about.';
  if (v.message.trim().length < 20) e.message = 'Tell us a little more (at least 20 characters).';
  return e;
}

const label = sx(`display: block; margin-bottom: 10px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.22em; color: #9A938A`);
const field = sx("width: 100%; box-sizing: border-box; padding: 16px 18px; border-radius: 14px; border: 1px solid rgba(242,236,226,0.16); background: rgba(16,9,12,0.6); color: #F2ECE2; font: inherit; font-size: 16px; outline: none; transition: border-color .25s, box-shadow .25s");
const errStyle = sx('display: block; margin-top: 8px; font-size: 14px; color: #F08A9E');

export default function Contact() {
  const root = useRef(null);
  usePageReveal(root);
  const [params] = useSearchParams();
  const preset = contact.topics.includes(params.get('topic')) ? params.get('topic') : '';
  const [v, setV] = useState({ name: '', email: '', college: '', topic: preset, message: '' });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const errors = validate(v);

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const show = (k) => touched[k] && errors[k];

  const submit = (e) => {
    e.preventDefault(); // no server: this demo form validates and confirms, it does not send anything
    setTouched({ name: true, email: true, topic: true, message: true });
    if (Object.keys(errors).length) {
      const ids = { name: 'f-name', email: 'f-email', topic: 'f-topic', message: 'f-msg' };
      const firstKey = ['name', 'email', 'topic', 'message'].find((k) => errors[k]);
      document.getElementById(ids[firstKey])?.focus();
      return;
    }
    setSent(true);
  };

  return (
    <div ref={root} style={ROOT}>
      <SiteHeader />
      <PageHero label="CONTACT · STAY CONNECTED" title={<>Raise your<br />placard.</>} intro="Questions about registration, committees or delegations? Send a note and the Secretariat will get back to you." />

      <section style={sx(`${WRAP}; padding: 80px 24px 150px; display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); gap: 28px`)} className="contact-grid">
        <div data-rv="" style={sx('padding: 40px 38px; border-radius: 26px; border: 1px solid rgba(242,236,226,0.1); background: radial-gradient(120% 100% at 0% 0%, rgba(108,13,44,0.3), rgba(16,9,12,0.55) 60%)')}>
          {sent ? (
            <div role="status" style={sx('min-height: 420px; display: flex; flex-direction: column; justify-content: center')}>
              <span style={LBL}>MESSAGE RECEIVED</span>
              <span style={sx(`display: block; margin-top: 20px; font-family: ${ARCHIVO}; font-stretch: 125%; font-weight: 800; font-size: clamp(36px, 4vw, 60px); line-height: 0.95; letter-spacing: -0.04em; text-transform: uppercase`)}>Thank you,<br /><span style={{ color: '#D9AE52' }}>{v.name.trim().split(' ')[0]}.</span></span>
              <p style={sx('margin: 22px 0 0; max-width: 460px; font-size: 17px; line-height: 1.55; color: #D8D1C6')}>Your note about <b style={{ color: '#F2ECE2' }}>{v.topic.toLowerCase()}</b> is ready for the Secretariat. This demo doesn’t send email; for a real reply, write to <b style={{ color: '#F2ECE2' }}>{contact.email}</b>.</p>
              <button type="button" className="ghost" onClick={() => { setSent(false); setV({ name: '', email: '', college: '', topic: '', message: '' }); setTouched({}); }} style={sx('align-self: flex-start; margin-top: 30px; min-height: 46px; padding: 0 22px; border-radius: 999px; border: 1px solid rgba(242,236,226,0.25); background: none; color: #F2ECE2; font: inherit; font-size: 15px; cursor: pointer')}>Send another</button>
            </div>
          ) : (
            <form noValidate onSubmit={submit}>
              <span style={LBL}>(01) SEND A MESSAGE</span>
              <div style={sx('display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: 20px; margin-top: 30px')}>
                <div>
                  <label htmlFor="f-name" style={label}>NAME *</label>
                  <input id="f-name" className="fld" value={v.name} onChange={set('name')} onBlur={blur('name')} autoComplete="name" aria-invalid={!!show('name')} aria-describedby="e-name" style={field} />
                  {show('name') && <span id="e-name" style={errStyle}>{errors.name}</span>}
                </div>
                <div>
                  <label htmlFor="f-email" style={label}>EMAIL *</label>
                  <input id="f-email" className="fld" type="email" value={v.email} onChange={set('email')} onBlur={blur('email')} autoComplete="email" aria-invalid={!!show('email')} aria-describedby="e-email" style={field} />
                  {show('email') && <span id="e-email" style={errStyle}>{errors.email}</span>}
                </div>
                <div>
                  <label htmlFor="f-college" style={label}>COLLEGE</label>
                  <input id="f-college" className="fld" value={v.college} onChange={set('college')} autoComplete="organization" style={field} />
                </div>
                <div>
                  <label htmlFor="f-topic" style={label}>TOPIC *</label>
                  <select id="f-topic" className="fld" value={v.topic} onChange={set('topic')} onBlur={blur('topic')} aria-invalid={!!show('topic')} aria-describedby="e-topic" style={{ ...field, appearance: 'none', backgroundImage: 'linear-gradient(45deg, transparent 50%, #D9AE52 50%), linear-gradient(135deg, #D9AE52 50%, transparent 50%)', backgroundPosition: 'calc(100% - 22px) 50%, calc(100% - 16px) 50%', backgroundSize: '6px 6px', backgroundRepeat: 'no-repeat' }}>
                    <option value="">Choose one…</option>
                    {contact.topics.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {show('topic') && <span id="e-topic" style={errStyle}>{errors.topic}</span>}
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <label htmlFor="f-msg" style={label}>MESSAGE *</label>
                <textarea id="f-msg" className="fld" rows={6} value={v.message} onChange={set('message')} onBlur={blur('message')} aria-invalid={!!show('message')} aria-describedby="e-msg" style={{ ...field, resize: 'vertical', minHeight: '150px' }} />
                <div style={sx('display: flex; justify-content: space-between; gap: 12px')}>
                  {show('message') ? <span id="e-msg" style={errStyle}>{errors.message}</span> : <span />}
                  <span style={sx(`margin-top: 8px; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.14em; color: #9A938A`)}>{v.message.trim().length} / 20+</span>
                </div>
              </div>
              <button type="submit" className="cta" style={sx('margin-top: 28px; display: inline-flex; align-items: center; gap: 12px; min-height: 52px; padding: 0 30px; border: 0; border-radius: 999px; background: linear-gradient(180deg, #F0CB7A, #D9AE52); color: #070607; font: inherit; font-weight: 600; font-size: 16px; cursor: pointer')}>Send message ↗</button>
              <p style={sx('margin: 18px 0 0; font-size: 14px; line-height: 1.5; color: #9A938A')}>Demo form: it checks your entries but doesn’t send or store anything.</p>
            </form>
          )}
        </div>

        <div style={sx('display: grid; gap: 22px; align-content: start')}>
          <div className="kit" data-rv="" style={sx('padding: 32px 30px; border-radius: 24px; border: 1px solid rgba(242,236,226,0.1); background: rgba(16,9,12,0.45)')}>
            <span style={LBL}>(02) OFFICIAL CHANNELS</span>
            <dl style={sx('margin: 22px 0 0; display: grid; gap: 18px')}>
              {[['EMAIL', contact.email], ['INSTAGRAM', '@' + contact.instagram], ['WEBSITE', contact.site]].map(([k, val]) => (
                <div key={k}>
                  <dt style={sx(`font-family: ${MONO}; font-size: 10.5px; letter-spacing: 0.22em; color: #9A938A`)}>{k}</dt>
                  <dd style={sx(`margin: 6px 0 0; font-family: ${ARCHIVO}; font-stretch: 112%; font-weight: 700; font-size: 22px; letter-spacing: -0.01em`)}>{val}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="kit" data-rv="" style={{ ...sx('padding: 32px 30px; border-radius: 24px; border: 1px solid rgba(242,236,226,0.1); background: rgba(16,9,12,0.45)'), transitionDelay: '0.1s' }}>
            <span style={LBL}>(03) VENUE</span>
            <p style={sx('margin: 18px 0 0; font-size: 17px; line-height: 1.6; color: #F2ECE2')}>{contact.venue.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}</p>
            <div style={sx('margin-top: 20px; display: grid; gap: 4px')}>
              {contact.transit.map((t) => (
                <a key={t.t} className="row" href={t.href} target="_blank" rel="noreferrer" style={sx('display: flex; justify-content: space-between; gap: 16px; padding: 12px 6px; border-top: 1px solid rgba(242,236,226,0.1)')}>
                  <span style={sx(`font-family: ${MONO}; font-size: 11px; letter-spacing: 0.2em; color: #9A938A`)}>{t.t.toUpperCase()}</span>
                  <span style={sx('font-size: 15px')}>{t.v} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
