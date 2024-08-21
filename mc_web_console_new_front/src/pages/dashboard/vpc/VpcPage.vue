<script setup lang="ts">
import VerticalPageLayout from '@/widgets/mainLayout/VerticalPageLayout.vue';
import VpcLSB from './VpcLSB.vue';
import { PVerticalLayout } from '@cloudforet-test/mirinae';
</script>

<template>
  <fragment>
    <div>Vpc Page</div>
    <vpc-l-s-b />
    <vertical-page-layout>
      <template #sidebar>
        <vpc-l-s-b />
      </template>
      <template #default>
        <router-view />
      </template>
    </vertical-page-layout>
  </fragment>
</template>
