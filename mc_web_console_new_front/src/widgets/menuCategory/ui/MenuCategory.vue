<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router/composables';
import { clone, toLower } from 'lodash';
import { PI } from '@cloudforet-test/mirinae';
import type { MenuInfo } from '@/entities/user/store/menuPerUserStore';
import { useMenuPerUserStore } from '@/entities';
import { useSidebar } from '@/shared/libs/store/sidebar';
import { storeToRefs } from 'pinia';
import { MENU_ID_TO_NAME } from '@/entities/menu';

const menuPerUserStore = useMenuPerUserStore();
const sidebar = useSidebar();

const { category } = storeToRefs(menuPerUserStore);
const { isMinimized, isCollapsed } = storeToRefs(sidebar);

const props = defineProps<{
  displayedMenu: MenuInfo[];
}>();

const route = useRoute();

interface STATIC_MENU {
  majorCategoryId: string;
  categoryId: string;
  mainMenuId: string;
  subMenuIds: string[];
}

const staticMenu = ref<STATIC_MENU[]>([
  {
    majorCategoryId: 'operations',
    categoryId: 'manage',
    mainMenuId: 'workloads',
    subMenuIds: ['mci', 'pmk'],
  },
  {
    majorCategoryId: 'operations',
    categoryId: 'manage',
    mainMenuId: 'workspaces',
    subMenuIds: ['all', 'my'],
  },
  {
    majorCategoryId: 'settings',
    categoryId: 'accountAndAccess',
    mainMenuId: 'organizations',
    subMenuIds: ['users', 'approvals', 'accessControls'],
  },
]);

const _state = reactive({
  category: computed(() => {
    let categoryArr = [] as any[];
    staticMenu.value.forEach(menu => {
      Object.keys(MENU_ID_TO_NAME).includes(menu.categoryId)
        ? categoryArr.push(MENU_ID_TO_NAME[menu.categoryId])
        : null;
    });
    const categorySet = new Set(categoryArr);
    categoryArr = Array.from(categorySet);
    return categoryArr;
  }),
  mainMenus: computed(() => {
    let mainMenuArr = [] as any[];
    staticMenu.value.forEach(menu => {
      Object.keys(MENU_ID_TO_NAME).includes(menu.mainMenuId)
        ? mainMenuArr.push(MENU_ID_TO_NAME[menu.mainMenuId])
        : null;
    });
    const mainMenuSet = new Set(mainMenuArr);
    mainMenuArr = Array.from(mainMenuSet);
    return mainMenuArr;
  }),
  subMenus: computed(() => {
    let subMenuArr = [] as any[];
    staticMenu.value.forEach(menu => {
      menu.subMenuIds.forEach(subMenuId => {
        Object.keys(MENU_ID_TO_NAME).includes(subMenuId)
          ? subMenuArr.push(MENU_ID_TO_NAME[subMenuId])
          : null;
      });
    });
    return subMenuArr;
  }),
  mappedMenuData: computed(() => {
    const uniqueCategories = new Map<string, any>();

    staticMenu.value.forEach(menuItem => {
      const majorCategory = MENU_ID_TO_NAME[menuItem.majorCategoryId];
      const category = MENU_ID_TO_NAME[menuItem.categoryId];
      const mainMenu = MENU_ID_TO_NAME[menuItem.mainMenuId];
      const routeName = menuItem.mainMenuId; // routeName을 mainMenuId와 동일하게 설정
      const subMenus = menuItem.subMenuIds.map(
        subMenuId => MENU_ID_TO_NAME[subMenuId],
      );

      // 중복되는 category 제거
      if (!uniqueCategories.has(category)) {
        uniqueCategories.set(category, {
          majorCategory,
          category,
          mainMenus: new Map<string, any>(),
        });
      }

      // category 내에서 중복되는 mainMenu 제거
      const categoryObj = uniqueCategories.get(category);
      if (!categoryObj.mainMenus.has(mainMenu)) {
        categoryObj.mainMenus.set(mainMenu, { mainMenu, subMenus, routeName });
      }
    });

    // 최종적으로 Map을 배열로 변환하여 반환
    return Array.from(uniqueCategories.values()).map(categoryObj => ({
      majorCategory: categoryObj.majorCategory,
      category: categoryObj.category,
      mainMenus: Array.from(categoryObj.mainMenus.values()),
    }));
  }),
});

console.log(_state.mappedMenuData);

const state = reactive({
  isInit: false as boolean | undefined,
  isHovered: false,
  category: '',
  gnbMenuList: computed<MenuInfo[]>(() => {
    return flattenMenusWithCategory(props.displayedMenu);
  }),
  selectedMenuId: computed(() => {
    const reversedMatched = clone(route.matched).reverse();
    const closestRoute = reversedMatched.find((r: any) => r.name !== undefined);
    const targetMenuId: string | any = closestRoute?.meta.menuId;
    return targetMenuId;
  }),
});

const flattenMenusWithCategory = (menu: MenuInfo[]) => {
  let flatMenu = [] as any[];

  for (let m of menu) {
    flatMenu = flatMenu.concat(flattenMenu(m, m.displayname));
  }

  return flatMenu;
};

const flattenMenu = (menu: MenuInfo, majorCategory?: string) => {
  let flatMenu = [] as any[];
  if (menu.menus && menu.menus.length > 0) {
    for (let subMenu of menu.menus) {
      if (subMenu.isAction === 'false') {
        flatMenu = flatMenu.concat(flattenMenu(subMenu, majorCategory));
      } else {
        flatMenu.push({
          majorCategory: majorCategory,
          category: menu.displayname,
          id: subMenu.id,
          parentMenuId: subMenu.parentMenuId,
          name: subMenu.name,
          displayname: subMenu.displayname,
          isAction: subMenu.isAction,
          priority: subMenu.priority,
        });
      }
    }
  }

  return flatMenu;
};

onMounted(() => {
  state.isInit = true;
});

watch(
  () => state.gnbMenuList,
  () => {
    menuPerUserStore.setFlattendMenus(state.gnbMenuList);
  },
);
</script>

<template>
  <!-- displayedMenu.parentMenuId === '' && displayedMenu.isAction === 'false' -->
  <div v-if="!isCollapsed">
    <div>
      <div v-for="(menu, idx) in _state.mappedMenuData" :key="idx" class="menu">
        <span v-if="!isMinimized" class="menu-category">{{
          menu.category
        }}</span>
        <span v-else>&nbsp;</span>
        <router-link
          v-for="(mainMenuItem, mainMenuIdx) in menu.mainMenus"
          :key="mainMenuIdx"
          class="service-menu"
          :to="{ name: `${mainMenuItem.routeName}` }"
        >
          <div class="menu-wrapper">
            <p-i
              name="ic_member"
              class="menu-button"
              width="1.25rem"
              height="1.25rem"
              color="inheirt"
            />
          </div>
          <div v-if="!isMinimized" class="menu-container">
            <span class="menu-title">{{ mainMenuItem.mainMenu }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.menu {
  @apply mb-[1.7rem];
}
.menu-category {
  font-size: 14px;
  color: #898995;
}
.service-menu {
  @apply flex items-center text-label-md mt-[8px];
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
