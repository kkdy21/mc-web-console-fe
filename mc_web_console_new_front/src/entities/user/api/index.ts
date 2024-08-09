import { axiosPost } from '@/shared/libs/api/request.ts';

const LOGIN_URL = 'api/auth/login';

export const api = {
  getLogin,
};

async function getLogin<T, D = any>(id: string, password: string) {
  try {
    return await axiosPost<T, D>(LOGIN_URL, { id, password }, {});
  } catch (e) {
    console.error(e);
  }
}
