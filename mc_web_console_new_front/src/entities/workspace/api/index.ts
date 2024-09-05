import { useAxiosPost } from '@/shared/libs/api/request.ts';
import { IAxiosResponse, RequestBodyWrapper } from '@/shared/libs';
import {
  IWorkspaceData,
  IWorkspaceDeleteData,
  IWorkspaceDetailData,
} from '@/entities/workspace/model/types.ts';

const DELETE_WORKSPACE_BY_ID = 'deleteworkspaceuserrolemapping';
const GET_WORKSPACELIST_BY_ID = 'GetWorkspaceUserRoleMappingListByUserId';
const GET_WORKSPACELIST = 'GetWorkspaceList';

export function useDeleteWorkspaceById(
  deleteData: IWorkspaceDeleteData | null,
) {
  const requestBodyWrapper: Required<
    Pick<RequestBodyWrapper<IWorkspaceDeleteData | null>, 'pathParams'>
  > = {
    pathParams: deleteData,
  };
  return useAxiosPost<
    IAxiosResponse<{ message: string }>,
    Required<
      Pick<RequestBodyWrapper<IWorkspaceDeleteData | null>, 'pathParams'>
    >
  >(DELETE_WORKSPACE_BY_ID, requestBodyWrapper);
}

export function useGetWorkspaceListById(userId: string | null) {
  const requestBodyWrapper: Required<
    Pick<RequestBodyWrapper<{ userId: string | null }>, 'pathParams'>
  > = {
    pathParams: { userId },
  };

  return useAxiosPost<
    IAxiosResponse<IWorkspaceDetailData[]>,
    Required<Pick<RequestBodyWrapper<{ userId: string | null }>, 'pathParams'>>
  >(GET_WORKSPACELIST_BY_ID, requestBodyWrapper);
}

export function useGetWorkspaceList() {
  return useAxiosPost<IAxiosResponse<IWorkspaceData[]>, null>(
    GET_WORKSPACELIST,
    null,
  );
}
