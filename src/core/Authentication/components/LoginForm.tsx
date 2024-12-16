import { MailFilled } from '@ant-design/icons';
import { FormProps } from '@src/shared/models';
import { Button, Checkbox, Form, Input, Row, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '../model';
import Styles from './styles/loginForm.style';

type LoginFormType = FormProps<LoginForm> & { onChangePage?: (page: string) => void };

export default function LoginForm({ isPending, onSubmit, onChangePage }: LoginFormType): ReactElement {
  const { t } = useTranslation();

  return (
    <Styles.MainContainer>
      <Form layout="vertical" onFinish={onSubmit}>
        <Row className="header">
          <Typography.Text strong>{t`Login.Title`}</Typography.Text>
        </Row>
        <Typography.Text type="secondary">{t`Login.WelcomeBack`}</Typography.Text>
        <Form.Item label={t`Login.Email`} name="username" rules={[{ required: true }]}>
          <Input size="large" placeholder={t`Login.EmailPlaceholder`} suffix={<MailFilled />} />
        </Form.Item>
        <Form.Item label={t`Login.Password`} name="password" rules={[{ required: true }]}>
          <Input.Password size="large" placeholder={t`Login.PasswordPlaceholder`} />
        </Form.Item>

        <Row justify="space-between">
          <Checkbox>{t`Login.RememberMe`}</Checkbox>
          <div onClick={() => onChangePage?.('forget')}>{t`Login.ForgotPassword`}</div>
        </Row>

        <Button type="primary" size="large" htmlType="submit" loading={isPending}>
          {t`Login.Title`}
        </Button>
        <div className="hr">
          <span>{t`Login.Or`}</span>
        </div>

        <Row justify="center">
          <Typography.Text>{t`Login.NoAccount`} </Typography.Text>
          <Typography.Text onClick={() => onChangePage?.('register')}>{t`Login.RegisterNow`}</Typography.Text>
        </Row>
      </Form>
    </Styles.MainContainer>
  );
}
