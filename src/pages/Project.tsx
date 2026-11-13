import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calendar, Check, Compass, Image, MonitorSmartphone, Route, ShieldCheck, Sparkles, Target, UserRound, X } from 'lucide-react';
import { projects } from '../data/projects';
import { gsap, reduced, scrollToTarget, ScrollTrigger, Split, useGSAP, useReveals } from '../lib/motion';
import { Laptop, Phone, shotTravel } from '../components/Devices';
import { DeviceStage } from '../sections/Work';
import Divider from '../components/Divider';

const toc = [['overview', 'Overview', Compass], ['challenge', 'Challenge', Target], ['process', 'Approach', Route], ['visuals', 'Design work', Image], ['outcome', 'Reflection', Sparkles]] as const;

export default function Project() {
  const { id } = useParams();
  const p = projects.find((x) => x.id === id) ?? projects[0];
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const root = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const [active, setActive] = useState('overview');
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => { document.title = `${p.name} — Shariya Habiba`; }, [p]);
  useEffect(() => {
    if (zoom) { dlg.current?.showModal(); window.__lenis?.stop(); } else { dlg.current?.close(); window.__lenis?.start(); }
  }, [zoom]);

  useReveals(root, [p.id]);
  useGSAP(() => {
    toc.forEach(([sid]) => ScrollTrigger.create({ trigger: '#' + sid, start: 'top 50%', end: 'bottom 50%', onToggle: (e) => e.isActive && setActive(sid) }));
    if (reduced()) return;
    gsap.from('.case-hero .c', { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.02, delay: 0.2 });
    gsap.from('.case-fade', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.4 });
    gsap.from('.case-hero .fan', { y: 200, rotate: 0, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.5 });
    gsap.to('.case-hero .fan', { x: (i) => [-1, 0, 1][i] * 150, rotate: (i) => [-10, 0, 10][i], ease: 'none', scrollTrigger: { trigger: '.case-stage', start: 'top 80%', end: 'bottom 30%', scrub: true } });
    gsap.utils.toArray<HTMLElement>('.shot').forEach((shot) =>
      gsap.to(shot, { y: () => shotTravel(shot), ease: 'none', scrollTrigger: { trigger: shot.closest('.laptop'), start: 'top 70%', end: 'bottom 25%', scrub: true, invalidateOnRefresh: true } }),
    );
    gsap.from('.step', { opacity: 0, x: -40, stagger: 0.12, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.steps', start: 'top 80%' } });
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
      const row = document.querySelector<HTMLElement>('.phone-row');
      if (!row) return;
      const dist = () => Math.max(0, row.scrollWidth - row.parentElement!.clientWidth);
      if (dist() < 40) return;
      gsap.to(row, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.phone-pin', start: 'center center', end: () => '+=' + dist() * 1.4, pin: true, scrub: 1, invalidateOnRefresh: true } });
    });
    gsap.from('.phone-row .phone', { y: 120, rotate: (i) => (i % 2 ? 6 : -6), opacity: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.phone-row', start: 'top 85%' } });
  }, { scope: root, dependencies: [p.id], revertOnUpdate: true });

  return (
    <div ref={root} key={p.id}>
      <section className="case-hero" style={{ ['--case' as string]: p.color }}>
        <div className="case-back mono case-fade"><Link to="/#work"><ArrowLeft size={14} /> All projects</Link><span>Case study / {p.num} of 04</span></div>
        <span className="eyebrow case-fade">{p.eyebrow}</span>
        <Split as="h1" text={`${p.name}*.*`} />
        <p className="case-dek case-fade">{p.subtitle}</p>
        <div className="case-facts">
          {([[UserRound, 'Role', p.role], [Calendar, 'When', p.timeline], [MonitorSmartphone, 'Platform', p.platform]] as const).map(([Icon, k, v]) => (
            <div className="fact case-fade" key={k}><i><Icon size={18} /></i><div><small>{k}</small><strong>{v}</strong></div></div>
          ))}
        </div>
        <div className="case-stage"><DeviceStage p={p} /></div>
      </section>
      <Divider variant="scallop" top={p.color} bottom="var(--paper)" />

      <div className="case-shell">
        <aside className="case-aside"><nav className="toc"><span className="eyebrow">On this page</span>
          {toc.map(([sid, label, Icon], i) => (
            <button key={sid} className={active === sid ? 'active' : ''} onClick={() => scrollToTarget('#' + sid)}><Icon size={15} />0{i + 1} / {label}</button>
          ))}
        </nav></aside>
        <div className="case-body">
          <section id="overview" className="case-block"><span className="eyebrow">The context</span><Split as="h2" data-split text={'What this project\n*is about.*'} /><Split as="p" mode="words" className="lead" data-words text={p.desc} /></section>
          <section id="challenge" className="case-block"><span className="eyebrow">01 / The challenge</span><Split as="h2" data-split text={'Understanding\n*the friction.*'} /><p data-reveal>{p.problem}</p></section>
          <section id="process" className="case-block"><span className="eyebrow">02 / Design approach</span><Split as="h2" data-split text={'From questions\nto *decisions.*'} />
            <div className="steps">{p.approach.map((s, i) => <div className="step" key={i}><span>0{i + 1}</span><p>{s}</p><i><Check size={14} /></i></div>)}</div>
          </section>
          <section id="visuals" className="case-block"><span className="eyebrow">03 / Selected design work</span><Split as="h2" data-split text={'The work,\n*up close.*'} />
            {p.device === 'phone' ? (
              <div className="phone-pin"><div className="phone-row">
                {p.gallery.map((g, i) => <Phone key={g} src={g} alt={`${p.name} screen ${i + 1}`} fit={p.fit} onClick={() => setZoom(g)} />)}
              </div><p className="mono cap">{p.gallery.length} original screens — tap any phone to view full size</p></div>
            ) : (
              p.gallery.map((g, i) => (
                <figure className="case-fig" key={g}>
                  <Laptop src={g} alt={`${p.name} design artifact ${i + 1}`} url={`${p.name} · Artifact ${String(i + 1).padStart(2, "0")}`} onClick={() => setZoom(g)} />
                  <figcaption className="mono">{p.name} / Artifact {String(i + 1).padStart(2, '0')} — original export, scrolls with the page · click to enlarge</figcaption>
                </figure>
              ))
            )}
          </section>
          <section id="outcome" className="case-block"><span className="eyebrow">04 / What was delivered</span><Split as="h2" data-split text={'Built with\n*intention.*'} />
            <p data-reveal>{p.outcome}</p>
            <blockquote data-reveal>{p.learning}</blockquote>
            <div className="integrity" data-reveal><i><ShieldCheck size={18} /></i><div><span className="mono">Note on impact</span><p>Potential business benefits are design hypotheses, not measured outcomes. This portfolio does not claim unverified conversion, productivity or revenue improvements.</p></div></div>
          </section>
        </div>
      </div>

      <Link className="next-project" to={`/work/${next.id}`} data-cursor="Next" style={{ ['--card' as string]: next.color }}>
        <span className="mono">Up next / {next.num}</span>
        <strong><span>{next.name}</span><i><ArrowUpRight size={34} /></i></strong>
      </Link>

      <dialog className="lightbox" ref={dlg} data-lenis-prevent onClose={() => setZoom(null)} onClick={(e) => e.target === dlg.current && setZoom(null)}>
        <button className="lightbox-close" onClick={() => setZoom(null)}><X size={14} /> Close</button>
        {zoom && <img src={zoom} alt="Enlarged design screen" />}
      </dialog>
    </div>
  );
}
