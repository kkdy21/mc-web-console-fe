import { AuthorizationType } from '@/entities';

export interface ILoginData {
  role: AuthorizationType;
  autoLogin: boolean;
}
