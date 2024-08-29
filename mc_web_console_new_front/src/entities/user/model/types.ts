export interface IValidationResult {
  isValid: boolean;
  message?: string | null;
}

export interface IUser {
  id: string;
  password: string;
}

export interface IUserResponse {
  role: string;
  access_token?: string;
  expires_in?: number;
  refresh_expires_in?: number;
  refresh_token?: string;
}

export type UserInformationTableType =
  | 'userId'
  | 'name'
  | 'description'
  | 'company'
  | 'department'
  | 'group'
  | 'approved'
  | 'callInvite'
  | 'receiveInvite'
  | 'defaultRoles';
