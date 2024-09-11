import { useToolboxTableModel } from '@/shared/hooks/table/toolboxTable/useToolboxTableModel.ts';
import { watch } from 'vue';
import {
  ServerGroupTableType,
  useVmGroupStore,
} from '@/entities/vmgroups/model';
import { storeToRefs } from 'pinia';

export function useVmGroupsTableModel() {
  const vmGroupsTableModel =
    useToolboxTableModel<Partial<Record<ServerGroupTableType, any>>>();

  const vmGroupStore = useVmGroupStore();
  const { vmGroups } = storeToRefs(vmGroupStore);

  function getServerGroup(id: string) {
    return vmGroupStore.loadVmGroupById(id);
  }

  watch(vmGroups, nv => {
    console.log(nv);
    vmGroupsTableModel.tableState.items = nv;
    vmGroupsTableModel.tableState.sortedItems =
      vmGroupsTableModel.tableState.items;
    vmGroupsTableModel.handleChange(null);

    console.log(vmGroupsTableModel.tableState.displayItems);
  });

  return {
    vmGroupsTableModel,
    vmGroupStore,
    getServerGroup,
  };
}
