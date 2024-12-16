import axios, { AxiosResponse } from 'axios';

import { ChangePasswordIProps, Login, LoginForm, RegisterForm, User } from '../model';

export async function loginUser(values: LoginForm): Promise<Login> {
  try {
    const response: AxiosResponse<{ data: Login }> = await axios.post('/login', values);

    localStorage.setItem('token', response.data.data.token);
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function registerUser(values: RegisterForm): Promise<Login> {
  try {
    const response: AxiosResponse<{ data: Login }> = await axios.post('/register', values);

    localStorage.setItem('token', response.data.data.token);
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUserProfile(): Promise<User> {
  try {
    const response: AxiosResponse<{ data: User }> = await axios.get('/users/profile');
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await axios.get('/logout');
  } catch (e) {
    throw new Error(e);
  }
}

export async function sendResetPasswordEmail(values: { email: string }): Promise<Login> {
  try {
    const response: AxiosResponse<{ data: Login }> = await axios.post('/reset-password', values);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function changePassword(values: ChangePasswordIProps): Promise<Login> {
  try {
    const response: AxiosResponse<{ data: Login }> = await axios.post('/reset-password/change-password', values);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
