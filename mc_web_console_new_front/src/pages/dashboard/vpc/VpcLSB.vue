<script setup lang="ts">
import LSB from '@/features/LSB/LSB/ui/LSB.vue';
import { useMenuPerUserStore } from '@/entities/user/store/menuPerUserStore';
import { storeToRefs } from 'pinia';
import { PTextInput } from '@cloudforet-test/mirinae';
import { computed, reactive } from 'vue';

// const menuPerUserStore = useMenuPerUserStore();

// const { flattendMenus } = storeToRefs(menuPerUserStore);

interface Props {
  parentMenuName: string;
  submenus: any[];
}

const props = withDefaults(defineProps<Props>(), {
  parentMenuName: '',
  submenus: () => [],
});

const state = reactive({
  menuSet: computed(() => {
    const baseMenuSet = [{}];
    return baseMenuSet;
  }),
});

const tempMenuSet = computed(() => {
  return props.submenus;
  // return [
  //   {
  //     type: 'item',
  //     label: 'All Projects',
  //     icon: 'ic_dots-4-square',
  //     to: '/dashboard/vpc',
  //     hideFavorite: true,
  //   },
  // ];
});
</script>

<template>
  <l-s-b class="vpc-l-s-b" :menu-set="tempMenuSet">
    <p-text-input class="vpc-search" placeholder="Search VPC" />

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
