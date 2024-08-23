<script setup lang="ts">
import { AUTH_ROUTE } from '../../pages/auth/auth.route.ts';
import { AUTO_LOGIN, useLocalStorage } from '@/shared/libs/access-localstorage';
import { ILoginData } from '@/shared/libs/access-localstorage/types.ts';
import { McmpRouter } from '@/app/providers/router';
import GNBToolbox from './ui/gnbToolset/GNBToolbox.vue';
import GNBNavigationRail from './ui/gnbNavigationRail/GNBNavigationRail.vue';
import { useSidebar } from '@/shared/libs/store/sidebar.ts';
import { storeToRefs } from 'pinia';

const sidebar = useSidebar();

const handleLogout = () => {
  const loginDataLocalStorage = useLocalStorage<ILoginData>(AUTO_LOGIN);
  loginDataLocalStorage.setItem({ role: null, autoLogin: false });

  McmpRouter.getRouter()
    .push({ name: AUTH_ROUTE.LOGIN._NAME })
    .catch(() => {});
};

const { isMinimized, isCollapsed } = storeToRefs(sidebar);
</script>

<template>
  <div>
    <div class="layout-container">
      <nav class="gnb">
        <g-n-b-toolbox class="g-n-b-item" />
        <g-n-b-navigation-rail class="g-n-b-item" />
      </nav>
      <main
        class="main"
        :class="{
          'is-hide': isCollapsed,
          'is-minimize': !isCollapsed && isMinimized,
        }"
      >
        <slot name="main" />
      </main>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.gnb {
  z-index: 50;
  .g-n-b-item {
    @apply absolute flex border-gray-200;
  }
}
.main {
  @apply absolute;
  top: $gnb-toolbox-height;
  left: $gnb-navigation-rail-max-width;
  width: calc(100% - $gnb-navigation-rail-max-width);
  height: calc(100% - $gnb-toolbox-height);
  margin: auto;
  transition:
    left 0.3s ease,
    width 0.3s ease;
  &.is-hide {
    left: 0;
    width: 100%;
  }
  &.is-minimize {
    left: $gnb-navigation-rail-min-width;
    width: calc(100% - $gnb-navigation-rail-min-width);
  }
}

.top-bar {
  width: 100%;
  height: $top-bar-height;
  z-index: 100;
  flex-shrink: 0;
  top: 0;
}
</style>
