import {
  IAxiosResponse,
  RequestBodyWrapper,
  useAxiosPost,
} from '@/shared/libs';
import { IVm } from '@/entities/vm/model';

interface IVmRequestParams {
  nsId: string;
  mciId: string;
  vmId: string;
}

const GET_VM_Info = 'GetMciVm';

export function useGetVmInfo(params: IVmRequestParams | null) {
  const requestBodyWrapper: Required<
    Pick<RequestBodyWrapper<IVmRequestParams | null>, 'pathParams'>
  > = {
    pathParams: {
      nsId: params!.nsId,
      mciId: params!.mciId,
      vmId: params!.vmId,
    },
  };

  return useAxiosPost<
    IAxiosResponse<IVm>,
    Required<Pick<RequestBodyWrapper<IVmRequestParams | null>, 'pathParams'>>
  >(GET_VM_Info, requestBodyWrapper);
}
