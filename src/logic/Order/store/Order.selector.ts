import { RootState } from '@src/core/Configs/StoreConfiguration';
import { OrderSale } from '@src/model/Order.model';
import { GlobalListStore, GlobalSingleStore } from '@src/shared/models';

const getOrders = (state: RootState): GlobalListStore<OrderSale> => state.order.orders;

const getLatestOrder = (state: RootState): GlobalSingleStore<OrderSale> => state.order.latestOrder;

export default { getLatestOrder, getOrders };
