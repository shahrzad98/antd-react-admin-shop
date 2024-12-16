import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { getCountries } from '@src/logic/Main/store/Main.selector';
import { Country } from '@src/shared/models';
import { reactSelectTheme } from '@src/shared/utils';

export interface CountrySelectProps {
  value: Country;
  onChange: (data: Country) => void;
}

export const CountrySelect: React.FC<Partial<CountrySelectProps>> = ({ value, onChange }) => {
  const { items: countries, isPending } = useSelector(getCountries);
  const handleChange = (data: Country) => onChange?.(data);

  return (
    <Select
      isClearable
      value={value}
      options={countries}
      isLoading={isPending}
      onChange={handleChange}
      classNamePrefix="react-select"
      getOptionLabel={(op) => op.name}
      getOptionValue={(op) => String(op.id)}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
    />
  );
};
