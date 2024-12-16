import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { getAppCountries } from '@src/logic/Main/controller/Main.controller';
import { getContactGroups } from '@src/logic/Main/store/Main.selector';
import { addContactGroup } from '@src/logic/Main/store/Main.store';
import { ContactGroups } from '@src/shared/models';
import { reactSelectTheme } from '@src/shared/utils';

import AddressForm from './AddressForm';

export interface AddressSelectProps {
  value: ContactGroups;
  onChange: (data: ContactGroups) => void;
}

export const AddressSelect: React.FC<Partial<AddressSelectProps>> = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const { items: contactGroups, isPending } = useSelector(getContactGroups);
  const handleChange = (data: ContactGroups) => onChange?.(data);

  const handleCallback = (data: ContactGroups) => {
    onChange?.(data);
    dispatch(addContactGroup(data));
  };

  useEffect(() => {
    dispatch(getAppCountries());
  }, []);

  return (
    <Row gutter={16}>
      <Col flex={1}>
        <Select
          isClearable
          value={value}
          isLoading={isPending}
          options={contactGroups}
          onChange={handleChange}
          classNamePrefix="react-select"
          getOptionLabel={(op) => op.title}
          getOptionValue={(op) => String(op.id)}
          theme={(selectTheme) => reactSelectTheme(selectTheme)}
        />
      </Col>

      <Col>
        <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)} />
      </Col>
      <AddressForm visible={isModalVisible} setVisible={setModalVisible} onCallback={handleCallback} />
    </Row>
  );
};
