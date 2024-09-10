<script setup lang="ts">
import { ManageSubnet } from '@/widgets/cloudResources';
import { PButton } from '@cloudforet-test/mirinae';
import { useRouter } from 'vue-router/composables';
import { vpcStore } from '@/shared/libs';
import { storeToRefs } from 'pinia';
import { computed, reactive } from 'vue';

const vpcStoreInstance = vpcStore.useVpcStore();
const { addedSubnetList } = storeToRefs(vpcStoreInstance);

const router = useRouter();

// TODO: change api response

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

const state = reactive({
  subnetList: computed((): any => {
    return addedSubnetList;
  }),
});
</script>

<template>
  <manage-subnet :subnet-list="state.subnetList">
    <template #buttons>
      <p-button style-type="tertiary" @click="handleVpcPage">Cancel</p-button>
      <p-button @click="saveSubnetList">Save</p-button>
    </template>
  </manage-subnet>
</template>
