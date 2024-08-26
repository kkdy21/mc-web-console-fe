<script setup lang="ts">
import { PLazyImg, PI, PTooltip } from '@cloudforet-test/mirinae';
import { computed, reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { useElementSize } from '@vueuse/core';
interface Props {
  submenu: string;
}

const props = withDefaults(defineProps<Props>(), {
  submenu: '',
});

const itemEl = ref<HTMLElement | null>(null);
const textEl = ref<HTMLElement | null>(null);

const state = reactive({
  itemWidth: computed<Ref<number>>(() => useElementSize(itemEl.value).width),
  textWidth: computed<Ref<number>>(() => useElementSize(textEl.value).width),
  hoveredItem: '' as string,
  // isEllipsis: computed<boolean>(
  //   () =>
  //     state.hoveredItem === props.item.id &&
  //     state.itemWidth.value - 20 === state.textWidth.value,
  // ),
});
</script>

<template>
  <router-link ref="itemEl" class="l-s-b-router-menu-item">
    <slot name="before-text" />
    <div ref="textEl" class="text-wrapper">
      <p-i
        name="ic_service_server"
        color="inherit"
        width="1rem"
        height="1rem"
        class="icon"
      />
      <!-- <p-lazy-img /> -->
      <slot>
        <div class="text">
          <p-tooltip position="bottom-start"> {{ submenu }} </p-tooltip>
          <span>{{ submenu }}</span>
        </div>
      </slot>
    </div>
  </router-link>
</template>

<style scoped lang="postcss">
.l-s-b-router-menu-item {
  @apply border border-transparent inline-flex items-center w-full h-full justify-between text-gray-800;
  font-size: 0.875rem;
  line-height: 125%;
  border-radius: 4px;
  box-sizing: border-box;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  outline: 0;
  height: 2rem;

  &:focus,
  &:focus-within,
  &:active {
    @apply bg-white border-secondary1;
    box-shadow: 0 0 0 2px rgba(theme('colors.secondary1'), 0.2);
  }
  &.selected {
    @apply bg-blue-200;
  }
  &.is-hide-favorite {
    .favorite-button {
      @apply hidden;
    }
    &:hover {
      .favorite-button {
        @apply block;
      }
    }
  }
  &:hover {
    @apply bg-blue-100 cursor-pointer;
  }
  .text-wrapper {
    /* @apply inline-flex items-center overflow-hidden whitespace-no-wrap; */
    .text {
      /* @apply overflow-hidden whitespace-no-wrap; */
      text-overflow: ellipsis;
    }
    .icon {
      flex-shrink: 0;
      margin-right: 0.25rem;
    }
    .mark-wrapper {
      height: 100%;
      margin-top: -0.25rem;
    }
  }
  .favorite-button {
    flex-shrink: 0;
    margin-left: 0.25rem;
  }
}
</style>
