import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ChangePasswordContext } from '@src/model/Profile.model';
import { changeUserPassword } from '@src/service/Profile.service';

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [isPending, setPending] = useState(false);

  const onSubmit = (values: ChangePasswordContext) => {
    setPending(true);

    changeUserPassword(values)
      .then(() => {
        setPending(false);
        message.success(t('ChangePassword.SuccessfullChange'));
      })
      .catch(() => setPending(false));
  };

  return (
    <MainContainer>
      <div className="header">
        <Typography.Title level={2}>{t('Global.ChangePassword')}</Typography.Title>
      </div>

      <Form form={form} layout={'vertical'} name="change-password-form" onFinish={onSubmit} initialValues={{}}>
        <Row gutter={16}>
          <Col xl={24} lg={24} md={24} xs={24}>
            <Form.Item label={t('ChangePassword.CurrentPassword')} name="current_password" rules={[{ required: true }]}>
              <Input.Password
                placeholder={t('Global.InputPlaceholder', { title: t('ChangePassword.CurrentPassword') })}
              />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('ChangePassword.NewPassword')} name="password" rules={[{ required: true, min: 8 }]}>
              <Input.Password placeholder={t('Global.InputPlaceholder', { title: t('ChangePassword.NewPassword') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item
              name="password_confirmation"
              rules={[{ required: true, min: 8 }]}
              label={t('ChangePassword.ConfirmPassword')}
            >
              <Input.Password
                placeholder={t('Global.InputPlaceholder', { title: t('ChangePassword.ConfirmPassword') })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row justify={'end'}>
            <Button loading={isPending} type="primary" htmlType="submit" style={{ marginTop: 30 }}>
              {t('Cart.Submit')}
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </MainContainer>
  );
};

export default ChangePassword;

const MainContainer = styled.div`
  & form {
    padding: 16px;
    border-radius: 8px;
    background: #fff;
  }
`;
