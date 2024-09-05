<script setup lang="ts">
import {
  PTab,
  PDefinitionTable,
  PDataTable,
  PBadge,
  PButton,
  PI,
} from '@cloudforet-test/mirinae';
import { VPCInformationTableType } from '@/entities';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router/composables';

const router = useRouter();

interface IProps {
  tableItems: Partial<Record<VPCInformationTableType, any>>;
}

const props = defineProps<IProps>();
const isSelected = computed(() => {
  if (!props.tableItems) return false;
  return Object.values(props.tableItems).length;
});

const providers: any = {
  AWS: {
    color: '#FF9900',
  },
  Google: {
    color: '#4387F4',
  },
  Azure: {
    color: '#00BCF0',
  },
};

const tabs = [
  {
    name: 'details',
    label: 'Details',
  },
  {
    name: 'connection',
    label: 'Connection',
  },
  {
    name: 'subnets',
    label: 'Subnets',
  },
];

const defineTableField = [
  { label: 'VPC Name', name: 'vpcName' },
  { label: 'Description', name: 'description' },
  { label: 'Provider', name: 'provider' },
  { label: 'CIDR Block', name: 'cidrBlock' },
  { label: 'Company', name: 'company' },
  { label: 'Workspace', name: 'workspace' },
  { label: 'Project', name: 'project' },
];

const connectionField = [
  {
    name: 'connectionName',
    label: 'Connection Name',
  },
  {
    name: 'provider',
    label: 'Provider',
  },
  {
    name: 'region',
    label: 'Region',
  },
  {
    name: 'zone',
    label: 'Zone',
  },
];

const subnetsField = [
  {
    name: 'subnetName',
    label: 'Subnet Name',
  },
  {
    name: 'cidrBlock',
    label: 'CIDR Block',
  },
];

const tabState = reactive({
  activeTab: 'details',
});

const handleSubnetPage = () => {
  router.push({
    name: 'vpcSubnets',
  });
};
</script>

<template>
  <div v-if="isSelected">
    <p-tab v-model="tabState.activeTab" :tabs="tabs">
      <template #details>
        <div class="tab-section-header">
          <p>VPC Information</p>
        </div>
        <p-definition-table
          :fields="defineTableField"
          :data="props.tableItems"
          :loading="false"
          style-type="primary"
          :block="false"
        />
      </template>
      <template #connection>
        <div class="tab-section-header">
          <p>Connection</p>
        </div>
        <p-data-table
          :fields="connectionField"
          :items="[
            {
              connectionName: 'Connectionname01',
              provider: 'AWS',
              region: 'northeast-1',
              zone: 'ap-northeast-1a',
            },
          ]"
        >
          <template #col-provider-format="{ value, item }">
            <p-badge
              v-if="providers[value]"
              :background-color="providers[value].color"
              text-color="white"
            >
              {{ item.provider }}
            </p-badge>
          </template>
        </p-data-table>
      </template>
      <template #subnets>
        <div class="tab-section-header">
          <p>Subnets</p>
          <p-button
            icon-left="ic_edit"
            style-type="tertiary"
            @click="handleSubnetPage"
          >
            Edit
          </p-button>
        </div>
        <p-data-table
          :fields="subnetsField"
          :items="[
            {
              subnetName: 'subnetname-aws-northeast-1',
              cidrBlock: '10.33.0.0/15',
            },
          ]"
        />
      </template>
    </p-tab>
  </div>
</template>

<style scoped lang="postcss">
.tab-section-header {
  padding: 2rem 1rem 1.5rem 1rem;
  margin-top: 0.625rem;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 1.5rem;
    font-weight: 400;
  }
}
</style>
