import { AUTO_LOGIN } from '@/shared/libs/access-localstorage/constant.ts';
import { AuthorizationType } from '@/entities/user/store/authorizationStore.ts';
import { useLocalStorage } from '@/shared/libs/access-localstorage/useLocalStorage.ts';

export { AUTO_LOGIN, type AuthorizationType, useLocalStorage };
