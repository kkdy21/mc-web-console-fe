import { IVm } from '@/entities/vm/model';

export interface IMci extends IVm, IMciStatus {
  id: string;
  name: string;
  alias: string;
  vm: IVm[];
}

export interface IMciStatus {
  status: string;
  statusCount: {
    countTotal: number;
    countRunning: number;
    countSuspended: number;
    countTerminated: number;
  };
}
