const items = ['Sites web', 'Automatisations', 'Agents IA', 'RAG', 'Web apps', 'Landing pages', 'Mobile App', 'Dashboards', 'Data pipelines', 'Scraping'];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: '#0A0A0A', height: '52px', overflow: 'hidden', display: 'flex', alignItems: 'center', borderBottom: '4px solid #0A0A0A' }}>
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', animation: 'marqueeScroll 28s linear infinite', flexShrink: 0 }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F3F1EC', padding: '0 30px' }}>{item}</span>
            <span style={{ color: '#EDFF00', fontSize: '12px', flexShrink: 0 }}>■</span>
          </span>
        ))}
      </div>
    </div>
  );
}
