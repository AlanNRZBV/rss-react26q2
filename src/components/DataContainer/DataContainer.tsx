import DataItem from './DataItem.tsx';
import { useFormActions } from '../../store/store.ts';

const DataContainer = () => {
  const { getSubmissions } = useFormActions();
  const data = getSubmissions();

  return (
    <div className="grid grid-cols-4 my-6 gap-2">
      {data.map(({ id, submission, createdAt }) => (
        <DataItem key={id} submission={submission} createdAt={createdAt} />
      ))}
    </div>
  );
};

export default DataContainer;
