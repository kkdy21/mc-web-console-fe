<script setup lang="ts">
import { VPCListTable } from '@/widgets/cloudResources';
import { VPCInformation } from '@/widgets/cloudResources';
import { VPCInformationTableType } from '@/entities';
import { onMounted, ref, Ref, watch } from 'vue';
import { i18n } from '@/app/i18n';
import { useGetAllVPCs } from '@/entities';
import { vpcStore } from '@/shared/libs';
import { storeToRefs } from 'pinia';

const vpcStoreInstance = vpcStore.useVpcStore();

const { allVPCsList } = storeToRefs(vpcStoreInstance);

const resGetAllVPCs = useGetAllVPCs<any, null | { nsId: string }>(null);

const toolboxTableItem = ref<any[]>([]);

// [
//   {
//     vpcName: 'vpcname-aws-northeast-1',
//     description: 'Generated Resource',
//     cidrBlock: '10.33.2.0/15',
//     provider: 'Google',
//     connection: 'conn2',
//   },
//   {
//     vpcName: 'vpcname-aws-northwest-2',
//     description: 'Default Resource',
//     cidrBlock: '10.33.1.0/15',
//     provider: 'Azure',
//     connection: 'conn1',
//   },
//   {
//     vpcName: 'vpcname-aws-northeast-2',
//     description: 'Generated Default Resource',
//     cidrBlock: '10.33.0.0/15',
//     provider: 'AWS',
//     connection: 'Connectionname01',
//   },
//   {
//     vpcName: 'vpcname-aws-northeast-2',
//     description: 'Generated Default Resource',
//     cidrBlock: '10.33.0.0/15',
//     provider: 'NHN',
//     connection: 'Connectionname01',
//   },
//   {
//     vpcName: 'vpcname-aws-northeast-2',
//     description: 'Generated Default Resource',
//     cidrBlock: '10.33.0.0/15',
//     provider: 'AWS',
//     connection: 'Connectionname01',
//   },
//   {
//     vpcName: 'vpcname-aws-northwest-2',
//     description: 'Default Resource',
//     cidrBlock: '10.33.1.0/15',
//     provider: 'Azure',
//     connection: 'conn1',
//   },
//   {
//     vpcName: 'vpcname-aws-northeast-2',
//     description: 'Generated Default Resource',
//     cidrBlock: '10.33.0.0/15',
//     provider: 'NHN',
//     connection: 'Connectionname01',
//   },
// ]

onMounted(async () => {
  const response = await resGetAllVPCs.execute({
    pathParams: {
      nsId: 'ns01',
    },
  });
  const { vNet } = response.data.responseData;

  vNet.forEach(v => {
    const { cspVNetName, description, cidrBlock, connectionName, id } = v;

    toolboxTableItem.value.push({
      vpcName: id,
      description,
      cidrBlock,
      provider: 'AWS',
      connection: connectionName,
    });
  });
});

watch(
  () => [toolboxTableItem, allVPCsList],
  () => {
    vpcStoreInstance.setAllVPCsList(toolboxTableItem.value);
  },
);

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
      <p class="title">{{ i18n.t('CLOUD_RESOURCES.VPC._NAME') }}</p>
    </header>
    <section>
      <v-p-c-list-table
        :table-items="toolboxTableItem"
        @selectRow="handleSelectRow"
      />
      <p
        v-if="!Object.keys(selectedRow).length"
        class="flex justify-center text-gray-300 text-sm font-normal"
      >
        Select an item for more details.
      </p>
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
