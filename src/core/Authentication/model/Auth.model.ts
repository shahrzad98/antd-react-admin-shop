import { Country, Language, PaymentMethodType, PaymentTerm, ShippingMethod } from '@src/shared/models';
import { ContactGroups } from '@src/shared/models/ContactGroups.entity';

export interface Login {
  user: User;
  token: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

interface RegisterPure {
  email: string;
  gender: string;
  password: string;
  birth_date: string;
  first_name: string;
  last_name: string;
}

export interface RegisterForm extends RegisterPure {
  country_id: number;
  language_id: number;
}

export interface RegisterFormContext extends RegisterPure {
  country: { id: number };
  language: { id: number };
}

export interface RolePermission {
  id: number;
  title: string;
}

export interface UserRole {
  id: number;
  title: string;
  slug: string;
  owner_visibility: boolean;
  company_visibility: boolean;
  permissions: RolePermission[];
  translate: { locale: string; title: string };
}

interface UserBasket {
  status: string;
  user_id: number;
  total_price: number;
}

export interface UserPerson {
  id: number;
  gender: string;
  last_name: string;
  created_by: string;
  first_name: string;
  company_name: string;
  contactGroups: ContactGroups[];
}

export interface User {
  id: number;
  avatar: string;
  created_at: Date;
  birth_date: string;
  credit_limit: number;
  default_payment_terms_id: number;
  default_shipping_method_id: number;
  discount_ratio: number;
  email: string;
  eori_number: string;
  file_id: number;
  invoice_contact_group_id: number | null;
  is_vat_valid: number;
  payment_method_id: number;
  sponsor: string;
  tax_number: string;
  updated_at: Date;
  use_gln_indocuments: boolean;
  username: string;
  basket: UserBasket;
  person: UserPerson;
  language: Language;
  roles: UserRole[];
  country: Country;
  paymentTerm: PaymentTerm;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethodType;
}

export interface ChangePasswordIProps {
  password: string;
  token?: string | null;
  password_confirmation: string;
}
