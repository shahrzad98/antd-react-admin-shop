import { Country, Language } from '@src/shared/models';

export interface ConfigData {
  admin_page: string;
  country: Country;
  language: Language;
  subdomain: unknown;
  default_vat: number;
  analytics: Analytics;
  saleSystem: ConfigSaleSystem;
  bankAccounts: BankAccount[];
}

export interface Analytics {
  id: number;
  slug: string;
  partner_id: string;
  data: { google: string; locale: string; 'microsoft-uet': string }[];
}

interface ConfigSaleSystem {
  city: string;
  company_name: string;
  country: string;
  default_vat: number;
  default_warranty_days: string;
  email: string;
  fax: string;
  has_btob: string;
  has_btoc: string;
  has_delivery: string;
  has_network: string;
  has_warehouse: string;
  house_number: string;
  id: string;
  is_active: string;
  max_client_root: string;
  partner: string;
  phone: string;
  postal_code: string;
  register_number: string;
  register_office: string;
  street: string;
  template: string;
  warranty_days: string;
  partner_detail: string;
  partner_picture: string;
}

interface BankAccount {
  bank_name: string;
  bank_account_number: string;
}

export interface ConfigForPartner {
  name: string;
  description: string;
  email: string;
  phone: string;
}
