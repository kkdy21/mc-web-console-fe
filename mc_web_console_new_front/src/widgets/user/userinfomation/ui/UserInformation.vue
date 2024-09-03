<script setup lang="ts">
import {
  PTab,
  PDefinitionTable,
  PBadge,
  PButton,
  PStatus,
} from '@cloudforet-test/mirinae';
import { computed, reactive } from 'vue';
import { UserInformationTableType, UserWorkspaceTableType } from '@/entities';
import {
  IDefineTableField,
  ITableField,
} from '@/shared/hooks/table/toolboxTable/types.ts';

interface IProps {
  tableItems: Partial<
    Record<UserInformationTableType | UserWorkspaceTableType, any>
  >;
}

const props = defineProps<IProps>();
const isSelected = computed(() => {
  if (!props.tableItems) return false;
  return Object.values(props.tableItems).length;
});
const tabs = [
  {
    name: 'detail',
    label: 'Detail',
  },
  {
    name: 'workspace',
    label: 'Workspace',
  },
];

const defineTableField: Array<IDefineTableField<UserInformationTableType>> = [
  { label: 'Id', name: 'userId' },
  { label: 'Name', name: 'name' },
  { label: 'Description', name: 'description' },
  { label: 'Company', name: 'company' },
  { label: 'Department', name: 'department' },
  { label: 'Group', name: 'group', disableCopy: true },
  { label: 'Approved', name: 'approved', disableCopy: true },
  { label: 'Call Invite', name: 'callInvite', disableCopy: true },
  { label: 'Receive Invite', name: 'receiveInvite', disableCopy: true },
  { label: 'Default Roles', name: 'defaultRoles', disableCopy: true },
];

const workspaceTableField: Array<IDefineTableField<UserWorkspaceTableType>> = [
  { name: 'workspace', label: 'Work' },
  { name: 'invited', label: 'Invite' },
  { name: 'role', label: 'Role' },
  { name: 'removeAction', label: '' },
];

const tabState = reactive({
  activeTab: 'detail',
});
</script>

<template>
  <div v-if="isSelected">
    <p-tab :tabs="tabs" v-model="tabState.activeTab">
      <template #detail>
        <div class="tab-section-header">
          <p>User Information</p>
          <p-button :style-type="'tertiary'" icon-left="ic_edit">Edit</p-button>
        </div>
        <p-definition-table
          :fields="defineTableField"
          :data="props.tableItems"
          :loading="false"
          style-type="primary"
          :block="false"
        >
          <template #data-group="scope">
            <p-badge
              v-for="(datum, i) in scope.data"
              :key="i"
              :badge-type="'subtle'"
              :style-type="'gray200'"
              :shape="'square'"
              :style="{ marginRight: '5px' }"
            >
              {{ datum }}
            </p-badge>
          </template>
          <template #data-approved="scope">
            <p-status
              :icon-color="`${scope.data.state ? '#60b731' : '#C2C2C6'}`"
              :text="`${scope.data.data}`"
            />
          </template>
          <template #data-defaultRoles="scope">
            <p-badge
              v-for="(datum, i) in scope.data"
              :key="i"
              :badge-type="'subtle'"
              :style-type="'gray200'"
              :shape="'square'"
              :style="{ marginRight: '5px' }"
            >
              {{ datum }}
            </p-badge>
          </template>
        </p-definition-table>
      </template>
      <template #workspace>
        <div class="tab-section-header">
          <p>Allocated Workspaces</p>
          <p-button :style-type="'tertiary'" icon-left="ic_edit">Edit</p-button>
        </div>
        <p-definition-table
          :fields="workspaceTableField"
          :data="props.tableItems"
          :loading="false"
          style-type="primary"
          :block="false"
        >
          <template #data-workspace="scope">
            <p-badge
              v-for="(datum, i) in scope.data"
              :key="i"
              :badge-type="'subtle'"
              :style-type="'gray200'"
              :shape="'square'"
              :style="{ marginRight: '5px' }"
            >
              {{ datum }}
            </p-badge>
          </template>
          <template #data-approved="scope">
            <p-status
              :icon-color="`${scope.data.state ? '#60b731' : '#C2C2C6'}`"
              :text="`${scope.data.data}`"
            />
          </template>
          <template #data-defaultRoles="scope">
            <p-badge
              v-for="(datum, i) in scope.data"
              :key="i"
              :badge-type="'subtle'"
              :style-type="'gray200'"
              :shape="'square'"
              :style="{ marginRight: '5px' }"
            >
              {{ datum }}
            </p-badge>
          </template>
        </p-definition-table>
      </template>
    </p-tab>
  </div>
</template>

<style scoped lang="postcss">
.tab-section-header {
  padding: 32px 16px 24px 16px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 24px;
    font-weight: 400;
  }
}
</style>
