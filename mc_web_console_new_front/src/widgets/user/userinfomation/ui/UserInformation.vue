<script setup lang="ts">
import {
  PTab,
  PDefinitionTable,
  PBadge,
  PButton,
  PStatus,
} from '@cloudforet-test/mirinae';
import { reactive } from 'vue';

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

const defineTableField = [
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

const defineTableItems = {
  userId: 'emailId@mz.co.kr',
  name: '김이름',
  description: 'description',
  company: 'company',
  department: 'department',
  group: ['group1', 'group2', 'group3'],
  approved: { state: true, data: 'Approved' },
  callInvite: 'callInvite',
  receiveInvite: 'receiveInvite',
  defaultRoles: ['role1', 'role2', 'role3'],
};

const tabState = reactive({
  activeTab: 'detail',
});
const temp = e => {
  console.log(e);
};
</script>

<template>
  <div>
    <p-tab :tabs="tabs" v-model="tabState.activeTab" @update="temp">
      <template #detail>
        <div class="tab-section-header">
          <p>User Information</p>
          <p-button :style-type="'tertiary'" icon-left="ic_edit">Edit</p-button>
        </div>
        <p-definition-table
          :fields="defineTableField"
          :data="defineTableItems"
          :loading="false"
          :skeletonRows="8"
          :disableCopy="false"
          styleType="primary"
          :block="false"
          customKeyWidth=""
        >
          <template #data-group="scope">
            <p-badge
              v-for="datum in scope.data"
              :badgeType="'subtle'"
              :styleType="'gray200'"
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
              v-for="datum in scope.data"
              :badgeType="'subtle'"
              :styleType="'gray200'"
              :shape="'square'"
              :style="{ marginRight: '5px' }"
            >
              {{ datum }}
            </p-badge>
          </template>
        </p-definition-table>
      </template>
      <template #workspace>
        <div>Allocated Workspaces</div>
        <p>workspace</p>
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
