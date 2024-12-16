import { createAsyncThunk } from '@reduxjs/toolkit';

import { Env } from '@src/core';
import { dispatch, storeState } from '@src/core/Configs/StoreConfiguration';
import { AppProduct, Product, ProductPrices } from '@src/model/Product.model';
import ProductService from '@src/service/Product.service';
import { Currency, PaginationRequest, ResponseContext } from '@src/shared/models';

import { setProductPagination } from '../store/Product.store';

type PriceType = { priceValue: number; unitPrice: number; currency: Currency };
type ProductCategoryReq = { pagination: PaginationRequest; productCategoryIds?: string };

export const getProductsForCategory = createAsyncThunk(
  'Products/GetAllByCategory',
  async ({ pagination, productCategoryIds }: ProductCategoryReq) => {
    return await new Promise<AppProduct[]>((resolve, reject) => {
      const profile = storeState().auth.profile;

      ProductService.getProductsByCategory({ pagination, productCategoryIds })
        .then((res: ResponseContext<Product[]>) => {
          dispatch(setProductPagination(res.meta));
          resolve(
            res.data.map((product: Product) => {
              const { priceValue, unitPrice, currency } = calculateProductPrice(
                product.prices,
                product.default_vat,
                profile.discount_ratio,
              );
              return {
                currency,
                unitPrice,
                priceValue,
                unit: 'L',
                id: product.id,
                name: product.name,
                image: Env.PURE_URL + product.file,
                priceVisible: product.price_visible,
              };
            }),
          );
        })
        .catch((e) => reject(e));
    });
  },
);

const calculateProductPrice = (prices: ProductPrices[], vat: number, userDiscount: number): PriceType => {
  const priceVatPercentage = (vat ?? 0) / 100;
  const userDiscountPercentage = (userDiscount ?? 0) / 100;
  const price = prices.find((item) => item.priceType.name === 'sale_price') ?? {
    value: 0,
    unit_price: 0,
    currency: { iso2: 'DE', iso3: 'EUR' } as Currency,
  };

  const priceValue = (price.value - price.value * userDiscountPercentage) * (1 + priceVatPercentage);
  const unitPrice = (price.unit_price - price?.unit_price * userDiscountPercentage) * (1 + priceVatPercentage);

  return { priceValue, unitPrice, currency: price.currency };
};

export default { getProductsForCategory };
