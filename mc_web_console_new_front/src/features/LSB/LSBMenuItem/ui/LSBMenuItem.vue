<script setup lang="ts">
import { computed, reactive } from 'vue';
import { PDivider, PBoardItem } from '@cloudforet-test/mirinae';
import LSBRouterMenuItem from '../../LSBRouterMenuItem/ui/LSBRouterMenuItem.vue';

interface Props {
  menuData: any;
  currentPath: string;
}

const props = withDefaults(defineProps<Props>(), {
  menuData: () => ({}),
  currentPath: undefined,
});

const emit = defineEmits<{
  (e: 'select', id: string, selected: string | number): void;
}>();
const state = reactive({
  processedMenuData: computed(() =>
    Array.isArray(props.menuData) ? props.menuData : [props.menuData],
  ),
});

const handleSelect = (id: string, selected: string) => {
  emit('select', id, selected);
};
</script>

<template>
  <div class="l-s-b-menu-list">
    <div class="l-s-b-menu-item">
      <l-s-b-router-menu-item :sub-menus="menuData.displayname">
        {{ menuData.displayname }}
      </l-s-b-router-menu-item>
    </div>
  </div>
</template>
