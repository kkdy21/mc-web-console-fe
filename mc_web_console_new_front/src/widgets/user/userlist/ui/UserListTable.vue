<script setup lang="ts">
import {
  PHorizontalLayout,
  PToolboxTable,
  PButton,
  PStatus,
} from '@cloudforet-test/mirinae';
import { onMounted } from 'vue';
import { getUserList, tempGetUserList } from '@/entities';
import { useToolboxTableModel } from '@/shared/hooks/table/toolboxTable/useToolboxTableModel.ts';

const tableModel = useToolboxTableModel();

tableModel.tableState.items = tempGetUserList();
tableModel.tableState.sortedItems = tableModel.tableState.items;
tableModel.tableState.fields = [
  { name: 'userid', label: 'User Id' },
  { name: 'name', label: 'Name' },
  { name: 'description', label: 'Description' },
  { name: 'company', label: 'Company' },
  { name: 'department', label: 'Department' },
  { name: 'approved', label: 'Approved' },
];

tableModel.querySearchState.keyItemSet = [
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

onMounted(() => {
  tableModel.handleFetch(null);
});
</script>

<template>
  <div>
    <p-horizontal-layout :height="400" :minHeight="400" :maxHeight="1000">
      <template #container="{ height }">
        <p-toolbox-table
          :loading="tableModel.tableState.loading"
          :items="tableModel.tableState.sortedItems"
          :fields="tableModel.tableState.fields"
          :totalCount="tableModel.tableState.items.length"
          :style="{ height: `${height}px` }"
          :sortable="tableModel.tableOptions.sortable"
          :sort-by="tableModel.tableOptions.sortBy"
          :selectable="tableModel.tableOptions.selectable"
          :multi-select="tableModel.tableOptions.multiSelect"
          :search-type="tableModel.tableOptions.searchType"
          :key-item-sets="tableModel.querySearchState.keyItemSet"
          :value-handler-map="tableModel.querySearchState.valueHandlerMap"
          :query-tag="tableModel.querySearchState.queryTag"
          @changeSort="tableModel.tableSort"
          @change="tableModel.handleFetch"
          @refresh="() => {}"
        >
          <template #toolbox-left>
            <p-button style-type="primary" icon-left="ic_plus_bold">
              Add user
            </p-button>
          </template>
          <template #col-approved-format="{ item }">
            <p-status
              :icon-color="`${item.approved.state ? '#60b731' : '#C2C2C6'}`"
              :text="`${item.approved.data}`"
              :style="{ margin: '1rem' }"
            />
          </template>
        </p-toolbox-table>
      </template>
    </p-horizontal-layout>
  </div>
</template>

<style scoped lang="postcss"></style>
