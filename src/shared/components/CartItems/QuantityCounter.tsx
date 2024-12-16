import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addVariationToBasket, reduceVariationFromBasket } from '@src/logic/Basket/store/Basket.store';
import { Basket } from '@src/model/Basket.model';

type Props = {
  cartItem: Basket;
  isPayment?: boolean;
};

export default function QuantityCounter({ isPayment = false, cartItem }: Props): ReactElement {
  const dispatch = useDispatch();

  const onAddProduct = () => {
    dispatch(addVariationToBasket(cartItem.product));
  };

  const onReduceProduct = () => {
    dispatch(reduceVariationFromBasket(cartItem.product));
  };

  return (
    <MainContainer>
      {!isPayment && <MinusOutlined onClick={onReduceProduct} />}
      <div style={isPayment ? { flex: 1, textAlign: 'center' } : {}}>{cartItem.quantity}</div>
      {!isPayment && <PlusOutlined onClick={onAddProduct} />}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  border-radius: 4px;
  border: 1px solid #707070;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  max-width: 170px;
  min-width: 100px;

  & .anticon {
    cursor: pointer;
    user-select: none;
  }
`;
