import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { McmpRouter } from '@/app/providers/router';
import { AUTH_ROUTE } from '@/pages/auth/auth.route.ts';
import JwtTokenProvider from '@/shared/libs/token';
// const url = 'http://mcmpdemo.csesmzc.com:3000';
const url = import.meta.env.VITE_BACKEND_ENDPOINT;
const createInstance = () => {
  return axios.create({
    baseURL: `${url}`,
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const axiosInstance = createInstance();

axiosInstance.interceptors.request.use(config => {
  const { access_token } = JwtTokenProvider.getProvider().getTokens();

  if (access_token) config.headers.Authorization = `Bearer ${access_token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
      error.config || {};

    if (error.response?.status === 405 && !originalRequest._retry) {
      originalRequest._retry = true;

      const jwtTokenProvider: JwtTokenProvider = JwtTokenProvider.getProvider();
      const { refresh_token } = jwtTokenProvider.getTokens();

      if (!refresh_token) {
        McmpRouter.getRouter()
          .push({ name: AUTH_ROUTE.LOGIN._NAME })
          .catch(() => {});
      }

      const resLogin = await jwtTokenProvider.refreshTokens();

      if (
        resLogin.data.responseData?.refresh_token &&
        resLogin.data.responseData?.access_token
      ) {
        jwtTokenProvider.setTokens({
          refresh_token: resLogin.data.responseData?.refresh_token,
          access_token: resLogin.data.responseData?.access_token,
        });
      }
    }
    return Promise.reject(error);
  },
);
