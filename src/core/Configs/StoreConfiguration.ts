import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '@src/logic';

export const store = configureStore({
  reducer: shopReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const dispatch = store.dispatch;
export const storeState = store.getState;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
