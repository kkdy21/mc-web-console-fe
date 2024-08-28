<script setup lang="ts">
import {
  PHorizontalLayout,
  PDynamicLayout,
  PButton,
} from '@cloudforet-test/mirinae';
import { onMounted, reactive, Ref, ref, watch } from 'vue';
import { getUserList } from '@/entities';
import { useDynamicLayoutModel } from '@/shared/hooks/dynamic/dynamic-layout/useDynamicLayoutModel.ts';
import {
  DynamicLayout,
  DynamicLayoutFetchOptions,
  QuerySearchTableOptions,
  SearchDataType,
  SearchEnums,
  SearchKeyOptions,
} from '@/shared/hooks/dynamic/dynamic-layout/types.ts';

const tableModel = useDynamicLayoutModel();

const getUserList = () => {
  return [
    {
      name: 'Van',
      userid: 'emailid@megazone.co.kr',
      description: 'description',
      company: 'Megazone',
      department: 'OneCloud Dev',
      approved: { state: true, data: 'Datatemp' },
    },
    {
      name: 'testName',
      userid: 'emailid@megazone.co.kr',
      description: 'description',
      company: 'Megazone',
      department: 'OneCloud Dev',
      approved: { state: false, data: 'name' },
    },
  ];
};
tableModel.tableState.items = getUserList();
tableModel.tableState.options = {
  fields: [
    { key: 'userid', name: 'User Id', type: 'text' },
    {
      key: 'name',
      name: 'Name',
      type: 'text',
    },
    { key: 'description', name: 'Description', type: 'text' },
    { key: 'company', name: 'Company', type: 'text' },
    { key: 'department', name: 'Department', type: 'text' },
    { key: 'approved', name: 'Approved', type: 'text' },
  ],
  default_sort: { key: 'userid', desc: false },
};

const handleFetch = (e: any) => {
  // sortBy, sortDesc, pageStart
  console.log(e);

  if (e.queryTags) {
    tableModel.tableState.items = tableModel.tableState.items.filter(row => {
      console.log(row);
      return e.queryTags.every(queryTag => {
        console.log(queryTag);
        return row[queryTag.key.key]
          .toUpperCase()
          .includes(queryTag.value.name.toUpperCase());
      });
    });
  } else {
    tableModel.tableState.items = getUserList();
  }

  if (e.sortBy && e.sortDesc) {
    tableModel.tableSort(e.sortBy, e.sortDesc);
  }
};
const keyItemSet = [
  // name: 'Van',
  //   userid: 'emailid@megazone.co.kr',
  //   description: 'description',
  //   company: 'Megazone',
  //   department: 'OneCloud Dev',
  //   approved: { state: true, data: 'Datatemp' },

  {
    title: 'columns',
    items: [
      { key: 'userid', label: 'User Id' },
      {
        key: 'name',
        label: 'Name',
      },
      { key: 'description', label: 'Description' },
      { key: 'company', label: 'Company' },
      { key: 'department', label: 'Department' },
    ],
  },
];

// p-toolbox-table으로 넘기는 옵션이 type-options
</script>

<template>
  <div>
    <p-horizontal-layout :height="400" :minHeight="400" :maxHeight="1000">
      <template #container="{ height }">
        <p-dynamic-layout
          type="query-search-table"
          :data="tableModel.tableState.items"
          :options="tableModel.tableState.options"
          :type-options="{
            loading: false,
            selectable: true,
            colCopy: false,
            settingsVisible: true,
            sortable: true,
            keyItemSets: keyItemSet,
          }"
          @fetch="handleFetch"
          @select="() => {}"
          :style="{ height: `${height}px` }"
          :filed-handler="() => {}"
        >
          <template #toolbox-left>
            <p-button style-type="secondary" icon-right="ic_external-link">
              test
            </p-button>
          </template>
          <template #col-approved-format="{ item }">
            <div>test!!!{{ item.approved.state }}</div>
          </template>
        </p-dynamic-layout>
      </template>
    </p-horizontal-layout>
  </div>
</template>

<style scoped lang="postcss"></style>
