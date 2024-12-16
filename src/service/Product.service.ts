import { PaginationRequest, ResponseContext, SortOrder } from '@shared/models';
import { ApiBuilder } from '@shared/utils';

import { Product, ProductComment } from '@src/model/Product.model';
import { ProductVariation } from '@src/model/Variation.model';

  const API = new ApiBuilder<ProductVariation>('/shop/product-variations');
  const getShopVariations = async (): Promise<ProductVariation[]> => {
    return (await API.getAll({ params: { orderBy: { id: SortOrder.DESC } } })).data;
  };

const VariationAPI = new ApiBuilder<ProductVariation>('/product-variations');
const getVariationsByProduct = async (productId: number): Promise<ProductVariation[]> => {
  return (await VariationAPI.getAll({ params: { productId } })).data;
};

const ProductAPI = new ApiBuilder<Product>('/products');
type ProductCategoryReq = { pagination: PaginationRequest; productCategoryIds?: string };

const getProductsByCategory = async ({
  pagination,
  productCategoryIds,
}: ProductCategoryReq): Promise<ResponseContext<Product[]>> => {
  return await ProductAPI.getAll({
    pagination,
    params: { orderBy: { sort: SortOrder.ASC } },
    extra: productCategoryIds ? `?${productCategoryIds}` : '',
  });
};

const CommentAPI = new ApiBuilder<ProductComment>('/comments');
export const getVariationComments = async (productVariationId: number): Promise<ProductComment[]> => {
  try {
    return (await CommentAPI.getAll({ params: { productVariationId, approved: true } })).data;
  } catch (e) {
    throw new Error(e);
  }
};

export default { getShopVariations, getVariationsByProduct, getProductsByCategory, getVariationComments };
