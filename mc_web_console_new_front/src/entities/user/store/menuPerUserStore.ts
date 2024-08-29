import { defineStore } from 'pinia';

export interface MenuWithSubMenu {
  // menuId: string;
  // subMenuList: string[];
}
// export interface UserMenuInfo {
//   userId: string;
//   menus: MenuWithSubMenu[];
// }

export interface MenuInfo {
  id: string;
  parentMenuId: string;
  name: string;
  displayname: string;
  isAction: string;
  priority: string;
  menus?: MenuInfo[];
  category?: string;
  majorCategory?: string;
  flattenedMenus?: MenuInfo[];
  selectedSubmenu?: string;
}

export const useMenuPerUserStore = defineStore('menuPerUser', {
  state: (): MenuInfo => ({
    id: '',
    parentMenuId: '',
    name: '',
    displayname: '',
    isAction: '',
    priority: '',
    menus: [],
    flattenedMenus: [],
    majorCategory: '',
    category: '',
    selectedSubmenu: '',
  }),
  actions: {
    setUserMenuInfo(menu: MenuInfo) {
      this.id = menu.id;
      this.parentMenuId = menu.parentMenuId;
      this.name = menu.name;
      this.displayname = menu.displayname;
      this.isAction = menu.isAction;
      this.priority = menu.priority;
      this.menus = menu.menus;
    },
    setFlattendMenus(menu: MenuInfo[]) {
      this.flattenedMenus = menu;
    },
    setBreadcrumbs(category: string, majorCategory: string) {
      this.category = category;
      this.majorCategory = majorCategory;
    },
    setSelectedSubmenu(submenu: string) {
      this.selectedSubmenu = submenu;
    },
  },
  getters: {},
});
