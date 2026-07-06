import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const taglines: Record<string, string> = {
  fr: 'Automatisations · Agents IA · Interfaces sur-mesure',
  en: 'Automation · AI Agents · Custom Interfaces',
  es: 'Automatizaciones · Agentes IA · Interfaces a medida',
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
    <div style={{ background: '#F5EFE5', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '80px', border: '12px solid #1A1714' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2D5A27' }} />
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#2D5A27', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          {availableLabel[lang] || availableLabel.fr}
        </span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '100px', fontWeight: 400, color: '#1A1714', lineHeight: 1.0, marginBottom: '32px' }}>
          Louis Burette
        </div>
        <div style={{ fontSize: '30px', color: 'rgba(26,23,20,0.55)', fontWeight: 300 }}>
          {taglines[lang] || taglines.fr}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
        <div style={{ width: '8px', height: '48px', background: '#E8622A', marginRight: '20px' }} />
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#1A1714', letterSpacing: '0.06em' }}>
          louisburette.com
        </span>
      </div>
    </div>,
    { ...size }
  );
}
