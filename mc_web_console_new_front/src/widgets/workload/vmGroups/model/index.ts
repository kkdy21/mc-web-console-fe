import { useToolboxTableModel } from '@/shared/hooks/table/toolboxTable/useToolboxTableModel.ts';
import { reactive, ref, watch } from 'vue';
import {
  ServerGroupTableType,
  useVmGroupStore,
} from '@/entities/vmgroups/model';
import { storeToRefs } from 'pinia';
import { useGetVmGroup } from '@/entities/vmgroups/api';
import { showErrorMessage } from '@/shared/utils';

export function useVmGroupsModel<T>(props: T) {
  const cardState = reactive({
    cardData: [],
    selected: [],
  });

  const vmGroupStore = useVmGroupStore();
  const { vmGroups } = storeToRefs(vmGroupStore);
  const resVmGroups = useGetVmGroup(props);

  function getServerGroupById(id: string) {
    return vmGroupStore.loadVmGroupById(id);
  }

  function organizeCardData() {
    return vmGroups.value.map(vmGroup => {
      return {
        name: vmGroup.id,
        label: vmGroup.id,
      };
    });
  }

  function fetchVmGroups(props) {
    resVmGroups
      .execute({ pathParams: props })
      .then(res => {
        if (res.data.responseData?.output) {
          const organizeVmGroups = res.data.responseData.output.map(id => id);
          vmGroupStore.setVmGroups(organizeVmGroups);
        }
      })
      .catch(e => {
        showErrorMessage('Error', e.errorMsg);
      });
  }

  watch(vmGroups, nv => {
    cardState.cardData = organizeCardData();
  });

  watch(props, () => {
    console.log('prop 변경');
  });

  return {
    cardState,
    vmGroupStore,
    getServerGroupById,
    fetchVmGroups,
    resVmGroups,
  };
}
