'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const CALENDLY = 'https://calendly.com/hello-louisburette/30min';

const ELEVATION_POINTS = '0,258.2 70,238.4 140,218.6 210,178.9 270,134.2 320,104.5 370,149.1 420,89.6 470,64.8 520,124.3 580,84.6 640,54.9 690,74.7 750,139.2 830,203.7 895,243.4 955,223.5 1025,164.0 1085,114.4 1150,69.8 1200,54.9 1255,114.4 1325,193.8 1400,258.2';

const N = 40;

function buildPolylines(stroke: string, opacityFor: (i: number) => number) {
  const pts = ELEVATION_POINTS.split(' ').map(p => p.split(',').map(Number));
  return Array.from({ length: N }, (_, i) => {
    const shifted = pts
      .map(([x, y]) => `${x},${(y + i * 1.05 + Math.pow(i / N, 2) * 14).toFixed(1)}`)
      .join(' ');
    return <polyline key={i} points={shifted} fill="none" stroke={stroke} strokeWidth="1.3" opacity={opacityFor(i).toFixed(3)} />;
  });
}

export default function TrailFooter() {
  const t = useTranslations('footer');
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const linkedinRef = useRef<HTMLAnchorElement>(null);
  const profileRef = useRef<SVGPathElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const cursorRef = useRef<SVGRectElement>(null);
  const dropRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const profile = profileRef.current;
    const section = sectionRef.current;
    if (!profile || !section) return;

    const onScroll = () => {
      const len = profile.getTotalLength();
      const rect = section.getBoundingClientRect();
      // First frame: layout may be unresolved (height 0) -> 0/0 = NaN, which
      // Math.max/min let through and which blows up getPointAtLength.
      if (!rect.height || !isFinite(len)) return;
      let progress = (window.innerHeight - rect.top) / rect.height;
      if (!isFinite(progress)) return;
      progress = Math.max(0, Math.min(1, progress));
      const pt = profile.getPointAtLength(progress * len);

      rectRef.current?.setAttribute('width', String(pt.x));
      if (cursorRef.current) {
        cursorRef.current.setAttribute('x', String(pt.x - 7));
        cursorRef.current.setAttribute('y', String(pt.y - 7));
        cursorRef.current.style.opacity = progress > 0.01 ? '1' : '0';
      }
      if (dropRef.current) {
        dropRef.current.setAttribute('x1', String(pt.x));
        dropRef.current.setAttribute('x2', String(pt.x));
        dropRef.current.setAttribute('y1', String(pt.y));
        dropRef.current.style.opacity = progress > 0.01 ? '0.55' : '0';
      }

      const lit = progress >= 0.88;
      if (ctaRef.current) {
        const el = ctaRef.current;
        el.style.border = lit ? '4px solid #EDFF00' : '4px solid #3A3A38';
        el.style.background = lit ? '#EDFF00' : 'transparent';
        el.style.color = lit ? '#0A0A0A' : '#6E6B65';
        el.style.boxShadow = lit ? '7px 7px 0 #5B2BFF' : 'none';
      }
      if (linkedinRef.current) {
        const el = linkedinRef.current;
        el.style.border = lit ? '3px solid #F3F1EC' : '3px solid #2E2E2C';
        el.style.color = lit ? '#F3F1EC' : '#5C5A55';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="trail-section" ref={sectionRef} style={{ padding: 'clamp(52px,8vw,80px) clamp(18px,4.5vw,48px) 44px', background: '#0A0A0A', color: '#F3F1EC', position: 'relative', overflow: 'hidden', minHeight: '460px', display: 'flex', flexDirection: 'column' }}>
      <div data-reveal style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(34px,4vw,56px)', lineHeight: 0.96, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '20px' }}>
          {t('title_1')}<br />{t('title_2')}
        </h2>
        <p style={{ fontSize: 'clamp(15px,1.4vw,17px)', lineHeight: 1.7, color: '#B8B5AE', maxWidth: '490px' }}>{t('desc')}</p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, minHeight: '230px', marginTop: '32px' }}>
        <svg className="trail-svg" viewBox="0 0 1400 300" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '340px', display: 'block', pointerEvents: 'none' }}>
          <defs>
            <clipPath id="elev-reveal">
              <rect ref={rectRef} x="0" y="0" width="0" height="300" />
            </clipPath>
          </defs>
          <g>{buildPolylines('#F3F1EC', i => 0.16 * (1 - i / (N * 1.6)))}</g>
          <g clipPath="url(#elev-reveal)">{buildPolylines('#EDFF00', i => 1 - i / (N * 1.15))}</g>
          <path ref={profileRef} d={`M ${ELEVATION_POINTS.split(' ').map(p => p.replace(',', ' ')).join(' L ')}`} fill="none" stroke="none" />
          <line ref={dropRef} x1="0" y1="0" x2="0" y2="292" stroke="#EDFF00" strokeWidth="2" strokeDasharray="5,5" opacity="0" />
          <rect ref={cursorRef} x="0" y="0" width="14" height="14" fill="#EDFF00" stroke="#0A0A0A" strokeWidth="3" opacity="0" />
        </svg>
      </div>

      <div id="contact" className="footer-bottom" style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginTop: '24px', scrollMarginTop: '80px' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#6E6B65', letterSpacing: '0.06em' }}>{t('copyright')}</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <a ref={ctaRef} href={CALENDLY} target="_blank" rel="noreferrer"
            style={{ display: 'inline-block', padding: '16px 30px', border: '4px solid #3A3A38', background: 'transparent', color: '#6E6B65', fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s' }}>
            {t('contact')}
          </a>
          <a ref={linkedinRef} href="https://www.linkedin.com/in/louis-burette/" target="_blank" rel="noreferrer"
            style={{ display: 'inline-block', padding: '11px 20px', border: '3px solid #2E2E2C', background: 'transparent', color: '#5C5A55', fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s' }}>
            {t('linkedin')}
          </a>
          <a href="mailto:hello@louisburette.com"
            style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#6E6B65', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F3F1EC')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6E6B65')}>
            hello@louisburette.com
          </a>
        </div>
      </div>
    </section>
  );
}
