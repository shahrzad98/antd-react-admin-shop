import { PlusCircleOutlined } from '@ant-design/icons';
import { reactSelectTheme } from '@shared/utils';
import { ResponseContext } from '@src/shared/models';
import { Space } from 'antd';
import axios, { CancelTokenSource } from 'axios';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuProps, components } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

import { LoadOptionFunc, SuperSelectProps } from './SuperSelect.entity';
import Styles from './SuperSelect.style';

export default function SuperSelect<Type>({
  value,
  query,
  module,
  isMulti,
  onChange,
  hasNew = true,
  className = '',
  disabled = false,
  searchParam = 'name',
  menuPlacement = 'bottom',
  title,
  optionSelector = { label: 'name', value: 'id' },
}: SuperSelectProps<Type>): ReactElement {
  let cancelToken: CancelTokenSource;
  const { t } = useTranslation();

  const [, setVisible] = useState<boolean>(false);

  const handleChange = (data: Type) => {
    onChange?.(data);
  };

  // const handleCallback = (data: Type) => {
  //   setVisible(false);
  //   if (isMulti && Array.isArray(value)) {
  //     onChange?.([...value, data]);
  //   } else {
  //     onChange?.(data);
  //   }
  // };

  const loadOptions: LoadOptionFunc<Type> = async (inputValue: string, _: unknown, { page }: { page: number }) => {
    if (typeof cancelToken != typeof undefined) cancelToken.cancel('Operation canceled due to new request.');
    cancelToken = axios.CancelToken.source();

    const fixedQueries = query ? { ...query, page } : { page };
    return module.apiService
      .getAll({
        cancelToken: cancelToken.token,
        params: inputValue ? { [searchParam]: inputValue, ...fixedQueries } : fixedQueries,
      })
      .then((data: ResponseContext<Type[]>) => {
        return {
          options: data.data,
          hasMore: data.data.length >= 10,
          additional: { page: inputValue ? 2 : page + 1 },
        };
      });
  };

  const Menu: React.FC = (props: MenuProps<Type, false>) => {
    return (
      <components.Menu<Type, false> {...props}>
        <>
          {props.children}

          {hasNew && (
            <Styles.NewItemContainer>
              <Space onClick={() => setVisible(true)}>
                <PlusCircleOutlined />
                <span>Add New Item</span>
              </Space>
            </Styles.NewItemContainer>
          )}
        </>
      </components.Menu>
    );
  };

  const IndicatorSeparator = () => {
    return <span style={{ width: 0 }} />;
  };

  const getLabelProperty = (option: Type): string => {
    const labelProp = optionSelector.label;

    if (labelProp.includes('-')) {
      let wholeString = '';
      const labelArray = labelProp.split('-');
      labelArray.forEach((element, index) => {
        wholeString += option[element];
        if (index !== labelArray.length - 1) {
          wholeString += ' - ';
        }
      });
      return String(wholeString);
    } else if (labelProp.includes('.')) {
      let tempOption: Type | string = option;
      const labelArray = labelProp.split('.');
      labelArray.forEach((element) => {
        tempOption = tempOption[element];
      });
      return String(tempOption);
    } else {
      return option[labelProp];
    }
  };

  return (
    <>
      <AsyncPaginate
        isClearable
        cacheOptions
        isDisabled={disabled}
        value={value}
        isMulti={isMulti}
        defaultOptions={false}
        menuPlacement={menuPlacement}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        onChange={handleChange}
        additional={{ page: 1 }}
        loadOptions={loadOptions}
        classNamePrefix="react-select"
        className={className}
        components={{ Menu, IndicatorSeparator }}
        getOptionLabel={getLabelProperty}
        getOptionValue={(op: Type) => op[optionSelector.value]}
        placeholder={t('Global.SelectPlaceholder', { title: title ?? module.title[0] })}
      />
    </>
  );
}
