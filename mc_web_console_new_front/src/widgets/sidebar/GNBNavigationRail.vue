<script setup lang="ts">
import { PTooltip, PI, PButton } from '@cloudforet-test/mirinae';
import { SIDEBAR_MENU } from './constant';
import type { MenuCategory } from './constant';
import { ref, watch, watchEffect } from 'vue';
import { useMenuPerUserStore } from '@/entities/user/store/menuPerUserStore';
import MenuCategorySet from './MenuCategory.vue';
import { useSidebar } from '@/shared/libs/store/sidebar';
import { storeToRefs } from 'pinia';

const sidebar = useSidebar();

const isSidebarExpanded = ref(false);
const userMenuAuthorized = ref<null | string[]>(null);
const displayedMenu = ref<MenuCategory[]>([]);

const { isCollapsed, isMinimized } = storeToRefs(sidebar);

const clickMinimizeBtn = () => {
  sidebar.toggleMinimize();
};

watchEffect(() => {
  const menuPerUserStore = useMenuPerUserStore();
  userMenuAuthorized.value = menuPerUserStore.userMenuInfo.menus;
});

// TODO: SIDEBAR_MENU와 userMenuAuthorized를 비교하여 권한이 있는 메뉴만 렌더링 (✓)
watch(
  [userMenuAuthorized, displayedMenu],
  () => {
    // SIDEBAR_MENU.forEach(menu => {
    //   userMenuAuthorized.value?.includes(menu.id)
    //     ? displayedMenu.value.push(menu)
    //     : null;
    // });

    SIDEBAR_MENU.forEach(menu => {
      const { category, menuList } = menu;

      menuList.forEach(s_menu => {
        userMenuAuthorized.value?.includes(s_menu.id)
          ? displayedMenu.value.push({
              category,
              menuList: [s_menu],
            })
          : null;
      });
    });
  },
  { immediate: true },
);
</script>

<template>
  <div
    class="g-n-b-navigation-rail"
    :class="{ 'is-minimize': isMinimized, 'is-hide': isCollapsed }"
  >
    <!-- <p-tooltip
class="minimize-button-wrapper" position="bottom" /> -->
    <!-- TODO: Sidebar shirnk & expand -->
    <p-tooltip
      class="minimize-button-wrapper"
      position="bottom"
      :contents="isMinimized ? 'Minimize menu' : 'Expand menu'"
      @click="clickMinimizeBtn"
    >
      <!-- @click="isSidebarExpanded = !isSidebarExpanded" -->
      <!-- storeState.isMinimizeNavRail
          ? $t('COMMON.GNB.TOOLTIP.EXPAND_GNB_RAIL')
          : $t('COMMON.GNB.TOOLTIP.MINIMIZE_GNB_RAIL') -->
      <p-i
        :name="
          isMinimized ? 'ic_double-chevron-right' : 'ic_double-chevron-left'
        "
        class="menu-button"
        height="1.5rem"
        width="1.5rem"
        color="inherit"
      />
    </p-tooltip>
    <div class="navigation-rail-container">
      <div class="navigation-rail-wrapper">
        <menu-category-set :displayed-menu="displayedMenu" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.g-n-b-navigation-rail {
  @apply absolute flex-col items-start bg-white border-r;
  /* top: $gnb-toolbox-height; */
  height: calc(95.9vh - $gnb-toolbox-height);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  z-index: 51;
  width: $gnb-navigation-rail-max-width;
  .navigation-rail-container {
    @apply overflow-y-auto overflow-x-hidden;
    width: $gnb-navigation-rail-max-width;
    transition: width 0.3s ease;
    transition: height 0.3s ease;
    padding: 1rem 0.75rem;
    .navigation-rail-wrapper {
      width: calc($gnb-navigation-rail-max-width - 1.625rem);
      transition: width 0.3s ease;
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
    }
  }
  .minimize-button-wrapper {
    @apply hidden absolute bg-white border border-gray-200 text-gray-500 cursor-pointer;
    top: 1.125rem;
    right: 0;
    padding: 0.125rem;
    border-right: hidden;
    border-top-left-radius: 6.25rem;
    border-bottom-left-radius: 6.25rem;
    transition: padding 0.1s ease;
    z-index: 50;
    &:hover {
      @apply bg-violet-200 text-violet-600;
      padding-right: 0.75rem;
      padding-left: 0.25rem;
    }
  }
  &:hover {
    .minimize-button-wrapper {
      @apply block;
    }
  }
  &.is-hide {
    @apply bg-transparent;
    width: 0;
    padding: 0;
    transition: width 0.3s ease;
    .navigation-rail-container,
    .minimize-button-wrapper,
    .service-menu,
    .menu-wrapper {
      width: 0;
      padding: 0;
    }
  }
  &.is-mobile {
    .minimize-button-wrapper {
      @apply hidden;
      width: 0;
      padding: 0;
    }
    &.is-minimize {
      transition: width 0.3s ease;
      width: 0;
      padding: 0;
      .navigation-rail-container {
        width: 0;
        padding: 0;
      }
    }
  }
  &.is-minimize:not(.is-mobile, .is-hide) {
    @apply bg-gray-100 cursor-pointer;
    z-index: 49;
    box-shadow: unset;
    .navigation-rail-container {
      width: $gnb-navigation-rail-min-width;
    }
    .minimize-button-wrapper {
      @apply hidden;
    }
    .service-menu {
      width: 2.25rem;
      .learn-more-button {
        @apply hidden;
      }
      &:hover:not(.is-only-label) {
        @apply bg-violet-200;
      }
      &.is-selected {
        @apply bg-violet-200;
      }
    }
    &:hover {
      @apply bg-white;
      z-index: 51;
      .navigation-rail-container {
        width: $gnb-navigation-rail-max-width;
      }
      .minimize-button-wrapper {
        @apply block;
      }
      .service-menu {
        width: 100%;
        .learn-more-button {
          @apply block;
        }
        &:hover:not(.is-only-label) {
          @apply bg-violet-100;
        }
        &.is-selected {
          @apply bg-violet-100;
        }
      }
      .menu-description {
        @apply flex;
      }
    }
    .menu-description {
      @apply hidden;
    }
  }
  .menu-description {
    @apply flex flex-col bg-gray-100 text-paragraph-sm;
    padding: 0.5rem 0.875rem;
    .title {
      @apply text-paragraph-md text-gray-800;
    }
    .desc {
      @apply text-gray-600;
    }
    .toolbox {
      @apply flex items-center;
      margin-top: 0.375rem;
      gap: 0.5rem;
    }
  }
}
</style>
