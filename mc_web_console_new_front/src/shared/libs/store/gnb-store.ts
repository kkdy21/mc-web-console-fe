import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import type { TranslateResult } from 'vue-i18n';
import type { Location } from 'vue-router';
import { useUserWorkspaceStore } from './user-workspace-store';

interface Breadcrumb {
  name: TranslateResult | string;
  to?: Location;
  copiable?: boolean;
  data?: {
    id: string;
    name: string;
  };
}

interface GnbStoreState {
  breadcrumbs: Breadcrumb[];
  selectedItem: Breadcrumb;
  id?: string;
  favoriteItem?: any;
  isHideNavRail?: boolean;
  isMinimizeNavRail?: boolean;
  metricExamples: any;
}

export const useGnbStore = defineStore('gnb', {
  state: () => ({
    menuId: '',
  }),
  getters: {},
  actions: {
    setMenuId(menuId: string) {
      this.menuId = menuId;
    },
  },
});

// export const useGnbStore = defineStore('gnb', () => {
//   const userWorkspaceStore = useUserWorkspaceStore();

//   const _getters = reactive({
//     currentWorkspaceId: computed(
//       () => userWorkspaceStore.getters.currentWorkspaceId as string,
//     ),
//   });

//   const state = reactive<GnbStoreState>({
//     breadcrumbs: [],
//     selectedItem: {} as Breadcrumb,
//     id: '',
//     favoriteItem: {} as any,
//     metricExamples: {},
//     isHideNavRail: false,
//     isMinimizeNavRail: false,
//   });

//   const getters = reactive({
//     breadcrumbs: computed<Breadcrumb[]>(() => state.breadcrumbs),
//     selectedItem: computed<Breadcrumb>(() => state.selectedItem),
//     id: computed<string | undefined>(() => state.id),
//     favoriteItem: computed(() => state.favoriteItem),
//     metricExamples: computed(() => state.metricExamples),
//     isHideNavRail: computed<boolean | undefined>(() => state.isHideNavRail),
//     isMinimizeNavRail: computed<boolean | undefined>(
//       () => state.isMinimizeNavRail,
//     ),
//   });

//   const actions = {};
// });
