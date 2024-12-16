import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Login, User } from '../model';
import { getUserAppProfile, loginUserToApp, logoutAppUser, registerUserInApp } from './Auth.Controller';

export type AuthSotre = {
  profile: User;
  isPending: boolean;
  token: string | null;
  error: string | null;
};

const initialState: AuthSotre = {
  token: null,
  error: null,
  isPending: false,
  profile: {} as User,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfileToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    setUserProfile(state, action: PayloadAction<User>) {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserToApp.pending, (state: AuthSotre) => {
      state.isPending = true;
    });
    builder.addCase(loginUserToApp.fulfilled, (state: AuthSotre, action) => {
      const loginData: Login = action.payload;

      state.isPending = false;
      state.token = loginData.token;
      state.profile = loginData.user;
    });
    builder.addCase(loginUserToApp.rejected, (state: AuthSotre) => {
      state.isPending = false;
      state.error = 'Error In Getting Data';
    });

    builder.addCase(registerUserInApp.pending, (state: AuthSotre) => {
      state.isPending = true;
    });
    builder.addCase(registerUserInApp.fulfilled, (state: AuthSotre, action) => {
      const registerData: Login = action.payload;

      state.isPending = false;
      state.token = registerData.token;
      state.profile = registerData.user;
    });
    builder.addCase(registerUserInApp.rejected, (state: AuthSotre) => {
      state.isPending = false;
      state.error = 'Error In Getting Data';
    });

    builder.addCase(getUserAppProfile.pending, (state: AuthSotre) => {
      state.isPending = true;
    });
    builder.addCase(getUserAppProfile.fulfilled, (state: AuthSotre, action) => {
      const { user, token }: Login = action.payload;

      state.token = token;
      state.profile = user;
      state.isPending = false;
    });
    builder.addCase(getUserAppProfile.rejected, (state: AuthSotre) => {
      state.token = null;
      state.isPending = false;
      state.profile = {} as User;
      state.error = 'Error In Getting Data';
    });

    builder.addCase(logoutAppUser.pending, (state: AuthSotre) => {
      state.isPending = true;
    });
    builder.addCase(logoutAppUser.fulfilled, (state: AuthSotre) => {
      state.token = null;
      state.isPending = false;
      state.profile = {} as User;
    });
    builder.addCase(logoutAppUser.rejected, (state: AuthSotre) => {
      state.token = null;
      state.isPending = false;
      state.profile = {} as User;
      state.error = 'Error In Getting Data';
    });
  },
});

export default authSlice;
export const { setProfileToken, setUserProfile } = authSlice.actions;
