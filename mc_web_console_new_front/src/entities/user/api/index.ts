import { axiosPost, IApiResponse } from '@/shared/libs/api/request.ts';
import { AxiosResponse } from 'axios';
import { IUserResponse } from '@/entities/user/model/types.ts';

const LOGIN_URL = 'api/auth/login';

export const api = {
  getLogin,
};

async function getLogin<T extends IUserResponse, D = any>(
  id: string,
  password: string,
): Promise<IApiResponse<T>> {
  try {
    const response = await axiosPost<T, D>(LOGIN_URL, { id, password }, {});
    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: e as string,
    };
  }
}
