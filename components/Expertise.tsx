'use client';
import { useTranslations } from 'next-intl';

const tags: Record<string, string[]> = {
  card1: ['Automation', 'Agents IA', 'APIs', 'Workflows'],
  card2: ['Landing Page', 'MVP', 'Système de prospection', 'Reply Desk automatisé'],
  card3: ['Discovery', 'Stratégie', 'Design', 'Roadmap'],
  card4: ['Analytics', 'Dashboards', 'Pilotage'],
};

const cards = ['card1', 'card2', 'card3', 'card4'];

export default function Expertise() {
  const t = useTranslations('expertise');

  return (
    <section id="expertise" style={{ borderBottom: '4px solid #0A0A0A', background: '#F3F1EC', scrollMarginTop: '62px' }}>
      <div className="section-bar">
        <span className="section-bar-title">{t('title')}</span>
        <span className="section-bar-rule" />
      </div>

      <div className="section-pad">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: '4px', border: '4px solid #0A0A0A', boxShadow: '12px 12px 0 #0A0A0A', backgroundColor: '#0A0A0A' }}>
          {cards.map((key, i) => (
            <div key={key} data-reveal style={{ padding: 'clamp(28px,4vw,40px) clamp(24px,3.5vw,36px)', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.18em', color: '#5B2BFF', fontWeight: 700, marginBottom: '18px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(19px,1.75vw,26px)', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '18px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                <span>{t(`${key}_h`)}</span>
                <span style={{ backgroundColor: '#EDFF00', padding: '0 5px' }}>{t(`${key}_em`)}</span>
              </h3>
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#4A463F', marginBottom: '28px', maxWidth: '380px' }}>{t(`${key}_p`)}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
                {tags[key].map(tag => (
                  <span key={tag} style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', padding: '5px 10px', border: '2px solid #0A0A0A' }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
