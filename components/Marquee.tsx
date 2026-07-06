const items = ['Automatisations', 'Agents IA', 'RAG', 'Web apps', 'Landing pages', 'Mobile App', 'Dashboards', 'Data pipelines', 'Scraping'];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: '#1A1714', height: '48px', overflow: 'hidden', display: 'flex', alignItems: 'center', borderBottom: '3px solid #1A1714' }}>
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', animation: 'marqueeScroll 24s linear infinite', flexShrink: 0 }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,239,229,0.45)', padding: '0 36px' }}>{item}</span>
            <span style={{ color: '#E8622A', fontSize: '11px', flexShrink: 0 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
