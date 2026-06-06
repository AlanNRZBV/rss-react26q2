import { useFormSubmissions } from '../../store/store.ts';
import DataItem from './DataItem.tsx';

const mockData = [
  {
    id: 'mock-1',
    submission: {
      name: 'John Doe',
      age: 28,
      country: 'United States',
      gender: 'Male',
      email: 'john.doe@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      files: 'document.pdf',
    },
  },
  {
    id: 'mock-2',
    submission: {
      name: 'Jane Smith',
      age: 34,
      country: 'United Kingdom',
      gender: 'Female',
      email: 'jane.smith@example.com',
      password: 'SecurePass456#',
      confirmPassword: 'SecurePass456#',
      files: 'resume.docx',
    },
  },
  {
    id: 'mock-3',
    submission: {
      name: 'Alex Johnson',
      age: 22,
      country: 'Canada',
      gender: 'Non-binary',
      email: 'alex.johnson@example.com',
      password: 'MyPassword789$',
      confirmPassword: 'MyPassword789$',
      files: 'portfolio.zip',
    },
  },
];

const DataContainer = () => {
  const data = useFormSubmissions();

  if (data.length === 0) {
    return (
      <div className="flex gap-2 my-6">
        {mockData.map(({ id, submission }) => (
          <DataItem key={id} submission={submission} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {data.map(({ id, submission }) => (
        <DataItem key={id} submission={submission} />
      ))}
    </div>
  );
};

export default DataContainer;
