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
  flattendMenus?: MenuInfo[];
}

export const useMenuPerUserStore = defineStore('menuPerUser', {
  // state: (): UserMenuInfo => ({
  //   // userMenuInfo: {
  //   //   menus: [
  //   //     {
  //   //       menuId: 'dashboard',
  //   //       subMenuList: ['dashboard1'],
  //   //     },
  //   //     {
  //   //       menuId: 'workspaces',
  //   //       subMenuList: [],
  //   //     },
  //   //     {
  //   //       menuId: 'project',
  //   //       subMenuList: [],
  //   //     },
  //   //     {
  //   //       menuId: 'workflows',
  //   //       subMenuList: [],
  //   //     },
  //   //     {
  //   //       menuId: 'thirdPartyMonitoringTool',
  //   //       subMenuList: [],
  //   //     },
  //   //     {
  //   //       menuId: 'cloudSps',
  //   //       subMenuList: [],
  //   //     },
  //   //   ],
  //   // },
  //   // processedUserMenuInfo: [],

  // }),
  state: (): MenuInfo => ({
    id: '',
    parentMenuId: '',
    name: '',
    displayname: '',
    isAction: '',
    priority: '',
    menus: [],
    flattendMenus: [],

    // userMenuInfo: [
    //   {
    //     id: '',
    //     parentMenuId: '',
    //     name: '',
    //     displayname: '',
    //     isAction: '',
    //     priority: '',
    //     menus: [],
    //   },
    // ],
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
      // this.userMenuInfo.push({
      //   id: menu.id,
      //   parentMenuId: menu.parentMenuId,
      //   name: menu.name,
      //   displayname: menu.displayname,
      //   isAction: menu.isAction,
      //   priority: menu.priority,
      //   menus: menu.menus,
      // });
    },
    setFlattendMenus(menu: MenuInfo[]) {
      this.flattendMenus = menu;
    },
    // setProcessedUserMenuInfo(displayedMenu: any) {
    //   this.processedUserMenuInfo = displayedMenu;
    // },
  },
  getters: {},
});
