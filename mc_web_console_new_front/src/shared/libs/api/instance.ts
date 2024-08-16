import axios from 'axios';
import { useAuthStore } from '@/shared/libs/store/auth';

// const url = 'http://mcmpdemo.csesmzc.com:3000';
const url = '/api';

const createInstance = () => {
  return axios.create({
    baseURL: `${url}`,
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const axiosInstance = createInstance(); //http://localhost:3000/test

axiosInstance.interceptors.request.use(config => {
  const authStore = useAuthStore();
  const token = authStore.access_token;

  if (token) config.headers.Authorization = `Bearer ${authStore.access_token}`;

  return config;
});
