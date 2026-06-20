import { getTranslations } from 'next-intl/server';
import { DetailItem } from './DetailItem';

const projectDetails = [
  { labelKey: 'author', value: 'Alan', href: 'https://github.com/AlanNRZBV' },
  {
    labelKey: 'tasksRepo',
    value: 'GitHub RS School',
    href: 'https://github.com/rolling-scopes-school/tasks/tree/master/react',
  },
  {
    labelKey: 'course',
    value: 'Rs.school React',
    href: 'https://rs.school/courses/reactjs',
  },
] as const;

export default async function ProjectDetails() {
  const t = await getTranslations('about');

  return (
    <div className="p-6 bg-white dark:bg-gray-900 transition-colors">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('title')}
      </h2>
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-100 dark:divide-gray-800 text-sm">
          {projectDetails.map((detail) => (
            <DetailItem key={detail.labelKey} label={t(detail.labelKey)}>
              <a
                href={detail.href}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {detail.value}
              </a>
            </DetailItem>
          ))}
        </dl>
      </div>
    </div>
  );
}
