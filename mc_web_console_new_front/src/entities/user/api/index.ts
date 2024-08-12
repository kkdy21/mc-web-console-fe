import { useAxiosPost } from '@/shared/libs/api/request.ts';

// const LOGIN_URL = 'api/auth/login';

const LOGIN_URL = 'api/auth/login';

export function useGetLogin<T, D>(loginData: D) {
  interface RequestWrapper<D> {
    request: D;
  }

  const requestWrapper: RequestWrapper<D> = {
    request: loginData,
  };
  const res = useAxiosPost<T, RequestWrapper<D>>(LOGIN_URL, requestWrapper, {});
  return res;
}
