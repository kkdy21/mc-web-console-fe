<script setup lang="ts">
import { ManageSubnet } from '@/widgets/cloudResources';
import { PButton } from '@cloudforet-test/mirinae';
import { ref } from 'vue';
import { useRouter } from 'vue-router/composables';
import { vpcStore } from '@/shared/libs';
import { storeToRefs } from 'pinia';

const vpcStoreInstance = vpcStore.useVpcStore();
const { addedSubnetList } = storeToRefs(vpcStoreInstance);

const router = useRouter();

// TODO: change api response
const subnetList = ref([
  {
    subnetName: 'subnet1',
    cidrBlock: '10. 0. 0. 0/24',
  },
  {
    subnetName: 'subnet2',
    cidrBlock: '10. 0. 1. 0/24',
  },
  {
    subnetName: 'subnet3',
    cidrBlock: '10. 0. 2. 0/24',
  },
]);

const saveSubnetList = () => {
  // TODO: save subnet list (api call)
  router.push({
    name: 'CloudResources',
  });
};

const handleVpcPage = () => {
  router.push({
    name: 'CloudResources',
  });
};
</script>

<template>
  <manage-subnet :subnet-list="addedSubnetList">
    <template #buttons>
      <p-button style-type="tertiary" @click="handleVpcPage">Cancel</p-button>
      <p-button @click="saveSubnetList">Save</p-button>
    </template>
  </manage-subnet>
</template>
