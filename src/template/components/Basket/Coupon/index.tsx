import { TagFilled } from '@ant-design/icons';
import { Button, Col, Input, message, Row } from 'antd';
import React, { ChangeEvent, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { AuthContext } from '@src/core';
import AuthSelector from '@src/core/Authentication/service/Auth.Selector';
import { CouponType } from '@src/model/Coupon.model';
import { intlCurrency } from '@src/shared/utils/engine.service';

import BasketController from '@logic/Basket/controller/Basket.controller';
import BasketSelector from '@logic/Basket/store/Basket.selector';
import { discardCoupon } from '@logic/Basket/store/Basket.store';

export const CartCoupon: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { setLoginOpen } = useContext(AuthContext);
  const isAuthenticated = useSelector(AuthSelector.isAuthenticated);

  const [value, setValue] = useState<string>();
  const isPending = useSelector(BasketSelector.getPending);
  const couponData = useSelector(BasketSelector.getCouponData);
  const totalPrice = useSelector(BasketSelector.getTotalPrice);

  const handleCouponChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onCheckCoupon = () => {
    if (!value || value === '') {
      message.error('Please Enter Coupon Code !');
    } else if (isAuthenticated) {
      dispatch(BasketController.addCouponToBaskets(value));
    } else setLoginOpen(true);
  };

  const onDiscardCoupon = () => dispatch(discardCoupon());

  return (
    <Container>
      {couponData && totalPrice > couponData.min_amount ? (
        <CouponContainer>
          <Col span={24}>
            <div className="coupon">
              <div className="coupon-code">
                {couponData.type === CouponType.percent
                  ? couponData.amount + ' %'
                  : intlCurrency('DE', 'EUR', couponData.amount)}
                <br />
                {t('Cart.DiscountAppliedByYourCode')}
              </div>
              <div className="coupon-saved">
                {couponData.type === CouponType.percent
                  ? intlCurrency('DE', 'EUR', (couponData.amount / 100) * totalPrice)
                  : intlCurrency('DE', 'EUR', couponData.amount)}{' '}
                {t('Cart.Saved')}!
              </div>
            </div>
          </Col>

          <Col span={24}>
            <Row justify="center" className="discard-coupon">
              <Button onClick={onDiscardCoupon} size="large" type="text">
                {t('Cart.DiscardUsingThisCoupon')}!
              </Button>
            </Row>
          </Col>
        </CouponContainer>
      ) : (
        <CouponInput>
          <div className="promo-code">
            <TagFilled />
            <span>{t('Cart.PromoCode')}</span>
          </div>

          <Input
            allowClear
            value={value}
            disabled={isPending}
            onChange={handleCouponChange}
            onPressEnter={onCheckCoupon}
            placeholder={t('Cart.PromoCodePlaceholder')}
            suffix={
              <Button type="text" loading={isPending} onClick={onCheckCoupon}>
                {t('Cart.Checkout')}
              </Button>
            }
          />
        </CouponInput>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
`;

const CouponInput = styled.div`
  & .promo-code {
    color: #173d56;
    border: 1px solid #0d83d1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1.5rem;
    max-width: 220px;
    margin: 0 auto 16px;
    box-shadow: 1px 0px 7px 0px #0d83d1;

    & span {
      margin-right: 8px;
    }
  }
`;

const CouponContainer = styled(Row)`
  position: relative;

  & .coupon {
    width: 100%;
    height: 300px;
    background: url('assets/images/global/coupon.png') center no-repeat no-repeat;
    background-size: contain;

    & .coupon-code {
      position: absolute;
      top: 35px;
      left: 10%;
      right: 10%;
      text-align: center;
      color: #173d56;
      font-size: 1.6rem;
      font-weight: bold;
    }

    & .coupon-saved {
      position: absolute;
      text-align: center;
      bottom: 50px;
      left: 10px;
      right: 10px;
      color: #8d9194;
      font-size: 1.4rem;
      font-weight: bold;
    }
  }

  & .discard-coupon {
    padding: 8px;

    & button {
      font-weight: 600 !important;
    }
  }
`;
