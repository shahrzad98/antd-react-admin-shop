import { Card, Col, Row, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import MainSelector from '@src/logic/Main/store/Main.selector';
import OrderSelector from '@src/logic/Order/store/Order.selector';
import { intlDate } from '@src/shared/utils/engine.service';

import Styles from './OrderDetailsInfo.style';

export const OrderDetailsInfo = (): ReactElement | null => {
  const { t } = useTranslation();
  const config = useSelector(MainSelector.getConfigsData);
  const { item: order } = useSelector(OrderSelector.getLatestOrder);

  if (!order) return null;
  return (
    <Styles.MainContainer>
      <Card>
        <Row>
          <div>{t('Order.Details')}</div>
        </Row>
        <Row>
          <div className="col">
            {order?.invoiceContactGroup?.address && (
              <div>
                <Col>{t('Order.InvoiceAddress')}</Col>
                <Typography.Text strong style={{ lineHeight: 3 }}>
                  {order?.invoiceContactGroup?.people && order.invoiceContactGroup.people[0].company_name && (
                    <>
                      <span>{order.invoiceContactGroup.people[0].company_name}</span>
                      <br />
                    </>
                  )}
                  {order?.invoiceContactGroup?.people &&
                    order.invoiceContactGroup.people[0].first_name &&
                    order.invoiceContactGroup.people[0].first_name + ' - '}

                  {order?.invoiceContactGroup?.people &&
                    order.invoiceContactGroup.people[0].last_name &&
                    order.invoiceContactGroup.people[0].last_name}

                  {order?.invoiceContactGroup?.people &&
                    (order?.invoiceContactGroup?.people[0].first_name ||
                      order?.invoiceContactGroup?.people[0].last_name) && <br />}

                  {(order?.invoiceContactGroup.address.address1
                    ? order?.invoiceContactGroup.address.address1 + ' - '
                    : '') +
                    (order?.invoiceContactGroup.address.post_identity
                      ? order?.invoiceContactGroup.address.post_identity + '\n'
                      : '') +
                    (order?.invoiceContactGroup.address.address2
                      ? order?.invoiceContactGroup.address.address2 + ' - '
                      : '') +
                    (order?.invoiceContactGroup.address.house_number
                      ? order?.invoiceContactGroup.address.house_number + '\n'
                      : '') +
                    (order?.invoiceContactGroup.address.postal_code
                      ? order?.invoiceContactGroup.address.postal_code + ' - '
                      : '') +
                    (order?.invoiceContactGroup.address.city ? order?.invoiceContactGroup.address.city + '\n' : '') +
                    (order?.invoiceContactGroup.address.state ? order?.invoiceContactGroup.address.state : '')}

                  {order?.invoiceContactGroup?.country?.name ? order?.invoiceContactGroup?.country?.name : ''}
                </Typography.Text>
              </div>
            )}

            {order?.deliveryContactGroup?.address && (
              <div>
                <Col>{t('Order.DeliveryAddress')}</Col>

                <Typography.Text style={{ lineHeight: 3 }}>
                  {order?.deliveryContactGroup?.people && order.deliveryContactGroup.people[0].company_name && (
                    <>
                      <span>{order.deliveryContactGroup.people[0].company_name}</span>
                      <br />
                    </>
                  )}
                  {order?.deliveryContactGroup?.people &&
                    order.deliveryContactGroup.people[0].first_name &&
                    order.deliveryContactGroup.people[0].first_name + ' - '}

                  {order?.deliveryContactGroup?.people &&
                    order.deliveryContactGroup.people[0].last_name &&
                    order.deliveryContactGroup.people[0].last_name}

                  {order?.deliveryContactGroup?.people &&
                    (order?.deliveryContactGroup?.people[0].first_name ||
                      order?.deliveryContactGroup?.people[0].last_name) && <br />}

                  {(order?.deliveryContactGroup.address.address1
                    ? order?.deliveryContactGroup.address.address1 + ' - '
                    : '') +
                    (order?.deliveryContactGroup.address.post_identity
                      ? order?.deliveryContactGroup.address.post_identity + '\n'
                      : '') +
                    (order?.deliveryContactGroup.address.address2
                      ? order?.deliveryContactGroup.address.address2 + ' - '
                      : '') +
                    (order?.deliveryContactGroup.address.house_number
                      ? order?.deliveryContactGroup.address.house_number + '\n'
                      : '') +
                    (order?.deliveryContactGroup.address.postal_code
                      ? order?.deliveryContactGroup.address.postal_code + ' - '
                      : '') +
                    (order?.deliveryContactGroup.address.city ? order?.deliveryContactGroup.address.city + '\n' : '') +
                    (order?.deliveryContactGroup.address.state ? order?.deliveryContactGroup.address.state : '')}

                  {order?.deliveryContactGroup?.country?.name ? order?.deliveryContactGroup?.country?.name : ''}
                </Typography.Text>
              </div>
            )}
            <div>
              <Typography.Text strong>
                {order?.pay_date && (
                  <span>
                    {t('Order.PayDate')} :{intlDate(config.item?.language.locale || 'de', new Date(order.pay_date))}
                  </span>
                )}
              </Typography.Text>
            </div>
          </div>
        </Row>
      </Card>
    </Styles.MainContainer>
  );
};
