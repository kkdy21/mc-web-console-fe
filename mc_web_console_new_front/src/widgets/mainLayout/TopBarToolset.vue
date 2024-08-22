<script setup lang="ts">
import { PTooltip, PI } from '@cloudforet-test/mirinae';
import TopBarNotifications from './TopBarNotifications.vue';

const props = withDefaults(
  defineProps<{
    openedMenu?: string | null;
  }>(),
  {
    openedMenu: null,
  },
);
const emit = defineEmits<{
  (event: 'hide-menu'): void;
  (event: 'open-menu', menu: string): void;
}>();

const hideMenu = () => {
  emit('hide-menu');
};
const openMenu = (menu: string) => {
  emit('open-menu', menu);
};
const updateOpenedMenu = (menu: string, visible: boolean) => {
  if (visible) openMenu(menu);
  else hideMenu();
};
</script>

<template>
  <div class="top-bar-toolset">
    <div class="top-bar-icons-wrapper">
      <top-bar-notifications
        :visible="props.openedMenu === 'notifications'"
        @update:visible="updateOpenedMenu('notifications', $event)"
      />
      <p-i name="ic_gnb_bell" />
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
