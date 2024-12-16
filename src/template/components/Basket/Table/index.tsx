import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import BasketSelector from '@src/logic/Basket/store/Basket.selector';
import { intlCurrency } from '@src/shared/utils/engine.service';

export const CartTable: React.FC = () => {
  const { t } = useTranslation();
  const cart = useSelector(BasketSelector.getAllBaskets);

  const columns = [
    {
      key: 'id',
      title: t('Cart.Num'),
      dataIndex: ['product', 'id'],
    },
    {
      key: 'price_value',
      title: t('Cart.Price'),
      dataIndex: ['product', 'prices', 'variationValue'],
      render: (price: number) => <span>{intlCurrency('DE', 'EUR', price)}</span>,
    },
    {
      key: 'count',
      dataIndex: 'quantity',
      title: t('Cart.Quantity'),
    },
  ];

  return (
    <MainContainer>
      <Table
        columns={columns}
        dataSource={cart}
        pagination={false}
        scroll={{ x: true }}
        rowKey={(prd) => prd.product.id}
      />
    </MainContainer>
  );
};

const MainContainer = styled.div``;
