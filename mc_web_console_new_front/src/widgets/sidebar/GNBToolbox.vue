<script setup lang="ts">
import { PTooltip, PIconButton, PBreadcrumbs } from '@cloudforet-test/mirinae';

const handleClickMenuButton = () => {
  // TODO: menu icon click event (navigation rail created)
};
</script>

<template>
  <div class="g-n-b-toolbox">
    <div class="navigation-section">
      <p-tooltip class="menu-button-wrapper" position="bottom" contents="??">
        <p-icon-button
          name="ic_gnb_menu"
          style-type="transparent"
          class="menu-button"
          shape="square"
          size="md"
          @click="handleClickMenuButton"
        />
      </p-tooltip>
      <!-- TODO: p-breadcrumbs: selected menu path text -->
      <p-breadcrumbs />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.g-n-b-toolbox {
  @apply justify-between bg-white border-b;
  /* top: 0; */
  width: 100%;
  height: $gnb-toolbox-height;
  padding-right: 1rem;
  z-index: 50;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  .navigation-section {
    @apply flex items-center;
    .menu-button-wrapper {
      @apply flex items-center justify-center;
      width: $gnb-navigation-rail-min-width;
      .menu-button {
        @apply border-none text-gray-900;
        margin-bottom: -0.025rem;
        &:hover {
          @apply text-blue-600;
        }
      }
    }
  }
  .extra-section {
    @apply flex items-center text-gray-500 text-label-sm;
    gap: 0.25rem;
    .copy-button {
      @apply flex items-center text-gray-500;
    }
  }
}
</style>
