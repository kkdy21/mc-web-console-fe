import {
  IAxiosResponse,
  RequestBodyWrapper,
  useAxiosPost,
} from '@/shared/libs';
import { IVmGroupResponse } from '@/entities/servergroups/model';

interface IVmGroupRequestParams {
  nsId: string;
  mciId: string;
}

const GET_ALL_VM_GROUP = 'GetMciGroupIds';

export function useGetVmGroup(props: IVmGroupRequestParams | null) {
  const requestBodyWrapper: Required<
    Pick<RequestBodyWrapper<IVmGroupRequestParams | null>, 'pathParams'>
  > = {
    pathParams: {
      nsId: props.nsId,
      mciId: props.mciId,
    },
  };

  return useAxiosPost<
    IAxiosResponse<IVmGroupResponse>,
    Required<
      Pick<RequestBodyWrapper<IVmGroupRequestParams | null>, 'pathParams'>
    >
  >(GET_ALL_VM_GROUP, requestBodyWrapper);
}
