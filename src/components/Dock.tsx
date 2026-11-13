import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, House, Mail, MapPin, UserRound, Workflow, type LucideIcon } from 'lucide-react';
import { scrollToTarget } from '../lib/motion';

const items: [string, string, LucideIcon][] = [
  ['top', 'Home', House],
  ['work', 'Work', BriefcaseBusiness],
  ['approach', 'Approach', Workflow],
  ['about', 'About', UserRound],
  ['contact', 'Contact', Mail],
];

export const useClock = () => {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 15000); return () => clearInterval(id); }, []);
  return t;
};

/** Floating toolbar: scroll progress, section shortcuts, local time. */
export default function Dock() {
  const ring = useRef<SVGCircleElement>(null);
  const [pct, setPct] = useState(0);
  const time = useClock();
  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => {
      const d = document.documentElement;
      const p = Math.min(1, d.scrollTop / (d.scrollHeight - d.clientHeight) || 0);
      if (ring.current) ring.current.style.strokeDashoffset = String(113.1 * (1 - p));
      setPct(Math.round(p * 100));
    };
    addEventListener('scroll', on, { passive: true }); on();
    return () => removeEventListener('scroll', on);
  }, [pathname]);

  const go = (id: string) => {
    if (id === 'top') return pathname === '/' ? scrollToTarget(0) : nav('/');
    if (id === 'contact' || pathname === '/') return scrollToTarget('#' + id);
    nav('/#' + id);
  };

  return (
    <nav className="dock" aria-label="Quick navigation">
      <div className="dock-ring" title="Scroll progress">
        <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" /><circle ref={ring} className="ring-fill" cx="22" cy="22" r="18" /></svg>
        <span>{pct}</span>
      </div>
      {items.map(([id, tip, Icon]) => (
        <button key={id} data-tip={tip} aria-label={tip} onClick={() => go(id)}>
          <Icon size={18} />
        </button>
      ))}
      <span className="dock-time"><MapPin size={14} /> BLR <b>{time}</b></span>
    </nav>
  );
}
