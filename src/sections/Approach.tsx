import { useRef } from 'react';
import { Check, Code2, Layers, MousePointerClick, Search, Workflow, type LucideIcon } from 'lucide-react';
import { gsap, reduced, Split, useGSAP } from '../lib/motion';

const steps: [string, string, string, LucideIcon, string][] = [
  ['01', 'Research before assumptions', 'Interviews, UX audits and competitor analysis help me understand the people and the problem.', Search, '#DDF1FA'],
  ['02', 'Structure before screens', 'Journeys, information architecture and user flows create a foundation that makes sense.', Workflow, '#EBD9FB'],
  ['03', 'Interfaces built for people', 'Thoughtful hierarchy, accessibility awareness and responsive interaction make complexity approachable.', MousePointerClick, '#FCEFB4'],
  ['04', 'Systems that scale', 'Reusable components and consistent patterns help teams design and build with clarity.', Layers, '#D5F5DC'],
  ['05', 'Design that reaches development', 'A technical background helps me collaborate with engineers and design for real constraints.', Code2, '#FBE3D6'],
];

/** Connected learning-plan style timeline; the line fills as you scroll. */
export default function Approach() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reduced()) return;
    gsap.fromTo('.tl-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 60%', end: 'bottom 60%', scrub: true } });
    gsap.utils.toArray<HTMLElement>('.tl-item').forEach((it, i) => {
      gsap.from(it.querySelector('.tl-card'), { x: i % 2 ? 80 : -80, rotate: i % 2 ? 4 : -4, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: it, start: 'top 80%' } });
      gsap.from(it.querySelector('.tl-node'), { scale: 0, duration: 0.6, ease: 'back.out(3)', scrollTrigger: { trigger: it, start: 'top 62%' } });
      gsap.from(it.querySelector('.tl-ic'), { rotate: -180, scale: 0, duration: 1, ease: 'back.out(1.6)', scrollTrigger: { trigger: it, start: 'top 75%' } });
    });
  }, { scope: root });

  return (
    <section className="approach" id="approach" ref={root}>
      <span className="eyebrow">02 / How I work</span>
      <div className="sec-head">
        <Split as="h2" data-split text={'Curiosity meets\n*structure.*'} />
        <p data-reveal>From the messy first question to the final pixel — and all the decisions in between.</p>
      </div>
      <div className="tl">
        <span className="tl-line"><i className="tl-fill" /></span>
        {steps.map(([n, t, d, Icon, bg], i) => (
          <div className={`tl-item ${i % 2 ? 'right' : 'left'}`} key={n}>
            <span className="tl-node" />
            <article className="tl-card" style={{ background: bg }}>
              <i className="tl-ic"><Icon size={20} /></i>
              <span className="mono">Step {n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <div className="tl-actions"><span className="chip ok">Think · Make · Refine</span><span className="round">⋯</span><span className="round dark"><Check size={14} /></span></div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
