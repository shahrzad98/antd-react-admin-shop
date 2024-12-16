import { User } from '@src/core/Authentication/model';
import { Currency, GeneralTranslate } from '@src/shared/models';

import { ProductCategory } from './Category.model';

export interface Product {
  id: number;
  name: string;
  sort: number;
  file: string;
  point: number;
  number: string;
  file_id: number;
  is_active: boolean;
  default_vat: number;
  description: string;
  price_visible: boolean;
  max_order_quantity: number;
  min_order_quantity: number;
  release_date: string | Date;
  auto_active_net_stock: boolean;
  available_until: string | Date;
  auto_deactive_net_stock: boolean;
  interval_order_quantity: number;
  maximum_sale_for_each_user: number;

  prices: ProductPrices[];
  translate: GeneralTranslate[];
  productCategories: ProductCategory[];
}

export interface ProductPrices {
  id: number;
  value: number;
  name: string;
  interval: string;
  updated_at: Date;
  created_at: Date;
  unit_price: number;
  currency: Currency;
  priceType: PriceType;
  min_quantity: number;
  display_for_new_item: boolean;
  translate: GeneralTranslate[];
}

export interface ProductComment {
  id: number;
  user: User;
  created_at: Date;
  reply_to: number;
  approved: boolean;
  description: string;
  product_variation_id: number;
}

interface PriceType {
  id: number;
  name: string;
  translate: GeneralTranslate[];
}

export interface AppProduct {
  id: number;
  name: string;
  unit: string;
  image: string;
  unitPrice: number;
  priceValue: number;
  currency: Currency;
  priceVisible: boolean;
}
