import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { getLanguages } from '@src/logic/Main/store/Main.selector';
import { Language } from '@src/shared/models';
import { reactSelectTheme } from '@src/shared/utils';

export interface LanguageSelectProps {
  value: Language;
  onChange: (data: Language) => void;
}

export const LanguageSelect: React.FC<Partial<LanguageSelectProps>> = ({ value, onChange }) => {
  const { items: languages, isPending } = useSelector(getLanguages);
  const handleChange = (data: Language) => onChange?.(data);

  return (
    <Select
      isClearable
      value={value}
      options={languages}
      isLoading={isPending}
      onChange={handleChange}
      classNamePrefix="react-select"
      getOptionLabel={(op) => op.title}
      getOptionValue={(op) => op.locale}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
    />
  );
};
