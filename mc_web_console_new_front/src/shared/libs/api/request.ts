import { IStringIdx } from '@/shared/types';
import { AxiosResponse } from 'axios';
import { ref, UnwrapRef } from 'vue';
import { IApiState } from '@/shared/libs/api/types.ts';
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

export function useAjaxWrapper<T>(apiCall: () => Promise<AxiosResponse<T>>) {
  const httpState = ref<IApiState<T>>({
    loading: true,
    success: false,
    error: null,
    data: null,
  });

  //서버에서 에러메세지 같이 받는법
  const executeApiCall = async () => {
    try {
      const res = await apiCall();
      httpState.value.loading = false;
      httpState.value.success = true;
      httpState.value.data = res.data as UnwrapRef<T>;
    } catch (e: any) {
      console.log(e);
      httpState.value.loading = false;
      httpState.value.success = false;
      httpState.value.error = extractErrorMessage(e);
    }
  };

  executeApiCall();

  return httpState;
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

  const res = useAjaxWrapper<T>(() => axiosGet<T>(url, params));
  return res;
}

export function useAxiosPost<T, D = any>(
  url: string,
  data: D,
  params: IStringIdx = {},
) {
  const authStore = useAuthStore();
  params = Object.assign(params, {
    headers: { Authorization: `Bearer ${authStore.access_token}` },
  });

  const res = useAjaxWrapper<T>(() => axiosPost<T, D>(url, data, params));
  return res;
}
