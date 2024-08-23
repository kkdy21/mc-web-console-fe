<script setup lang="ts">
import VerticalPageLayout from '@/widgets/verticalPageLayout/VerticalPageLayout.vue';
import VpcLSB from './VpcLSB.vue';
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
