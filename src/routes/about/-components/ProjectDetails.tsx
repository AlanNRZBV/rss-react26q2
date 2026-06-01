import type { FC } from 'react';
import { DetailItem } from './DetailItem';

interface ProjectDetail {
  label: string;
  value: string;
  href: string;
}

const projectDetails: ProjectDetail[] = [
  {
    label: 'Author',
    value: 'Alan',
    href: 'https://github.com/AlanNRZBV',
  },
  {
    label: 'Tasks Repository',
    value: 'GitHub RS School',
    href: 'https://github.com/rolling-scopes-school/tasks/tree/master/react',
  },
  {
    label: 'Course Page',
    value: 'Rs.school React',
    href: 'https://rs.school/courses/reactjs',
  },
];

const ProjectDetails: FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 transition-colors">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Project Details
      </h2>
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-100 dark:divide-gray-800 text-sm">
          {projectDetails.map((detail) => (
            <DetailItem key={detail.label} label={detail.label}>
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
};

export default ProjectDetails;
