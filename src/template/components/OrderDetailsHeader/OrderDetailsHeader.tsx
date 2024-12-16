import OrderSelector from '@src/logic/Order/store/Order.selector';
import { Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const OrderDetailsHeader = (): ReactElement | null => {
  const { t } = useTranslation();
  const { item: order } = useSelector(OrderSelector.getLatestOrder);

  if (!order) return null;
  return (
    <div className="detail-header">
      <Typography.Title level={4}>{`Order Number : ${order?.id}`}</Typography.Title>
      <div className="item">
        <Typography.Text strong>{t('Order.PaymentMethod')}</Typography.Text>
        <h4>{order?.paymentMethod?.name}</h4>
      </div>
    </div>
  );
};
