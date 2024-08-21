<script setup lang="ts">
import { computed, reactive } from 'vue';

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
    <div
      v-for="(item, idx) in state.processedMenuData"
      :key="item.id"
      class="l-s-b-menu-item"
    >
      {{ item }}
    </div>
  </div>
</template>
