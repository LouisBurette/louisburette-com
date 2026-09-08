'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const CALENDLY = 'https://calendly.com/hello-louisburette/30min';

export default function Hero() {
  const t = useTranslations('hero');
  return (
    <section style={{ minHeight: 'calc(100vh - 62px)', padding: 'clamp(40px,7vw,64px) clamp(18px,4.5vw,48px) clamp(48px,7vw,72px)', borderBottom: '4px solid #0A0A0A', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#F3F1EC' }}>
      <div style={{ display: 'flex', gap: '56px', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Left */}
        <div style={{ flex: '1 1 420px', minWidth: 'min(100%,420px)', containerType: 'inline-size', display: 'flex', flexDirection: 'column', gap: '32px', animation: 'wipeIn .82s cubic-bezier(.65,0,.35,1) both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', width: 'fit-content', padding: '8px 14px', border: '3px solid #0A0A0A', backgroundColor: '#EDFF00' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#0A0A0A', display: 'block', flexShrink: 0, animation: 'blink 2.4s steps(1,end) infinite' }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#0A0A0A' }}>{t('available')}</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(29px,9cqw,64px)', lineHeight: 1, letterSpacing: '-0.025em', textTransform: 'uppercase', textWrap: 'pretty', display: 'flex', flexDirection: 'column', gap: '0.18em' }}>
            <span>{t('h1_1')}</span>
            <span>{t('h1_2')}</span>
            <span>{t('h1_3')}</span>
          </h1>

          <p style={{ fontSize: 'clamp(17px,1.6vw,21px)', lineHeight: 1.55, maxWidth: '530px', fontWeight: 400, color: '#33302B' }}>
            {t('subtitle')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-brut"
                style={{ display: 'inline-block', padding: '16px 30px', border: '4px solid #0A0A0A', backgroundColor: '#5B2BFF', color: '#fff', fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '7px 7px 0 #0A0A0A' }}>
                {t('cta_contact')}
              </a>
              <a href="#expertise" className="btn-brut"
                style={{ display: 'inline-block', padding: '16px 30px', border: '4px solid #0A0A0A', backgroundColor: '#EDFF00', color: '#0A0A0A', fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '7px 7px 0 #0A0A0A' }}>
                {t('cta_more')}
              </a>
            </div>
            <a href="https://autorise.ai" target="_blank" rel="noreferrer" className="link-mono"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#0A0A0A', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.08em', borderBottom: '3px solid #5B2BFF', display: 'inline-block', padding: '3px 7px', margin: '0 -7px' }}>
              {t('link_autorise')}
            </a>
          </div>
        </div>

        {/* Photo */}
        <div style={{ flex: '0 0 auto', animation: 'wipeIn .82s .16s cubic-bezier(.65,0,.35,1) both' }}>
          <div style={{ width: 'clamp(250px,28vw,340px)', height: 'clamp(320px,35vw,430px)', border: '4px solid #0A0A0A', overflow: 'hidden', boxShadow: '14px 14px 0 #5B2BFF', background: '#0A0A0A' }}>
            <Image
              src="/photo.png"
              alt="Louis Burette"
              width={340}
              height={430}
              priority
              data-parallax="16"
              data-parallax-scale="1.08"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.08)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
