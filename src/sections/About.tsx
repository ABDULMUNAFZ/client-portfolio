import { useRef } from 'react';
import { Accessibility, Briefcase, Code2, GraduationCap, Layers, Lightbulb, PenTool, Play, Search, Smartphone, Sparkles, Workflow } from 'lucide-react';
import { gsap, reduced, Split, useGSAP } from '../lib/motion';

const skills = [[Search, 'UX Research'], [Workflow, 'Information Architecture'], [Layers, 'Design Systems'], [PenTool, 'UI Design'], [Play, 'Prototyping'], [Smartphone, 'Mobile UX'], [Accessibility, 'Accessibility awareness'], [Code2, 'Frontend development']] as const;

const events = [
  { kind: 'Work', icon: Briefcase, when: 'Jun 2026 — Now', text: 'UI/UX Designer at Mevia Studio — designing a multi-module creator-marketing SaaS.', bg: '#DDF1FA', pill: '50+ components' },
  { kind: 'Internship', icon: Sparkles, when: 'Nov 25 — Apr 26', text: 'UI/UX & Frontend Design Intern at Shipthis — pricing, marketing pages and IA.', bg: '#EBD9FB' },
  { kind: 'Concept', icon: Lightbulb, when: 'Ongoing', text: 'Freelancing Growth App — from interviews and personas to high-fidelity prototypes.', bg: '#FCEFB4' },
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reduced()) return;
    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const o = { v: 0 }, end = Number(el.dataset.count);
      gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' }, onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
    });
    gsap.from('.event', { y: 90, rotate: (i) => [-4, 3, -2][i], opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.events', start: 'top 80%' } });
    gsap.fromTo('.edu', { rotate: 0, y: 60 }, { rotate: -6, y: 0, ease: 'none', scrollTrigger: { trigger: '.events', start: 'top 80%', end: 'bottom 40%', scrub: true } });
    gsap.from('.stat', { y: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.stats', start: 'top 88%' } });
    gsap.from('.skills span', { scale: 0, opacity: 0, stagger: 0.05, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: '.skills', start: 'top 88%' } });
  }, { scope: root });

  return (
    <section className="about" id="about" ref={root}>
      <div className="about-grid">
        <div className="about-copy">
          <span className="eyebrow">03 / A little about me</span>
          <Split as="h2" data-split text={'Curious by nature.\n*Intentional* by design.'} />
          <p data-reveal>I’m Shariya, a product designer with a background in Computer Science. My work spans creator-marketing SaaS, enterprise experiences, mobile UX, design systems and frontend development.</p>
          <p data-reveal>What interests me most is the thinking behind the interface: why people hesitate, where a workflow breaks down, and how design can make technology feel more human.</p>
          <div className="stats">
            <div className="stat"><b><span data-count="50">50</span>+</b><small>Reusable components</small></div>
            <div className="stat green"><b><span data-count="6">6</span>+</b><small>Freelancers interviewed</small><em className="party">🎉</em></div>
            <div className="stat dashed"><b><span data-count="10">10</span>+</b><small>Finance apps reviewed</small></div>
          </div>
          <div className="toolkit" data-reveal>
            <small className="mono">Toolkit</small>
            <div className="skills">{skills.map(([Icon, s]) => <span key={s}><Icon size={14} />{s}</span>)}</div>
          </div>
        </div>
        <div className="events">
          <h3 className="events-title">My journey <span>🧭</span></h3>
          {events.map((e) => (
            <article className="event" key={e.kind} style={{ background: e.bg }}>
              <header><span><e.icon size={15} /> {e.kind}</span><small>{e.when}</small></header>
              <p>{e.text}</p>
              {e.pill && <span className="event-pill">{e.pill}</span>}
            </article>
          ))}
          <article className="event edu"><header><span><GraduationCap size={15} /> Education</span><small>Foundation</small></header><p>Computer Science background — a technical lens for real-world constraints.</p></article>
        </div>
      </div>
    </section>
  );
}
