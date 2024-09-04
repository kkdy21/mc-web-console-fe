<script setup lang="ts">
import { VPCListTable } from '@/widgets/cloudResources';
import { VPCInformation } from '@/widgets/cloudResources';
import { VPCInformationTableType } from '@/entities';
import { ref, Ref } from 'vue';

const toolboxTableItem = [
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidrBlock: '10.33.0.0/15',
    provider: 'AWS',
    connection: 'Connectionname01',
  },
  {
    vpcName: 'vpcname-aws-northeast-1',
    description: 'Generated Resource',
    cidrBlock: '10.33.2.0/15',
    provider: 'Google',
    connection: 'conn2',
  },
  {
    vpcName: 'vpcname-aws-northwest-2',
    description: 'Default Resource',
    cidrBlock: '10.33.1.0/15',
    provider: 'Azure',
    connection: 'conn1',
  },
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidrBlock: '10.33.0.0/15',
    provider: 'AWS',
    connection: 'Connectionname01',
  },
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidrBlock: '10.33.0.0/15',
    provider: 'NHN',
    connection: 'Connectionname01',
  },
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidrBlock: '10.33.0.0/15',
    provider: 'AWS',
    connection: 'Connectionname01',
  },
  {
    vpcName: 'vpcname-aws-northeast-1',
    description: 'Generated Resource',
    cidrBlock: '10.33.2.0/15',
    provider: 'Google',
    connection: 'conn2',
  },
  {
    vpcName: 'vpcname-aws-northwest-2',
    description: 'Default Resource',
    cidrBlock: '10.33.1.0/15',
    provider: 'Azure',
    connection: 'conn1',
  },
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidrBlock: '10.33.0.0/15',
    provider: 'AWS',
    connection: 'Connectionname01',
  },
  {
    vpcName: 'vpcname-aws-northeast-2',
    description: 'Generated Default Resource',
    cidrBlock: '10.33.0.0/15',
    provider: 'NHN',
    connection: 'Connectionname01',
  },
];

const selectedRow: Ref<Partial<Record<VPCInformationTableType, any>>> = ref({});

const handleSelectRow = (
  selectedData: Record<VPCInformationTableType, any>,
) => {
  selectedRow.value = selectedData || {};
};
</script>

<template>
  <div class="vpc-page-layout">
    <header>
      <p class="title">VPC</p>
    </header>
    <section>
      <v-p-c-list-table
        :table-items="toolboxTableItem"
        @selectRow="handleSelectRow"
      />
      <v-p-c-information :table-items="selectedRow" />
    </section>
  </div>
</template>

<style scoped lang="postcss">
.vpc-page-layout {
  padding: 1.5rem 1.5625rem;
  .title {
    font-size: 1.5rem;
    margin-bottom: 1.375rem;
  }
}
</style>
