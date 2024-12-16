export interface Coupon {
  id: number;
  name: string;
  type: string;
  amount: number;
  min_amount: number;
  is_active: boolean;
  created_by: number;
  description: string;
  first_order: boolean;
  used_quantity: number;
  quantity: number | null;
  couponCodes: CouponCode[];
  release_date: string | null;
  available_until: string | null;
  max_quantity_each_user: number | null;
}

export interface CouponCode {
  id: number;
  code: string;
}

export enum CouponType {
  amount = 'amount',
  percent = 'percent',
}

export type BasketCoupon = Pick<Coupon, 'id' | 'min_amount' | 'amount' | 'type' | 'couponCodes'>;
