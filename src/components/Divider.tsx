import { useRef } from 'react';
import { gsap, reduced, useGSAP } from '../lib/motion';

type Variant = 'scallop' | 'halftone' | 'stairs';
type Props = { variant: Variant; top: string; bottom: string };

const COLS = 30, ROWS = 4;
const STAIRS = Array.from({ length: 16 }, (_, i) => 100 - i * 5.6);

/**
 * Animated hand-off between two section colours. Each variant is a different shape:
 * scallop — rounded drops shrink into waves; halftone — dots grow into the next colour;
 * stairs — columns retract into a stepped edge.
 */
export default function Divider({ variant, top, bottom }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reduced()) return;
    const items = root.current!.querySelectorAll('i');
    const st = { trigger: root.current, start: 'top 95%', end: 'bottom 45%', scrub: true };
    if (variant === 'scallop')
      gsap.fromTo(items, { scaleY: 1 }, { scaleY: 0.28, ease: 'none', stagger: { each: 0.04, from: 'center' }, scrollTrigger: st });
    if (variant === 'halftone')
      gsap.fromTo(items, { scale: 0 }, { scale: 1, ease: 'none', stagger: { each: 0.01, grid: [ROWS, COLS], from: 'center' }, scrollTrigger: st });
    if (variant === 'stairs')
      gsap.fromTo(items, { height: '100%' }, { height: (i) => `${STAIRS[i]}%`, ease: 'none', stagger: 0.03, scrollTrigger: st });
  }, { scope: root });

  const style = { ['--top' as string]: top, ['--bottom' as string]: bottom };
  return (
    <div className={`divider dv-${variant}`} ref={root} style={style} aria-hidden>
      {variant === 'scallop' && Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      {variant === 'halftone' && Array.from({ length: COLS * ROWS }, (_, k) => {
        const r = Math.floor(k / COLS);
        return <span key={k}><i style={{ width: `${((r + 1) / ROWS) * 100}%` }} /></span>;
      })}
      {variant === 'stairs' && STAIRS.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
    </div>
  );
}
