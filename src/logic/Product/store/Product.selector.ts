import { RootState } from '@src/core/Configs/StoreConfiguration';
import { AppCategory } from '@src/model/Category.model';
import { AppProduct } from '@src/model/Product.model';
import { AppVariation } from '@src/model/Variation.model';
import { GlobalListStore, PaginationContext } from '@src/shared/models';

type CategoryState = GlobalListStore<AppCategory>;
type VariationState = GlobalListStore<AppVariation>;
type ProductState = GlobalListStore<AppProduct> & { pagination: PaginationContext };

export const getProducts = (state: RootState): ProductState => state.product.products;
export const getCategories = (state: RootState): CategoryState => state.product.category;
export const getMainVariations = (state: RootState): VariationState => state.product.mainSlider;
export const getProductVariations = (state: RootState): VariationState => state.product.variations;

export default { getProducts, getCategories, getMainVariations, getProductVariations };
