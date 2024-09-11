<script setup lang="ts">
import { useMCiListTableModel } from '@/widgets/workload/mci/mciList/model';
import { PHorizontalLayout } from '@cloudforet-test/mirinae';

const { mciTableModel, initToolBoxTableModel } = useMCiListTableModel();
</script>

<template>
  <div>
    <p-horizontal-layout :height="400" :min-height="400" :max-height="100">
      <template #container="{ height }"> </template>
    </p-horizontal-layout>
  </div>
</template>

<style scoped lang="postcss"></style>
