import { defineStore } from 'pinia';

interface Subnet {
  subnetName: string;
  cidrBlock: string;
}

interface VPC {
  vpcName?: string;
  description?: string;
  selectedConnection: string;
  cidrBlock?: string;
  subnetList?: Subnet[];
}

export const useVpcStore = defineStore('vpc-store', {
  state: () => ({
    createVpcModalVisible: false,
    selectedProviderType: 'All',
    withSubnet: false,
    // TODO: api연결 후 받아온 데이터 형식에 맞게 구현 예정
    // 이미 있는 vpc의 원래의 subnetlist
    addedSubnetList: [
      {
        subnetName: 'subnetname-aws-northeast-1',
        cidrBlock: '10.33.0.0/15',
      },
    ] as Subnet[],

    // 새로 만드는 vpc의 새로운 subnetlist
    addedVPCSubnetList: [
      {
        subnetName: '',
        cidrBlock: '',
      },
    ] as Subnet[],
    createdVpc: {
      vpcName: '',
      description: '',
      selectedConnection: '',
      cidrBlock: '',
      subnetList: [] as Subnet[],
    },
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
    removeWithSubnet() {
      this.withSubnet = false;
    },
    setaddedVPCSubnetList(subnetList: Subnet[]) {
      this.addedVPCSubnetList = [...this.addedVPCSubnetList, ...subnetList];
    },
    removeVPCSubnet(index: number) {
      this.addedVPCSubnetList = this.addedVPCSubnetList.filter(
        (_, i) => i !== index,
      );
    },
    setCreatedVpcList(vpcList: any) {
      this.createdVpc = { ...vpcList };
    },

    setCreatedVpcSubnetList(subnetList: Subnet[]) {
      this.createdVpc.subnetList = [...subnetList];
    },
    removeCreatedVpc() {
      this.createdVpc.vpcName = '';
      this.createdVpc.description = '';
      this.createdVpc.selectedConnection = '';
      this.createdVpc.cidrBlock = '';
      this.createdVpc.subnetList = [];
    },
  },
});
