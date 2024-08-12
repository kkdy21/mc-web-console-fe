export interface IApiState<T> {
  loading?: boolean;
  success?: boolean;
  error?: Error | null;
  data?: T | null;
}

export interface IAxiosResponse<T> {
  responseData?: T;
  status?: {
    code: number;
    message: string;
  };
}
