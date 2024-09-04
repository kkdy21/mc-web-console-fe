import { defineStore } from 'pinia';

export const useVpcStore = defineStore('vpc-store', {
  state: () => ({
    createVpcModalVisible: false,
    selectedProviderType: 'All',
  }),
  getters: {},
  actions: {
    setCreateVpcModalVisible(visible: boolean) {
      this.createVpcModalVisible = visible;
    },
    setSelectedProviderType(providerType: string) {
      this.selectedProviderType = providerType;
    },
  },
});
