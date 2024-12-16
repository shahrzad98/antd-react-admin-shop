/* eslint-disable */
// TODO: remove previous line

import cart from './cart.json';
import price from './price.json';
import totalPrice from './totalPrice.json';

export interface Coupon {
  id: number;
  type: string;
  amount: number;
  release_date?: Date;
  available_until?: Date;
  quantity?: number;
  used_quantity: number;
  max_quantity_each_user: number;
  is_active: boolean;
  created_by?: string;
  name: string;
  description: string;
  translate: {
    coupon_id: number;
    locale: string;
    name: string;
    description: string;
  }[];
  couponCodes?: { code: string }[];
}

// TODO: any s are the type of ProductVariation
const deleteFromCart = (data?: any, deleteAll?: boolean): Promise<any> => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

const addToCart = (data?: any): Promise<unknown> => {
  return new Promise((resolve) => {
    resolve('OK');
  });
};

const couponData: Coupon | any = undefined;
const setCouponData = (param: undefined): boolean => {
  return !!param;
};

const getPrice: any = (data: any) => {
  return price;
};

export default { cart, totalPrice, couponData, setCouponData, deleteFromCart, addToCart, getPrice };
