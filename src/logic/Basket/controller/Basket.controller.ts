import { createAsyncThunk } from '@reduxjs/toolkit';

import { storeState } from '@src/core/Configs/StoreConfiguration';
import { Basket } from '@src/model/Basket.model';
import { Coupon } from '@src/model/Coupon.model';
import { getBasketFromStorage } from '@src/service/Basket.service';
import CouponService from '@src/service/Coupon.service';

import { getTotalPrice } from '../store/Basket.selector';

export const getBasketProductsFromStorage = createAsyncThunk('Basket/GetAll', async () => {
  return await new Promise<Basket[]>((resolve, reject) => {
    getBasketFromStorage()
      .then((baskets) => {
        resolve(baskets);
      })
      .catch((e) => reject(e));
  });
});

export const addCouponToBaskets = createAsyncThunk('Basket/AddCoupon', async (code: string) => {
  return await new Promise<Coupon | undefined>((resolve, reject) => {
    const totalPrice = getTotalPrice(storeState());

    CouponService.setCoupon(code)
      .then((coupon) => {
        if ((coupon?.min_amount || 0) < totalPrice) {
          resolve(coupon);
        } else resolve({ id: -1 } as Coupon);
      })
      .catch((e) => reject(e));
  });
});

export default { getBasketProductsFromStorage, addCouponToBaskets };
