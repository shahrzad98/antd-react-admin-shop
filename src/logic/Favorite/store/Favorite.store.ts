import { createSlice } from '@reduxjs/toolkit';
import { Favorite } from '@src/model/Favorite.model';
import { GlobalListStore } from '@src/shared/models';
import { Reducer } from '@src/shared/utils/reducer.service';

import { addProductToFavorites, getAllFavorites, removeProductFromFavorites } from '../controller/Favorite.controller';

export type FavoriteStore = GlobalListStore<Favorite>;

const initialState: FavoriteStore = {
  items: [],
  error: null,
  isPending: false,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    Reducer<Favorite[], FavoriteStore>(builder, getAllFavorites, {
      stateHandler: 'multi',
    });

    Reducer<number, FavoriteStore>(builder, addProductToFavorites, {
      stateHandler: (state, action) => {
        if (action.payload !== -1) state.items.push({ product_id: action.payload as number });
        return state;
      },
    });

    Reducer<number, FavoriteStore>(builder, removeProductFromFavorites, {
      stateHandler: (state, action) => {
        if (action.payload !== -1)
          state.items.splice(state.items.findIndex((fav) => fav.product_id === (action.payload as number)) ?? -1, 1);
        return state;
      },
    });
  },
});

export default favoriteSlice;
