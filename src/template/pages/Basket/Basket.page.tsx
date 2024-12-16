import { Button, Col, Row } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from '@src/core';
import AuthSelector from '@src/core/Authentication/service/Auth.Selector';
import { finalizeBasket } from '@src/service/Basket.service';
import { CartItems } from '@src/shared/components/CartItems';
import { device } from '@src/shared/styles';
import { CartCoupon } from '@src/template/components/Basket/Coupon';
import { CartPrices } from '@src/template/components/Basket/Prices';
import { CartTable } from '@src/template/components/Basket/Table';

import BasketSelector from '@logic/Basket/store/Basket.selector';

const BasketPage = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [paymentPending, setPaymentPending] = useState(false);

  const { setLoginOpen } = useContext(AuthContext);
  const isPending = useSelector(BasketSelector.getPending);
  const cartItems = useSelector(BasketSelector.getAllBaskets);
  const isAuthenticated = useSelector(AuthSelector.isAuthenticated);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/category');
    }
  }, [cartItems]);

  const handlePayment = () => {
    if (isAuthenticated) {
      setPaymentPending(true);
      const finalBasket = {
        items: cartItems.map((item) => ({ count: item.quantity, product_variation_id: item.product.id })),
      };
      finalizeBasket(finalBasket)
        .then(() => navigate('/payment-info'))
        .catch(() => setPaymentPending(false));
    } else {
      if (setLoginOpen) {
        setLoginOpen(true);
      }
    }
  };

  return (
    <MainContainer>
      <Row gutter={{ xs: 8, sm: 16, xl: 64 }} align="top">
        <Col xs={24} xl={16}>
          <CartItems />
        </Col>

        <Col xs={24} xl={8}>
          <div className="basket-details">
            <CartTable />

            <CartPrices />

            <CartCoupon />

            <div className="submit-container">
              <Button
                block
                size="large"
                type="primary"
                loading={paymentPending}
                onClick={handlePayment}
                disabled={cartItems.length === 0 || isPending}
              >
                {t('Cart.Buy')}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default BasketPage;

const MainContainer = styled.div`
  max-width: 1310px;
  margin: 0 auto;
  padding: 64px;

  @media ${device.mobileL} {
    padding: 16px;
  }

  & .basket-details {
    margin: 8px 0;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid #707070;
  }

  & .submit-container {
    padding: 16px;
  }
`;
