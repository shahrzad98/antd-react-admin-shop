import { Button, Form } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Styles from './FormSubmit.style';

const FormSubmit: React.FC<{ isPending: boolean }> = ({ isPending }) => {
  const { t } = useTranslation();

  return (
    <Styles.MainContainer justify={'end'}>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          {t('Global.Submit')}
        </Button>
      </Form.Item>
    </Styles.MainContainer>
  );
};

export default FormSubmit;
