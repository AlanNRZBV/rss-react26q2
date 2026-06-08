import DataItem from './DataItem.tsx';
import { useFormActions } from '../../store/store.ts';

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
  const { getSubmissions } = useFormActions();
  const data = getSubmissions();

  if (data.length === 0) {
    return (
      <div className="grid grid-cols-4 my-6 gap-2">
        {mockData.map(({ id, submission }) => (
          <DataItem key={id} submission={submission} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 my-6 gap-2">
      {data.map(({ id, submission }) => (
        <DataItem key={id} submission={submission} />
      ))}
    </div>
  );
};

export default DataContainer;
