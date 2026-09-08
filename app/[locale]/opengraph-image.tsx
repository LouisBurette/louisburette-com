import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const taglines: Record<string, string> = {
  fr: 'Sites web · Automatisations · Systèmes IA sur-mesure',
  en: 'Websites · Automations · Custom AI systems',
  es: 'Sitios web · Automatizaciones · Sistemas de IA a medida',
};
const availableLabel: Record<string, string> = {
  fr: 'Disponible pour missions',
  en: 'Available for projects',
  es: 'Disponible para proyectos',
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = (locale as string) || 'fr';
  return new ImageResponse(
    <div style={{ background: '#F3F1EC', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '80px', border: '14px solid #0A0A0A' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
        <div style={{ width: '12px', height: '12px', background: '#0A0A0A' }} />
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          {availableLabel[lang] || availableLabel.fr}
        </span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '104px', fontWeight: 800, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '32px' }}>
          Louis Burette
        </div>
        <div style={{ fontSize: '30px', color: '#4A463F', fontWeight: 500 }}>
          {taglines[lang] || taglines.fr}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
        <div style={{ width: '10px', height: '48px', background: '#5B2BFF', marginRight: '20px' }} />
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.06em' }}>
          louisburette.com
        </span>
      </div>
    </div>,
    { ...size }
  );
}
