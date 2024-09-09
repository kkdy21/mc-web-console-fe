import { defineStore } from 'pinia';

interface Subnet {
  name: string;
  ipv4_CIDR: string;
}

interface VPC {
  vpcName?: string;
  description?: string;
  cidrBlock?: string;
  provider: string;
  connection: string;
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
        name: 'subnetname-aws-northeast-1',
        ipv4_CIDR: '10.33.0.0/15',
      },
    ] as Subnet[],

    // 새로 만드는 vpc의 새로운 subnetlist
    addedVPCSubnetList: [
      {
        name: '',
        ipv4_CIDR: '',
      },
    ] as Subnet[],
    allVPCsList: [] as VPC[],
    createdVpc: {
      vpcName: '',
      description: '',
      selectedConnection: '',
      cidrBlock: '',
      subnetList: [] as any[],
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
      this.createdVpc.subnetList = subnetList;
    },
    removeCreatedVpc() {
      this.createdVpc.vpcName = '';
      this.createdVpc.description = '';
      this.createdVpc.selectedConnection = '';
      this.createdVpc.cidrBlock = '';
      this.createdVpc.subnetList = [];
    },
    setAllVPCsList(vpcList: VPC[]) {
      this.allVPCsList = vpcList;
    },
  },
});
