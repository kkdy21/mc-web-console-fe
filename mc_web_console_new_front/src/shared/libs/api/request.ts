import { IStringIdx } from '@/shared/types';
import { AxiosResponse } from 'axios';
import { Ref, ref } from 'vue';
import { axiosInstance } from '@/shared/libs/api/instance.ts';
import { useAuthStore } from '@/shared/libs/store/auth';

export function axiosGet<T>(url: string, params?: IStringIdx) {
  return axiosInstance.get<T>(`${url}`, {
    ...params,
  });
}

export function axiosPost<T, D = any>(
  url: string,
  data: D,
  params?: IStringIdx,
) {
  return axiosInstance.post<T>(`/${url}`, data, {
    ...params,
  });
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface IUseAsyncReturnType<T, D> {
  isLoading: Ref<boolean>;
  status: Ref<AsyncStatus>;
  data: Ref<T | null>;
  error: Ref<Error | null>;
  errorMsg: Ref<string | null>;
  execute: (payload?: D) => Promise<void>;
  reset: () => void;
}

export function useAsync<T, D = any>(
  apiCall: (payload?: D) => Promise<AxiosResponse<T>>,
): IUseAsyncReturnType<T, D> {
  const isLoading: Ref<boolean> = ref(false);
  const data: Ref<T | null> = ref(null);
  const error: Ref<Error | null> = ref(null);
  const errorMsg: Ref<string | null> = ref(null);
  const status: Ref<AsyncStatus> = ref<AsyncStatus>('idle');

  const execute = async (payload?: D) => {
    isLoading.value = true;
    status.value = 'loading';
    try {
      const result = payload ? await apiCall(payload) : await apiCall();
      data.value = result.data;
      status.value = 'success';
    } catch (e: any) {
      error.value = e;
      errorMsg.value = extractErrorMessage(e);
      status.value = 'error';
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

// 서버 응답에서 에러 메시지를 처리하기 위한 함수
function extractErrorMessage(error: any): string {
  if (error.response) {
    // 서버가 반환한 에러 응답에서 메시지 추출
    const errorData = error.response.data;
    if (errorData.responseData?.error) {
      return errorData.responseData.error;
    }
    if (errorData.status?.message) {
      return errorData.status.message;
    }
    return errorData.message || error.message || 'Unknown error occurred';
  } else if (error.request) {
    // 요청은 되었으나 서버로부터 응답이 없음
    return 'No response received from server';
  } else {
    // 요청 설정 중에 문제가 발생한 경우
    return error.message || 'Error in setting up request';
  }
}

export function useAxiosGet<T>(url: string, params: IStringIdx = {}) {
  const authStore = useAuthStore();
  params = Object.assign(params, {
    headers: { Authorization: `Bearer ${authStore.access_token}` },
  });

  return useAsync<T>(() => axiosGet<T>(url, params));
}

export function useAxiosPost<T, D>(
  url: string,
  data: D,
  params: IStringIdx = {},
) {
  const authStore = useAuthStore();
  params = Object.assign(params, {
    headers: { Authorization: `Bearer ${authStore.access_token}` },
  });

  return useAsync<T, D>(payload =>
    axiosPost<T, D>(url, payload || data, params),
  );
}
