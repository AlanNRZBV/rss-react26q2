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
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Project Details
      </h2>

      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          {projectDetails.map((detail) => (
            <DetailItem key={detail.label} label={detail.label}>
              <a href={detail.href}>{detail.value}</a>
            </DetailItem>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default ProjectDetails;
