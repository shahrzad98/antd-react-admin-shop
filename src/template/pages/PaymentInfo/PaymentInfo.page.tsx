import { Col, Form, Row } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { discardBasketItems } from '@src/logic/Basket/store/Basket.store';
import { getContactGroups } from '@src/logic/Main/store/Main.selector';
import { FinalOrder } from '@src/model/Order.model';
import OrderService from '@src/service/Order.service';
import { ContactGroups } from '@src/shared/models/ContactGroups.entity';
import { PaymentForm } from '@src/template/components/PaymentForm';
import { PaymentSidebar } from '@src/template/components/PaymentSiderbar';

import BasketSelector from '@logic/Basket/store/Basket.selector';
import MainController from '@logic/Main/controller/Main.controller';
import PaymentMethodController from '@logic/PaymentMethod/controller/PaymentMethod.controller';

import Styles from './styles/PaymentInfo.style';

export default function PaymentInfo(): ReactElement {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(BasketSelector.getAllBaskets);
  const couponData = useSelector(BasketSelector.getCouponData);
  const { items: contactGroups } = useSelector(getContactGroups);

  const [isPending, setPending] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isDeliverySame, setDeliverySame] = useState<boolean>(true);
  const [invoiceAddress, setInvoiceAddress] = useState<ContactGroups>();
  const [deliveryAddress, setDeliveryAddress] = useState<ContactGroups>();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/category');
    }
  }, [cartItems]);

  useEffect(() => {
    dispatch(MainController.getUserContactGroups());
    dispatch(PaymentMethodController.getPaymentMethodsForPaymentInfo());
  }, []);

  useEffect(() => {
    if (contactGroups.length > 0) {
      form.setFieldsValue({ invoice_contact: contactGroups[0] });
    }
  }, [contactGroups]);

  type CreateProps = {
    description: string;
    shipping_profile: number;
    invoice_contact: ContactGroups;
    delivery_contact: ContactGroups;
  };
  const handleCreateOrderSale = (values: CreateProps) => {
    console.log(values);
    const finalOrder: FinalOrder = {
      description: values.description,
      payment_method_id: Number(paymentMethod),
      shipping_profile_id: values.shipping_profile,
      invoice_contact_group_id: values.invoice_contact.id,
      coupon: couponData ? couponData.couponCodes[0].code : undefined,
      delivery_contact_group_id: isDeliverySame ? values.invoice_contact.id : values.delivery_contact.id,
    };

    setPending(true);
    OrderService.finalizeOrder(finalOrder)
      .then(({ orderSale, paymentLink }) => {
        setPending(false);
        if (paymentLink) {
          window.location.href = paymentLink;
        } else if (orderSale) {
          dispatch(discardBasketItems());
          navigate('/cart/callback?orderId=' + orderSale.id);
        }
      })
      .catch(() => setPending(false));
  };

  const handleAddressChange = (values: { invoice_contact: ContactGroups; delivery_contact: ContactGroups }) => {
    if (values.invoice_contact) setInvoiceAddress(values.invoice_contact);
    if (values.delivery_contact) setDeliveryAddress(values.delivery_contact);
  };

  return (
    <Styles.MainContainer>
      <Form
        form={form}
        layout="vertical"
        style={{ width: '100%' }}
        onFinish={handleCreateOrderSale}
        onValuesChange={handleAddressChange}
        initialValues={{ shipping_profile: 1 }}
      >
        <Row gutter={32} justify="space-between" align="top">
          <Col xs={24} md={14}>
            <PaymentForm
              paymentMethod={paymentMethod}
              isDeliverySame={isDeliverySame}
              invoiceAddress={invoiceAddress}
              deliveryAddress={deliveryAddress}
              setDeliverySame={setDeliverySame}
              setPaymentMethod={setPaymentMethod}
            />
          </Col>
          <Col xs={24} md={10}>
            <PaymentSidebar isPending={isPending} />
          </Col>
        </Row>
      </Form>
    </Styles.MainContainer>
  );
}
