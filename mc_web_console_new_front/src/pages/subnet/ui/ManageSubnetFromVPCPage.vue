<script setup lang="ts">
import { ManageSubnet } from '@/widgets/cloudResources';
import { PButton } from '@cloudforet-test/mirinae';
import { ref } from 'vue';
import { useRouter } from 'vue-router/composables';
import { vpcStore } from '@/shared/libs';
import { storeToRefs } from 'pinia';

const vpcStoreInstance = vpcStore.useVpcStore();

const router = useRouter();

const { addedVPCSubnetList } = storeToRefs(vpcStoreInstance);

const handleVpcPage = () => {
  router.push({
    name: 'CloudResources',
  });
};

const saveSubnetList = () => {
  // TODO: save subnet list (api call)
  console.log(addedVPCSubnetList.value);
  router.push({
    name: 'CloudResources',
  });
};
</script>

<template>
  <manage-subnet :subnet-list="addedVPCSubnetList">
    <template #buttons>
      <p-button style-type="tertiary" @click="handleVpcPage">Cancel</p-button>
      <p-button @click="saveSubnetList">Apply</p-button>
    </template>
  </manage-subnet>
</template>
