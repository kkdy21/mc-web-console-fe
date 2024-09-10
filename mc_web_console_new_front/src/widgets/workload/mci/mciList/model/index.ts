import { useToolboxTableModel } from '@/shared/hooks/table/toolboxTable/useToolboxTableModel.ts';
import { McisTableType } from '@/entities/mci/model';

export function useMCiListTableModel() {
  const mciTableModel =
    useToolboxTableModel<Partial<Record<McisTableType, any>>>();

  function initToolBoxTableModel() {
    mciTableModel.tableState.fields = [
      { name: 'name', label: 'Name' },
      { name: 'alias', label: 'Alias' },
      { name: 'status', label: 'Status' },
      { name: 'provider', label: 'Provider' },
      { name: 'countTotal', label: 'Total Servers' },
      { name: 'countRunning', label: 'Running' },
      { name: 'countSuspended', label: 'Suspended' },
      { name: 'countTerminated', label: 'Terminated' },
    ];

    mciTableModel.querySearchState.keyItemSet = [
      {
        title: 'columns',
        items: [
          { name: 'userid', label: 'User Id' },
          {
            name: 'name',
            label: 'Name',
          },
          { name: 'description', label: 'Description' },
          { name: 'company', label: 'Company' },
          { name: 'department', label: 'Department' },
        ],
      },
    ];
  }

  return {
    mciTableModel,
    initToolBoxTableModel,
  };
}
