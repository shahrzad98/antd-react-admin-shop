import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@src/core/Authentication/service/Auth.store';

import basketSlice from './Basket/store/Basket.store';
import favoriteSlice from './Favorite/store/Favorite.store';
import legalSlice from './Legal/store/Legal.store';
import mainSlice from './Main/store/Main.store';
import orderSlice from './Order/store/Order.store';
import paymentMethodSlice from './PaymentMethod/store/PaymentMethod.store';
import productSlice from './Product/store/Product.store';
import socialMediaSlice from './SocialMedia/store/SocialMedia.store';
import templateSlice from './Template/store/Template.store';

export default combineReducers({
  auth: authSlice.reducer,
  basket: basketSlice.reducer,
  favorite: favoriteSlice.reducer,
  legal: legalSlice.reducer,
  main: mainSlice.reducer,
  order: orderSlice.reducer,
  payments: paymentMethodSlice.reducer,
  product: productSlice.reducer,
  socialMedia: socialMediaSlice.reducer,
  template: templateSlice.reducer,
});
