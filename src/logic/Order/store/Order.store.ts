import { createSlice } from '@reduxjs/toolkit';

import { OrderSale } from '@src/model/Order.model';
import { GlobalListStore, GlobalSingleStore, PaginationContext } from '@src/shared/models';
import { Reducer } from '@src/shared/utils/reducer.service';

import { finalizeOrder, getOrder, getOrdersForOrderList } from '../controller/Order.controller';

export type OrderStore = { orders: GlobalListStore<OrderSale>; latestOrder: GlobalSingleStore<OrderSale> };

const initialState: OrderStore = {
  orders: {
    items: [],
    error: null,
    isPending: false,
    pagination: undefined,
  },
  latestOrder: {
    item: null,
    error: null,
    isPending: false,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    Reducer<{ data: OrderSale[]; pagination: PaginationContext }, OrderStore>(builder, getOrdersForOrderList, {
      namespace: 'orders',
      stateHandler: (state, action) => {
        state.orders.items = action.payload['data'];
        state.orders.pagination = action.payload['pagination'];

        return state;
      },
    });

    Reducer<OrderSale | undefined, OrderStore>(builder, finalizeOrder, {
      namespace: 'latestOrder',
      stateHandler: 'single',
    });

    Reducer<OrderSale | undefined, OrderStore>(builder, getOrder, {
      namespace: 'latestOrder',
      stateHandler: 'single',
    });
  },
});

export default orderSlice;
