import { useLocalStorage } from '@/shared/libs/access-localstorage';
import { IUserResponse } from '@/entities';
import { useAuthStore } from '@/shared/libs/store/auth';

const LOGIN_AUTH = 'LOGIN_AUTH';

// session을 store에 넣음
// - store에 유저정보와 토큰을 넣음
// - api 요청할때마다 access_token을 넣고 진행.
export function useAuth() {
  const sessionUser =
    useLocalStorage<Pick<IUserResponse, 'access_token' | 'role'>>(LOGIN_AUTH);

  const authStore = useAuthStore();

  function setUser(props: IUserResponse & { id: string }) {
    const userData = {
      id: props.id,
      role: props.role,
      access_token: props.access_token,
      expires_in: props.expires_in,
    };

    sessionUser.setItem(userData);
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
