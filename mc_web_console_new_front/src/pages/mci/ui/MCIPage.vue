<script setup lang="ts">
import MciList from '@/widgets/workload/mci/mciList/ui/MciList.vue';

const pageName = 'MCI';
</script>

<template>
  <div :class="`${pageName}-page page`">
    <header :class="`${pageName}-page-header`">
      <p>{{ pageName }}</p>
    </header>
    <section :class="`${pageName}-page-body`">
      <MciList></MciList>
    </section>
  </div>
</template>

<style scoped lang="postcss"></style>
