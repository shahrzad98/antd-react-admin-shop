import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Form, Input, Modal, notification, Row, Select, Space } from 'antd';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { createContactGroup } from '@src/service/Main.service';
import { ContactGroups, ContactGroupsContext, ContactGroupsForm } from '@src/shared/models';

import { FormDescription } from '../../FormDescription/inedx';
import { CountrySelect } from '../Country';

const { Option } = Select;

export interface AddressAddProps {
  visible: boolean;
  setVisible: (status: boolean) => void;
  onCallback?: (data: ContactGroups) => void;
}

export default function AddressForm({ visible, setVisible, onCallback }: AddressAddProps): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [isPending, setPending] = useState(false);
  const [staticOption, setStaticOption] = useState('');
  const [options, setOptions] = useState([
    t('Global.Standard'),
    t('Global.Home'),
    t('Global.Office'),
    t('Global.Other'),
  ]);

  const handleFinish = (data: ContactGroupsForm) => {
    setPending(true);

    const finalData: ContactGroupsContext = {
      country_id: data.country?.id,
      translate: { de: { locale: 'de', title: data.name } },
      people: [
        {
          first_name: data.first_name + '',
          last_name: data.last_name + '',
          company_name: data.company_name + '',
        },
      ],
      addresses: [
        {
          ...data,
          country: undefined,
          latitude: 51.5285582,
          longitude: -0.2416815,
        },
      ],
      phones:
        data.phone || data.phone !== ''
          ? [
              {
                type: 'phone',
                number: data.phone,
              },
            ]
          : undefined,
    };

    createContactGroup(finalData)
      .then((newAddress: ContactGroups) => {
        if (onCallback) {
          onCallback(newAddress);
        }

        setPending(false);
        setVisible(false);
        form.resetFields();
        notification.success({
          message: t('Global.SuccessfulProcess'),
          description: t('Global.CreatedSuccessfully', { title: 'Address' }),
        });
      })
      .catch(() => setPending(false));
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStaticOption(e.target.value);
  };

  const handleAddItem = () => {
    setOptions((prev) => [...prev, staticOption]);
    form.setFieldsValue({ name: staticOption });
  };

  return (
    <Modal width={800} footer={false} destroyOnClose visible={visible} closable={false} onCancel={handleClose}>
      <Form
        form={form}
        layout={'vertical'}
        name="address-form"
        onFinish={handleFinish}
        initialValues={{
          name: options[0],
          is_post_office: false,
          is_pack_station: false,
          country: { id: 83, name: 'Deutschland' },
        }}
      >
        <Row gutter={16}>
          <Col xl={24} lg={24} md={24} xs={24}>
            <Form.Item label={t('Cart.Title')} name="name" rules={[{ required: true }]}>
              <Select
                placeholder={t('Global.SelectPlaceholder', { title: t('Cart.Title') })}
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8, gap: 8 }}>
                      <Input
                        size="small"
                        value={staticOption}
                        style={{ flex: 'auto' }}
                        onChange={handleTitleChange}
                        placeholder={t('Global.InputPlaceholder', { title: t('Cart.Title') })}
                      />

                      <Button
                        type="primary"
                        onClick={handleAddItem}
                        style={{ flex: 'none', display: 'block', cursor: 'pointer' }}
                      >
                        <PlusOutlined /> {t('Global.Add')}
                      </Button>
                    </div>
                  </div>
                )}
              >
                {options.map((item, index) => (
                  <Option value={item} key={`option-${index}`}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xl={8} lg={8} md={8} xs={24}>
            <Form.Item label={t('Cart.CompanyName')} name="company_name">
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.CompanyName') })} />
            </Form.Item>
          </Col>

          <Col xl={8} lg={8} md={8} xs={24}>
            <Form.Item label={t('Cart.FirstName')} name="first_name" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.FirstName') })} />
            </Form.Item>
          </Col>

          <Col xl={8} lg={8} md={8} xs={24}>
            <Form.Item label={t('Cart.LastName')} name="last_name" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.LastName') })} />
            </Form.Item>
          </Col>

          <Col xl={24} lg={24} md={24} xs={24}>
            <Form.Item label={t('Cart.AddressLine')} name="address1">
              <Input.TextArea placeholder={t('Global.InputPlaceholder', { title: t('Cart.AddressLine') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Cart.Street')} name="address2" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.Street') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item name="house_number" rules={[{ required: true }]} label={t('Cart.HouseNumber')}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.HouseNumber') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Cart.PostCode')} name="postal_code" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.PostCode') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Cart.City')} name="city" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Cart.State')} name="state">
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.State') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Cart.Country')} name="country" rules={[{ required: true }]}>
              <CountrySelect />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Form.Item label={t('Cart.Phone')} rules={[{ required: true }]} name="phone">
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Cart.Phone') })} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} xs={24}>
            <Space align="center" style={{ marginTop: 30 }}>
              <Form.Item name="is_pack_station" valuePropName="checked">
                <Checkbox>{t('Cart.PackStation')}</Checkbox>
              </Form.Item>
              <Form.Item name="is_post_office" valuePropName="checked">
                <Checkbox>{t('Cart.PostOffice')}</Checkbox>
              </Form.Item>
            </Space>
          </Col>
        </Row>

        <FormDescription />

        <Form.Item>
          <Row justify={'end'}>
            <Button type="primary" loading={isPending} htmlType="submit" style={{ marginTop: 30, minWidth: 180 }}>
              {t('Cart.Submit')}
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}
