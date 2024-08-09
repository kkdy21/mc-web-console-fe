import { axiosInstance } from '@/shared/libs';
import { IStringIdx } from '@/shared/types';
import { AxiosResponse } from 'axios';

export function axiosGet(url: string, params?: IStringIdx) {
  return axiosInstance.get(`${url}`, { params });
}

export function axiosPost<T, D = any>(
  url: string,
  data: D,
  params?: IStringIdx,
): Promise<AxiosResponse<T>> {
  return axiosInstance.post(`/${url}`, data, { params });
}
