import { axiosInstance } from '@/shared/libs';
import { IStringIdx } from '@/shared/types';
import { AxiosResponse } from 'axios';
import { IUserResponse } from '@/entities/user/model/types.ts';
import { ref } from 'vue';

// Q: return을 axios로 하는 이유?
// A : 결국 Promise로 반환되서 나오기 때문에. 에러 처리를 여기서도 할수있고 실제 사용하는 곳에서 할수도 있게 유연하게 할수있어서.
// 리턴을 response.data로 하면 런타임과정에서 에러가 안나나?

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
