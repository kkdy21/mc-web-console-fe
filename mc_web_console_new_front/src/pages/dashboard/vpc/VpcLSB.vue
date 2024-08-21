<script setup lang="ts">
import LSB from '@/widgets/subSidebar/LSB.vue';
import { useMenuPerUserStore } from '@/entities/user/store/menuPerUserStore';
import { storeToRefs } from 'pinia';
import { PTextInput } from '@cloudforet-test/mirinae';
import { computed } from 'vue';

const menuPerUserStore = useMenuPerUserStore();

const { processedUserMenuInfo } = storeToRefs(menuPerUserStore);

const tempMenuSet = computed(() => {
  return [
    {
      type: 'item',
      label: 'All Projects',
      icon: 'ic_dots-4-square',
      to: '/dashboard/vpc',
      hideFavorite: true,
    },
  ];
});
</script>

<template>
  <l-s-b class="vpc-l-s-b" :menu-set="tempMenuSet">
    <template #collapsible-contents-project>
      <p-text-input class="vpc-search" placeholder="Search VPC" />
    </template>
  </l-s-b>
</template>

<style scoped lang="postcss">
.vpc-l-s-b {
  .vpc-search {
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
