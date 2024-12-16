import { storeState } from '@config/StoreConfiguration';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Env } from '@src/core';
import { User } from '@src/core/Authentication/model';
import {
  AppVariation,
  AppVariationPrice,
  ProductVariation,
  UserVariationPrices,
  VariationPrice,
} from '@src/model/Variation.model';
import ProductService from '@src/service/Product.service';
import { Price } from '@src/shared/models';

export const getVariationsForMainSlider = createAsyncThunk('Variations/GetAllForMain', async () => {
  return await new Promise<AppVariation[]>((resolve, reject) => {
    const profile = storeState().auth.profile;
    const items = storeState().product.mainSlider.items;

    if (items.length > 0) {
      resolve(items as AppVariation[]);
    } else {
      ProductService.getShopVariations()
        .then((variations: ProductVariation[]) => {
          resolve(variations.map((variation) => convertVariationToAppVariation(profile, variation)));
        })
        .catch((e) => reject(e));
    }
  });
});

export const getVariationsByProductId = createAsyncThunk('Variations/GetByProduct', async (productId: number) => {
  return await new Promise<AppVariation[]>((resolve, reject) => {
    const profile = storeState().auth.profile;

    ProductService.getVariationsByProduct(productId)
      .then((variations: ProductVariation[]) => {
        resolve(variations.map((variation) => convertVariationToAppVariation(profile, variation)));
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
});

const convertVariationToAppVariation = (
  profile: User,
  { id, name, number, ...variation }: ProductVariation,
): AppVariation => {
  const prices = calculateVariationPrice({
    userId: profile.id,
    vat: variation.product.default_vat,
    userDiscount: profile.discount_ratio,
    prices: variation.productVariationPrices ?? [],
    userPrices: variation.userVariationPrices ?? [],
  });

  const product = {
    id: variation.product.id,
    name: variation.product.name,
    image: Env.PURE_URL + variation.product.file,
    priceVisible: variation.product.price_visible,
  };

  const availability = {
    id: variation.availability ? variation.availability.id : 0,
    name: variation.availability ? variation.availability.name : '',
    file: variation.availability ? variation.availability.file : '',
  };

  const file = variation.productVariationFiles.find((file) => file.type === 'image');
  const image = file?.link ? Env.PURE_URL + file?.link : Env.PURE_URL + file?.file;

  const files = variation.productVariationFiles.map(({ link, ...rest }) => ({
    ...rest,
    variationId: id,
    link: link ? Env.PURE_URL + link : Env.PURE_URL + rest.file,
  }));

  return {
    id,
    name,
    files,
    image,
    number,
    prices,
    product,
    availability,
    description: variation.description,
    reviewCount: variation.review_count,
    previewText: variation.preview_text,
    categories: variation.productVariationCategories,
    averageRating: variation.average_rating,
    technicalData: variation.technical_data,
    shippingProfiles: variation.shippingProfiles ?? [],
    crossSelling:
      !variation.crossSellingVariations || variation.crossSellingVariations.length === 0
        ? []
        : variation.crossSellingVariations.map((cross) => convertVariationToAppVariation(profile, cross)),
  };
};

type PriceInp = {
  vat: number;
  userId: number;
  userDiscount: number;
  prices: VariationPrice[];
  userPrices: UserVariationPrices[];
};
const calculateVariationPrice = ({ vat, prices, userPrices, userId, userDiscount }: PriceInp): AppVariationPrice => {
  const vatPercentage = (vat ?? 0) / 100;
  const userDiscountPercentage = (userDiscount ?? 0) / 100;

  const shippingPrice = prices.find((item) => item.price.id === 6) ?? {
    value: 0,
    price: { currency: { iso3: 'EUR', iso2: 'DE' } } as Price,
  };

  const vartionPrice = prices.find((item) => item.price.priceType.name === 'sale_price') ?? {
    value: 0,
    price: { currency: { iso3: 'EUR', iso2: 'DE' } } as Price,
  };

  const userVaritionPrice = userPrices.find((item) => item.user.id === userId) ?? {
    value: 0,
    price: { currency: { iso3: 'EUR', iso2: 'DE' } } as Price,
  };

  const shippingValue = shippingPrice.value ?? 0;
  const userValue = getDiscountedPrice(userVaritionPrice.value, userDiscountPercentage, vatPercentage);
  const variationValue = getDiscountedPrice(vartionPrice.value, userDiscountPercentage, vatPercentage);
  const unitValue = getDiscountedPrice(vartionPrice.price.unit_price ?? 0, userDiscountPercentage, vatPercentage);

  return { variationValue, userValue, unitValue, shippingValue, currency: vartionPrice.price.currency };
};

const getDiscountedPrice = (value: number, discount: number, vat: number): number => {
  return (value - value * discount) * (1 + vat);
};

export default { getVariationsForMainSlider, getVariationsByProductId };
