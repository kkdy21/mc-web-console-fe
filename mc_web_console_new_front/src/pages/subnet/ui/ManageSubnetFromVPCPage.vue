<script setup lang="ts">
import { ManageSubnet } from '@/widgets/cloudResources';
import { PButton } from '@cloudforet-test/mirinae';
import { ref } from 'vue';
import { useRouter } from 'vue-router/composables';

const router = useRouter();

const subnetList = ref([
  {
    subnetName: '',
    cidrBlock: '',
  },
]);

const handleVpcPage = () => {
  router.push({
    name: 'CloudResources',
  });
};

const saveSubnetList = () => {
  // TODO: save subnet list (api call)
  router.push({
    name: 'CloudResources',
  });
};
</script>

<template>
  <manage-subnet :subnet-list="subnetList">
    <template #buttons>
      <p-button style-type="tertiary" @click="handleVpcPage">Cancel</p-button>
      <p-button @click="saveSubnetList">Apply</p-button>
    </template>
  </manage-subnet>
</template>
