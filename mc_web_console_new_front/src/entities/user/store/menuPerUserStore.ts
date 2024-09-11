import { defineStore } from 'pinia';

export interface Menu {
  id: string;
  parentMenuId: string;
  name: string;
  displayname: string;
  isAction: string;
  priority: string;
  menus?: Menu[];
}
export interface MenuInfo {
  settingMenu: Menu;

  operationMenu: Menu;

  category: string;
  majorCategory: string;
  icon: string;
  flattenedMenus: Menu[];
  selectedSubmenu: string;
}

export const useMenuPerUserStore = defineStore('menuPerUser', {
  state: (): MenuInfo => ({
    settingMenu: {
      id: '',
      parentMenuId: '',
      name: '',
      displayname: '',
      isAction: '',
      priority: '',
      menus: [],
    } as Menu,

    operationMenu: {
      id: '',
      parentMenuId: '',
      name: '',
      displayname: '',
      isAction: '',
      priority: '',
      menus: [],
    } as Menu,

    category: '',
    majorCategory: '',
    icon: '',
    flattenedMenus: [],
    selectedSubmenu: '',
  }),
  actions: {
    setUserMenuInfo(menu: any) {
      this.settingMenu = menu;
    },
    setOperationMenuInfo(menu: any) {
      this.operationMenu = menu;
    },
    setFlattendMenus(menu: Menu[]) {
      this.flattenedMenus = menu;
    },
    setBreadcrumbs(category: string, majorCategory: string) {
      this.category = category;
      this.majorCategory = majorCategory;
    },
    setSelectedSubmenu(submenu: string) {
      this.selectedSubmenu = submenu;
    },
    setIconId(iconId: string) {
      this.icon = iconId;
    },
  },
  getters: {},
});
