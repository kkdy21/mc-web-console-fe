import { defineStore } from 'pinia';

interface Subnet {
  subnetName: string;
  cidrBlock: string;
}

export const useVpcStore = defineStore('vpc-store', {
  state: () => ({
    createVpcModalVisible: false,
    selectedProviderType: 'All',
    withSubnet: false,
    // TODO: api연결 후 받아온 데이터 형식에 맞게 구현 예정
    // 이미 있는 vpc의 원래의 subnetlist
    addedSubnetList: [] as Subnet[],

    // 새로 만드는 vpc의 새로운 subnetlist
    addedVPCSubnetList: [
      {
        subnetName: '',
        cidrBlock: '',
      },
    ] as Subnet[],
  }),
  getters: {},
  actions: {
    setCreateVpcModalVisible(visible: boolean) {
      this.createVpcModalVisible = visible;
    },
    setSelectedProviderType(providerType: string) {
      this.selectedProviderType = providerType;
    },
    setWithSubnet(withSubnet: boolean) {
      this.withSubnet = withSubnet;
    },
    setaddedVPCSubnetList(subnetList: Subnet[]) {
      this.addedVPCSubnetList = [...this.addedVPCSubnetList, ...subnetList];
    },
    removeVPCSubnet(index: number) {
      this.addedVPCSubnetList = this.addedVPCSubnetList.filter(
        (_, i) => i !== index,
      );
    },
  },
});
