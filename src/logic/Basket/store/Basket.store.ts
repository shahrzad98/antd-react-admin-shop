import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { Basket } from '@src/model/Basket.model';
import { BasketCoupon } from '@src/model/Coupon.model';
import { AppVariation } from '@src/model/Variation.model';
import { addBasketToStorage, emptyCart } from '@src/service/Basket.service';

import { addCouponToBaskets, getBasketProductsFromStorage } from '../controller/Basket.controller';

export type BasketStore = { items: Basket[]; coupon: BasketCoupon | null; isPending: boolean };

const initialState: BasketStore = {
  items: [],
  coupon: null,
  isPending: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addVariationToBasket(state, action: PayloadAction<AppVariation>) {
      let basketItems = state.items;
      const productVariation = action.payload;
      if (basketItems.some((variation) => variation.product.id === productVariation.id)) {
        basketItems = basketItems.map((variation) =>
          variation.product.id === productVariation.id ? { ...variation, quantity: variation.quantity + 1 } : variation,
        );
      } else {
        basketItems = [...basketItems, { product: productVariation, quantity: 1 }];
      }

      state.items = basketItems;
      addBasketToStorage(basketItems);
    },

    reduceVariationFromBasket(state, action: PayloadAction<AppVariation>) {
      let basketItems = state.items;
      const productVariation = action.payload;
      if (basketItems.some((variation) => variation.product.id === productVariation.id)) {
        const existedVariation = basketItems.find((variation) => variation.product.id === productVariation.id);
        if (existedVariation && existedVariation.quantity === 1) {
          basketItems = basketItems.filter((variation) => variation.product.id !== productVariation.id);
        } else if (existedVariation) {
          basketItems = basketItems.map((variation) =>
            variation.product.id !== productVariation.id
              ? variation
              : { ...variation, quantity: variation.quantity - 1 },
          );
        }
      }

      state.items = basketItems;

      if (basketItems.length === 0) {
        emptyCart();
      } else {
        addBasketToStorage(basketItems);
      }
    },

    discardCoupon(state) {
      state.coupon = null;
    },

    discardBasketItems(state) {
      state.items = [];
      localStorage.removeItem('baskets');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBasketProductsFromStorage.pending, (state: BasketStore) => {
      state.isPending = true;
    });
    builder.addCase(getBasketProductsFromStorage.fulfilled, (state: BasketStore, action) => {
      state.isPending = false;
      state.items = action.payload;
    });
    builder.addCase(getBasketProductsFromStorage.rejected, (state: BasketStore) => {
      state.isPending = false;
    });

    builder.addCase(addCouponToBaskets.pending, (state: BasketStore) => {
      state.isPending = true;
    });
    builder.addCase(addCouponToBaskets.fulfilled, (state: BasketStore, action) => {
      state.isPending = false;
      const coupon = action.payload;

      if (coupon?.id === -1) {
        message.warning(
          'Total Price is lower than Minimum Amount that copoun provided, so the discount code is ignored.',
        );
      } else if (!coupon?.id) {
        message.warning('Your personal discount is more than the discount code, so the discount code is ignored.');
      } else {
        state.coupon = coupon
          ? {
              id: coupon.id,
              type: coupon.type,
              amount: coupon.amount,
              min_amount: coupon.min_amount,
              couponCodes: coupon.couponCodes,
            }
          : null;
      }
    });
    builder.addCase(addCouponToBaskets.rejected, (state: BasketStore) => {
      state.isPending = false;
    });
  },
});

export default basketSlice;
export const { addVariationToBasket, discardBasketItems, reduceVariationFromBasket, discardCoupon } =
  basketSlice.actions;
