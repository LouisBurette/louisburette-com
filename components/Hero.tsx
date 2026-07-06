'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  return (
    <section style={{ minHeight: 'calc(100vh - 62px)', padding: '72px 48px 80px', borderBottom: '3px solid #1A1714', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#F5EFE5' }}>
      <div className="hero-layout" style={{ display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Left */}
        <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '40px', animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'fit-content', padding: '8px 16px', border: '2px solid #2D5A27', background: 'rgba(45,90,39,0.07)' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2D5A27', display: 'block', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#2D5A27' }}>{t('available')}</span>
          </div>
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px,4.5vw,68px)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {t('h1_1')}<br />{t('h1_2')}<br />{t('h1_3')}
            </h1>
          </div>
          <p style={{ fontSize: 'clamp(17px,1.6vw,22px)', lineHeight: 1.6, maxWidth: '520px', fontWeight: 300, color: 'rgba(26,23,20,0.8)' }}>
            {t('subtitle')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="https://calendly.com/hello-louisburette/30min" target="_blank" rel="noreferrer"
                style={{ display: 'inline-block', padding: '15px 30px', border: '3px solid #E8622A', background: '#E8622A', color: '#fff', fontSize: '13px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '5px 5px 0 #1A1714', transition: 'all 0.12s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#1A1714'; el.style.borderColor = '#1A1714'; el.style.boxShadow = '2px 2px 0 #1A1714'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = '#E8622A'; el.style.borderColor = '#E8622A'; el.style.boxShadow = '5px 5px 0 #1A1714'; }}>
                {t('cta_contact')}
              </a>
              <a href="#expertise"
                style={{ display: 'inline-block', padding: '15px 30px', border: '3px solid #1A1714', background: 'transparent', color: '#1A1714', fontSize: '13px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '5px 5px 0 rgba(26,23,20,0.2)', transition: 'all 0.12s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#1A1714'; el.style.color = '#F5EFE5'; el.style.boxShadow = '2px 2px 0 #1A1714'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = '#1A1714'; el.style.boxShadow = '5px 5px 0 rgba(26,23,20,0.2)'; }}>
                {t('cta_more')}
              </a>
            </div>
            <a href="https://autorise.ai" target="_blank" rel="noreferrer"
              style={{ fontSize: '12px', color: '#1A1714', textDecoration: 'none', opacity: 0.45, fontWeight: 700, letterSpacing: '0.06em', borderBottom: '1px solid rgba(26,23,20,0.3)', paddingBottom: '1px' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.45')}>
              {t('link_autorise')}
            </a>
          </div>
        </div>
        {/* Photo */}
        <div className="hero-photo" style={{ flexShrink: 0, animation: 'fadeUp 0.5s 0.15s ease both', opacity: 0, animationFillMode: 'both' }}>
          <div style={{ width: '340px', height: '420px', border: '3px solid #1A1714', overflow: 'hidden', transform: 'rotate(-1.5deg)', boxShadow: '8px 8px 0 #E8622A' }}>
            <Image src="/photo.png" alt="Louis Burette" width={340} height={420} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} priority />
          </div>
        </div>
      </div>
    </section>
  );
}
