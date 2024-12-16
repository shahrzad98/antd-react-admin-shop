import { Env } from '@src/core';
import { notification } from 'antd';
import axios, { AxiosRequestHeaders } from 'axios';

const configAxios = () => {
  axios.interceptors.request.use(function (config: AxiosRequestHeaders) {
    const language = 'en';
    const isPanel = window.location?.pathname?.includes('/admin');

    config.baseURL = Env.BASE_URL;
    config.headers['X-PANEL'] = isPanel;
    config.headers['HTTP_ACCEPT_LANGUAGE'] = language;

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        notification.error({
          message: 'Session Timeout',
          description: 'Your Session Has Been Ended, Please Login Again.',
        });
        const evt = new CustomEvent('LogoutUser', { detail: 'Logout User Because Of Unauthorized Error' });
        window.dispatchEvent(evt);
      } else if (error.response && (error.response.status === 422 || error.response.status === 400)) {
        const errors = error.response.data;
        Object.keys(errors).forEach((key) => {
          if (errors[key].message) {
            notification.error({ message: 'UnProcessable Error', description: errors[key].message, duration: 12 });
          } else {
            errors[key].forEach((message) => {
              notification.error({ message: 'Validation Error', description: message, duration: 12 });
            });
          }
        });
      } else {
        notification.error({
          message: `Network Error`,
          description: 'The request encountered an error, Check your internet connection and Try Again.',
        });
      }
      throw new Error(error);
    },
  );
};

configAxios();
