import { Button, Form, Input, Radio, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Checkbox from 'antd/lib/checkbox/Checkbox';

import { Env } from '@src/core';
import MainSelector from '@src/logic/Main/store/Main.selector';
import { Loader } from '@src/shared/components';
import { AddressSelect } from '@src/shared/components/Selects/Address';
import { ContactGroups, ShippingProfile } from '@src/shared/models';

import BasketSelector from '@logic/Basket/store/Basket.selector';
import PaymentMethodSelector from '@logic/PaymentMethod/store/PaymentMethod.selector';

import AddressInfo from '../AddressInfo';

type Props = {
  paymentMethod: string;
  isDeliverySame: boolean;
  invoiceAddress?: ContactGroups;
  deliveryAddress?: ContactGroups;
  setDeliverySame: (data: boolean) => void;
  setPaymentMethod: (data: string) => void;
};
export const PaymentForm: React.FC<Props> = ({
  isDeliverySame,
  paymentMethod,
  invoiceAddress,
  deliveryAddress,
  setDeliverySame,
  setPaymentMethod,
}) => {
  const { t } = useTranslation();

  const cart = useSelector(BasketSelector.getAllBaskets);
  const { item: config } = useSelector(MainSelector.getConfigsData);
  const { items: payments } = useSelector(PaymentMethodSelector.getPaymentMethods);

  const [shippingProfile, setShippingProfiles] = useState<ShippingProfile[]>([]);

  useEffect(() => {
    const shippings: ShippingProfile[] = [];

    cart.forEach((item) => {
      item.product.shippingProfiles.forEach((profile) => {
        if (!shippings.some((ship) => ship.id === profile.id)) {
          shippings.push({ ...profile, icon: profile.icon ? Env.PURE_URL + profile.icon : null });
        }
      });
    });

    setShippingProfiles(shippings);
  }, []);

  useEffect(() => {
    if (payments) {
      const defaultPayment = payments.find((pay) => pay.is_default === 1);
      if (defaultPayment) {
        setPaymentMethod(String(defaultPayment.id));
      } else setPaymentMethod('1');
    }
  }, [payments]);

  return (
    <MainContainer>
      <Form.Item label={t('Cart.InvoiceAddress')} name="invoice_contact" rules={[{ required: true }]}>
        <AddressSelect />
      </Form.Item>

      {invoiceAddress && <AddressInfo isInvoice address={invoiceAddress} />}

      <Checkbox
        checked={isDeliverySame}
        style={{ marginBottom: '24px' }}
        onChange={(a) => setDeliverySame(a.target.checked)}
      >
        {t('Cart.IsDeliveryAddressSameAsInvoiceAddress')}
      </Checkbox>

      {!isDeliverySame && (
        <>
          <Form.Item rules={[{ required: true }]} name="delivery_contact" label={t('Cart.DeliveryAddress')}>
            <AddressSelect />
          </Form.Item>

          {deliveryAddress && <AddressInfo isInvoice={false} address={deliveryAddress} />}
        </>
      )}

      {shippingProfile.length > 0 && (
        <Form.Item name="shipping_profile" label="Shipping Profile">
          <Radio.Group>
            {shippingProfile.map((shipping, index) => (
              <Radio key={`shipping-${index}`} value={shipping.id}>
                {shipping.icon ? (
                  <img className="shipping-image" src={shipping.icon} alt={shipping.name} />
                ) : (
                  shipping.name
                )}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      )}

      <Typography.Title level={5} style={{ marginTop: 30, marginBottom: 10 }}>
        {t('Cart.HowYouPay')}
      </Typography.Title>
      <Tabs activeKey={paymentMethod} onChange={(value) => setPaymentMethod(value)}>
        {payments ? (
          <>
            {payments.map((paymentMethod) => {
              return <Tabs.TabPane tab={<Button>{paymentMethod.name}</Button>} key={paymentMethod.id} />;
            })}
          </>
        ) : (
          <Loader />
        )}
      </Tabs>

      {config && (
        <>
          <Typography.Title level={5} style={{ marginTop: 30, marginBottom: 10 }}>
            {t('Order.Field.Description', { title: config?.saleSystem.partner })}
          </Typography.Title>

          <Form.Item name="description">
            <Input.TextArea rows={5} placeholder="hier schreiben" />
          </Form.Item>
        </>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  & .shipping-image {
    height: 20px;
  }
`;
