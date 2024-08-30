import { defineStore } from 'pinia';
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
  icon: string;
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

    category: '',
    majorCategory: '',
    icon: '',
    flattenedMenus: [],
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
