<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { MENU_ID } from '@/widgets/menuCategory/ui/sidebar-config';
import { useRoute } from 'vue-router/composables';
import { clone } from 'lodash';
import { PI } from '@cloudforet-test/mirinae';
import { i18n } from '@/app/i18n';
import { useLSBStore } from '@/shared/libs/store/lsb-store';
import { useGnbStore } from '@/shared/libs/store/gnb-store';
import { storeToRefs } from 'pinia';
import { DisplayMenu } from '@/entities/menu';

const gnbStore = useGnbStore();

const { menuId } = storeToRefs(gnbStore);

// const { t } = i18n;

const lsbStore = useLSBStore();

interface GNBMenuType extends DisplayMenu {
  type: string;
  name?: string;
  disabled?: boolean;
}

interface MenuWithCategory {
  category?: string;
  menus: null[] | MenuWithCategory[];
  displayname?: string;
  id?: string;
  isAction?: string;
  name?: string;
  parentMenuId: string;
  priority?: number;
}

const props = defineProps<{
  displayedMenu: MenuWithCategory;
}>();

const route = useRoute();
// const sidebar = useSidebar();

// const { isMinimized, isCollapsed } = storeToRefs(sidebar);

const menuCategory = {
  manage: i18n.t('MENU.MANAGE'),
  analytics: i18n.t('MENU.ANALYTICS'),
  environment: i18n.t('MENU.ENVIRONMENT'),
  accountAndAccess: i18n.t('MENU.ACCOUNT_AND_ACCESS'),
};

const menuCategoryArr = Object.values(menuCategory);

const parentMenu = {
  cloudResources: i18n.t('MENU.ENVIRONMENT_CLOUD_RESOURCES'),
};

const parentMenuArr = Object.values(parentMenu);

const state = reactive({
  isInit: false as boolean | undefined,
  isHovered: false,
  gnbMenuList: computed<GNBMenuType[] | undefined>(() => {
    let results = [] as GNBMenuType[];
    const menuList = props.displayedMenu;
    if (state.isInit) {
      console.log(menuList);
    }
    // TODO: menuList.forEach
    // 1. menu.name === 'settings'
    // menu-category = menu.menus
    // submenulist => menu.menus
    //
    // 2. menu.name === 'operation'
    results = [
      {
        type: 'category',
        name: 'manage',
        disabled: false,
        show: true,
        label: i18n.t('MENU.MANAGE'),
        icon: 'ic_service_server',
        to: {
          href: '',
        },
        subMenuList: [],
        href: '',
      },
    ];
    return results;
  }),
  selectedMenuId: computed(() => {
    const reversedMatched = clone(route.matched).reverse();
    const closestRoute = reversedMatched.find((r: any) => r.name !== undefined);
    console.log(closestRoute, 'closestRoute');
    // TODO: temporary fix
    const targetMenuId: string | any = closestRoute?.meta.menuId;
    console.log('targetMenuId', targetMenuId);
    return targetMenuId;
  }),
});

onMounted(() => {
  props.displayedMenu.menus.forEach((menu, idx) => {
    menu?.menus.forEach((submenu, sidx) => {
      submenu?.isAction === 'false' && submenu.menus.length > 1
        ? lsbStore.setSubmenuInfo(submenu.displayname, submenu.menus)
        : null;
    });
  });
});

onMounted(async () => {
  state.isInit = true;
  state.gnbMenuList;
});

const refinedMenuList = (list, value) => {
  const index = list.findIndex(d => d.id === value);
  if (index !== -1) {
    const item = list.splice(index, 1)[0];
    list.push({
      ...item,
      disabled: true,
      subMenuList: [{}],
    });
  }
  return list;
};
</script>

<template>
  <div>
    <div
      v-if="
        displayedMenu.parentMenuId === '' && displayedMenu.isAction === 'false'
      "
    >
      <div v-for="(menu, idx) in displayedMenu.menus" :key="idx">
        <span class="menu-category">{{ menu?.displayname }}</span>
        <div v-for="(submenu, sidx) in menu?.menus" :key="sidx">
          <router-link
            class="service-menu"
            :to="{ name: `${submenu?.name}` }"
            :class="{
              'is-selected': state.selectedMenuId === submenu?.name,
              'is-only-label': menu?.isAction === 'true',
            }"
          >
            <div class="menu-wrapper">
              <p-i
                name="ic_service_user"
                class="menu-button"
                height="1.25rem"
                width="1.25rem"
                color="inherit"
              />
              <div class="menu-container">
                <span class="menu-title">{{ submenu?.displayname }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div v-for="(item, idx) in displayedMenu" :key="idx">
      <div
        v-if="
          !displayedNames.has(item.name) && menuCategoryArr.includes(item.name)
        "
      >
        <span class="menu-category">{{ item.name }}</span>
      </div>
      <router-link
        v-if="parentMenuArr.includes(item.displayname)"
        class="service-menu"
        :to="{ name: 'cloudResources' }"
        :class="{
          'is-selected': state.selectedMenuId === item.name,
          'is-only-label': item.isAction === 'true',
        }"
      >
        <div class="menu-wrapper">
          <p-i
            name="ic_service_user"
            class="menu-button"
            height="1.25rem"
            width="1.25rem"
            color="inherit"
          />
          <div class="menu-container">
            <span class="menu-title">{{ item.displayname }}</span>
          </div>
        </div>
      </router-link>
    </div> -->
  </div>
</template>

<style scoped lang="postcss">
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
