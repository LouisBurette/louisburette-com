'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useState } from 'react';

const CALENDLY = 'https://calendly.com/hello-louisburette/30min';

const monoLink: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '11px',
  color: '#0A0A0A',
  textDecoration: 'none',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

const mobileLink: React.CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 800,
  fontSize: 'clamp(28px,9vw,40px)',
  textTransform: 'uppercase',
  letterSpacing: '-0.02em',
  color: '#0A0A0A',
  textDecoration: 'none',
  padding: '14px 0',
  borderBottom: '3px solid #0A0A0A',
};

export default function Nav() {
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const locales = [
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
  ];

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code, scroll: false });
  };

  const navLinks = [
    { href: '#agent-ia', label: t('agent'), dot: true },
    { href: '#expertise', label: t('expertise'), dot: false },
    { href: '#projets', label: t('projets'), dot: false },
    { href: '#parcours', label: t('parcours'), dot: false },
  ];

  const localeSwitcher = (size: 'sm' | 'lg') => (
    <div style={{ display: 'flex', border: '3px solid #0A0A0A', width: 'fit-content' }}>
      {locales.map((loc, i) => {
        const active = locale === loc.code;
        return (
          <button
            key={loc.code}
            onClick={() => { switchLocale(loc.code); setOpen(false); }}
            style={{
              padding: size === 'sm' ? '6px 10px' : '10px 16px',
              border: 'none',
              borderLeft: i > 0 ? '3px solid #0A0A0A' : undefined,
              backgroundColor: active ? '#0A0A0A' : 'transparent',
              color: active ? '#EDFF00' : '#0A0A0A',
              fontFamily: "'Space Mono', monospace",
              fontSize: size === 'sm' ? '11px' : '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
            }}
          >
            {loc.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: '#F3F1EC', borderBottom: '4px solid #0A0A0A', padding: '0 clamp(18px,4.5vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px', gap: '16px' }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '15px', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Louis Burette</span>

        {/* Desktop */}
        <div className="nav-desktop" style={{ display: 'flex', gap: '26px', alignItems: 'center' }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="nav-link" style={{ ...monoLink, display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
              {l.dot && <span style={{ width: '7px', height: '7px', backgroundColor: '#5B2BFF', display: 'block', flexShrink: 0, animation: 'blink 2.4s steps(1,end) infinite' }} />}
              {l.label}
            </a>
          ))}
          {localeSwitcher('sm')}
        </div>

        {/* Mobile trigger */}
        <button
          className="nav-mobile"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          aria-expanded={open}
          style={{ alignItems: 'center', gap: '9px', padding: '8px 14px', border: '3px solid #0A0A0A', backgroundColor: '#EDFF00', fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0A0A0A', cursor: 'pointer', minHeight: '44px' }}
        >
          <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ width: '16px', height: '3px', backgroundColor: '#0A0A0A', display: 'block' }} />
            <span style={{ width: '16px', height: '3px', backgroundColor: '#0A0A0A', display: 'block' }} />
            <span style={{ width: '16px', height: '3px', backgroundColor: '#0A0A0A', display: 'block' }} />
          </span>
          {open ? t('close') : t('menu')}
        </button>
      </nav>

      {open && (
        <div style={{ position: 'fixed', top: '62px', left: 0, right: 0, bottom: 0, zIndex: 99, background: '#F3F1EC', borderTop: '4px solid #0A0A0A', padding: '36px clamp(18px,4.5vw,48px)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ ...mobileLink, display: 'flex', alignItems: 'center', gap: '14px' }}>
              {l.dot && <span style={{ width: '11px', height: '11px', backgroundColor: '#5B2BFF', display: 'block', flexShrink: 0, animation: 'blink 2.4s steps(1,end) infinite' }} />}
              {l.label}
            </a>
          ))}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="btn-brut"
            style={{ marginTop: '28px', display: 'inline-block', width: 'fit-content', padding: '16px 30px', border: '4px solid #0A0A0A', backgroundColor: '#5B2BFF', color: '#fff', fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '7px 7px 0 #0A0A0A' }}
          >
            {tHero('cta_contact')}
          </a>
          <div style={{ marginTop: 'auto', paddingTop: '32px' }}>{localeSwitcher('lg')}</div>
        </div>
      )}
    </>
  );
}
