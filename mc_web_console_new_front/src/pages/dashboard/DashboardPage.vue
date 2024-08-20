<script setup lang="ts"></script>

<template>
  <div>
    <h1>here</h1>
    <router-view />
  </div>
</template>

<style scoped lang="postcss">
.left-side-bar {
  @apply h-full flex flex-col;
  width: 100px;
  border: 1px solid red;
  align-items: start;
}

.dashboard-page-main {
  @apply h-full;
  border: 1px solid green;
  flex: 1;
}
</style>
