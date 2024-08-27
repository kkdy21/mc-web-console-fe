<script setup lang="ts">
import { PDynamicLayout } from '@cloudforet-test/mirinae';
</script>

<template>
  <div>
    <h1>Network Page</h1>
    <p-dynamic-layout
      name="Base Information 2"
      type="query-search-table"
      :options="{
        fields: [
          { key: 'id', name: 'Key (id)', type: 'text' },
          {
            key: 'test',
            name: 'Test',
            type: 'text',
            options: { postfix: ' num.' },
          },
          { key: 'basic', name: 'Basic', type: 'badge' },
          { key: 'advanced', name: 'Advanced', type: 'badge' },
        ],
        default_sort: { key: 'id', desc: false },
      }"
      :data="getAllTestBasicDataAxios"
      :type-options="{
        loading: false,
        totalCount: 0,
        timezone: 'UTC',
        selectIndex: [],
        selectable: false,
        multiSelect: true,
        invalid: false,
        colCopy: false,
        excelVisible: false,
        settingsVisible: false,
        keyItemSets: [],
        valueHandlerMap: {},
      }"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
