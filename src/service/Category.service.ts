import { SortOrder } from '@shared/models';
import { ApiBuilder } from '@shared/utils';
import { ProductCategory } from '@src/model/Category.model';

const TreeAPI = new ApiBuilder<ProductCategory>('/product-categories/tree');

const getCategoryTree = async (): Promise<ProductCategory[]> => {
  return (await TreeAPI.getAll({ params: { orderBy: { sort: SortOrder.DESC } } })).data;
};

export default { getCategoryTree };
