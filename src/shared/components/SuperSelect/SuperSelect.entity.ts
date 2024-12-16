import { FactoryChild } from '@src/shared/models';
import { ReactNode } from 'react';
import { GroupTypeBase } from 'react-select';
import { LoadOptions } from 'react-select-async-paginate';

export type LoadOptionFunc<Type> = LoadOptions<Type, GroupTypeBase<Type>, { page: number }>;

export interface SuperSelect<Type> {
  value: Type;
  hasNew: boolean;
  isMulti: boolean;
  searchParam: string;
  menuPlacement?: 'top' | 'bottom';
  onChange: (data: Type | Type[]) => void;
  optionSelector: { label: string; value: string };
}

export type SuperSelectProps<Type> = Partial<SuperSelect<Type>> & {
  module: FactoryChild<Type>;
  className?: string;
  query?: Record<string, any>;
  disabled?: boolean;
  title?: string;
};

export interface SelectModalProps<Type> {
  children: ReactNode;
  module: FactoryChild<Type>;
  isVisible: boolean;
  setVisible: (status: boolean) => void;
}
