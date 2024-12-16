import { Button, Card, Col, Row } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import MainSelector from '@src/logic/Main/store/Main.selector';
import OrderSelector from '@src/logic/Order/store/Order.selector';
import { intlCurrency, intlDate } from '@src/shared/utils/engine.service';

import Styles from './OrderSummary.style';

export const OrderSummary = (): ReactElement | null => {
  const { t } = useTranslation();
  const config = useSelector(MainSelector.getConfigsData);
  const { item: order } = useSelector(OrderSelector.getLatestOrder);

  const [, setTaxes] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    if (order) {
      let tax = 0;
      order.orderSalePositions.map((orderSale) => {
        let vat = 1;
        if (orderSale.order_position_type_id === 1) {
          if (orderSale.vat_value) vat = orderSale.vat_value;

          tax += orderSale.price_value * vat * orderSale.quantity;
        } else if (orderSale.order_position_type_id === 6) {
          setShippingPrice(
            shippingPrice + orderSale.price_value * orderSale.quantity * (1 + (orderSale.vat_value || 0) / 100),
          );
        } else if (orderSale.order_position_type_id === 4 || orderSale.order_position_type_id === 13) {
          tax -= orderSale.price_value;
        }
        setDiscount(discount + orderSale.discount);
      });

      setTaxes(tax);
    }
  }, [order]);

  const rabatPrice = order?.orderSalePositions.find((order) => order?.order_position_type_id === 13);
  const couponPrice = order?.orderSalePositions.find((order) => order?.order_position_type_id === 4);

  if (!order) return null;
  return (
    <Styles.MainContainer>
      <Card>
        <Row justify="space-between">
          <div>{t('Order.Summary')}</div>

          <Button>
            {order.orderStatus?.id === 1
              ? t('Order.Completed')
              : order.orderStatus?.number == 2
              ? t('Order.Cancelled')
              : t('Order.Waiting')}
          </Button>
        </Row>
        <Row className="table">
          <Col span={12}>{t('Order.OrderCreated')}</Col>
          <Col span={12}>
            {order.order_date && intlDate(config.item?.language.locale || 'de', new Date(order.order_date))}
          </Col>
          <Col span={12}>Versand ab</Col>
          <Col span={12}>
            {order.estimate_delivery_date &&
              intlDate(config.item?.language.locale || 'de', new Date(order.estimate_delivery_date))}
          </Col>

          {order.orderSalePositions.some((order) => order.order_position_type_id === 4) && (
            <>
              <Col span={12}>Coupon</Col>
              <Col span={12}>
                {intlCurrency(
                  config.item?.language.locale || 'de',
                  order.currency.iso3,
                  (couponPrice?.price_value || 0) *
                    (couponPrice?.quantity || 1) *
                    (1 + (couponPrice?.vat_value || 0) / 100),
                )}
              </Col>
            </>
          )}

          {order.orderSalePositions.some((order) => order.order_position_type_id === 13) && (
            <>
              <Col span={12}>{t('Order.Discount')}</Col>
              <Col span={12}>
                {intlCurrency(
                  config.item?.language.locale || 'de',
                  order.currency.iso3,
                  (rabatPrice?.price_value || 0) *
                    (rabatPrice?.quantity || 1) *
                    (1 + (rabatPrice?.vat_value || 0) / 100),
                )}
              </Col>
            </>
          )}

          <Col span={12}>{t('Order.ShippingPrice')}</Col>
          <Col span={12}>{intlCurrency(config.item?.language.locale || 'de', order.currency.iso3, shippingPrice)}</Col>

          <Col span={12}>{'' + t('Order.VAT') + ' 19%'}</Col>
          <Col span={12}>
            {intlCurrency(config.item?.language.locale || 'de', order.currency.iso3, (order.total_price / 1.19) * 0.19)}
          </Col>
          {discount > 0 && <Col span={12}>{t('Order.Discount')}</Col>}
          {discount > 0 && (
            <Col span={12}>{intlCurrency(config.item?.language.locale || 'de', order.currency.iso3, discount)}</Col>
          )}
        </Row>
        <Row justify="space-between">
          <div>{t('Order.Total')}</div>
          <div>{intlCurrency(config.item?.language.locale || 'de', order.currency.iso3, order.total_price)}</div>
        </Row>
      </Card>
    </Styles.MainContainer>
  );
};
