import { CheckCircleFilled, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, notification, Row, Typography } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from '..';
import { ChangePasswordIProps } from '../model';
import { changePassword } from '../service/Auth.Service';

export default function ResetPasswordPage(): ReactElement {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const { setLoginOpen } = useContext(AuthContext);
  const [isPending, setPending] = useState<boolean>(false);

  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const handleChangePasswordSubmit = (values: ChangePasswordIProps): void => {
    setPending(true);
    changePassword({ ...values, token })
      .then(() => {
        notification.success({
          message: t('ChangePassword.PasswordChanged'),
          description: t('ChangePassword.SuccessfullChange'),
        });
        navigate('/');
        setLoginOpen(true);
      })
      .catch(() => setPending(false));
  };

  return (
    <MainContainer>
      <div className="center">
        <Form layout="vertical" onFinish={handleChangePasswordSubmit}>
          <Row className="header">
            <Col span={24}>
              <Typography.Title level={2}>
                {t('ChangePassword.Reset')} {t('ChangePassword.Password')}
              </Typography.Title>
            </Col>
            <Typography.Text type="secondary">{t('ChangePassword.ChooseStrongPassword')}</Typography.Text>
          </Row>

          <Form.Item label={t('ChangePassword.NewPassword')} name="password" rules={[{ required: true, min: 8 }]}>
            <Input.Password
              size="large"
              placeholder={t('ChangePassword.PasswordPlaceholder')}
              iconRender={(visible) => (visible ? <EyeFilled /> : <EyeInvisibleFilled />)}
            />
          </Form.Item>
          <Form.Item
            label={t('ChangePassword.ConfirmPassword')}
            name="password_confirmation"
            rules={[{ required: true, min: 8 }]}
          >
            <Input.Password
              size="large"
              placeholder={t('ChangePassword.PasswordPlaceholder')}
              iconRender={(visible) => (visible ? <EyeFilled /> : <EyeInvisibleFilled />)}
            />
          </Form.Item>
          <div className="info">
            <CheckCircleFilled />
            {t('ChangePassword.DifferentPassword')}
          </div>

          <Button block loading={isPending} type="primary" size="large" htmlType="submit">
            {t('ChangePassword.Save')}
          </Button>
        </Form>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  & .header {
    padding-bottom: 32px;
  }

  & .info {
    color: #06c270;
    font-size: 0.9rem;
    margin-bottom: 100px;
    margin-top: 16px;

    & .anticon-check-circle {
      margin-right: 4px;
    }
  }
`;
