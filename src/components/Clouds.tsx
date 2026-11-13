import type { CSSProperties } from 'react';

/** Shared gradient + cumulus shape for every cloud. */
export function CloudDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <linearGradient id="cloud-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".62" stopColor="#ffffff" />
          <stop offset="1" stopColor="#D6E8FF" />
        </linearGradient>
        <symbol id="cloud" viewBox="0 0 140 70">
          <path fill="url(#cloud-fill)" d="M24 66C11 66 2 58 2 47c0-10 8-18 18-19 1-14 13-24 27-24 10 0 19 5 23 13 4-3 9-5 15-5 13 0 24 10 25 23h2c11 0 20 8 20 18s-9 13-20 13H24z" />
        </symbol>
      </defs>
    </svg>
  );
}

// [left %, top %, width px, drift seconds, parallax speed]
const SET: [number, number, number, number, number][] = [
  [4, 16, 150, 38, 0.6], [20, 6, 90, 30, 1.2], [70, 9, 120, 34, 0.8], [88, 26, 170, 42, 0.5],
  [2, 70, 130, 36, 1.4], [76, 76, 110, 28, 1.6], [46, 4, 70, 26, 1],
];

/** A few small, soft cumulus clouds that drift sideways and float up on scroll. */
export default function Clouds() {
  return (
    <div className="clouds" aria-hidden>
      {SET.map(([l, t, w, d, s], i) => {
        const style: CSSProperties = { left: `${l}%`, top: `${t}%`, width: w, animationDuration: `${d}s`, animationDelay: `${-i * 4}s` };
        return <svg key={i} className="cloud" data-cloud={s} style={style} viewBox="0 0 140 70"><use href="#cloud" /></svg>;
      })}
    </div>
  );
}
