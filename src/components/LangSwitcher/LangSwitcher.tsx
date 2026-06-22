'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import { routing } from '../../i18n/routing';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <select
      value={locale}
      aria-label="Language"
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
