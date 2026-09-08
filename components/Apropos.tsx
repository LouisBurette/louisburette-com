'use client';
import { useTranslations } from 'next-intl';

export default function Apropos() {
  const t = useTranslations('apropos');
  const sectors = t.raw('sectors') as string[];

  return (
    <section id="parcours" style={{ background: '#F3F1EC', color: '#0A0A0A', borderBottom: '4px solid #0A0A0A', scrollMarginTop: '62px' }}>
      <div className="section-bar">
        <span className="section-bar-title">{t('title')}</span>
        <span className="section-bar-rule" />
      </div>

      <div className="section-pad">
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div data-reveal style={{ flex: '2 1 min(100%,340px)', minWidth: 0 }}>
            <p style={{ fontSize: 'clamp(20px,2.2vw,27px)', lineHeight: 1.5, marginBottom: '36px', fontWeight: 500, borderLeft: '8px solid #5B2BFF', paddingLeft: '32px' }}>
              {t('intro')}
            </p>
            <blockquote style={{ margin: 0, border: '4px solid #0A0A0A', backgroundColor: '#EDFF00', boxShadow: '10px 10px 0 #0A0A0A', padding: '46px 34px 34px', maxWidth: '600px', position: 'relative' }}>
              <span aria-hidden="true" style={{ position: 'absolute', top: '-30px', left: '20px', display: 'block', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '82px', lineHeight: 0.72, color: '#5B2BFF' }}>“</span>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(19px,1.9vw,24px)', lineHeight: 1.35, letterSpacing: '-0.01em', margin: '0 0 14px' }}>{t('quote_title')}</p>
              <p style={{ fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{t('quote_body')}</p>
            </blockquote>
          </div>

          <div data-reveal style={{ flex: '1 1 min(100%,260px)', minWidth: 0 }}>
            <div style={{ border: '4px solid #0A0A0A', backgroundColor: '#fff', boxShadow: '12px 12px 0 #5B2BFF' }}>
              <div style={{ backgroundColor: '#0A0A0A', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '9px', height: '9px', backgroundColor: '#FF3D6B', display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#F3F1EC' }}>{t('never_with')}</span>
              </div>
              <div style={{ padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                {sectors.map(sector => (
                  <span key={sector} data-strike style={{ position: 'relative', display: 'inline-block', fontSize: '14.5px', fontWeight: 600 }}>
                    {sector}
                    <span data-strike-bar style={{ position: 'absolute', left: '-4px', right: '-4px', top: '52%', height: '3px', backgroundColor: '#FF3D6B', transformOrigin: 'left center' }} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
