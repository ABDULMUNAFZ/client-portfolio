import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, MonitorSmartphone, MousePointer2, UserRound } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { gsap, reduced, Split, useGSAP } from '../lib/motion';
import { Laptop, Phone, shotTravel } from '../components/Devices';

export function DeviceStage({ p }: { p: Project }) {
  if (p.device === 'laptop') return <div className="stage stage-laptop"><Laptop src={p.gallery[0]} alt={`${p.name} screen`} url={p.name} /></div>;
  return (
    <div className="stage stage-phones">
      {p.gallery.slice(0, 3).map((g, i) => <Phone key={g} src={g} alt={`${p.name} screen ${i + 1}`} fit={p.fit} className={`fan fan-${i}`} />)}
    </div>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <Link to={`/work/${p.id}`} className="proj" style={{ ['--card' as string]: p.color }} data-cursor="View">
      <div className="proj-info">
        <div className="proj-top"><span className="num-badge">{p.num}</span><span className="chip">{p.eyebrow.split(' · ')[0]}</span></div>
        <h3>{p.name}</h3>
        <p className="proj-tag">{p.tag}</p>
        <p className="proj-desc">{p.desc}</p>
        <ul className="meta">
          <li><UserRound size={15} />{p.role}</li>
          <li><Calendar size={15} />{p.timeline}</li>
          <li><MonitorSmartphone size={15} />{p.platform}</li>
        </ul>
        <span className="btn-dark sm">View case study <span><ArrowUpRight size={15} /></span></span>
      </div>
      <DeviceStage p={p} />
      <span className="proj-num" aria-hidden>{p.num}</span>
    </Link>
  );
}

/** Pinned horizontal gallery on desktop, stacked cards on small screens. */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reduced()) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
      const track = root.current!.querySelector<HTMLElement>('.work-track')!;
      const dist = () => track.scrollWidth - innerWidth;
      const tw = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.work-pin', pin: true, scrub: 1, end: () => '+=' + dist(), invalidateOnRefresh: true, anticipatePin: 1 } });
      gsap.to('.work-progress i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.work-pin', start: 'top top', end: () => '+=' + dist(), scrub: true, invalidateOnRefresh: true } });
      gsap.utils.toArray<HTMLElement>('.proj').forEach((card) => {
        const ca = { trigger: card, containerAnimation: tw, scrub: true };
        gsap.fromTo(card, { rotate: 4, scale: 0.9 }, { rotate: 0, scale: 1, ease: 'none', scrollTrigger: { ...ca, start: 'left right', end: 'left 30%' } });
        gsap.fromTo(card.querySelectorAll('.fan'), { x: 0, rotate: 0 }, { x: (i) => [-1, 0, 1][i] * 120, rotate: (i) => [-9, 0, 9][i], ease: 'none', scrollTrigger: { ...ca, start: 'left 90%', end: 'left 20%' } });
        const shot = card.querySelector<HTMLElement>('.shot');
        if (shot) gsap.to(shot, { y: () => shotTravel(shot), ease: 'none', scrollTrigger: { ...ca, start: 'left 60%', end: 'right 30%', invalidateOnRefresh: true } });
        gsap.fromTo(card.querySelector('.proj-num'), { xPercent: 50 }, { xPercent: -30, ease: 'none', scrollTrigger: { ...ca, start: 'left right', end: 'right left' } });
      });
    });
    mm.add('(max-width: 900px)', () => {
      gsap.utils.toArray<HTMLElement>('.proj').forEach((card) => {
        gsap.from(card, { y: 80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } });
        gsap.fromTo(card.querySelectorAll('.fan'), { x: 0, rotate: 0 }, { x: (i) => [-1, 0, 1][i] * 60, rotate: (i) => [-8, 0, 8][i], duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 60%' } });
        const shot = card.querySelector<HTMLElement>('.shot');
        if (shot) gsap.to(shot, { y: () => shotTravel(shot), ease: 'none', scrollTrigger: { trigger: card, start: 'top 70%', end: 'bottom 20%', scrub: true, invalidateOnRefresh: true } });
      });
    });
  }, { scope: root });

  return (
    <section className="work" id="work" ref={root}>
      <div className="work-pin">
        <div className="work-track">
          <div className="work-intro">
            <span className="eyebrow">01 / The work</span>
            <Split as="h2" data-split text={'Selected\n*work.*'} />
            <p>Different challenges. One obsession: making things feel simpler, clearer and more human.</p>
            <span className="hint mono"><MousePointer2 size={14} /> Keep scrolling <ArrowRight size={14} /></span>
          </div>
          {projects.map((p) => <Card key={p.id} p={p} />)}
        </div>
        <div className="work-progress"><i /></div>
      </div>
    </section>
  );
}
