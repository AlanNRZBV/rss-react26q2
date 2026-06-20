import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        {t('title')}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">{t('body')}</p>
    </div>
  );
}
