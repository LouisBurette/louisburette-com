'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const founders = [
  { name: 'Autorise', labelKey: 'fondateur_label', descKey: 'autorise_desc', img: '/assets/autorise_card.png', link: 'https://autorise.ai', linkLabel: 'autorise.ai ↗' },
  { name: 'Lagun', labelKey: 'personnel_label', descKey: 'lagun_desc', img: '/assets/lagun_2.png', link: 'https://lagun.chat', linkLabel: 'lagun.chat ↗' },
];

export default function Projets() {
  const t = useTranslations('projets');

  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef(0);
  const [hint, setHint] = useState<'scroll' | 'done' | 'drag'>('scroll');

  const missions = [1, 2, 3, 4, 5, 6, 7, 8].map(n => ({
    type: t(`m${n}_type`), title: t(`m${n}_title`),
    desc: t(`m${n}_desc`), result: t(`m${n}_result`),
  }));

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const stickOffset = () => 62 + (barRef.current?.getBoundingClientRect().height ?? 50);

    const measure = () => {
      const wrap = wrapRef.current, pin = pinRef.current, track = trackRef.current;
      if (!wrap || !pin || !track) return;
      pin.style.top = `${stickOffset()}px`;

      if (window.innerWidth < 860 || reduced) {
        wrap.style.height = 'auto';
        pin.style.position = 'static';
        pin.style.overflowX = 'auto';
        track.style.transform = 'none';
        overflowRef.current = 0;
        setHint('drag');
        return;
      }

      pin.style.position = 'sticky';
      pin.style.overflowX = 'hidden';
      const ov = Math.max(0, track.scrollWidth - pin.clientWidth);
      overflowRef.current = ov;
      wrap.style.height = `${pin.offsetHeight + ov}px`;
      setHint(h => (h === 'drag' ? 'scroll' : h));
    };

    const tick = () => {
      const wrap = wrapRef.current, pin = pinRef.current, track = trackRef.current;
      if (!wrap || !pin || !track || !overflowRef.current) return;
      const r = wrap.getBoundingClientRect();
      const span = r.height - pin.offsetHeight;
      if (span <= 0) return;
      const p = Math.max(0, Math.min(1, (stickOffset() - r.top) / span));
      track.style.transform = `translateX(${(-p * overflowRef.current).toFixed(1)}px)`;
      setHint(p >= 0.985 ? 'done' : 'scroll');
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; tick(); });
    };
    const onResize = () => { measure(); tick(); };

    measure();
    tick();
    const settle = window.setTimeout(onResize, 600);
    if (document.fonts?.ready) document.fonts.ready.then(onResize).catch(() => {});

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, []);

  return (
    <section id="projets" style={{ borderBottom: '4px solid #0A0A0A', background: '#F3F1EC', scrollMarginTop: '62px' }}>
      <div ref={barRef} className="section-bar">
        <span className="section-bar-title">{t('title')}</span>
        <span className="section-bar-rule" />
      </div>

      <div style={{ padding: 'clamp(34px,6vw,56px) clamp(18px,4.5vw,48px) clamp(48px,6vw,72px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: '4px', border: '4px solid #0A0A0A', boxShadow: '12px 12px 0 #5B2BFF', backgroundColor: '#0A0A0A' }}>
          {founders.map(p => (
            <div key={p.name} data-reveal style={{ backgroundColor: '#fff', padding: 'clamp(24px,4vw,36px)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: '#5B2BFF' }}>{t(p.labelKey)}</span>
                <span style={{ flex: 1, height: '2px', backgroundColor: '#0A0A0A' }} />
              </div>
              <div style={{ border: '4px solid #0A0A0A', overflow: 'hidden', marginBottom: '26px', background: '#0A0A0A', aspectRatio: '16/10', position: 'relative' }}>
                <Image src={p.img} alt={p.name} fill data-parallax="12" style={{ objectFit: 'cover', transform: 'scale(1.06)' }} />
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,2.4vw,36px)', lineHeight: 1, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '12px' }}>{p.name}</h3>
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#4A463F', marginBottom: '22px', maxWidth: '380px' }}>{t(p.descKey)}</p>
              <a href={p.link} target="_blank" rel="noreferrer" className="link-mono"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', fontWeight: 700, color: '#0A0A0A', textDecoration: 'none', letterSpacing: '0.08em', borderBottom: '3px solid #5B2BFF', padding: '3px 7px', marginLeft: '-7px', width: 'fit-content', marginTop: 'auto' }}>
                {p.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Missions — horizontal track driven by page scroll */}
      <div ref={wrapRef} style={{ position: 'relative', borderTop: '4px solid #0A0A0A', background: '#F3F1EC' }}>
        <div ref={pinRef} className="missions-scroll" style={{ position: 'sticky', top: '112px', zIndex: 10, overflow: 'hidden', padding: '28px 0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', padding: '0 clamp(18px,4.5vw,48px)', marginBottom: '24px' }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}>{t('missions_label')}</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: '#5B2BFF', textAlign: 'right' }}>
              {hint === 'done' ? t('scroll_done') : hint === 'drag' ? t('drag_hint') : t('scroll_hint')}
            </span>
          </div>

          <div ref={trackRef} style={{ display: 'flex', gap: '20px', width: 'max-content', padding: '0 clamp(18px,4.5vw,48px)', willChange: 'transform' }}>
            {missions.map((m, i) => (
              <div key={i} style={{ width: '300px', flexShrink: 0, border: '4px solid #0A0A0A', borderTop: '8px solid #5B2BFF', backgroundColor: '#fff', padding: '26px 24px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: '#5B2BFF', marginBottom: '14px', display: 'block' }}>{m.type}</span>
                <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '21px', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '12px' }}>{m.title}</h4>
                <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#4A463F', marginBottom: '18px' }}>{m.desc}</p>
                <div style={{ borderTop: '3px solid #0A0A0A', paddingTop: '14px', marginTop: 'auto' }}>
                  <p style={{ fontSize: '13px', lineHeight: 1.5, fontWeight: 600, margin: 0 }}>{m.result}</p>
                </div>
              </div>
            ))}
            <div style={{ width: '240px', flexShrink: 0, border: '4px dashed #0A0A0A', padding: '26px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDFF00' }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '20px', lineHeight: 1.1, textTransform: 'uppercase', textAlign: 'center' }}>{t('ghost_card')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
