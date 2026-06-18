import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { routing } from '../../i18n/routing';
import { Providers } from '../providers';
import '../globals.css';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My App is a...',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <div className="w-full h-full bg-gray-50 dark:bg-gray-950">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 py-4 h-full">
                {children}
              </div>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
