<script setup lang="ts">
import { PTooltip, PI } from '@cloudforet-test/mirinae';
</script>

// TODO: TopBar

<template>
  <div class="top-bar-toolset">
    <div class="top-bar-icons-wrapper">
      <p-i name="ic_settings-filled" />
      <p-i name="ic_service_my-page" />
    </div>
    <p-tooltip position="bottom">
      <!-- TODO: TopBar Admin toggle button -->
    </p-tooltip>
  </div>
</template>

<style scoped lang="postcss">
.top-bar-toolset {
  @apply flex items-center;
  gap: 0.5rem;
  .top-bar-icons-wrapper {
    @apply flex items-center gap-2;
  }
}
</style>
