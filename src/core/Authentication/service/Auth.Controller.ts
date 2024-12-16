import { createAsyncThunk } from '@reduxjs/toolkit';
import { dispatch } from '@src/core/Configs/StoreConfiguration';
import { discardBasketItems } from '@src/logic/Basket/store/Basket.store';

import { Login, LoginForm, RegisterForm } from '../model';
import { getUserProfile, loginUser, logoutUser, registerUser } from './Auth.Service';

type LoginType = { values: LoginForm; callback: (data: Login) => void };
export const loginUserToApp = createAsyncThunk('Auth/Login', async ({ values, callback }: LoginType) => {
  return await new Promise<Login>((resolve, reject) => {
    loginUser(values)
      .then((loginRes) => {
        resolve(loginRes);
        callback(loginRes);
      })
      .catch((e) => reject(e));
  });
});

type RegisterType = { values: RegisterForm; callback: (data: Login) => void };
export const registerUserInApp = createAsyncThunk('Auth/Register', async ({ values, callback }: RegisterType) => {
  return await new Promise<Login>((resolve, reject) => {
    registerUser(values)
      .then((registerRes) => {
        resolve(registerRes);
        callback(registerRes);
      })
      .catch((e) => reject(e));
  });
});

export const getUserAppProfile = createAsyncThunk('Auth/Profile', async () => {
  return await new Promise<Login>((resolve, reject) => {
    if (localStorage.getItem('token')) {
      getUserProfile()
        .then((user) => {
          resolve({ user, token: localStorage.getItem('token') as string });
        })
        .catch((e) => reject(e));
    } else {
      reject('Session Timeout');
    }
  });
});

export const logoutAppUser = createAsyncThunk('Auth/Logout', async ({ onLogout }: { onLogout?: () => void } = {}) => {
  return await new Promise<void>((resolve, reject) => {
    if (localStorage.getItem('token')) {
      dispatch(discardBasketItems());
      logoutUser()
        .then(() => {
          resolve();
          onLogout?.();
        })
        .catch((e) => reject(e))
        .finally(() => localStorage.removeItem('token'));
    } else {
      reject('Session Timeout');
    }
  });
});
