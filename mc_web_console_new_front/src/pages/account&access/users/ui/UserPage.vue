<script setup lang="ts">
import UserListTable from '@/widgets/user/userlist/ui/UserListTable.vue';
import UserInformation from '@/widgets/user/userinfomation/ui/UserInformation.vue';
import { tempGetUserList, UserInformationTableType } from '@/entities';
import { Ref, ref } from 'vue';

const pageName = 'Users';
const selectedRow: Ref<Partial<Record<UserInformationTableType, any>>> = ref(
  {},
);

const toolboxTableItem: Partial<Record<UserInformationTableType, any>>[] =
  tempGetUserList();

const handleSelectRow = (
  selectedData: Record<UserInformationTableType, any>,
) => {
  selectedRow.value = selectedData || {};
};
</script>

<template>
  <div :class="`${pageName}-page page`">
    <header :class="`${pageName}-page-header`">
      <p>{{ pageName }}</p>
    </header>
    <section :class="`${pageName}-page-body`">
      <UserListTable
        :table-items="toolboxTableItem"
        @selectRow="handleSelectRow"
      ></UserListTable>
      <UserInformation :table-items="selectedRow"></UserInformation>
    </section>
  </div>
</template>

<style scoped lang="postcss"></style>
