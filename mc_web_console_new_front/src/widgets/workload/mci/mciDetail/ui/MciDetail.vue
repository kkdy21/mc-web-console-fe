<script setup lang="ts">
import { useMciDetailTableModel } from '@/widgets/workload/mci/mciDetail/model';
import { onBeforeMount, onMounted, watch } from 'vue';
import { PDefinitionTable } from '@cloudforet-test/mirinae';

interface IProps {
  selectedMciId: { mciId: string | null };
}

const props = defineProps<IProps>();
const mciDefineTableModel = useMciDetailTableModel();

watch(props.selectedMciId, nv => {
  mciDefineTableModel.setMciId(nv.mciId);
});

onBeforeMount(() => {
  mciDefineTableModel.initTable();
  mciDefineTableModel.tableModel.tableState.loading = false;
});

onMounted(() => {});
</script>

<template>
  <div>
    <p-definition-table
      :fields="mciDefineTableModel.tableModel.tableState.fields"
      :data="mciDefineTableModel.tableModel.tableState.data"
      :loading="mciDefineTableModel.tableModel.tableState.loading"
    >
    </p-definition-table>
  </div>
</template>

<style scoped lang="postcss"></style>
