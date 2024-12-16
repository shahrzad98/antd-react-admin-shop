import { EyeFilled, EyeInvisibleFilled, MailFilled } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import MainSelector from '@src/logic/Main/store/Main.selector';
import { FormDescription } from '@src/shared/components/FormDescription/inedx';
import { CountrySelect } from '@src/shared/components/Selects/Country';
import { LanguageSelect } from '@src/shared/components/Selects/Language';
import { FormProps } from '@src/shared/models';

import { RegisterFormContext } from '../model';
import Styles from './styles/loginForm.style';

type RegisterFormType = FormProps<RegisterFormContext> & { onChangePage?: (page: string) => void };

export default function RegisterModal({ isPending, onSubmit, onChangePage }: RegisterFormType): ReactElement {
  const { t } = useTranslation();
  const { item: config } = useSelector(MainSelector.getConfigsData);

  return (
    <Styles.MainContainer>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          gender: 'none',
          country: { id: 83, name: 'Deutschland' },
          language: { locale: 'de', title: 'Deutsch' },
        }}
      >
        <Row className="header">
          <Typography.Text strong>{t`Register.AnAccount`}</Typography.Text>
        </Row>
        <Typography.Text type="secondary">
          <div
            dangerouslySetInnerHTML={{
              __html: t('Register.Welcome', { title: config?.saleSystem.partner }),
            }}
          />
        </Typography.Text>

        <Row gutter={[16, 0]}>
          <Col md={12} xs={24}>
            <Form.Item label={t`Register.FirstName`} name="first_name" rules={[{ required: true }]}>
              <Input placeholder={t`Register.FirstName`} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label={t`Register.LastName`} name="last_name" rules={[{ required: true }]}>
              <Input placeholder={t`Register.LastName`} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label={t`Register.Birthday`} name="birth_date" rules={[{ required: true }]}>
              <DatePicker format="DD.MM.YYYY" placeholder={t`Register.BirthdayPlaceholder`} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label={t`Email`} name="email" rules={[{ required: true }]}>
              <Input placeholder={t`EmailPlaceholder`} suffix={<MailFilled />} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label={t`Register.Country`} name="country">
              <CountrySelect />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label={t`Register.Language`} name="language">
              <LanguageSelect />
            </Form.Item>
          </Col>
          <Col md={24} xs={24}>
            <Form.Item label={t`Password`} name="password" rules={[{ required: true, min: 8 }]}>
              <Input.Password
                placeholder={t`PasswordPlaceholder`}
                iconRender={(visible) => (visible ? <EyeFilled /> : <EyeInvisibleFilled />)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Form.Item name="gender" className="gender-row">
            <Radio.Group
              options={[
                { label: t('User.Field.Male'), value: 'male' },
                { label: t('User.Field.Female'), value: 'female' },
                { label: t('User.Field.Other'), value: 'none' },
              ]}
            />
          </Form.Item>
        </Row>

        <div className="term-of-use">
          <div>
            <Checkbox />
            <span>
              {' '}
              <div
                style={{ display: 'inline' }}
                dangerouslySetInnerHTML={{ __html: t(`Register.TermsAndConditionsText`) }}
              />
            </span>
          </div>
        </div>
        <FormDescription />

        <Button type="primary" htmlType="submit" loading={isPending}>
          {t`Register.SignUp`}
        </Button>
        <div className="hr" />
        <Row justify="center">
          <Typography.Text>{t`Register.HaveAccount`} </Typography.Text>
          <Typography.Text onClick={() => onChangePage?.('login')}>{t`Login.Title`}</Typography.Text>
        </Row>
      </Form>
    </Styles.MainContainer>
  );
}
