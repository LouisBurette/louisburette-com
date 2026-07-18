'use client';
import { useTranslations } from 'next-intl';

const tags: Record<string, string[]> = {
  card1: ['Automation', 'Agents IA', 'APIs', 'Workflows'],
  card2: ['Landing Page', 'MVP', 'Système de prospection', 'Reply Desk automatisé'],
  card3: ['Discovery', 'Stratégie', 'Design', 'Roadmap', 'Développement'],
  card4: ['Analytics', 'Dashboards', 'Pilotage'],
};

export default function Expertise() {
  const t = useTranslations('expertise');
  const cards = [
    { key: 'card1', tagKey: 'card1', borderRight: true, borderBottom: true },
    { key: 'card2', tagKey: 'card2', borderRight: false, borderBottom: true },
    { key: 'card3', tagKey: 'card3', borderRight: true, borderBottom: false },
    { key: 'card4', tagKey: 'card4', borderRight: false, borderBottom: false },
  ];
  return (
    <section id="expertise" className="section-padding" style={{ padding: '80px 48px', borderBottom: '3px solid #1A1714', background: '#F5EFE5' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline', marginBottom: '48px' }}>
        <span style={{ fontSize: '11px', opacity: 0.3, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{t('num')}</span>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1.05 }}>{t('title')}</h2>
      </div>
      <div className="expertise-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', border: '3px solid #1A1714', boxShadow: '8px 8px 0 #1A1714' }}>
        {cards.map(({ key, tagKey, borderRight, borderBottom }) => (
          <div key={key} style={{ background: '#F5EFE5', color: '#1A1714', padding: '52px 44px', borderRight: borderRight ? '3px solid #1A1714' : undefined, borderBottom: borderBottom ? '3px solid #1A1714' : undefined, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(30px,3vw,44px)', lineHeight: 1.05, marginBottom: '20px' }}>
              {t(`${key}_h`)}<br /><em>{t(`${key}_em`)}</em>
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.75, opacity: 0.65, marginBottom: '32px', maxWidth: '380px' }}>{t(`${key}_p`)}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
              {tags[tagKey].map(tag => (
                <span key={tag} style={{ fontSize: '11px', padding: '5px 11px', border: '2px solid rgba(26,23,20,0.25)', fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
