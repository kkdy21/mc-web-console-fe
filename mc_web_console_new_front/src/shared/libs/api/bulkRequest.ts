import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Ref, ref } from 'vue';
import { axiosInstance } from '@/shared/libs/api/instance.ts';
import {
  AsyncStatus,
  extractErrorMessage,
  IUseAxiosErrorDetail,
  IUseBulkAxiosWrapperReturnType,
} from '@/shared/libs';

export function axiosBulkPost<T, D extends Array<unknown> = any>(
  url: string,
  data: D,
  config?: AxiosRequestConfig,
) {
  const promiseArr = data.map(datum =>
    axiosInstance.post<T>(`/${url}`, datum, config),
  );
  return axios.all(promiseArr);
}

function useAxiosWrapper<T, D = any>(
  apiCall: (
    payload?: D,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<T>[]>,
): IUseBulkAxiosWrapperReturnType<T, D> | IUseAxiosErrorDetail {
  const isLoading: Ref<boolean> = ref(false);
  const data: Ref<T[] | null> = ref(null); // T[]로 정의
  const error: Ref<Error | null> = ref(null);
  const errorMsg: Ref<string[] | null> = ref(null);
  const status: Ref<AsyncStatus> = ref<AsyncStatus>('idle');

  const execute = async (
    payload?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T[]> | IUseAxiosErrorDetail> => {
    // T[]로 수정
    isLoading.value = true;
    status.value = 'loading';
    let result;
    try {
      result = await apiCall(payload, config);
      reset();
      data.value = result.map(res => res.data); // T[]로 저장
      status.value = 'success';
      return Promise.resolve(result);
    } catch (e: any) {
      reset();
      error.value = e;
      errorMsg.value = extractErrorMessage(e);
      status.value = 'error';
      return Promise.reject<IUseAxiosErrorDetail>({ error, errorMsg, status });
    } finally {
      isLoading.value = false;
    }
  };

  const reset = () => {
    isLoading.value = false;
    status.value = 'idle';
    data.value = null;
    error.value = null;
    errorMsg.value = null;
  };

  return {
    isLoading,
    data,
    error,
    errorMsg,
    status,
    reset,
    execute,
  };
}

export function useAxiosBulkPost<T, D extends Array<unknown>>(
  url: string,
  data: D,
  initialConfig: AxiosRequestConfig = {},
) {
  return useAxiosWrapper<T[], D>((payload, dynamicConfig) => {
    const mergedConfig = {
      ...initialConfig,
      ...dynamicConfig,
    };
    return axiosBulkPost<T, D>(url, payload || data, mergedConfig);
  });
}
