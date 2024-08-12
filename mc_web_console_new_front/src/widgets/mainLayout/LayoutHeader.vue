<script setup lang="ts">
import TopBarWorkspaces from './TopBarWorkspaces.vue';
import TopBarToolset from './TopBarToolset.vue';
// import GNBToolbox from '../sidebar/GNBToolbox.vue';
</script>

<template>
  <div>
    <div class="top-bar">
      <!-- TODO: 1. topbar workspaces -->
      <top-bar-workspaces class="top-bar-workspace" />
      <!-- TODO: 2. topbar toolset -->
      <top-bar-toolset class="toolset" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.top-bar {
  @apply bg-white items-center justify-between border-b border-gray-200;
  display: flex !important;
  width: 100%;

  &.admin-top-bar {
    @apply bg-violet-900;
    background: linear-gradient(90deg, #2c0f66 14.69%, #7d5dd2 100%);
    box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.12);
  }

  .top-bar-workspace {
    flex: 0 0;
  }

  .middle-section {
    @apply flex justify-center;
    flex: 1 1;
  }

  .toolset {
    @apply inline-flex items-center;
    right: 0;
    padding-right: 1.5rem;
    flex: 0 0;
  }
}
</style>
