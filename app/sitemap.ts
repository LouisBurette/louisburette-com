import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://louisburette.com';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1, alternates: { languages: { fr: base, en: `${base}/en`, es: `${base}/es` } } },
    { url: `${base}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/es`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];
}
