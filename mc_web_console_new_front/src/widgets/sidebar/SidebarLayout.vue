<script setup lang="ts">
import GNBToolbox from './GNBToolbox.vue';
import GNBNavigationRail from './GNBNavigationRail.vue';
</script>

<template>
  <nav class="gnb">
    <g-n-b-toolbox class="g-n-b-item" />
    <g-n-b-navigation-rail class="g-n-b-item" />
  </nav>
</template>

<style scoped lang="postcss">
.gnb {
  z-index: 50;
  .g-n-b-item {
    @apply absolute flex border-gray-200;
  }
}
</style>
