<script setup lang="ts">
import { PSidebar } from '@cloudforet-test/mirinae';

import LayoutHeader from './Layouts/layoutHeader/ui/LayoutHeader.vue';
import MainLayout from './Layouts/mainLayout/ui/MainLayout.vue';

import { styleVariables } from '@cloudforet-test/mirinae';
import { reactive } from 'vue';
</script>

<template>
  <div v-cloak id="app">
    <div class="top-bar">
      <layout-header />
    </div>
    <div>
      <main-layout
        class="app-body"
        :style="{ height: `calc(100vh - ${styleVariables['top-bar-height']})` }"
      >
        <template #main>
          <p-sidebar :visible="false">
            <div class="main-content">
              <portal-target
                ref="topNotiRef"
                name="top-notification"
                :slot-props="{ hasDefaultMessage: true }"
              />
              <router-view />
            </div>
            <template #title>
              <portal-target name="info-title" />
            </template>
            <template #sidebar>
              <portal-target name="handbook-contents" />
            </template>
            <template #footer>
              <portal-target name="widget-footer" />
            </template>
          </p-sidebar>
        </template>
      </main-layout>
    </div>
  </div>
</template>

<style scoped lang="postcss">
#app {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  width: 100vw;
  height: 100vh;
  background-color: $bg-color;

  .console-loading-wrapper {
    position: absolute;
    height: 100%;
    z-index: 10;
    & > .data-loader-container > .loader-wrapper > .loader.spinner {
      max-height: unset;
    }
  }

  .top-bar {
    position: fixed;
    width: 100%;
    height: $top-bar-height;
    z-index: 100;
    flex-shrink: 0;
    top: 0;
  }
  .app-body {
    @apply relative flex flex-col;
    margin-top: $top-bar-height;
    overflow-y: hidden;
    width: 100%;
    flex-grow: 1;
    .p-sidebar {
      .sidebar-container {
        @apply bg-gray-100;
      }
      .non-sidebar-wrapper {
        min-height: 100%;
      }
    }
    .main-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin: 0;
      padding: 20px 10px;
      overflow-x: hidden;
      overflow-y: hidden;
    }
  }
}
:deep(.sidebar-container) {
  @apply bg-gray-100;
}

:deep(.non-sidebar-wrapper) {
  min-height: 100%;
}
</style>