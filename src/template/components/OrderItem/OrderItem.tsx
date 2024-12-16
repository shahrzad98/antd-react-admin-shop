import { CalendarOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

import { Env } from '@src/core';
import MainSelector from '@src/logic/Main/store/Main.selector';
import { OrderSale } from '@src/model/Order.model';
import { intlCurrency, intlDate } from '@src/shared/utils/engine.service';

import Styles from './OrderItem.style';

export const OrderItem = ({ order }: { order: OrderSale }): ReactElement => {
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const config = useSelector(MainSelector.getConfigsData);

  useEffect(() => {
    setTotalPayment(order.total_price - order.remaining_price);
    setQuantity(
      order.orderSalePositions?.reduce(
        (lastOrderSale, currentOrderSale) => lastOrderSale + currentOrderSale.quantity,
        0,
      ) ?? 0,
    );
  }, [order]);

  return (
    <Styles.MainContainer>
      <Card className="order-product">
        <div className="detail-header">
          <div className="item">
            <Typography.Text strong>{t('Order.TotalPrice')}</Typography.Text>
            <h4>{intlCurrency(config.item?.language.locale || 'de', order.currency.iso3, order.total_price)}</h4>
          </div>

          <div className="item">
            <Typography.Text strong>{t('Order.TotalPayment')}</Typography.Text>
            <h4>{intlCurrency(config.item?.language.locale || 'de', order.currency.iso3, totalPayment)}</h4>
          </div>

          <div className="item">
            <Typography.Text strong>{t('Order.PaymentMethod')}</Typography.Text>
            <h4>{order.paymentMethod?.name ?? ' - '}</h4>
          </div>

          <div className="item">
            <Typography.Text strong>{t('Order.OrderNo')}</Typography.Text>
            <h4>{order.id}</h4>
          </div>

          {/* TODO: There is no status for now, added it soon */}
          {/* {status === 'completed' ? (
            <Button className="completed">{formatMessage({ id: 'Order.Completed' })}</Button>
          ) : status === 'cancelled' ? (
            <Button className="cancelled">{formatMessage({ id: 'Order.Cancelled' })}</Button>
          ) : (
            <Button className="waiting">{formatMessage({ id: 'Order.Waiting' })}</Button>
          )} */}
          <Button className="waiting">{t('Order.Waiting')}</Button>
        </div>

        <Row gutter={24}>
          <Col xs={24} md={4}>
            <Styles.DetailContainer>
              <img
                alt="product"
                className="product-image"
                src={'/assets/images/order/product_order_static_image.png'}
              />
              <Typography.Text strong>{`${t('Order.Quantity')}: ${quantity}`}</Typography.Text>
            </Styles.DetailContainer>
          </Col>
          <Col xs={24} md={14}>
            <div className="name">
              <ShowMoreText
                lines={3}
                more={t('Global.ShowMore')}
                less={t('Global.ShowLess')}
                anchorClass="my-anchor-css-class"
                expanded={false}
                truncatedEndingComponent={'... '}
              >
                {t('Order.InvoiceAddress')}:
                {order.invoiceContactGroup?.people && order.invoiceContactGroup.people[0].company_name && (
                  <>
                    <br />
                    <span>{order.invoiceContactGroup.people[0].company_name}</span>
                    <br />
                  </>
                )}
                {order.invoiceContactGroup?.people &&
                  order.invoiceContactGroup.people[0].first_name &&
                  order.invoiceContactGroup.people[0].first_name + ' - '}
                {order.invoiceContactGroup?.people &&
                  order.invoiceContactGroup.people[0].last_name &&
                  order.invoiceContactGroup.people[0].last_name}
                {order.invoiceContactGroup?.people &&
                  (order.invoiceContactGroup?.people[0].first_name ||
                    order.invoiceContactGroup?.people[0].last_name) && <br />}
                {(order.invoiceContactGroup.address.address1
                  ? order.invoiceContactGroup.address.address1 + ' - '
                  : '') +
                  (order.invoiceContactGroup.address.post_identity
                    ? order.invoiceContactGroup.address.post_identity + ' | '
                    : '') +
                  (order.invoiceContactGroup.address.address2
                    ? order.invoiceContactGroup.address.address2 + ' - '
                    : '') +
                  (order.invoiceContactGroup.address.house_number
                    ? order.invoiceContactGroup.address.house_number + ' | '
                    : '') +
                  (order.invoiceContactGroup.address.postal_code
                    ? order.invoiceContactGroup.address.postal_code + ' - '
                    : '') +
                  (order.invoiceContactGroup.address.city ? order.invoiceContactGroup.address.city + ' | ' : '') +
                  (order.invoiceContactGroup.address.state ? order.invoiceContactGroup.address.state : '')}
                {order.invoiceContactGroup?.country?.name ? order.invoiceContactGroup?.country?.name : ''}
              </ShowMoreText>
            </div>

            <div className="name">
              <ShowMoreText
                lines={3}
                more={t('Global.ShowMore')}
                less={t('Global.ShowLess')}
                anchorClass="my-anchor-css-class"
                expanded={false}
                truncatedEndingComponent={'... '}
              >
                {t('Order.DeliveryAddress')}:
                {order.deliveryContactGroup?.people && order.deliveryContactGroup.people[0].company_name && (
                  <>
                    <br />
                    <span>{order.deliveryContactGroup.people[0].company_name}</span>
                    <br />
                  </>
                )}
                {order.deliveryContactGroup?.people &&
                  order.deliveryContactGroup.people[0].first_name &&
                  order.deliveryContactGroup.people[0].first_name + ' - '}
                {order.deliveryContactGroup?.people &&
                  order.deliveryContactGroup.people[0].last_name &&
                  order.deliveryContactGroup.people[0].last_name}
                {order.deliveryContactGroup?.people &&
                  (order.deliveryContactGroup?.people[0].first_name ||
                    order.deliveryContactGroup?.people[0].last_name) && <br />}
                {(order.deliveryContactGroup.address.address1
                  ? order.deliveryContactGroup.address.address1 + ' - '
                  : '') +
                  (order.deliveryContactGroup.address.post_identity
                    ? order.deliveryContactGroup.address.post_identity + ' | '
                    : '') +
                  (order.deliveryContactGroup.address.address2
                    ? order.deliveryContactGroup.address.address2 + ' - '
                    : '') +
                  (order.deliveryContactGroup.address.house_number
                    ? order.deliveryContactGroup.address.house_number + ' | '
                    : '') +
                  (order.deliveryContactGroup.address.postal_code
                    ? order.deliveryContactGroup.address.postal_code + ' - '
                    : '') +
                  (order.deliveryContactGroup.address.city ? order.deliveryContactGroup.address.city + ' | ' : '') +
                  (order.deliveryContactGroup.address.state ? order.deliveryContactGroup.address.state : '')}
                {order.deliveryContactGroup?.country?.name ? order.deliveryContactGroup?.country?.name : ''}
              </ShowMoreText>
            </div>

            <Styles.CalenderContainer>
              <div>
                <CalendarOutlined />
                <Typography.Text strong>{t('Order.OrderDate')}</Typography.Text>
                <Typography.Text strong type="secondary">
                  {order.order_date && intlDate(config.item?.language.locale || 'de', new Date(order.order_date))}
                </Typography.Text>
              </div>
              <div>
                <CalendarOutlined />
                <Typography.Text strong>{t('Order.DeliveredIn')}</Typography.Text>
                <Typography.Text strong type="secondary">
                  {order.estimate_delivery_date &&
                    intlDate(config.item?.language.locale || 'de', new Date(order.estimate_delivery_date))}
                </Typography.Text>
              </div>
            </Styles.CalenderContainer>
          </Col>
          <Col xs={24} md={6}>
            <Link to={`/products/${order.orderSalePositions[0]?.productVariation?.product.id}`}>
              <Button size="large">{t('Order.RateComment')}</Button>
            </Link>

            <div className="navigator">
              <Link to={`/order/${order.id}`} className="item">
                <Typography.Text type="secondary">{t('Order.ViewDetails')}</Typography.Text>
                <div className="arrow">
                  <span>&#10152;</span>
                </div>
              </Link>
            </div>

            {order.invoice_link && (
              <div className="navigator">
                <a href={Env.PURE_URL + order.invoice_link} className="item" download>
                  <Typography.Text type="secondary">
                    {t('Order.Titles.Invoice')} {t('Global.Download')}
                  </Typography.Text>
                  <div className="arrow">
                    <span>&#10152;</span>
                  </div>
                </a>
              </div>
            )}

            {order.invoice_cancellation_link && (
              <div className="navigator">
                <a href={Env.PURE_URL + order.invoice_cancellation_link} className="item" download>
                  <Typography.Text type="secondary">
                    {t('Order.Titles.InvoiceCancellation')} {t('Global.Download')}
                  </Typography.Text>
                  <div className="arrow">
                    <span>&#10152;</span>
                  </div>
                </a>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </Styles.MainContainer>
  );
};
