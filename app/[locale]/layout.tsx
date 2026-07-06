import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = 'https://louisburette.com';
  const path = locale === 'fr' ? '' : `/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(base),
    alternates: {
      canonical: `${base}${path}`,
      languages: { fr: base, en: `${base}/en`, es: `${base}/es`, 'x-default': base },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${base}${path}`,
      siteName: 'Louis Burette',
      locale,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'fr' | 'en' | 'es')) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
