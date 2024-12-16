import { GeneralTranslate } from './Common.entity';

export interface Currency {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  ratio: number;
  symbol: string;
  is_active: boolean | string;
  is_default: boolean | string;
  translate: GeneralTranslate[];
}
