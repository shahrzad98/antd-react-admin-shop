import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Analytics, ConfigData, ConfigForPartner } from '@src/model/Main.model';
import { ContactGroups, Country, GlobalListStore, GlobalSingleStore, Language } from '@src/shared/models';
import { Reducer } from '@src/shared/utils/reducer.service';

import {
  getAnalyticsForShop,
  getAppCountries,
  getAppLanguages,
  getConfigPartnerFromConfigData,
  getConfigsDataForApp,
  getUserContactGroups,
} from '../controller/Main.controller';

export type MainStore = {
  countries: GlobalListStore<Country>;
  languages: GlobalListStore<Language>;
  config: GlobalSingleStore<ConfigData>;
  analytics: GlobalSingleStore<Analytics>;
  contactGroups: GlobalListStore<ContactGroups>;
  configPartner: GlobalSingleStore<ConfigForPartner>;
};

const initialState: MainStore = {
  config: {
    item: null,
    error: null,
    isPending: false,
  },
  configPartner: {
    item: null,
    error: null,
    isPending: false,
  },
  contactGroups: {
    items: [],
    error: null,
    isPending: false,
  },
  analytics: {
    item: null,
    error: null,
    isPending: false,
  },
  countries: {
    items: [],
    error: null,
    isPending: false,
  },
  languages: {
    items: [],
    error: null,
    isPending: false,
  },
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addContactGroup(state, action: PayloadAction<ContactGroups>) {
      state.contactGroups.items = [action.payload, ...state.contactGroups.items];
    },
  },
  extraReducers: (builder) => {
    Reducer<ConfigData, MainStore>(builder, getConfigsDataForApp, {
      namespace: 'config',
      stateHandler: 'single',
    });

    Reducer<Country[], MainStore>(builder, getAppCountries, {
      namespace: 'countries',
      stateHandler: 'multi',
    });

    Reducer<Language[], MainStore>(builder, getAppLanguages, {
      namespace: 'languages',
      stateHandler: 'multi',
    });

    Reducer<ContactGroups[], MainStore>(builder, getUserContactGroups, {
      namespace: 'contactGroups',
      stateHandler: 'multi',
    });

    Reducer<Analytics, MainStore>(builder, getAnalyticsForShop, {
      namespace: 'analytics',
      stateHandler: 'single',
    });

    Reducer<ConfigForPartner, MainStore>(builder, getConfigPartnerFromConfigData, {
      namespace: 'configPartner',
      stateHandler: 'single',
    });
  },
});

export default mainSlice;
export const { addContactGroup } = mainSlice.actions;
