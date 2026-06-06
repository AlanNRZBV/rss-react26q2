import CustomInput from '../../ui/CustomInput/CustomInput.tsx';
import CustomAutocomplete from '../../ui/CustomSelect/CustomAutocomplete.tsx';
import { GENDERS } from '../../../lib/constants/genders.ts';
import { COUNTRIES } from '../../../lib/constants/countries.ts';
import CustomCheckbox from '../../ui/CustomCheckbox/CustomCheckbox.tsx';
import CustomFileInput from '../../ui/CustomFileInput/CustomFileInput.tsx';

const UncontrolledForm = () => {
  return (
    <form className="flex flex-col gap-4 px-4">
      <CustomInput id="name" label="name" name="name" type="text" />
      <CustomInput id="email" label="email" name="email" type="email" />
      <CustomInput
        id="password"
        label="password"
        name="password"
        type="password"
      />
      <div className="flex justify-between gap-2">
        <CustomInput id="age" label="age" name="age" type="number" />
        <CustomAutocomplete id="genders" label="gender" options={GENDERS} />
        <CustomAutocomplete
          id="countries"
          label="country"
          options={COUNTRIES}
        />
      </div>
      <CustomCheckbox id="terms" label="terms and conditions" />
      <CustomFileInput label="upload" />
    </form>
  );
};

export default UncontrolledForm;
