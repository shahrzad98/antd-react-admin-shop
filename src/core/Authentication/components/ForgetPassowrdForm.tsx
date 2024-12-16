import { MailFilled } from '@ant-design/icons';
import { FormProps } from '@src/shared/models';
import { Button, Form, Input, Row, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Styles from './styles/loginForm.style';

type ForgetFormType = FormProps<{ email: string }>;

export default function ForgotPasswordForm({ onSubmit, isPending }: ForgetFormType): ReactElement {
  const { t } = useTranslation();

  return (
    <Styles.MainContainer>
      <Form layout="vertical" onFinish={onSubmit}>
        <Row className="header">
          <Typography.Text strong>{t('ForgotPassword.Forgot')} </Typography.Text>
          <Typography.Text>{t('ForgotPassword.Password')}?</Typography.Text>
        </Row>
        <Typography.Text type="secondary">{t('ForgotPassword.Subtitle')}</Typography.Text>
        <Form.Item label={t('ForgotPassword.Email')} name="email" rules={[{ required: true }]}>
          <Input size="large" suffix={<MailFilled />} placeholder={t('ForgotPassword.EmailPlaceholder')} />
        </Form.Item>

        <Row className="send-again">
          <div>{t('ForgotPassword.DidntReceiveLink')}</div>
          <Button disabled={isPending} type="text" htmlType="submit">
            {t('ForgotPassword.SendLinkAgain')}
          </Button>
        </Row>

        <Button loading={isPending} type="primary" size="large" htmlType="submit">
          {t('ForgotPassword.ResetPassword')}
        </Button>
      </Form>
    </Styles.MainContainer>
  );
}
