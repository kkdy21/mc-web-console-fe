<script setup lang="ts">
import { AUTH_ROUTE } from '../../pages/auth/auth.route.ts';
import { AUTO_LOGIN, useLocalStorage } from '@/shared/libs/access-localstorage';
import { ILoginData } from '@/shared/libs/access-localstorage/types.ts';
import { McmpRouter } from '@/app/providers/router';
import LayoutHeader from './LayoutHeader.vue';
import SidebarLayout from '../sidebar/SidebarLayout.vue';
import GNBToolbox from '../sidebar/GNBToolbox.vue';

const handleLogout = () => {
  const loginDataLocalStorage = useLocalStorage<ILoginData>(AUTO_LOGIN);
  loginDataLocalStorage.setItem({ role: null, autoLogin: false });

  McmpRouter.getRouter()
    .push({ name: AUTH_ROUTE.LOGIN._NAME })
    .catch(() => {});
};
</script>

<template>
  <div class="layout-container">
    <div class="top-bar">
      <layout-header />
    </div>
    <sidebar-layout />
    <main class="main">
      <router-view />
      <slot name="main" />
    </main>
  </div>
</template>

<style scoped lang="postcss">
main {
  /* height: calc(100% - 100px); */
  height: inherit;
  /* border: 1px solid black; */
}
.main-header {
  height: 100px;
  border: 1px solid black;

  ul {
    list-style-type: none;

    li {
      border: 1px solid blue;
    }
  }
}

.main-body {
  height: calc(100% - 100px);
  border: 1px solid black;
}

.main {
  @apply absolute;
  top: calc($gnb-toolbox-height + $top-bar-height);
  left: $gnb-navigation-rail-max-width;
  width: calc(100% - $gnb-navigation-rail-max-width);
  height: calc(100% - $gnb-toolbox-height);
  margin: auto;
  transition:
    left 0.3s ease,
    width 0.3s ease;
}

.top-bar {
  width: 100%;
  height: $top-bar-height;
  z-index: 100;
  flex-shrink: 0;
  top: 0;
}
</style>
