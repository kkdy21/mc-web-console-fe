<script setup lang="ts">
import { ManageSubnet } from '@/widgets/cloudResources';
import { PButton } from '@cloudforet-test/mirinae';
import { useRouter } from 'vue-router/composables';
import { vpcStore } from '@/shared/libs';
import { storeToRefs } from 'pinia';
import { i18n } from '@/app/i18n';
import { computed, onMounted, reactive, watchEffect } from 'vue';

const vpcStoreInstance = vpcStore.useVpcStore();

const router = useRouter();

const { addedVPCSubnetList } = storeToRefs(vpcStoreInstance);

const handleVpcPage = () => {
  vpcStoreInstance.removeVPCSubnetList();
  router.push({
    name: 'CloudResources',
  });
};

const saveSubnetList = () => {
  // vpcStoreInstance.setAddedVPCSubnetList(createdVpc.value.subnetList);

  // TODO: api call (subnet create)
  // vpcStoreInstance.removeVPCSubnetList();

  router.push({
    name: 'CloudResources',
  });
};

const state = reactive({
  subnetList: computed((): any => {
    return addedVPCSubnetList.value;
  }),
});

onMounted(() => {
  console.log(state.subnetList);
});

watchEffect(() => {
  console.log(state.subnetList);
});
</script>

<template>
  <manage-subnet :subnet-list="state.subnetList">
    <template #buttons>
      <p-button style-type="tertiary" @click="handleVpcPage">
        {{ i18n.t('COMPONENT.BUTTON_MODAL.CANCEL') }}
      </p-button>
      <p-button @click="saveSubnetList">
        {{ i18n.t('COMPONENT.BUTTON_MODAL.APPLY') }}
      </p-button>
    </template>
  </manage-subnet>
</template>
