import { Fragment, createElement, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
export { gsap, ScrollTrigger, useGSAP };

export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Resolves once the intro loader has left the screen. */
let resolveReady!: () => void;
export const appReady = new Promise<void>((r) => (resolveReady = r));
export const markReady = () => resolveReady();

export const scrollToTarget = (target: string | number | HTMLElement, immediate = false) => {
  const l = window.__lenis;
  if (l) l.scrollTo(target, { duration: 1.4, immediate });
  else if (typeof target === 'number') window.scrollTo({ top: target });
  else (typeof target === 'string' ? document.querySelector(target) : target)?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
};

type SplitProps = { text: string; as?: ElementType; className?: string; mode?: 'chars' | 'words'; [k: string]: unknown };

/**
 * React-safe split text. `*word*` renders as an italic accent, `\n` as a line break.
 * Each glyph gets `.c` (inside `.w`) or each word `.wd`, ready for GSAP.
 */
export function Split({ text, as = 'span', className, mode = 'chars', ...rest }: SplitProps) {
  const words = (s: string, key: string): ReactNode[] =>
    s.split(/(\s+)/).map((w, j) => {
      if (!w) return null;
      if (/^\s+$/.test(w)) return ' ';
      return mode === 'chars' ? (
        <span className="w" aria-hidden key={key + j}>
          {[...w].map((ch, k) => <span className="c" key={k}>{ch}</span>)}
        </span>
      ) : (
        <span className="wd" aria-hidden key={key + j}>{w}</span>
      );
    });
  const parts = text.split(/(\*[^*]+\*|\n)/).filter(Boolean);
  const label = text.replace(/\*/g, '').replace(/\n/g, ' ');
  return createElement(
    as,
    { className, 'aria-label': label, ...rest },
    parts.map((p, i) =>
      p === '\n' ? <br key={i} /> : p.startsWith('*') ? <em key={i}>{words(p.slice(1, -1), 'e' + i)}</em> : <Fragment key={i}>{words(p, 'p' + i)}</Fragment>,
    ),
  );
}

/** Shared scroll reveals for anything marked up inside `scope`. */
export function useReveals(scope: React.RefObject<HTMLElement>, deps: unknown[] = []) {
  useGSAP(
    () => {
      if (reduced()) return;
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) =>
        gsap.from(el.querySelectorAll('.c'), {
          yPercent: 115, rotate: 6, duration: 1.1, ease: 'expo.out', stagger: 0.016,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }),
      );
      gsap.utils.toArray<HTMLElement>('[data-words]').forEach((el) =>
        gsap.fromTo(el.querySelectorAll('.wd'), { opacity: 0.14 }, {
          opacity: 1, ease: 'none', stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
        }),
      );
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) =>
        gsap.from(el, { y: 48, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }),
      );
      gsap.utils.toArray<HTMLElement>('[data-pop]').forEach((el) =>
        gsap.from(el, { scale: 0.6, rotate: -8, opacity: 0, duration: 1, ease: 'back.out(1.6)', scrollTrigger: { trigger: el, start: 'top 90%' } }),
      );
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}
