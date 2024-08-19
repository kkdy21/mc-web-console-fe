import { defineStore } from 'pinia';

export const useSidebar = defineStore('sidebar', {
  state: () => ({
    isCollapsed: false,
    isMinimized: false,
  }),
  getters: {},
  actions: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleMinimize() {
      this.isMinimized = !this.isMinimized;
    },
  },
});
