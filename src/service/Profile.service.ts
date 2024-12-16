import axios, { AxiosResponse } from 'axios';

import { User } from '@src/core/Authentication/model';
import { ChangePasswordContext, UserDocuments, UserProfile } from '@src/model/Profile.model';
import { ContactGroups } from '@src/shared/models';

export const getUserDocuments = async (): Promise<UserDocuments[]> => {
  try {
    const res: AxiosResponse<{ data: UserDocuments[] }> = await axios.get('/users/profile/documents?per_page=100');

    return res.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateUserProfile = async (values: UserProfile): Promise<User> => {
  try {
    const res: AxiosResponse<{ data: User }> = await axios.put('/users/profile/edit', values);

    return res.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const changeUserPassword = async (values: ChangePasswordContext): Promise<User> => {
  try {
    const res: AxiosResponse<{ data: User }> = await axios.put('/users/profile/change-password', values);

    return res.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const setUserInvoiceAddress = async (invoice_contact_group_id: number): Promise<ContactGroups> => {
  try {
    const res: AxiosResponse<{ data: ContactGroups }> = await axios.put('/users/profile/change-invoice-contact-group', {
      invoice_contact_group_id,
    });

    return res.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
