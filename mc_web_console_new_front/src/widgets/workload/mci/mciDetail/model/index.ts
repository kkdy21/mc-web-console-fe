import { IDefineTableField } from '@/shared/hooks/table/toolboxTable/types.ts';
import { McisTableType } from '@/entities/mci/model';

export function useMciDetailModel() {
  const detailTableField: Array<IDefineTableField<McisTableType>> = [
    { label: 'Name', name: 'name' },
    { label: 'Description', name: 'description' },
    { label: 'Type', name: 'type' },
    { label: 'Status', name: 'status' },
    { label: 'Action', name: 'action' },
    { label: 'Provider', name: 'provider' },
    { label: 'Deployment Algorithm', name: 'deploymentAlgorithm' },
  ];

  //TODO 여기서 MCIS Provider가공 등 작업.

  return { detailTableField };
}
