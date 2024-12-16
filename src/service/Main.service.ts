import { ApiBuilder } from '@shared/utils';
import axios, { AxiosResponse } from 'axios';

import { Analytics, ConfigData } from '@src/model/Main.model';
import { ContactGroups, ContactGroupsContext, Country, Language } from '@src/shared/models';

const API = new ApiBuilder<unknown>('');
export const getConfigs = async (): Promise<ConfigData> => {
  return await API.request<ConfigData>({ method: 'GET', url: '/configs/data' });
};

export const getAnalytics = async (): Promise<Analytics> => {
  try {
    const res: AxiosResponse<Analytics> = await axios.get('/settings/analytic-tags');

    return res.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAddresses = async (): Promise<ContactGroups[]> => {
  return await API.request<ContactGroups[]>({ method: 'GET', url: '/contact-groups?per_page=100' });
};

export const getCountries = async (): Promise<Country[]> => {
  return await API.request<Country[]>({ method: 'GET', url: '/countries?per_page=200&isActive=true' });
};

export const getLanguages = async (): Promise<Language[]> => {
  return await API.request<Language[]>({ method: 'GET', url: '/languages?per_page=200&isActive=true' });
};

export const createContactGroup = async (body: ContactGroupsContext): Promise<ContactGroups> => {
  return await API.request<ContactGroups>({ method: 'POST', url: '/contact-groups', body });
};

export default { getConfigs, getAddresses, getAnalytics, getCountries, getLanguages, createContactGroup };
