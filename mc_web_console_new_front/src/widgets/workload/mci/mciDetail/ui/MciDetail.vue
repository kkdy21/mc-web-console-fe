<script setup lang="ts">
import { useMciDetailModel } from '@/widgets/workload/mci/mciDetail/model';
import { onBeforeMount, onMounted, watch, PropType } from 'vue';
import { PDefinitionTable } from '@cloudforet-test/mirinae';

interface IProps {
  selectedMciId: { mciId: string | null };
}

const props = defineProps<IProps>();
const mciDefineModel = useMciDetailModel();

watch(props.selectedMciId, nv => {
  mciDefineModel.setMciId(nv.mciId);
});

onBeforeMount(() => {
  mciDefineModel.initTable();
  mciDefineModel.tableModel.tableState.loading = false;
});

onMounted(() => {});
</script>

<template>
  <div>
    <p-definition-table
      :fields="mciDefineModel.tableModel.tableState.fields"
      :data="mciDefineModel.tableModel.tableState.data"
      :loading="mciDefineModel.tableModel.tableState.loading"
    >
    </p-definition-table>
  </div>
</template>

<style scoped lang="postcss"></style>
