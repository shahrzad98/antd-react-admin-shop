import { Typography } from 'antd';
import queryString from 'query-string';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import OrderDetailPage from './OrderDetails.page';

export default function OrderCallback(): ReactElement {
  const { t } = useTranslation();
  const { search } = useLocation();
  const { orderId }: { orderId?: string } = queryString.parse(search);

  return (
    <MainContainer>
      <>
        <Typography.Title className="title" type="secondary">
          {t('Cart.ThanksTitle')}
        </Typography.Title>

        <OrderDetailPage orderId={orderId} />
      </>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding-top: 16px;

  & .title {
    display: block;
    max-width: 1310px;
    margin: 16px auto;
  }
`;
