import { Typography } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import BasketSelector from '@src/logic/Basket/store/Basket.selector';
import { intlCurrency } from '@src/shared/utils/engine.service';

export const CartPrices: React.FC<{ isSide?: boolean }> = ({ isSide = false }) => {
  const { t } = useTranslation();
  const couponData = useSelector(BasketSelector.getCouponData);

  const totalPrice = useSelector(BasketSelector.getTotalPrice);
  const totalPayment = useSelector(BasketSelector.getTotalPayment);
  const shippingPrice = useSelector(BasketSelector.getShippingPrice);

  return (
    <MainContainer>
      {(!isSide || (isSide && totalPrice !== 0)) && (
        <>
          <Typography.Title level={5}>
            {t('Cart.ShippingPrice')}
            {' : '}
            <Typography.Text type="secondary">
              {shippingPrice === 0 ? t('ActionMenus.FreeShipping') : intlCurrency('DE', 'EUR', shippingPrice)}
            </Typography.Text>
          </Typography.Title>
          <Typography.Title level={5}>* inkl. ges. MwSt.</Typography.Title>
        </>
      )}

      <Typography.Title level={5} className="total-price">
        {t('Cart.TotalPayment')}
        {' : '}
        <Typography.Text type="secondary">
          <Typography.Text type="secondary" className={cn('total', { 'disabled-price': !!couponData })}>
            {intlCurrency('DE', 'EUR', totalPrice + shippingPrice)}
          </Typography.Text>
          {couponData ? (
            <>
              <span style={{ margin: '0 4px' }}>&#10159;</span>
              <Typography.Text className="coupon">{intlCurrency('DE', 'EUR', totalPayment)}</Typography.Text>
            </>
          ) : null}
        </Typography.Text>
      </Typography.Title>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  padding: 16px;

  & .total-price {
    font-size: 1.2rem;

    & .coupon,
    & .total {
      color: ${(props) => props.theme.colors.main};
    }

    & .disabled-price {
      color: rgba(0, 0, 0, 0.45);
    }
  }
`;
