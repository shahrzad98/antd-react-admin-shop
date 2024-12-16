import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

import { ApiBuilder } from '../utils';

export type GeneralTranslate = { locale?: string; name: string; description?: string };
export type TranslateContext = Record<string, GeneralTranslate>;

export interface ResponseLinks {
  last: string | null;
  next: string | null;
  prev: string | null;
  first: string | null;
}

export interface ResponseMetaLink {
  url: string;
  label: string;
  active: boolean;
}

export interface ResponseMeta {
  to?: number;
  from?: number;
  path?: string;
  total?: number;
  per_page?: number;
  last_page?: number;
  current_page?: number;
  orderByColumns: string[];
  links: ResponseMetaLink[];
  filters: { [key: string]: string };
}

export type PaginationContext = Pick<ResponseMeta, 'to' | 'from' | 'total' | 'per_page' | 'last_page' | 'current_page'>;

export interface PaginationRequest {
  page?: number;
  search?: string;
  per_page?: number;
}

export interface ResponseContext<T> {
  data: T;
  meta: ResponseMeta;
  links: ResponseLinks[];
}

export enum SortOrder {
  'DESC' = 'DESC',
  'ASC' = 'ASC',
}

export interface IntlCurrency {
  locale: string;
  iso3: string;
}

export interface FactoryChild<T extends unknown> {
  entity: string;
  title: string[];
  apiService: ApiBuilder<T>;
  breadcrumbItems?: Route[];
}
