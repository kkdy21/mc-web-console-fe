<script setup lang="ts">
import { computed } from 'vue';
import { PI } from '@cloudforet-test/mirinae';

const props = defineProps<{
  displayedMenu: any[];
}>();

const filteredCategories = computed(() => {
  const set = new Set();
  const categoryList = props.displayedMenu.map(menu => menu.category);

  return categoryList.filter(category => {
    if (set.has(category)) {
      return false;
    } else {
      set.add(category);
      return true;
    }
  });
});
</script>

<template>
  <div>
    <div v-for="(filteredCategory, i) in filteredCategories" :key="i">
      <span class="menu-category">{{ filteredCategory }}</span>
      <div
        v-for="(item, idx) in displayedMenu"
        :key="`navigation-rail-item-${idx}`"
      >
        <div v-if="item.category === filteredCategory">
          <div
            v-for="(menu, midx) in item.menuList"
            :key="`menu-list-${midx}`"
            :to="{ name: 'vpc-crud' }"
          >
            <router-link class="service-menu" :to="{ name: 'vpc-crud' }">
              <div class="menu-wrapper">
                <p-i
                  :name="menu.icon"
                  class="menu-button"
                  height="1.25rem"
                  width="1.25rem"
                  color="inherit"
                />
                <div class="menu-container">
                  <span class="menu-title">{{ menu.label }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="pcss">
.menu-category {
  font-size: 14px;
  color: #898995;
  /* padding-top: 8px; */
}
.service-menu {
  @apply flex items-center justify-between text-label-md;
  width: 100%;
  height: 2rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  gap: 0.75rem;
  border-radius: 0.25rem;
  .menu-wrapper {
    @apply flex items-center;
    gap: 0.625rem;
    .menu-container {
      @apply flex items-end;
      .mark-item {
        margin-left: 0.125rem;
      }
      .learn-more-button {
        margin-bottom: -0.125rem;
        margin-left: 0.5rem;
      }
    }
  }
  .favorite-button {
    @apply hidden;
  }
  &:hover:not(.is-only-label) {
    @apply bg-violet-100 cursor-pointer;
    .favorite-button {
      @apply block;
    }
  }
  &.is-only-label {
    @apply items-end text-gray-500 cursor-default;
    height: 2.625rem;
    padding-bottom: 0.5rem;
  }
  &.is-selected {
    @apply relative bg-violet-100 text-violet-600;
    &::before {
      @apply absolute;
      content: '';
      top: 0.125rem;
      left: -0.75rem;
      width: 0.25rem;
      height: 1.75rem;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }
}
</style>
