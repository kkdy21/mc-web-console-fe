import {
  axiosPost,
  IApiResponse,
  IApiState,
} from '@/shared/libs/api/request.ts';
import { AxiosResponse } from 'axios';
import { IUserResponse } from '@/entities/user/model/types.ts';
import { onMounted, ref } from 'vue';

const LOGIN_URL = 'api/auth/login';

export const api = {
  useGetLogin,
};

export function useGetLogin<T extends IUserResponse, D = any>(
  id: string,
  password: string,
) {
  const res = useAjaxWrapper(() =>
    axiosPost<T, D>(LOGIN_URL, { id, password }, {}),
  );
  return res.value;
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
      httpState.value.success = true;
      httpState.value.error = e.message || e.toString();
    }
  };

  executeApiCall();

  return httpState;
}

// export function useGetLogin<T extends IUserResponse, D = any>(
//     id: string,
//     password: string,
// ) {
//   const httpState = ref<IApiState<T>>({
//     loading: true,
//     success: false,
//     error: null,
//     data: null,
//   });
//
//   axiosPost<T, D>(LOGIN_URL, { id, password }, {}).then(res => {
//     try {
//       httpState.value.loading = false;
//       httpState.value.success = true;
//       httpState.value.data = res.data;
//     } catch (e) {
//       httpState.value.loading = false;
//       httpState.value.success = true;
//       httpState.value.error = e;
//     }
//   });
//
//   return httpState;
// }
