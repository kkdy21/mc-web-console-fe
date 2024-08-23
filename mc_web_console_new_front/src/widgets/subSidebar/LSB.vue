<script setup lang="ts">
import { PI, PLazyImg } from '@cloudforet-test/mirinae';
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router/composables';
import LSBMenuItem from './ui/LSBMenuItem.vue';

interface Props {
  backLink?: any;
  topTitle?: any;
  menuSet: any[];
  hideHeader?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  backLink: () => ({}) as any,
  topTitle: () => ({}) as any,
  menuSet: () => [],
  // hideHeader: false,
});
const emit = defineEmits<{
  (e: 'select', id: string, selected: string | number): void;
}>();
const route = useRoute();
const state = reactive({
  currentPath: computed(() => route.fullPath),
});
const handleSelect = (id: string, selected: string) => {
  emit('select', id, selected);
};
</script>

<template>
  <aside class="l-s-b">
    <div class="menu-wrapper">
      <router-link
        v-if="props.backLink.label"
        class="back-link"
        :to="props.backLink.to"
      >
        <p-i
          name="ic_chevron-left"
          width="1rem"
          height="1rem"
          color="inherit transparent"
        />
        {{ props.backLink.label }}
      </router-link>
      <slot />
      <div v-if="props.topTitle.label" class="top-title">
        <div class="icon-label-wrapper">
          <!-- <p-lazy-img :src=""/> -->
          <span :class="{ 'icon-label': props.topTitle.icon }" class="label">{{
            props.topTitle.label
          }}</span>
          <router-link v-if="props.topTitle.visibleAddButton">
            <p-i name="ic_plus" width="1rem" height="1rem" class="add-button" />
          </router-link>
        </div>
        <!-- TODO: template of menuSet -->
      </div>
      <template v-for="(menuData, idx) in props.menuSet">
        <div
          v-if="menuData.type === 'slot'"
          :key="`${idx}-${menuData.id}`"
          class="slot-menu-wrapper"
        >
          <slot :name="`slot-${menuData.id}`" v-bind="menuData" />
        </div>
        <l-s-b-menu-item
          v-else
          :key="`${idx}-${Math.random() * 1000}`"
          :menu-data="menuData"
          :current-path="state.currentPath"
        >
          <!-- @select="handleSelect" -->
          <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </l-s-b-menu-item>
      </template>
    </div>
  </aside>
</template>

<style scoped lang="postcss">
aside {
  display: block;
  unicode-bidi: isolate;
}
.l-s-b {
  .menu-wrapper {
    padding: 1rem 0.5rem 2rem;
  }
  .back-link {
    @apply flex text-gray-500;
    font-size: 0.75rem;
    line-height: 125%;
    margin-top: 1.25rem;
    height: 1.75rem;
    &:hover {
      @apply text-gray-800 cursor-pointer;
      text-decoration: underline;
    }
  }
  .slot-menu-wrapper {
    @apply flex items-center;
    margin-bottom: 0.5rem;
  }
  .top-title {
    @apply text-gray-800 font-bold flex justify-between items-center;
    font-size: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    .icon-label-wrapper {
      @apply flex items-center;
      height: 1.5rem;
      .icon {
        /* @apply rounded flex-shrink-0; */
        margin-right: 0.375rem;
      }
      .label {
        &.icon-label {
          font-size: 0.875rem;
        }
      }
    }
    .add-button {
      @apply cursor-pointer;
      height: 2rem;
    }
  }
}
</style>
