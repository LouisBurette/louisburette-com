'use client';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

const companies = ['Seaturns','Midipile','Leviathan Dynamics','Beyond the Sea','Entent','Green Spot','Air Booster'];

export default function Partenaire() {
  const t = useTranslations('partenaire');
  const locale = useLocale();
  const tftp_url = `https://team-planet.com/${locale}/`;
  const tripled = [...companies, ...companies, ...companies];

  return (
    <section style={{ padding: '80px 48px', background: '#0E2215', color: '#F5EFE5', borderBottom: '3px solid #1A1714' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline', marginBottom: '44px' }}>
        <span style={{ fontSize: '11px', opacity: 0.55, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: '#7FB069' }}>{t('label')}</span>
        <span style={{ flex: 1, height: '2px', backgroundColor: 'rgba(127,176,105,0.18)', display: 'block' }} />
      </div>
      <div style={{ display: 'flex', gap: '64px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0, width: '210px', height: '210px', border: '3px solid #F5EFE5', background: '#F5EFE5', overflow: 'hidden', transform: 'rotate(-1.5deg)', boxShadow: '8px 8px 0 #7FB069', position: 'relative' }}>
          <Image src="/tftp.png" alt="Team for the Planet" fill style={{ objectFit: 'contain', padding: '16px' }} />
        </div>
        <div style={{ flex: 1, minWidth: '320px' }}>
          <span style={{ display: 'inline-block', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, color: '#7FB069', marginBottom: '14px', padding: '5px 12px', border: '2px solid rgba(127,176,105,0.35)' }}>{t('trust_badge')}</span>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(32px,3.6vw,52px)', lineHeight: 1.05, marginBottom: '22px' }}>{t('title')}</h2>
          <p style={{ fontSize: 'clamp(16px,1.6vw,20px)', lineHeight: 1.6, opacity: 0.65, maxWidth: '560px', fontWeight: 300, marginBottom: '32px' }}>{t('desc')}</p>
          <a href={tftp_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, color: '#7FB069', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '2px solid rgba(127,176,105,0.4)', paddingBottom: '2px' }}>{t('link')}</a>
        </div>
      </div>
      <div style={{ marginTop: '56px', paddingTop: '28px', borderTop: '1px solid rgba(245,239,229,0.15)', overflow: 'hidden', position: 'relative' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(245,239,229,0.3)', marginBottom: '18px' }}>{t('supported')}</p>
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', animation: 'marqueeScrollTftp 19s linear infinite', flexShrink: 0 }}>
          {tripled.map((c, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,239,229,0.4)', padding: '0 36px' }}>{c}</span>
              <span style={{ color: '#7FB069', fontSize: '11px', flexShrink: 0 }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
