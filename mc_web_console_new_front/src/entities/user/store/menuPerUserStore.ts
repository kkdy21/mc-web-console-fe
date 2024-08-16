import { defineStore } from 'pinia';

export interface UserMenuInfo {
  userId: string;
  menus: string[];
}

export const useMenuPerUserStore = defineStore('menuPerUser', {
  state: () => ({
    userMenuInfo: {
      userId: 'demo_user-1',
      menus: [
        // TODO: api 구현 후 받아올 예정 (우선 임시 데이터) 1️⃣
        'dashboard',
        'workspaces',
        'project',
        'workflows',
        'thirdPartyMonitoringTool',
      ],
    },
  }),
  actions: {},
  getters: {
    // TODO: 로그인 후 userId를 통해 해당 유저의 userMenuInfo 불러오기 (1️⃣)
    async getUserMenuInfo() {
      // TODO: api 구현 후 받아올 예정 (우선 임시 데이터) 2️⃣
      return;
    },
  },
});
