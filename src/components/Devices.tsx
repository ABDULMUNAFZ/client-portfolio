import type { CSSProperties } from 'react';

type PhoneProps = { src: string; alt: string; fit?: 'cover' | 'contain'; className?: string; style?: CSSProperties; onClick?: () => void };

/** iPhone-style mockup: titanium frame, dynamic island, side buttons. */
export function Phone({ src, alt, fit = 'cover', className = '', style, onClick }: PhoneProps) {
  return (
    <div className={`phone ${className}`} style={style} onClick={onClick} data-cursor={onClick ? 'Zoom' : undefined}>
      <i className="btn-side l1" /><i className="btn-side l2" /><i className="btn-side r1" />
      <div className={`phone-screen fit-${fit}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" draggable={false} />
        <span className="island" />
        <span className="home-bar" />
      </div>
    </div>
  );
}

/** Laptop mockup. The `.shot` image is scrolled inside the screen by the parent's ScrollTrigger. */
export function Laptop({ src, alt, url, onClick }: { src: string; alt: string; url: string; onClick?: () => void }) {
  return (
    <div className="laptop" onClick={onClick} data-cursor={onClick ? 'Zoom' : undefined}>
      <div className="laptop-lid">
        <span className="cam" />
        <div className="laptop-screen">
          <div className="browser-bar"><b /><b /><b /><span>{url}</span></div>
          <div className="viewport"><img className="shot" src={src} alt={alt} loading="lazy" decoding="async" draggable={false} /></div>
        </div>
      </div>
      <div className="laptop-base"><span /></div>
    </div>
  );
}

/** Scroll distance for a tall screenshot inside its viewport (0 when it fits). */
export const shotTravel = (shot: HTMLElement) => {
  const vp = shot.parentElement!;
  return -Math.max(0, shot.offsetHeight - vp.clientHeight);
};
