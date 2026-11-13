import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Accessibility, ArrowUp, ArrowUpRight, Briefcase, Check, Code2, Copy, FolderOpen, Layers, Linkedin, MapPin, PenTool, Search, Send, Workflow, type LucideIcon } from 'lucide-react';
import { EMAIL, LINKEDIN, MAIL, projects } from '../data/projects';
import { gsap, reduced, scrollToTarget, Split, useGSAP } from '../lib/motion';
import { useClock } from './Dock';

// Real skills, scattered around the headline like desktop icons.
const STICKERS: [LucideIcon, string, string][] = [
  [Search, 'Research', 'var(--sky)'], [Workflow, 'User flows', 'var(--lilac)'], [Layers, 'Design systems', 'var(--butter)'],
  [PenTool, 'UI design', 'var(--mint)'], [Code2, 'Frontend', 'var(--blush)'], [Accessibility, 'Accessibility', 'var(--lime)'],
];

/** Site-wide ending: stepped edge, headline with skill stickers, a compose-mail window, info cards, wordmark. */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const time = useClock();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { location.href = MAIL; }
  };
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const q = new URLSearchParams({ subject: String(f.get('subject') || 'Hello Shariya'), body: String(f.get('body') || '') });
    location.href = `${MAIL}?${q.toString().replace(/\+/g, '%20')}`;
  };

  useGSAP(() => {
    if (reduced()) return;
    gsap.from('.ft-head .c', { yPercent: 115, rotate: 6, duration: 1.1, ease: 'expo.out', stagger: 0.018, scrollTrigger: { trigger: '.ft-head', start: 'top 85%' } });
    gsap.from(".sticker", { scale: 0, rotate: () => gsap.utils.random(-60, 60), duration: 0.9, ease: "back.out(2)", stagger: 0.06, scrollTrigger: { trigger: ".ft-stickers", start: "top 92%" } });
    gsap.from('.compose', { y: 120, rotate: -4, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.ft-main', start: 'top 85%' } });
    gsap.from('.ft-card', { y: 70, rotate: (i) => [3, -2, 2][i], opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, delay: 0.15, scrollTrigger: { trigger: '.ft-main', start: 'top 85%' } });
    gsap.fromTo('.ft-word .c', { yPercent: 100 }, { yPercent: 0, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '.ft-word', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }, { scope: root });

  return (
    <footer className="site-footer" id="contact" ref={root}>
      <div className="ft-inner">
        <div className="ft-main">
          <div className="ft-left">
            <span className="eyebrow">What’s next?</span>
            <Split as="h2" className="ft-head" text={"Let’s make\nsomething *meaningful.*"} />
            <p className="ft-sub">Open to Product Design &amp; UI/UX opportunities · Bengaluru, India</p>
            <div className="ft-stickers"><a className="sticker li" href={LINKEDIN} target="_blank" rel="noreferrer" data-cursor="Open"><i><Linkedin size={16} /></i>Connect on LinkedIn</a>{STICKERS.map(([Icon, label, bg]) => <span className="sticker" key={label}><i style={{ background: bg }}><Icon size={18} /></i>{label}</span>)}</div>
            <div className="ft-cards">
              <div className="ft-card c-butter"><i><MapPin size={16} /></i><small>Based in</small><strong>Bengaluru</strong><span>{time} IST</span></div>
              <div className="ft-card c-mint"><i><Briefcase size={16} /></i><small>Availability</small><strong>Open to work</strong><span>Design · UI/UX</span></div>
              <div className="ft-card c-lilac"><i><FolderOpen size={16} /></i><small>Case studies</small>
                <ul>{projects.map((p) => <li key={p.id}><Link to={`/work/${p.id}`}>{p.num} · {p.short}<ArrowUpRight size={12} /></Link></li>)}</ul>
              </div>
            </div>
          </div>
          <form className="compose" onSubmit={send}>
            <header><b /><b /><b /><span>New message</span></header>
            <div className="row"><small>To</small><strong>{EMAIL}</strong>
              <button type="button" className="ghost" onClick={copy} aria-label="Copy email">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}</button>
            </div>
            <label className="row"><small>Subject</small><input name="subject" placeholder="A role, a project, or just hello" /></label>
            <textarea name="body" rows={3} placeholder="Write a few lines…" />
            <div className="compose-foot">
              <span className="mono">Opens in your mail app</span>
              <button type="submit" className="btn-light" data-cursor="Send">Send <span><Send size={16} /></span></button>
            </div>
          </form>        </div>

        <div className="ft-word" aria-hidden><Split text="shariya✳" /></div>

        <div className="ft-bottom">
          <span>© 2026 Shariya Habiba K S</span>
          <span>Designed with curiosity &amp; intention</span>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="ft-li"><Linkedin size={14} /> LinkedIn</a>
          <button onClick={() => scrollToTarget(0)}>Back to top <ArrowUp size={14} /></button>
        </div>
      </div>
    </footer>
  );
}
