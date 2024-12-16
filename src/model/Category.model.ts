import { GeneralTranslate } from '@src/shared/models';

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  sort: number;
  partner_id: number;
  subdomain_id: number;
  show_in_website: boolean;
  parent: ProductCategory;
  children: ProductCategory[];
  translate: GeneralTranslate[];
}

export interface AppCategory {
  key: string;
  title: string;
  children: AppCategory[];
}
