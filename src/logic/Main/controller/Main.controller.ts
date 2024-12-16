import { storeState } from '@config/StoreConfiguration';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Analytics, ConfigData, ConfigForPartner } from '@src/model/Main.model';
import MainService from '@src/service/Main.service';
import { ContactGroups, Country, Language } from '@src/shared/models';

export const getAppCountries = createAsyncThunk('Config/Contries', async () => {
  return await new Promise<Country[]>((resolve, reject) => {
    if (storeState().main.countries.items.length !== 0) {
      resolve(storeState().main.countries.items as Country[]);
    } else {
      MainService.getCountries()
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    }
  });
});

export const getAppLanguages = createAsyncThunk('Config/Languages', async () => {
  return await new Promise<Language[]>((resolve, reject) => {
    if (storeState().main.languages.items.length !== 0) {
      resolve(storeState().main.languages.items as Language[]);
    } else {
      MainService.getLanguages()
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    }
  });
});

export const getConfigsDataForApp = createAsyncThunk('Config/Get', async () => {
  return await new Promise<ConfigData>((resolve, reject) => {
    if (storeState().main.config.item) {
      resolve(storeState().main.config.item as ConfigData);
    } else {
      MainService.getConfigs()
        .then((data) => {
          resolve(data);
        })
        .catch((e) => reject(e));
    }
  });
});

export const getUserContactGroups = createAsyncThunk('Config/ContactGroups', async () => {
  return await new Promise<ContactGroups[]>((resolve, reject) => {
    if (storeState().main.contactGroups.items.length !== 0) {
      resolve(storeState().main.contactGroups.items as ContactGroups[]);
    } else {
      MainService.getAddresses()
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    }
  });
});

export const getConfigPartnerFromConfigData = createAsyncThunk('Config/GetPartner', async (config: ConfigData) => {
  return await new Promise<ConfigForPartner>((resolve) => {
    if (!storeState().main.configPartner.item) {
      const {
        saleSystem: { partner, partner_detail, email, phone },
      } = config;

      resolve({ name: partner, description: partner_detail, email, phone });
    } else {
      resolve(storeState().main.configPartner.item as ConfigForPartner);
    }
  });
});

export const getAnalyticsForShop = createAsyncThunk('Config/GetAnalytics', async () => {
  return await new Promise<Analytics>((resolve, reject) => {
    if (!storeState().main.analytics.item) {
      MainService.getAnalytics()
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    } else {
      resolve(storeState().main.analytics.item as Analytics);
    }
  });
});

export default {
  getAppLanguages,
  getAppCountries,
  getAnalyticsForShop,
  getConfigsDataForApp,
  getUserContactGroups,
  getConfigPartnerFromConfigData,
};
