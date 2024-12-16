import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppCategory } from '@src/model/Category.model';
import { AppProduct } from '@src/model/Product.model';
import { AppVariation } from '@src/model/Variation.model';
import { GlobalListStore, PaginationContext } from '@src/shared/models';
import { Reducer } from '@src/shared/utils/reducer.service';

import { getCategoryTreeForProducts } from '../controller/Category.controller';
import { getProductsForCategory } from '../controller/Product.controller';
import { getVariationsByProductId, getVariationsForMainSlider } from '../controller/Variation.Controller';

export type ProductStore = {
  category: GlobalListStore<AppCategory>;
  variations: GlobalListStore<AppVariation>;
  mainSlider: GlobalListStore<AppVariation>;
  products: GlobalListStore<AppProduct> & { pagination: PaginationContext };
};

const initialState: ProductStore = {
  mainSlider: {
    items: [],
    error: null,
    isPending: false,
  },
  products: {
    items: [],
    error: null,
    pagination: {},
    isPending: false,
  },
  category: {
    items: [],
    error: null,
    isPending: false,
  },
  variations: {
    items: [],
    error: null,
    isPending: false,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductPagination(state, action: PayloadAction<PaginationContext>) {
      state.products.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    Reducer<AppProduct[], ProductStore>(builder, getProductsForCategory, {
      namespace: 'products',
      stateHandler: 'multi',
    });

    Reducer<AppCategory[], ProductStore>(builder, getCategoryTreeForProducts, {
      namespace: 'category',
      stateHandler: 'multi',
    });

    Reducer<AppVariation[], ProductStore>(builder, getVariationsForMainSlider, {
      namespace: 'mainSlider',
      stateHandler: 'multi',
    });

    Reducer<AppVariation[], ProductStore>(builder, getVariationsByProductId, {
      namespace: 'variations',
      stateHandler: 'multi',
    });
  },
});

export default productSlice;
export const { setProductPagination } = productSlice.actions;
