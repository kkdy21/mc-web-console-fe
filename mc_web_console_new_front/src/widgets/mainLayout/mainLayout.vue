<script setup lang="ts">
import { AUTH_ROUTE } from '../../pages/auth/auth.route.ts';
import { AUTO_LOGIN, useLocalStorage } from '@/shared/libs/access-localstorage';
import { ILoginData } from '@/shared/libs/access-localstorage/types.ts';
import { McmpRouter } from '@/app/providers/router';
import LayoutHeader from './LayoutHeader.vue';

const handleLogout = () => {
  const loginDataLocalStorage = useLocalStorage<ILoginData>(AUTO_LOGIN);
  loginDataLocalStorage.setItem({ role: null, autoLogin: false });

  McmpRouter.getRouter()
    .push({ name: AUTH_ROUTE.LOGIN._NAME })
    .catch(() => {});
};
</script>

<template>
  <div class="h-full flex flex-col overflow-y-hidden">
    <nav class="top-bar">
      <layout-header />
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="postcss">
main {
  height: calc(100% - 100px);
  border: 1px solid black;
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

.top-bar {
  width: 100%;
  height: $top-bar-height;
  z-index: 100;
  flex-shrink: 0;
  top: 0;
}
</style>
