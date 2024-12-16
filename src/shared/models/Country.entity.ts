import { GeneralTranslate } from './Common.entity';
import { Currency } from './Currency.entity';

export interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  is_eeu: boolean;
  is_active: boolean;
  currency: Currency;
  is_default: boolean;
  currency_id: number;
  vats: CountryVats[];
  default_warranty_days: number;
  translate: GeneralTranslate[];
  max_tax_free_trade: number | null;
  max_small_business_trade: number | null;
}

interface CountryVats {
  id: number;
  value: number;
  number: string;
  valid_from: string;
}
