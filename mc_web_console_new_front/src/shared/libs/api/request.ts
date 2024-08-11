import { axiosInstance } from '@/shared/libs';
import { IStringIdx } from '@/shared/types';
import { AxiosResponse } from 'axios';
import { IUserResponse } from '@/entities/user/model/types.ts';
import { ref } from 'vue';

export interface IApiState<T> {
  loading?: boolean;
  success?: boolean;
  error?: Error | null;
  data?: T | null;
}

export function axiosGet<T>(url: string, params?: IStringIdx) {
  return axiosInstance.get<T>(`${url}`, {
    params,
  });
}

export function axiosPost<T, D = any>(
  url: string,
  data: D,
  params?: IStringIdx,
) {
  return axiosInstance.post<T>(`/${url}`, data, {
    params,
  });
}

export function useAjaxWrapper<T extends IUserResponse, D = any>(
  apiCall: () => Promise<AxiosResponse<T>>,
) {
  const httpState = ref<IApiState<T>>({
    loading: true,
    success: false,
    error: null,
    data: null,
  });

  const executeApiCall = async () => {
    try {
      const res = await apiCall();
      httpState.value.loading = false;
      httpState.value.success = true;
      httpState.value.data = res.data;
    } catch (e) {
      httpState.value.loading = false;
      httpState.value.success = false;
      httpState.value.error = e.message || e.toString();
    }
  };

  executeApiCall();

  return httpState;
}

export function useAxiosPost<T extends IUserResponse, D = any>(
  url: string,
  data: D,
  params: IStringIdx = {},
) {
  const res = useAjaxWrapper(() => axiosPost<T, D>(url, data, params));
  return res.value;
}
