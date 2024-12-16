import { createAsyncThunk } from '@reduxjs/toolkit';

import { FinalOrder, OrderSale } from '@src/model/Order.model';
import OrderService from '@src/service/Order.service';
import { PaginationContext } from '@src/shared/models';

export const finalizeOrder = createAsyncThunk(
  'Orders/Finalize',
  async ({
    order,
    onFinish,
  }: {
    order: FinalOrder;
    onFinish: ({ paymentLink, orderSaleId }: { paymentLink: string; orderSaleId: number }) => void;
  }) => {
    return await new Promise<OrderSale | undefined>((resolve, reject) => {
      OrderService.finalizeOrder(order)
        .then(({ orderSale, paymentLink }) => {
          resolve(orderSale);
          onFinish({ paymentLink, orderSaleId: orderSale.id });
        })
        .catch((e) => reject(e));
    });
  },
);

export const getOrdersForOrderList = createAsyncThunk(
  'Orders/GetAll',
  async ({ page = 1, per_page = 10 }: { page?: number; per_page?: number }) => {
    return await new Promise<{ data: OrderSale[]; pagination: PaginationContext }>((resolve, reject) => {
      OrderService.getAllOrders(page, per_page)
        .then((orderSale) => {
          resolve(orderSale);
        })
        .catch((e) => reject(e));
    });
  },
);

export const getOrder = createAsyncThunk('Orders/Get', async (order_id: number) => {
  return await new Promise<OrderSale | undefined>((resolve, reject) => {
    OrderService.getOrder(order_id)
      .then((orderSale) => {
        resolve(orderSale);
      })
      .catch((e) => reject(e));
  });
});

export default { finalizeOrder, getOrdersForOrderList, getOrder };
