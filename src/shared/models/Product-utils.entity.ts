import { GeneralTranslate } from './Common.entity';
import { Country } from './Country.entity';
import { Currency } from './Currency.entity';

export interface VariationCategory {
  id: number;
  name: string;
  partner_id: number;
  subdomain_id: number;
  parent: VariationCategory;
  translate: GeneralTranslate[];
}

export interface AttributeType {
  id: number;
  name: string;
  partner: Partner;
  translate: GeneralTranslate[];
  productVariationCategories: VariationCategory[];
}

export interface Partner {
  id: number;
  iban: string;
  swift: string;
  mobile: string;
  user_id: number;
  updated_at: Date;
  can_buy: boolean;
  coach_id: number;
  created_at: Date;
  bank_name: string;
  right_tree: number;
  country_id: number;
  has_btob: boolean;
  has_btoc: boolean;
  is_active: boolean;
  left_tree: number;
  is_approved: boolean;
  has_network: boolean;
  warranty_days: number;
  has_delivery: boolean;
  inhouse_sale: boolean;
  has_warehouse: boolean;
  backIdentityCard: File;
  frontIdentityCard: File;
  max_client_root: number;
  active_auto_bonus: boolean;
  can_see_down_line: boolean;
  businessCertification: File;
  back_identity_card_id: number;
  default_warranty_days: number;
  receive_commission: boolean;
  post_delivery_factor: boolean;
  send_vat_responsible: boolean;
  front_identity_card_id: number;
  active_training_bonus: boolean;
  business_certification_id: number;
  over_personal_turnover: boolean;
  receive_vat_responsible: boolean;
  transportation_ratio_percentage: number;

  parent: Partner;
  user: PartnerUser;
  translate: GeneralTranslate[];
}

export interface PartnerUser {
  id: number;
  avatar: string | null;
  username: string;
}

export interface PackingType {
  id: number;
  name: string;
  translate: GeneralTranslate[];
}

export interface Package {
  id: number;
  width: number;
  height: number;
  length: number;
  net_weight: number;
  gross_weight: number;
  packing_type_id: number;
  packingType: PackingType;
  translate: GeneralTranslate[];
}

export interface Price {
  id: number;
  name: string;
  created_at: Date;
  interval: string;
  unit_price: number;
  updated_at: Date;
  currency: Currency;
  min_quantity: number;
  countries: Country[];
  priceType: PriceType;
  translate: GeneralTranslate[];
  display_for_new_item: boolean;
}

export interface PriceType {
  id: number;
  name: string;
  translate: GeneralTranslate[];
}

export interface PaymentTerm {
  id: number;
  due_days: number;
  description: string;
  discount_percentage: number;
  translate: GeneralTranslate[];
}

export interface ShippingMethod {
  id: number;
  name: string;
  translate: GeneralTranslate[];
}

export interface PaymentMethodType {
  id: number;
  title: string;
}

export interface ShippingProfile {
  id: number;
  name: string;
  type: string;
  icon_id: number;
  partner: Partner;
  icon: string | null;
  tracking_link: string;
  subdomain: { id: number };
  translate: GeneralTranslate[];
}

export interface Availability {
  id: number;
  file_id: number;
  file: string;
  name: string;
  average_days: number;
  translate: GeneralTranslate[];
}

export interface Barcode {
  id: number;
  is_used: boolean;
  type: string;
  value: string;
  translate: GeneralTranslate[];
}

export interface CustomTariff {
  id: number;
  number: number;
  value: number;
  translate: GeneralTranslate[];
}

export interface Supplier {
  id: number;
}
