'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Projets() {
  const t = useTranslations('projets');

  const missions = [1,2,3,4,5,6,7,8].map(n => ({
    type: t(`m${n}_type`), title: t(`m${n}_title`),
    desc: t(`m${n}_desc`), result: t(`m${n}_result`),
  }));

  return (
    <section id="projets" style={{ padding: '80px 48px', borderBottom: '3px solid #1A1714', background: '#F5EFE5' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline', marginBottom: '48px' }}>
        <span style={{ fontSize: '11px', opacity: 0.3, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{t('num')}</span>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1.05 }}>{t('title')}</h2>
      </div>

      {/* Projets fondateurs */}
      <div className="projets-founders" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', border: '3px solid #1A1714', boxShadow: '8px 8px 0 #E8622A', marginBottom: '3px' }}>
        {[
          { labelKey: 'fondateur_label', descKey: 'autorise_desc', name: 'Autorise', img: '/assets/autorise_card.png', link: 'https://autorise.ai', linkLabel: 'autorise.ai ↗', borderRight: true },
          { labelKey: 'personnel_label', descKey: 'lagun_desc', name: 'Lagun', img: '/assets/lagun_2.png', link: 'https://lagun.ai', linkLabel: 'lagun.ai ↗', borderRight: false },
        ].map(p => (
          <div key={p.name} style={{ borderRight: p.borderRight ? '3px solid #1A1714' : undefined, background: '#F5EFE5', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(26,23,20,0.4)' }}>{t(p.labelKey)}</span>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E8622A', flexShrink: 0 }} />
            </div>
            <div style={{ border: '3px solid #1A1714', overflow: 'hidden', marginBottom: '28px', background: '#1A1714', aspectRatio: '16/10', position: 'relative' }}>
              <Image src={p.img} alt={p.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(26px,2.2vw,36px)', color: '#1A1714', lineHeight: 1.05, marginBottom: '10px' }}>{p.name}</h3>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(26,23,20,0.6)', marginBottom: '20px', maxWidth: '380px' }}>{t(p.descKey)}</p>
            <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: '12px', fontWeight: 700, color: '#E8622A', textDecoration: 'none', letterSpacing: '0.06em', borderBottom: '1px solid rgba(232,98,42,0.4)', paddingBottom: '1px', width: 'fit-content', marginTop: 'auto' }}>{p.linkLabel}</a>
          </div>
        ))}
      </div>

      {/* Missions scroll */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '48px', marginBottom: '36px' }}>
        <span style={{ fontSize: '11px', opacity: 0.4, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{t('missions_label')}</span>
        <span style={{ fontSize: '11px', opacity: 0.55, fontWeight: 600 }}>{t('scroll_hint')}</span>
      </div>
      <div className="missions-scroll" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -48px', padding: '0 48px 4px' }}>
        <div style={{ display: 'flex', gap: '16px', width: 'max-content' }}>
          {missions.map((m, i) => (
            <div key={i} style={{ width: '280px', flexShrink: 0, border: '3px solid #1A1714', borderTop: '4px solid #E8622A', padding: '28px 24px', display: 'flex', flexDirection: 'column', background: '#F5EFE5' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#E8622A', marginBottom: '16px', display: 'block' }}>{m.type}</span>
              <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '19px', color: '#1A1714', lineHeight: 1.15, marginBottom: '10px' }}>{m.title}</h4>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(26,23,20,0.55)', marginBottom: '16px' }}>{m.desc}</p>
              <div style={{ borderTop: '2px solid rgba(26,23,20,0.1)', paddingTop: '14px', marginTop: 'auto', display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                <span style={{ color: '#E8622A', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>→</span>
                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#1A1714', fontWeight: 700, margin: 0 }}>{m.result}</p>
              </div>
            </div>
          ))}
          {/* Ghost card */}
          <div style={{ width: '200px', flexShrink: 0, border: '3px dashed rgba(26,23,20,0.2)', padding: '28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '15px', color: 'rgba(26,23,20,0.45)', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.5 }}>
              {t('ghost_card')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
