import { Basket, FinalBasket, FinalizedBasket } from '@src/model/Basket.model';
import { ApiBuilder } from '@src/shared/utils';

const BASKET_KEY = 'baskets';
const API = new ApiBuilder<FinalizedBasket>('/basket');

export const addBasketToStorage = (baskets: Basket[]): void => {
  localStorage.setItem(BASKET_KEY, JSON.stringify(baskets));
};

export const getBasketFromStorage = async (): Promise<Basket[]> => {
  try {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem(BASKET_KEY) ?? '[]') as Basket[]);
    });
  } catch {
    return [];
  }
};

export const emptyCart = (): void => {
  localStorage.removeItem(BASKET_KEY);
};

export const finalizeBasket = async ({ items }: FinalBasket): Promise<FinalizedBasket | undefined> => {
  try {
    return await API.request<FinalizedBasket, FinalBasket>({
      method: 'POST',
      body: { items },
      url: '/basket/bulk-add',
    });
  } catch (e) {
    throw new Error(e);
  }
};
