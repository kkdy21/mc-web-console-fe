<script setup lang="ts">
import {
  PHorizontalLayout,
  PToolboxTable,
  PButton,
  PStatus,
} from '@cloudforet-test/mirinae';
import { computed, onMounted, reactive, watch } from 'vue';
import {
  getUserList,
  tempGetUserList,
  UserInformationTableType,
} from '@/entities';
import { useToolboxTableModel } from '@/shared/hooks/table/toolboxTable/useToolboxTableModel.ts';
import Testui from '@/pages/account&access/users/ui/testui.vue';
import Vue from 'vue';
import { insertDynamicComponent } from '@/shared/utils/insertDynamicComponent';

interface IProps {
  tableItems: Partial<Record<UserInformationTableType, any>>[];
}

const props = defineProps<IProps>();
const emit = defineEmits(['selectRow']);
const tableModel = useToolboxTableModel();

tableModel.tableState.items = props.tableItems;
tableModel.tableState.sortedItems = tableModel.tableState.items;
tableModel.tableState.fields = [
  { name: 'userId', label: 'User Id' },
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
const handleSelectedIndex = (index: number[]) => {
  console.log(index);
  const selectedData = tableModel.tableState.sortedItems[index];
  emit('selectRow', selectedData);
};

onMounted(function () {
  tableModel.handleChange(null);

  const toolboxTable = this.$refs.toolboxTable.$el;
  const targetElement = toolboxTable.querySelector('.right-tool-group');
  const instance = insertDynamicComponent(
    Testui,
    {
      label: 'Dynamic Button',
    },
    {
      'button-click': message => {
        console.log(message); // 'Button was clicked!' 출력
      },
    },
    targetElement,
    'prepend',
  );
});
</script>

<template>
  <div>
    <p-horizontal-layout :height="400" :minHeight="400" :maxHeight="1000">
      <template #container="{ height }">
        <p-toolbox-table
          ref="toolboxTable"
          :loading="tableModel.tableState.loading"
          :items="tableModel.tableState.displayItems"
          :fields="tableModel.tableState.fields"
          :total-count="tableModel.tableState.tableCount"
          :style="{ height: `${height}px` }"
          :sortable="tableModel.tableOptions.sortable"
          :sort-by="tableModel.tableOptions.sortBy"
          :selectable="tableModel.tableOptions.selectable"
          :multi-select="tableModel.tableOptions.multiSelect"
          :search-type="tableModel.tableOptions.searchType"
          :key-item-sets="tableModel.querySearchState.keyItemSet"
          :value-handler-map="tableModel.querySearchState.valueHandlerMap"
          :query-tag="tableModel.querySearchState.queryTag"
          :select-index.sync="tableModel.tableState.selectIndex"
          @change="tableModel.handleChange"
          @refresh="() => {}"
          @select="handleSelectedIndex"
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
