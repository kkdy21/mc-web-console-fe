<script setup lang="ts">
import { PDataTable, PPaneLayout } from '@cloudforet-test/mirinae';

const fields = [
  {
    name: 'vpcName',
    label: 'VPC Name',
  },
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'cidr',
    label: 'CIDR Block',
  },
  {
    name: 'provider',
    label: 'Provider',
  },
  {
    name: 'connection',
    label: 'Connection',
  },
];

const items = [
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidr: '10.33.0.0/15',
    provider: 'AWS',
    connection: 'Connectionname01',
  },
  {
    vpcName: 'vpcname-aws-northeast-1',
    description: 'Generated Resource',
    cidr: '10.33.2.0/15',
    provider: 'Google',
    connection: 'conn2',
  },
  {
    vpcName: 'vpcname-aws-northwest-2',
    description: 'Default Resource',
    cidr: '10.33.1.0/15',
    provider: 'Azure',
    connection: 'conn1',
  },
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidr: '10.33.0.0/15',
    provider: 'AWS',
    connection: 'Connectionname01',
  },
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidr: '10.33.0.0/15',
    provider: 'AWS',
    connection: 'Connectionname01',
  },
];
</script>

<template>
  <div>
    <p class="px-4 mb-4 font-bold font-lg">Non Invisible Case</p>
    <p-pane-layout class="datatable-layout">
      <!-- TODO: Toolbox (create button, search input, pagination) -->
      <p-data-table :fields="fields" :items="items" selectable col-copy />
    </p-pane-layout>
  </div>
</template>

<style scoped lang="postcss">
.datatable-layout {
  padding: 1.5rem 2rem;
}
</style>
