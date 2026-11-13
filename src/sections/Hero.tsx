import { useRef } from 'react';
import { ArrowDown, Check, Layers, MapPin, PenTool, Smartphone } from 'lucide-react';
import { appReady, gsap, reduced, scrollToTarget, Split, useGSAP } from '../lib/motion';
import Clouds from '../components/Clouds';

/** Centered headline with scattered real-data cards and small clouds that drift apart on scroll. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reduced()) return;
    const cards = gsap.utils.toArray<HTMLElement>('.fc');
    gsap.set('.hero-title .c', { yPercent: 115 });
    gsap.set('.hero-fade', { y: 24, opacity: 0 });
    gsap.set(cards, { scale: 0, rotate: () => gsap.utils.random(-25, 25) });
    gsap.set('.hl-mark', { scaleX: 0 });
    gsap.set('.cloud', { opacity: 0, y: 30 });
    const intro = gsap.timeline({ paused: true })
      .to('.cloud', { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', stagger: 0.08 }, 0)
      .to('.hero-title .c', { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.012 }, 0)
      .to('.hl-mark', { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, 0.3)
      .to('.hero-fade', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.06 }, 0.15)
      .to(cards, { scale: 1, rotate: (_i, el: HTMLElement) => Number(el.dataset.rot ?? 0), duration: 0.9, ease: 'back.out(1.7)', stagger: { each: 0.04, from: 'random' } }, 0.2)
      .from('.plane path', { strokeDashoffset: 300, duration: 1.2, ease: 'power2.out' }, 0.4);
    appReady.then(() => intro.play());

    const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
    cards.forEach((c) => {
      const r = c.getBoundingClientRect();
      const dx = r.left + r.width / 2 - innerWidth / 2, dy = r.top + r.height / 2 - innerHeight / 2;
      const s = Number(c.dataset.speed ?? 1);
      gsap.to(c, { x: dx * 0.55, y: dy * 0.5 - 140 * s, rotate: `+=${gsap.utils.random(-14, 14)}`, ease: 'none', scrollTrigger: st });
    });
    gsap.utils.toArray<SVGElement>('.cloud').forEach((c) => gsap.to(c, { y: -160 * Number(c.dataset.cloud), ease: 'none', scrollTrigger: st }));
    gsap.to('.hero-center', { yPercent: 30, scale: 0.92, opacity: 0.2, ease: 'none', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="hero" ref={root}>
      <Clouds />
      <div className="hero-center">
        <span className="pill hero-fade"><i className="dot" /> Product designer · Bengaluru, India</span>
        <h1 className="hero-title">
          <Split text="Designing " />
          <span className="hl"><span className="hl-mark" /><Split text="*clarity*" /></span>
          <Split text={'\ninto complexity.'} />
        </h1>
        <p className="hero-fade">Hi, I’m <b>Shariya Habiba K S</b> — I turn complicated workflows into intuitive digital experiences, connecting people, products and possibilities.</p>
        <button className="btn-dark hero-fade" onClick={() => scrollToTarget('#work')} data-cursor="Go">See my work <span><ArrowDown size={16} /></span></button>
      </div>

      <div className="fc fc-goal" data-rot="-4" data-speed="1.2"><span className="fc-script">4 case studies</span><i className="fc-check"><Check size={14} /></i></div>
      <div className="fc fc-chipbar" data-rot="0" data-speed="1.8"><i><PenTool size={18} /></i><i><Layers size={18} /></i></div>
      <div className="fc fc-proj fc-p1" data-rot="3" data-speed="1.4"><img src="/assets/thumbs/foodgo.jpg" alt="" /><div><b>Foodgo</b><small><Smartphone size={11} /> Mobile UX · Concept</small></div></div>
      <div className="fc fc-proj fc-p2" data-rot="-2" data-speed="0.9"><img src="/assets/thumbs/mevia.jpg" alt="" /><div><b>Mevia Studio</b><small><Layers size={11} /> SaaS · 2026—Present</small></div></div>
      <div className="fc fc-note" data-rot="-3" data-speed="1.1"><small>What interests me</small><p>Why people hesitate, and where a workflow breaks down.</p><span className="fc-foot">UX research <b>✳</b></span></div>
      <div className="fc fc-stat" data-rot="4" data-speed="1.6"><small>At Mevia</small><b>50+</b><span>reusable components</span></div>
      <div className="fc fc-dont" data-rot="1" data-speed="0.7"><div><small>Step one</small><span>Research before assumptions</span></div><i className="fc-check dark"><Check size={12} /></i></div>
      <div className="fc fc-goal2" data-rot="5" data-speed="2"><small>Principle</small><b>Think in<br />systems</b><i className="fc-check dark"><Check size={12} /></i></div>
      <div className="fc fc-avail" data-rot="0" data-speed="1.3"><span className="tag"><i className="dot" /> Open to work</span><p>Product Design &amp; UI/UX opportunities</p></div>
      <div className="fc fc-search" data-rot="-2" data-speed="1"><MapPin size={14} /> Bengaluru, India</div>
      <svg className="plane" viewBox="0 0 160 80" aria-hidden><path d="M4 70 C30 70 30 40 55 45 S80 70 95 50 S120 20 150 12" /><path className="tri" d="M150 12 l-22 2 8 6 z" /></svg>
    </section>
  );
}
