<script setup lang="ts">
import { LSBRouterMenuItem } from '../../LSBRouterMenuItem';

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
// const state = reactive({
//   processedMenuData: computed(() =>
//     Array.isArray(props.menuData) ? props.menuData : [props.menuData],
//   ),
//   hoveredItem: '',
// });

// const handleSelect = (id: string, selected: string) => {
//   emit('select', id, selected);
// };
</script>

<template>
  <div class="l-s-b-menu-list">
    <div class="l-s-b-menu-item">
      <l-s-b-router-menu-item
        :submenu="menuData.displayname"
        :current-path="currentPath"
        :item="menuData"
      >
        <template #after-text>
          <slot :name="`after-text-${menuData.id}`" />
        </template>
      </l-s-b-router-menu-item>
    </div>
  </div>
</template>
