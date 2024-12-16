import i18n from '@src/core/i18n/config';
import { message } from 'antd';
import axios, { AxiosResponse, CancelToken } from 'axios';

import { PaginationRequest, ResponseContext } from '../models';

interface GetAllArgs {
  extra?: string;
  cancelToken?: CancelToken;
  pagination?: PaginationRequest;
  params?: Record<string, unknown>;
}

interface CustomRequest<REQ> {
  body?: REQ;
  params?: REQ;
  url: string;
  method: string;
}

export class ApiBuilder<Type> {
  public entity: string;
  public title?: string;

  constructor(entity: string, title?: string) {
    this.title = title;
    this.entity = entity;
  }

  public async request<SubType, ValueType = unknown>({
    url,
    body,
    params,
    method,
  }: CustomRequest<ValueType | SubType>): Promise<SubType> {
    try {
      method = method.toLocaleLowerCase();
      let response: AxiosResponse<{ data: SubType }>;
      if (method === 'get') response = await axios[method](`${url}`, { params });
      else response = await axios[method](`${url}`, body);

      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getAll({
    extra,
    cancelToken,
    params = {},
    pagination = {},
  }: GetAllArgs): Promise<ResponseContext<Type[]>> {
    try {
      const url = extra ? this.entity + extra : this.entity;
      const response: AxiosResponse<ResponseContext<Type[]>> = await axios.get(url, {
        cancelToken,
        params: { ...pagination, ...params },
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getOne(id: number): Promise<Type | null> {
    try {
      const response: AxiosResponse<{ data: Type }> = await axios.get(`${this.entity}/${id}`);

      return response.data.data;
    } catch {
      return null;
    }
  }

  public async createOne<T>(values: Type | T): Promise<Type | null> {
    try {
      const response: AxiosResponse<{ data: Type }> = await axios.post(this.entity, values);

      message.success(i18n.t('Global.CreatedSuccessfully', { title: this.title }));
      return response.data.data;
    } catch {
      return null;
    }
  }

  public async updateOne<T>(id: number, values: Partial<Type> | Partial<T>): Promise<Type> {
    try {
      const response: AxiosResponse<{ data: Type }> = await axios.put(`${this.entity}/${id}`, values);

      message.success(i18n.t('Global.UpdatedSuccessfully', { title: this.title }));
      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async updateToggler(id: number, toggler: boolean, url: string, dataIndex: string): Promise<Type> {
    try {
      const response: AxiosResponse<{ data: Type }> = await axios.put(`${this.entity}/${id}/${url}`, {
        [dataIndex]: toggler,
      });

      message.success(i18n.t('Global.UpdatedSuccessfully', { title: this.title }));
      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async updateProperty<T>(url: string, values: Partial<Type> | Partial<T>): Promise<Type | null> {
    try {
      const response: AxiosResponse<{ data: Type }> = await axios.put(url, values);

      message.success(i18n.t('Global.UpdatedSuccessfully', { title: this.title }));
      return response.data.data;
    } catch {
      return null;
    }
  }
}
