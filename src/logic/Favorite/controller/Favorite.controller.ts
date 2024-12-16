import { createAsyncThunk } from '@reduxjs/toolkit';
import { Favorite } from '@src/model/Favorite.model';
import FavoriteService from '@src/service/Favorite.service';

export const addProductToFavorites = createAsyncThunk('Favorites/Add', async (productVariationId: number) => {
  return await new Promise<number>((resolve, reject) => {
    FavoriteService.addFavorite({ product_id: productVariationId })
      .then((isSuccess) => {
        resolve(isSuccess ? productVariationId : -1);
      })
      .catch((e) => reject(e));
  });
});

export const removeProductFromFavorites = createAsyncThunk('Favorites/Remove', async (productVariationId: number) => {
  return await new Promise<number>((resolve, reject) => {
    FavoriteService.removeFavorite(productVariationId)
      .then((isSuccess) => {
        resolve(isSuccess ? productVariationId : -1);
      })
      .catch((e) => reject(e));
  });
});

export const getAllFavorites = createAsyncThunk('Favorites/GetAll', async () => {
  return await new Promise<Favorite[]>((resolve, reject) => {
    FavoriteService.getAllFavorites()
      .then((favorites) => {
        resolve(favorites);
      })
      .catch((e) => reject(e));
  });
});

export default { addProductToFavorites, removeProductFromFavorites, getAllFavorites };
