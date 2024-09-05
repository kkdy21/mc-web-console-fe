<script setup lang="ts">
import {
  PHorizontalLayout,
  PToolboxTable,
  PButton,
  PBadge,
  PI,
  PDivider,
  PSelectStatus,
} from '@cloudforet-test/mirinae';
import { useToolboxTableModel } from '@/shared/hooks/table/toolboxTable/useToolboxTableModel';
import { VPCInformationTableType } from '@/entities';
import { computed, onMounted, reactive, ref } from 'vue';
import { insertDynamicComponent } from '@/shared/utils';
import { VPCCreateModal } from '../../vpcCreateModal';
import { vpcStore } from '@/shared/libs';
import { VPCListTableBottomFilter } from '@/features/cloudResources';
import { storeToRefs } from 'pinia';
import { toLower } from 'lodash';

const vpcStoreInstance = vpcStore.useVpcStore();

const { createVpcModalVisible } = storeToRefs(vpcStoreInstance);

interface Props {
  tableItems: Partial<Record<VPCInformationTableType, any>>[];
}

const props = defineProps<Props>();
const emit = defineEmits(['selectRow']);

const tableModel =
  useToolboxTableModel<Partial<Record<VPCInformationTableType, any>>>();

tableModel.tableState.items = props.tableItems;
tableModel.tableState.sortedItems = tableModel.tableState.items;

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
  NHN: {
    color: '#125DE6',
  },
};

const providerStatusSet = [
  {
    key: 'All',
    label: 'All',
  },
  {
    key: 'AWS',
    label: 'AWS',
  },
  {
    key: 'Google',
    label: 'Google',
  },
  {
    key: 'Azure',
    label: 'Azure',
  },
  {
    key: 'NHN',
    label: 'NHN',
  },
  {
    key: 'Other',
    label: 'Other',
  },
];

tableModel.tableState.fields = [
  {
    name: 'vpcName',
    label: 'VPC Name',
  },
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'cidrBlock',
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

tableModel.querySearchState.keyItemSet = [
  {
    title: 'columns',
    items: [
      {
        name: 'vpcName',
        label: 'VPC Name',
      },
      {
        name: 'description',
        label: 'Description',
      },
      {
        name: 'cidrBlock',
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
    ],
  },
];

const toolboxTable = ref(null);
const isOpenedModal = ref(false);

const state = reactive({
  displayItems: computed(() => {
    return tableModel.tableState.displayItems;
  }),
});

const handleSelectedIndex = (index: number) => {
  const selectedData = tableModel.tableState.sortedItems[index];
  emit('selectRow', selectedData);
};

const handleCreateVpc = () => {
  vpcStoreInstance.setCreateVpcModalVisible(true);
};

onMounted(function () {
  tableModel.handleChange(null);
});
</script>

<template>
  <div>
    <p-horizontal-layout :height="400" :min-hieght="400" :max-height="1000">
      <template #container="{ height }">
        <p-toolbox-table
          ref="toolboxTable"
          :loading="tableModel.tableState.loading"
          :items="tableModel.tableState.displayItems"
          :fields="tableModel.tableState.fields"
          :total-count="tableModel.tableState.tableCount"
          :style="{ height: `${height}` }"
          :sortable="tableModel.tableOptions.sortable"
          :sort-by="tableModel.tableOptions.sortBy"
          :selectable="tableModel.tableOptions.selectable"
          :multi-select="tableModel.tableOptions.multiSelect"
          :search-type="tableModel.tableOptions.searchType"
          :key-item-sets="tableModel.querySearchState.keyItemSet"
          :value-handler-map="tableModel.querySearchState.valueHandlerMap"
          :query-tag="tableModel.querySearchState.queryTag"
          :select-index.sync="tableModel.tableState.selectIndex"
          :page-size="tableModel.tableOptions.pageSize"
          @change="tableModel.handleChange"
          @refresh="() => {}"
          @select="handleSelectedIndex"
        >
          <template #toolbox-left>
            <p-button
              style-type="primary"
              icon-left="ic_plus_bold"
              @click="handleCreateVpc"
            >
              Create
            </p-button>
          </template>
          <template #toolbox-bottom>
            <p-divider />
            <v-p-c-list-table-bottom-filter
              :provider-status-set="providerStatusSet"
              :table-model="tableModel"
            />
          </template>
          <template #col-provider-format="{ value, item }">
            <p-badge
              v-if="providers[value]"
              :background-color="providers[value].color"
              text-color="white"
            >
              {{ item.provider }}
            </p-badge>
          </template>
        </p-toolbox-table>
      </template>
    </p-horizontal-layout>
    <v-p-c-create-modal v-if="createVpcModalVisible" />
  </div>
</template>
