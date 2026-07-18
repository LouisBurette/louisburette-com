'use client';
import { useTranslations } from 'next-intl';

export default function Apropos() {
  const t = useTranslations('apropos');
  const sectors = t.raw('sectors') as string[];

  return (
    <section id="parcours" className="section-padding" style={{ padding: '80px 48px', background: '#F5EFE5', color: '#1A1714', borderBottom: '3px solid #E8622A' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline', marginBottom: '64px' }}>
        <span style={{ fontSize: '11px', opacity: 0.3, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{t('num')}</span>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px,4vw,52px)' }}>{t('title')}</h2>
      </div>
      <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '64px' }}>
        <div style={{ flex: 2, minWidth: '320px' }}>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(20px,2.2vw,28px)', lineHeight: 1.55, marginBottom: '32px', fontStyle: 'italic', opacity: 0.85 }}>{t('quote1')}</p>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(17px,1.8vw,22px)', lineHeight: 1.6, opacity: 0.65, maxWidth: '540px', fontStyle: 'italic' }}>{t('quote2')}</p>
        </div>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.4, marginBottom: '20px' }}>{t('never_with')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sectors.map((sector) => (
              <span key={sector} style={{ fontSize: '13px', opacity: 0.75, fontWeight: 500, color: '#1A1714', textDecoration: 'line-through', textDecorationColor: '#E8622A', textDecorationThickness: '2px' }}>{sector}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
