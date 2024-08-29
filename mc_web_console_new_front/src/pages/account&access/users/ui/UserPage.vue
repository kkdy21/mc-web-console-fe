<script setup lang="ts">
import UserListTable from '@/widgets/user/userlist/ui/UserListTable.vue';
import UserInformation from '@/widgets/user/userinfomation/ui/UserInformation.vue';

const pageName = 'Users';
</script>

<template>
  <div :class="`${pageName}-page page`">
    <header :class="`${pageName}-page-header`">
      <p>{{ pageName }}</p>
    </header>
    <section :class="`${pageName}-page-body`">
      <UserListTable></UserListTable>
      <UserInformation></UserInformation>
    </section>
  </div>
</template>

<style scoped lang="postcss"></style>
