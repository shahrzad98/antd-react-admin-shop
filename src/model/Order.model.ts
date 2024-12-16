import { UserPerson } from '@src/core/Authentication/model';
import { ContactGroups, Currency, Language, PaymentTerm, ShippingProfile } from '@src/shared/models';

import { PaymentMethod } from './PaymentMethod.model';
import { ProductVariation } from './Variation.model';

export interface OrderSalePosition {
  id: number;
  country_variation_vat_id: number;
  created_at: string;
  customer_reference: string;
  description: string;
  discount: number;
  estimate_delivery_date: string | null;
  ext_position_number: string;
  gross_price: number;
  net_price: number;
  order_position_type_id: number;
  order_sale_id: number;
  orderPositionType: { id: number };
  price_id: number;
  price_value: number;
  product_variation_id: number;
  quantity: number;
  return_on_sale: number;
  sort: number;
  updated_at: string;
  vat_value: number;
  productVariation: ProductVariation;
}

export interface OrderHistory {
  event: string;
  ip_address: string;
  new_values: OrderHistoryValue;
  old_values: OrderHistoryValue;
  user: OrderPerson;
}

interface OrderPerson {
  person: { first_name: string; last_name: string };
}

export interface OrderHistoryValue {
  id: number;
  currency_id: number | null;
  delivery_contact_group_id: number | null;
  estimate_delivery_date: string | null;
  invoice_contact_group_id: number | null;
  ip: string | null;
  language_id: number | null;
  number: string | null;
  order_date: string | null;
  order_status_id: number | null;
  payment_method_id: number | null;
  shipping_profile_id: number | null;
  user_id: number | null;
}

export interface OrderSale {
  id: number;
  created_at: string;
  delivery_contact_group_id: number;
  description: string;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  estimate_delivery_date: string;
  estimate_payment_date: string;
  invoice_cancellation_id: number;
  invoice_cancellation_link: string;
  invoice_contact_group_id: number;
  invoice_id: number | null;
  invoice_link: string | null;
  ip: string;
  language_id: number;
  net_price: number;
  number: string;
  order_advance_id: number;
  order_date: string;
  order_multiple_id: number;
  order_offer_id: number;
  order_status_id: number;
  owner_id: number;
  partner_id: number;
  pay_date: string;
  payment_method_id: number;
  payment_status: string;
  payment_term_id: number;
  remaining_price: number;
  return_on_sale: number;
  shipping_profile_id: number;
  total_price: number;
  updated_at: string;
  user_id: number;
  vat_value: number;
  currency: Currency;
  deliveryContactGroup: ContactGroups;
  invoiceContactGroup: ContactGroups;
  language: Language;
  orderStatus: OrderStatus;
  owner: OrderOwner;
  paymentMethod: PaymentMethod | null;
  paymentTerm: PaymentTerm;
  shippingProfile: ShippingProfile;
  orderSalePositions: OrderSalePosition[];
}

export interface OrderStatus {
  id: number;
  color: string;
  name: string;
  number: number;
}
export interface OrderPartner {
  id: number;
  user: { name: string };
}
export interface OrderOwner {
  username: string;
  person: {
    first_name: string;
    last_name: string;
  };
}

export interface OrderInvoiceContactGroup {
  id: number;
  people: UserPerson[];
  country: { name: string };
  addresses: ContactGroups[];
}

export interface FinalOrder {
  coupon?: string;
  description: string;
  payment_method_id: number;
  shipping_profile_id?: number;
  invoice_contact_group_id: number;
  delivery_contact_group_id: number;
}
