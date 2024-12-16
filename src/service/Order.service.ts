import { ApiBuilder } from '@shared/utils';

import { FinalOrder, OrderSale } from '@src/model/Order.model';
import { PaginationContext, SortOrder } from '@src/shared/models';

const API = new ApiBuilder<OrderSale>('order-sale');
export const finalizeOrder = async (order: FinalOrder): Promise<{ orderSale: OrderSale; paymentLink: string }> => {
  return await API.request<{ orderSale: OrderSale; paymentLink: string }, FinalOrder>({
    body: order,
    method: 'POST',
    url: 'order-sales/basket',
  });
};

const getAllOrders = async (
  page: number,
  per_page: number,
): Promise<{ data: OrderSale[]; pagination: PaginationContext }> => {
  const result = await API.getAll({
    params: { orderBy: { id: SortOrder.DESC } },
    pagination: { page, per_page },
  });
  return { data: result.data, pagination: result.meta };
};

const getOrder = async (order_id: number): Promise<OrderSale | undefined> => {
  return (await API.getOne(order_id)) ?? undefined;
};

export default { finalizeOrder, getAllOrders, getOrder };
