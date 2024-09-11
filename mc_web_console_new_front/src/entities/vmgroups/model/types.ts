export interface IServerGroupsResponse {
  output: IVmGroup[];
}

export interface IVmGroup {
  id: string;
}

export type ServerGroupTableType = 'id';
