import React from 'react';
import { useSelector } from 'react-redux';

import BasketSelector from '@src/logic/Basket/store/Basket.selector';

import CartItem from './CartItem';

export const CartItems: React.FC<{ isSide?: boolean; isPayment?: boolean }> = ({
  isSide = false,
  isPayment = false,
}) => {
  const cartItems = useSelector(BasketSelector.getAllBaskets);

  return (
    <div>
      {cartItems.map((cart, index) => (
        <CartItem item={cart} isSide={isSide} isPayment={isPayment} key={`cart-${index}`} />
      ))}
    </div>
  );
};
