import { useLocalStorage } from '@/shared/libs/access-localstorage';
import { IUserResponse, useAuthStore } from '@/entities';

const LOGIN_AUTH = 'LOGIN_AUTH';

// session을 store에 넣음
// - store에 유저정보와 토큰을 넣음
// - api 요청할때마다 access_token을 넣고 진행.
export function useAuth() {
  const sessionUser =
    useLocalStorage<
      Pick<IUserResponse, 'refresh_token' | 'access_token' | 'role'>
    >(LOGIN_AUTH);

  const authStore = useAuthStore();

  function setUser(props: IUserResponse & { id: string }) {
    sessionUser.setItem(props);
    authStore.onLogin(props);
  }

  function getUser(): Omit<
    IUserResponse,
    'expires_in' | 'refresh_expires_in'
  > & {
    id: string;
    role: string;
    isLogin: boolean;
  } {
    return authStore.$state;
  }

  return { sessionUser, setUser, getUser };
}
