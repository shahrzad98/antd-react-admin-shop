import { User } from '@src/core/Authentication/model';

import { AppVariation } from './Variation.model';

export interface Basket {
  product: AppVariation;
  quantity: number;
}

export interface FinalizedBasket {
  status: string;
  total_price: number;
  user_id: number;
  user: User;
}

export enum FinalizedBasketStatus {
  pending = 'pending',
}

export type FinalBasket = { items: { count: number; product_variation_id: number }[] };
