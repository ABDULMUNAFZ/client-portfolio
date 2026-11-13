import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { ScrollTrigger, useGSAP } from '../lib/motion';
import { LINKEDIN, MAIL } from '../data/projects';

/** Frosted-glass pill nav; hides while scrolling down. */
export default function Topbar() {
  const bar = useRef<HTMLElement>(null);
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => bar.current?.classList.toggle('hide', s.direction === 1 && s.scroll() > 300),
    });
  });
  return (
    <header className="topbar" ref={bar}>
      <Link to="/" className="logo" aria-label="Shariya home">shariya<span>✳</span></Link>
      <span className="top-mid mono"><i className="dot" /> Portfolio · 2026</span>
      <div className="top-right">
        <a className="top-icon" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn" data-cursor="Open"><Linkedin size={17} /></a>
        <a className="top-cta" href={MAIL} data-cursor="Hi!">Let’s talk <ArrowUpRight size={16} /></a>
      </div>
    </header>
  );
}
