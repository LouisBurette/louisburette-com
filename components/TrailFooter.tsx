'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const ELEVATION_POINTS = '0,258.2 70,238.4 140,218.6 210,178.9 270,134.2 320,104.5 370,149.1 420,89.6 470,64.8 520,124.3 580,84.6 640,54.9 690,74.7 750,139.2 830,203.7 895,243.4 955,223.5 1025,164.0 1085,114.4 1150,69.8 1200,54.9 1255,114.4 1325,193.8 1400,258.2';

function buildPolylines(count: number, stroke: string, baseOpacity: number, offsetY: number) {
  const opacityStep = baseOpacity / count;
  return Array.from({ length: count }, (_, i) => {
    const dy = i * offsetY;
    const opacity = Math.max(0, baseOpacity - i * opacityStep);
    const pts = ELEVATION_POINTS.split(' ').map(p => {
      const [x, y] = p.split(',').map(Number);
      return `${x},${Math.min(290, y + dy).toFixed(1)}`;
    }).join(' ');
    const sw = i === 0 ? '1.8' : '1.1';
    return <polyline key={i} points={pts} fill="none" stroke={stroke} strokeWidth={sw} opacity={opacity.toFixed(3)} />;
  });
}

export default function TrailFooter() {
  const t = useTranslations('footer');
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const linkedinRef = useRef<HTMLAnchorElement>(null);
  const profileRef = useRef<SVGPathElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const cursorRef = useRef<SVGCircleElement>(null);
  const dropRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const profile = profileRef.current;
    const rect0 = rectRef.current;
    const cursor = cursorRef.current;
    const drop = dropRef.current;
    if (!profile || !rect0 || !cursor || !drop) return;
    const totalLength = profile.getTotalLength();

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
      const pt = profile.getPointAtLength(progress * totalLength);

      rect0.setAttribute('width', String(pt.x));
      cursor.setAttribute('cx', String(pt.x));
      cursor.setAttribute('cy', String(pt.y));
      cursor.style.opacity = progress > 0.01 ? '1' : '0';
      drop.setAttribute('x1', String(pt.x)); drop.setAttribute('x2', String(pt.x));
      drop.setAttribute('y1', String(pt.y));
      drop.style.opacity = progress > 0.01 ? '0.5' : '0';

      if (ctaRef.current) {
        if (progress >= 0.9) {
          ctaRef.current.style.border = '3px solid #E8622A';
          ctaRef.current.style.background = '#E8622A';
          ctaRef.current.style.color = '#fff';
          ctaRef.current.style.boxShadow = '5px 5px 0 #1A1714';
        } else {
          ctaRef.current.style.border = '3px solid rgba(245,239,229,0.3)';
          ctaRef.current.style.background = 'transparent';
          ctaRef.current.style.color = 'rgba(245,239,229,0.4)';
          ctaRef.current.style.boxShadow = 'none';
        }
      }
      if (linkedinRef.current) {
        linkedinRef.current.style.color = progress >= 0.9 ? 'rgba(245,239,229,0.7)' : 'rgba(245,239,229,0.3)';
        linkedinRef.current.style.border = progress >= 0.9 ? '2px solid rgba(245,239,229,0.5)' : '2px solid rgba(245,239,229,0.2)';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="trail-section" ref={sectionRef} className="section-padding" style={{ padding: '80px 48px 44px', background: '#1B3A22', color: '#F5EFE5', position: 'relative', overflow: 'hidden', borderTop: '3px solid #1A1714', minHeight: '440px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '560px' }}>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1.05, marginBottom: '20px' }}>
          {t('title_1')}<br />{t('title_2')}
        </h2>
        <p style={{ fontSize: 'clamp(14px,1.4vw,17px)', lineHeight: 1.75, opacity: 0.55, maxWidth: '480px' }}>{t('desc')}</p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, minHeight: '220px', marginTop: '32px' }}>
        <svg id="elev-svg" className="trail-svg" viewBox="0 0 1400 300" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '340px', display: 'block', pointerEvents: 'none' }}>
          <defs>
            <clipPath id="elev-reveal">
              <rect ref={rectRef} x="0" y="0" width="0" height="300" />
            </clipPath>
          </defs>
          <g>{buildPolylines(30, '#7FB069', 0.55, 8)}</g>
          <g clipPath="url(#elev-reveal)">{buildPolylines(30, '#E8622A', 1.0, 8)}</g>
          <path ref={profileRef} d={`M ${ELEVATION_POINTS.split(' ').map(p => p.replace(',', ' ')).join(' L ')}`} fill="none" stroke="none" />
          <line ref={dropRef} x1="0" y1="0" x2="0" y2="288" stroke="#E8622A" strokeWidth="1.5" strokeDasharray="4,4" opacity="0" />
          <circle ref={cursorRef} cx="0" cy="0" r="7" fill="#E8622A" stroke="#1B3A22" strokeWidth="3" opacity="0" />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginTop: '24px' }}>
        <span style={{ fontSize: '11px', opacity: 0.3, fontWeight: 600, letterSpacing: '0.04em' }}>{t('copyright')}</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          <a id="trail-cta" ref={ctaRef} href="https://calendly.com/hello-louisburette/30min" target="_blank" rel="noreferrer"
            style={{ display: 'inline-block', padding: '15px 30px', border: '3px solid rgba(245,239,229,0.3)', background: 'transparent', color: 'rgba(245,239,229,0.4)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.35s' }}>
            {t('contact')}
          </a>
          <a ref={linkedinRef} href="https://www.linkedin.com/in/louis-burette/" target="_blank" rel="noreferrer"
            style={{ display: 'inline-block', padding: '10px 20px', border: '2px solid rgba(245,239,229,0.2)', background: 'transparent', color: 'rgba(245,239,229,0.3)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 0.35s' }}>
            {t('linkedin')}
          </a>
          <a href="mailto:hello@louisburette.com"
            style={{ fontSize: '11px', color: 'rgba(245,239,229,0.3)', textDecoration: 'none', fontWeight: 500, letterSpacing: '0.02em', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,239,229,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,239,229,0.3)')}>
            hello@louisburette.com
          </a>
        </div>
      </div>
    </section>
  );
}
