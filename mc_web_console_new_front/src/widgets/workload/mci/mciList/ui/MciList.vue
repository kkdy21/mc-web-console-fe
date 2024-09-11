<script setup lang="ts">
import { useMCiListTableModel } from '@/widgets/workload/mci/mciList/model';
import {
  PButton,
  PHorizontalLayout,
  PToolboxTable,
} from '@cloudforet-test/mirinae';
import { useGetMciList } from '@/entities/mci/api';
import { computed, onBeforeMount, onMounted, reactive } from 'vue';
import { useMCIStore } from '@/entities/mci/model';
import { showErrorMessage } from '@/shared/utils';

const emit = defineEmits(['selectRow']);

const { mciTableModel, initToolBoxTableModel, mciStore } =
  useMCiListTableModel();

//TODO projectID 받아야함.
const resMciList = useGetMciList('ns01');

const mciCreateModalState = reactive({
  open: false,
  props: {},
});

function handleMciListFetch() {
  resMciList
    .execute()
    .then(res => {
      if (res.data.responseData) {
        mciStore.setMcis(res.data.responseData);
      }
    })
    .catch(e => {
      showErrorMessage('Error', e.errorMsg.value);
    });
}

function handleSelectedIndex(index: number[]) {
  const selectedData = mciTableModel.tableState.displayItems[index];
  emit('selectRow', selectedData.id);
}

onBeforeMount(() => {
  initToolBoxTableModel();
});

onMounted(() => {
  handleMciListFetch();
});
</script>

<template>
  <div>
    <p-horizontal-layout :height="400" :min-height="400" :max-height="1000">
      <template #container="{ height }">
        <p-toolbox-table
          ref="toolboxTable"
          :loading="
            mciTableModel.tableState.loading || resMciList.isLoading.value
          "
          :items="mciTableModel.tableState.displayItems"
          :fields="mciTableModel.tableState.fields"
          :total-count="mciTableModel.tableState.tableCount"
          :style="{ height: `${height}px` }"
          :sortable="mciTableModel.tableOptions.sortable"
          :sort-by="mciTableModel.tableOptions.sortBy"
          :selectable="mciTableModel.tableOptions.selectable"
          :multi-select="mciTableModel.tableOptions.multiSelect"
          :search-type="mciTableModel.tableOptions.searchType"
          :key-item-sets="mciTableModel.querySearchState.keyItemSet"
          :value-handler-map="mciTableModel.querySearchState.valueHandlerMap"
          :query-tag="mciTableModel.querySearchState.queryTag"
          :select-index.sync="mciTableModel.tableState.selectIndex"
          :page-size="mciTableModel.tableOptions.pageSize"
          @change="mciTableModel.handleChange"
          @refresh="handleMciListFetch"
          @select="handleSelectedIndex"
        >
          <template #toolbox-left>
            <p-button
              style-type="primary"
              icon-left="ic_plus_bold"
              @click="mciCreateModalState.open = true"
            >
              Create
            </p-button>
          </template>
        </p-toolbox-table>
      </template>
    </p-horizontal-layout>
  </div>
</template>

<style scoped lang="postcss"></style>
