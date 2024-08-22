<script setup lang="ts">
import VerticalPageLayout from '@/widgets/mainLayout/VerticalPageLayout.vue';
import VpcLSB from './VpcLSB.vue';
import { PVerticalLayout, PBadge } from '@cloudforet-test/mirinae';
import { ref } from 'vue';
import { Breadcrumb } from '@/widgets/mainLayout/type';

const breadCrumbs = ref<any[]>([
  {
    name: 'Dashboard',
  },
]);
</script>

<template>
  <fragment>
    <vertical-page-layout>
      <template #sidebar>
        <vpc-l-s-b />
        <router-view />
      </template>
      <template #default>
        <router-view />
      </template>
    </vertical-page-layout>
  </fragment>
</template>
