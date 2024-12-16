import { RootState } from '@src/core/Configs/StoreConfiguration';
import { Analytics, ConfigData, ConfigForPartner } from '@src/model/Main.model';
import { ContactGroups, Country, GlobalListStore, GlobalSingleStore, Language } from '@src/shared/models';

export const getCountries = (state: RootState): GlobalListStore<Country> => state.main.countries;
export const getLanguages = (state: RootState): GlobalListStore<Language> => state.main.languages;
export const getConfigsData = (state: RootState): GlobalSingleStore<ConfigData> => state.main.config;
export const getAnalytics = (state: RootState): GlobalSingleStore<Analytics> => state.main.analytics;
export const getContactGroups = (state: RootState): GlobalListStore<ContactGroups> => state.main.contactGroups;
export const getConfigPartner = (state: RootState): GlobalSingleStore<ConfigForPartner> => state.main.configPartner;

export default { getConfigsData, getAnalytics, getContactGroups, getCountries, getLanguages };
