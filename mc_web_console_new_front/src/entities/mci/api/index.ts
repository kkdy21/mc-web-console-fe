import {
  IAxiosResponse,
  RequestBodyWrapper,
  useAxiosPost,
} from '@/shared/libs';
import { IMci } from '@/entities/mci/model';

interface IMciRequestParams {
  nsId: string;
  mciId: string;
}

const GET_ALL_MCI = 'GetAllMci';
const GET_MCI_INFO = 'GetMci';

export function useGetMciList(
  projectId: Pick<IMciRequestParams, 'nsId'> | null,
) {
  const requestBodyWrapper: Required<
    Pick<
      RequestBodyWrapper<Pick<IMciRequestParams, 'nsId'> | null>,
      'pathParams'
    >
  > = {
    pathParams: {
      nsId: projectId,
    },
  };

  return useAxiosPost<
    IAxiosResponse<IMci[]>,
    Required<
      Pick<
        RequestBodyWrapper<Pick<IMciRequestParams, 'nsId'> | null>,
        'pathParams'
      >
    >
  >(GET_ALL_MCI, requestBodyWrapper);
}

export function useGetMciInfo(params: IMciRequestParams | null) {
  const requestBodyWrapper: Required<
    Pick<RequestBodyWrapper<IMciRequestParams | null>, 'pathParams'>
  > = {
    pathParams: {
      nsId: params.nsId,
      mciId: params.mciId,
    },
  };

  return useAxiosPost<
    IAxiosResponse<IMci>,
    Required<Pick<RequestBodyWrapper<IMciRequestParams | null>, 'pathParams'>>
  >(GET_MCI_INFO, requestBodyWrapper);
}
