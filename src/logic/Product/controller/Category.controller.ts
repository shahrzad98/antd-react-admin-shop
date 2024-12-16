import { storeState } from '@config/StoreConfiguration';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppCategory, ProductCategory } from '@src/model/Category.model';
import CategoryService from '@src/service/Category.service';

export const getCategoryTreeForProducts = createAsyncThunk('Products/GetAllDenominations', async () => {
  return await new Promise<AppCategory[]>((resolve, reject) => {
    const items = storeState().product.category.items;

    if (items.length > 0) {
      resolve(items as AppCategory[]);
    } else {
      CategoryService.getCategoryTree()
        .then((categories: ProductCategory[]) => {
          resolve(
            categories.map((category: ProductCategory) => ({
              title: category.name,
              key: String(category.id),
              children: category.children.map((c) => getChildrenContext(c)),
            })),
          );
        })
        .catch((e) => reject(e));
    }
  });
});

const getChildrenContext = (category: ProductCategory): AppCategory => ({
  title: category.name,
  key: String(category.id),
  children: category.children.length === 0 ? [] : category.children.map((c) => getChildrenContext(c)),
});

export default { getCategoryTreeForProducts };
