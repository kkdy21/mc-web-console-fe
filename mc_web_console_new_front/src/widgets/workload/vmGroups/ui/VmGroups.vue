<script setup lang="ts">
import { PButton, PSelectCard, PToolbox } from '@cloudforet-test/mirinae';
import { useVmGroupsTableModel } from '@/widgets/workload/vmGroups/model';
import { useGetVmGroup } from '@/entities/vmgroups/api';
import { onBeforeMount, onMounted, watch } from 'vue';
import { showErrorMessage } from '@/shared/utils';

interface IProps {
  nsId: string;
  mciId: string;
}

const props = defineProps<IProps>();

const { vmGroupsTableModel, vmGroupStore, getServerGroup } =
  useVmGroupsTableModel();

const resVmGroups = useGetVmGroup(props);
const selected = [];

watch(props, nv => {
  resVmGroups
    .execute({ pathParams: nv })
    .then(res => {
      if (res.data.responseData?.output) {
        const organizeVmGroups = res.data.responseData.output.map(id => id);
        vmGroupStore.setVmGroups(organizeVmGroups);
      }
    })
    .catch(e => {
      showErrorMessage('Error', e.errorMsg);
    });
});

onBeforeMount(() => {
  vmGroupsTableModel.initState();
});

onMounted(() => {
  console.log('test!');
  vmGroupStore.setVmGroups([{ id: 'test1' }, { id: 'test2' }, { id: 'test3' }]);
});
</script>

<template>
  <div>
    <p-toolbox :pageSizeChangeable="false">
      <template #left-area>
        <p-button style-type="tertiary" icon-left="ic_plus_bold">
          Add Server
        </p-button>
      </template>
    </p-toolbox>
    <div class="w-full overflow p-8 flex flex-wrap">
      <p-select-card
        v-for="(value, index) in vmGroupsTableModel.tableState.displayItems"
        multi-selectable
        :value="value"
        v-model="selected"
        style="
          min-width: 10rem;
          max-width: 10rem;
          min-height: 10rem;
          max-height: 10rem;
          margin: 1rem;
        "
      >
        <template #default="scope">
          {{ scope }}
        </template>
      </p-select-card>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
