import { RootState } from '@src/core/Configs/StoreConfiguration';
import { Basket } from '@src/model/Basket.model';
import { BasketCoupon, CouponType } from '@src/model/Coupon.model';

const getAllBaskets = (state: RootState): Basket[] => state.basket.items;
const getPending = (state: RootState): boolean => state.basket.isPending;
const getCouponData = (state: RootState): BasketCoupon | null => state.basket.coupon;

export const getTotalPrice = (state: RootState): number => {
  const items = state.basket.items;

  return items.reduce((prev, next) => prev + next.quantity * next.product.prices.variationValue, 0);
};

const getShippingPrice = (state: RootState): number => {
  return getTotalPrice(state) >= 25 ? 0 : 5;
};

const getTotalPayment = (state: RootState): number => {
  const coupon = state.basket.coupon;
  const totalPrice = getTotalPrice(state);
  const shippingPrice = getShippingPrice(state);
  const userDiscount = state.auth.profile.discount_ratio || 0;

  if (coupon) {
    if (coupon.type === CouponType.percent && coupon.amount > userDiscount) {
      return totalPrice + shippingPrice - (totalPrice * coupon.amount) / 100;
    } else if (coupon.type === CouponType.amount && (coupon.amount * 100) / totalPrice > userDiscount) {
      return totalPrice + shippingPrice - coupon.amount;
    } else if (coupon.amount < userDiscount) {
      return totalPrice + shippingPrice - (totalPrice * userDiscount) / 100;
    }
  }

  return totalPrice === 0 ? 0 : totalPrice + shippingPrice;
};

export default { getAllBaskets, getTotalPrice, getCouponData, getPending, getShippingPrice, getTotalPayment };
