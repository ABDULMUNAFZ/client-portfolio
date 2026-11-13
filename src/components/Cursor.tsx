import { useEffect, useRef } from 'react';
import { gsap } from '../lib/motion';

export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches || !el.current) return;
    const xTo = gsap.quickTo(el.current, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(el.current, 'y', { duration: 0.35, ease: 'power3' });
    const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('a,button,[data-cursor]');
      el.current?.classList.toggle('is-hover', !!t);
      if (label.current) label.current.textContent = t ? t.dataset.cursor ?? '' : '';
    };
    addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    return () => { removeEventListener('pointermove', move); document.removeEventListener('pointerover', over); };
  }, []);

  return <div className="cursor" ref={el} aria-hidden><span ref={label} /></div>;
}
