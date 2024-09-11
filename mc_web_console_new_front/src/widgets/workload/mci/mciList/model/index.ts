import { useToolboxTableModel } from '@/shared/hooks/table/toolboxTable/useToolboxTableModel.ts';
import { IMci, McisTableType, useMCIStore } from '@/entities/mci/model';
import { watch } from 'vue';
import { IVm } from '@/entities/vm/model';

export function useMCiListTableModel() {
  const mciTableModel =
    useToolboxTableModel<Partial<Record<McisTableType, any>>>();

  const mciStore = useMCIStore();

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

  function organizeResponseMciList(mciRes: IMci) {
    const organizedDatum: Partial<Record<McisTableType | 'originalData', any>> =
      {
        name: mciRes.name,
        description: mciRes.description,
        alias: mciRes.alias || '',
        status: mciRes.status || '',
        provider: getCloudProvider(mciRes.vm),
        countTotal: mciRes.statusCount.countTotal || '',
        countRunning: mciRes.statusCount.countRunning || '',
        countSuspended: mciRes.statusCount.countSuspended || '',
        countTerminated: mciRes.statusCount.countTerminated || '',
        originalData: mciRes,
      };

    return organizedDatum;
  }

  function getCloudProvider(vms: IVm[]) {
    const provider: { [key: string]: any } = {};

    vms.forEach(vm => {
      const { providerName } = vm.connectionConfig;
      if (providerName) {
        provider[providerName] ||= {};
      }
    });

    console.log(provider);
    return provider;
  }

  watch(mciStore.mcis, nv => {
    mciTableModel.tableState.items = nv.map(value =>
      organizeResponseMciList(value),
    );
    mciTableModel.handleChange(null);
  });

  return {
    mciTableModel,
    initToolBoxTableModel,
    mciStore,
  };
}
