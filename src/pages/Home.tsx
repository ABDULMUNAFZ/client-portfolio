import { useRef } from 'react';
import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import Work from '../sections/Work';
import Approach from '../sections/Approach';
import About from '../sections/About';
import { gsap, reduced, Split, useGSAP, useReveals } from '../lib/motion';
import Divider from '../components/Divider';

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  useReveals(root);
  useGSAP(() => {
    if (reduced()) return;
    gsap.utils.toArray<HTMLElement>('.ph-line').forEach((l, i) =>
      gsap.fromTo(l, { xPercent: i % 2 ? -35 : 35 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: l, start: 'top bottom', end: 'top 45%', scrub: 1 } }),
    );
    gsap.to('.philo-star', { rotate: 360, ease: 'none', scrollTrigger: { trigger: '.philo', start: 'top bottom', end: 'bottom top', scrub: true } });
  }, { scope: root });
  return (
    <div ref={root}>
      <Hero />
      <Marquee />
      <section className="statement">
        <span className="eyebrow">Hello there</span>
        <Split as="p" mode="words" data-words text="A product designer with a background in Computer Science, drawn to *the thinking behind the interface* — why people hesitate, where a workflow breaks down, and how design can make technology feel more human." />
      </section>
      <Divider variant="scallop" top="var(--paper)" bottom="var(--panel)" />
      <Work />
      <Divider variant="halftone" top="var(--panel)" bottom="var(--orange)" />
      <section className="philo">
        <span className="eyebrow light">The design philosophy</span>
        <div className="ph-line">Not just <em>pretty screens.</em></div>
        <div className="ph-line">Better questions.</div>
        <div className="ph-line">Smarter systems.</div>
        <div className="ph-line g">Human experiences.</div>
        <span className="philo-star" aria-hidden>✳</span>
      </section>
      <Divider variant="stairs" top="var(--orange)" bottom="var(--paper)" />
      <Approach />
      <About />
    </div>
  );
}
