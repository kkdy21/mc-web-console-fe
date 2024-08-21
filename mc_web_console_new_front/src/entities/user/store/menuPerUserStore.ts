import { defineStore } from 'pinia';

export interface MenuWithSubMenu {
  menuId: string;
  subMenuList: string[];
}
export interface UserMenuInfo {
  userId: string;
  menus: MenuWithSubMenu[];
}

export const useMenuPerUserStore = defineStore('menuPerUser', {
  state: () => ({
    userMenuInfo: {
      userId: 'demo_user-1',
      menus: [
        {
          menuId: 'dashboard',
          subMenuList: ['dashboard1'],
        },
        {
          menuId: 'workspaces',
          subMenuList: [],
        },
        {
          menuId: 'project',
          subMenuList: [],
        },
        {
          menuId: 'workflows',
          subMenuList: [],
        },
        {
          menuId: 'thirdPartyMonitoringTool',
          subMenuList: [],
        },
        {
          menuId: 'cloudSps',
          subMenuList: [],
        },
      ],
    },
    processedUserMenuInfo: [],
  }),
  actions: {
    setProcessedUserMenuInfo(displayedMenu: any) {
      console.log(displayedMenu);
      this.processedUserMenuInfo = displayedMenu;
    },
  },
  getters: {
    // TODO: 로그인 후 userId를 통해 해당 유저의 userMenuInfo 불러오기 (1️⃣)
    async getUserMenuInfo() {
      // TODO: api 구현 후 받아올 예정 (우선 임시 데이터) 2️⃣
      return;
    },
  },
});
