'use client';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const locales = [
    { code: 'fr', label: 'FR', href: '/' },
    { code: 'en', label: 'EN', href: '/en' },
    { code: 'es', label: 'ES', href: '/es' },
  ];

  const navLinks = [
    { href: '#expertise', label: t('expertise') },
    { href: '#projets', label: t('projets') },
    { href: '#parcours', label: t('parcours') },
  ];

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: '#F5EFE5', borderBottom: '3px solid #1A1714', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px' }}>
      <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Louis Burette</span>

      {/* Desktop */}
      <div className="nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {navLinks.map(l => (
          <a key={l.href} href={l.href} style={{ fontSize: '12px', color: '#1A1714', textDecoration: 'none', opacity: 0.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}>
            {l.label}
          </a>
        ))}
        <div style={{ display: 'flex', gap: '2px', border: '2px solid rgba(26,23,20,0.2)', overflow: 'hidden' }}>
          {locales.map((loc, i) => (
            <span key={loc.code} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <span style={{ width: '1px', background: 'rgba(26,23,20,0.15)', alignSelf: 'stretch' }} />}
              <Link href={loc.href} style={{ padding: '6px 10px', display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: locale === loc.code ? 700 : 600, color: '#1A1714', opacity: locale === loc.code ? 1 : 0.4, textDecoration: 'none', letterSpacing: '0.06em' }}>
                {loc.label}
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }} className="nav-hamburger" aria-label="Menu">
        <div style={{ width: '22px', height: '2px', background: '#1A1714', marginBottom: '5px' }} />
        <div style={{ width: '22px', height: '2px', background: '#1A1714', marginBottom: '5px' }} />
        <div style={{ width: '22px', height: '2px', background: '#1A1714' }} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: '#F5EFE5', zIndex: 200, display: 'flex', flexDirection: 'column', padding: '24px 24px', borderBottom: '3px solid #1A1714' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Louis Burette</span>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#1A1714' }}>✕</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontSize: '24px', color: '#1A1714', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '2px', border: '2px solid rgba(26,23,20,0.2)', overflow: 'hidden', width: 'fit-content' }}>
            {locales.map((loc, i) => (
              <span key={loc.code} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <span style={{ width: '1px', background: 'rgba(26,23,20,0.15)', alignSelf: 'stretch' }} />}
                <Link href={loc.href} style={{ padding: '8px 14px', display: 'block', fontSize: '13px', fontWeight: locale === loc.code ? 700 : 600, color: '#1A1714', opacity: locale === loc.code ? 1 : 0.4, textDecoration: 'none' }}>
                  {loc.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
