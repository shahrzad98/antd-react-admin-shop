import { PaginationContext } from '.';

export interface GlobalSingleStore<T> {
  item: T | null;
  isPending: boolean;
  error: string | null;
}

export interface GlobalListStore<T> {
  items: T[];
  isPending: boolean;
  error: string | null;
  pagination?: PaginationContext;
}
