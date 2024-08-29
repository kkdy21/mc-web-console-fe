<script setup lang="ts">
import { LSB } from '@/widgets/LSB';
import { PTextInput } from '@cloudforet-test/mirinae';

interface Props {
  menus: any[];
}

const props = withDefaults(defineProps<Props>(), {
  menus: () => [],
});
</script>

<template>
  <l-s-b class="organizations-l-s-b" :menu-set="menus">
    <p-text-input
      class="organizations-search"
      placeholder="Search Organizations"
    />
    <template #collapsible-contents-project>
      <p-text-input
        class="organizations-search"
        placeholder="Search Organizations"
      />
    </template>
  </l-s-b>
</template>

<style scoped lang="postcss">
.organizations-l-s-b {
  .organizations-search {
    @apply w-full;
    margin-bottom: 0.5rem;
  }
  .search-result-text {
    @apply overflow-hidden whitespace-nowrap;
    text-overflow: ellipsis;
  }
  .search-empty {
    @apply text-paragraph-md;
    white-space: pre;
    margin-top: 0.75rem;
  }
}
</style>
