import { Button, Col, DatePicker, Form, Input, message, Row, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AuthSelector from '@src/core/Authentication/service/Auth.Selector';
import { setUserProfile } from '@src/core/Authentication/service/Auth.store';
import { UserProfile } from '@src/model/Profile.model';
import { updateUserProfile } from '@src/service/Profile.service';
import { FormDescription } from '@src/shared/components/FormDescription/inedx';

const PersonalForm: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector(AuthSelector.authProfile);

  const [isPending, setPending] = useState(false);

  useEffect(() => {
    if (profile && Object.keys(profile).length !== 0) {
      form.setFieldsValue({
        email: profile.email,
        people: {
          last_name: profile.person.last_name,
          first_name: profile.person.first_name,
        },
        birth_date: profile.birth_date ? moment(profile.birth_date) : null,
      });
    }
  }, [profile]);

  const onSubmit = (values: UserProfile) => {
    setPending(true);
    const finalValues: UserProfile = {
      ...values,
      birth_date: values.birth_date ? moment(values.birth_date).format('YYYY-MM-DD') : undefined,
    };

    updateUserProfile(finalValues)
      .then((user) => {
        setPending(false);
        dispatch(setUserProfile(user));
        message.success(t('Global.UpdatedSuccessfully', { title: t('Comment.List.Table.UserProfile') }));
      })
      .catch(() => setPending(false));
  };

  return (
    <MainContainer>
      <div className="header">
        <Typography.Title level={2}>{t('Global.PersonalInformation')}</Typography.Title>
      </div>

      <Form form={form} layout={'vertical'} name="profile-form" onFinish={onSubmit} initialValues={{}}>
        <Row gutter={16}>
          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Cart.FirstName')} name={['people', 'first_name']} rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.FirstName') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Cart.LastName')} name={['people', 'last_name']} rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.LastName') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={'Email'} name="email" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: 'Email' })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Register.Birthday')} name="birth_date" rules={[{ required: true }]}>
              <DatePicker format="DD.MM.YYYY" placeholder={t`Register.BirthdayPlaceholder`} />
            </Form.Item>
          </Col>
        </Row>

        <FormDescription />

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

export default PersonalForm;

const MainContainer = styled.div`
  & form {
    padding: 16px;
    border-radius: 8px;
    background: #fff;
  }
`;
