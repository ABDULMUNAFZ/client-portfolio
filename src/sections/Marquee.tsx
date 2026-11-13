import { useRef } from 'react';
import { gsap, reduced, ScrollTrigger, useGSAP } from '../lib/motion';

const words = ['Research first', 'Design with intention', 'Think in systems', 'Build for people'];

/** Two rows drifting in opposite directions; scroll velocity speeds them up and skews them. */
export default function Marquee() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reduced()) return;
    let vel = 0, dir = 1;
    ScrollTrigger.create({ onUpdate: (s) => { dir = s.direction; vel = Math.min(Math.abs(s.getVelocity()) / 150, 16); } });
    const rows = gsap.utils.toArray<HTMLElement>('.mq-row > div').map((el, i) => ({ el, x: 0, base: i % 2 ? 1 : -1 }));
    const tick = () => {
      vel *= 0.92;
      rows.forEach((r) => {
        const w = r.el.scrollWidth / 2;
        r.x += r.base * dir * (1.1 + vel);
        if (r.x <= -w) r.x += w;
        if (r.x > 0) r.x -= w;
        r.el.style.transform = `translate3d(${r.x}px,0,0) skewX(${(-r.base * dir * vel * 0.5).toFixed(2)}deg)`;
      });
    };
    // Only run while the marquee is on screen.
    ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)) });
    return () => gsap.ticker.remove(tick);
  }, { scope: root });

  const row = [...words, ...words].map((w, i) => <span key={i}>{w}<b>✳</b></span>);
  return (
    <section className="marquee" ref={root} aria-hidden>
      <div className="mq-row"><div>{row}</div></div>
      <div className="mq-row outline"><div>{row}</div></div>
    </section>
  );
}
