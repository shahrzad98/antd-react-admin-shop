import { Favorite } from '@src/model/Favorite.model';

const FAVORITE_KEY = 'favorites';

const addAllFavorites = async (favorites: Favorite[]): Promise<boolean> => {
  try {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
    return true;
  } catch {
    return false;
  }
};

const addFavorite = async (favorite: Favorite): Promise<boolean> => {
  try {
    const favorites = await getAllFavorites();
    favorites.push(favorite);
    return await addAllFavorites(favorites);
  } catch {
    return false;
  }
};

const removeFavorite = async (id: number): Promise<boolean> => {
  try {
    const favorites = await getAllFavorites();
    favorites.splice(favorites.findIndex((fav) => fav.product_id === id) ?? -1, 1);
    return await addAllFavorites(favorites);
  } catch {
    return false;
  }
};

const getAllFavorites = async (): Promise<Favorite[]> => {
  try {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem(FAVORITE_KEY) ?? '[]') as Favorite[]);
    });
  } catch {
    return [];
  }
};

export default { getAllFavorites, removeFavorite, addFavorite };
