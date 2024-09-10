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

  const tab = [
    { name: 'detail', label: 'Detail' },
    { name: 'server', label: 'Server' },
  ];

  return { detailTableField, tab };
}
