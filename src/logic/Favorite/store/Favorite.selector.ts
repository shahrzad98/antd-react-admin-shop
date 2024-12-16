import { RootState } from '@src/core/Configs/StoreConfiguration';

import { FavoriteStore } from './Favorite.store';

const getAllFavorites = (state: RootState): FavoriteStore => state.favorite;

export default { getAllFavorites };
