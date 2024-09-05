<script setup lang="ts">
import {
  PI,
  PButton,
  PIconButton,
  PTextInput,
  PFieldGroup,
} from '@cloudforet-test/mirinae';
import { WidgetLayout } from '@/widgets/layout';
import { ref } from 'vue';
import { useRouter } from 'vue-router/composables';
import { vpcStore } from '@/shared/libs';

const vpcStoreInstance = vpcStore.useVpcStore();

const router = useRouter();

interface Props {
  subnetList: {
    subnetName: string;
    cidrBlock: string;
  }[];
}

const props = defineProps<Props>();

// TODO: change api response
const subnetList = ref(props.subnetList);

const deleteSelectedVPCSubnet = (index: number) => {
  // vpcStoreInstance.removeVPCSubnet(index);
  vpcStoreInstance.removeVPCSubnet(index);
};

const deleteSelectedSubnet = (index: number) => {
  // subnetList.value.splice(index, 1);
  // vpcStoreInstance.removeSubnet(index);
};
const handleAddingSubnet = () => {
  subnetList.value.push({
    subnetName: '',
    cidrBlock: '',
  });
};

const handleGoBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="subnet-page-layer">
    <div class="subnet-page-top">
      <p-icon-button
        style-type="transparent"
        name="ic_arrow-left"
        width="2rem"
        height="2rem"
        @click="handleGoBack"
      />
      <p>Subnet</p>
    </div>
    <widget-layout
      class="widget-layout"
      title="Manage your subnets."
      overflow="auto"
    >
      <template #default>
        <p-button
          class="icon-plus"
          icon-left="ic_plus"
          style-type="secondary"
          @click="handleAddingSubnet"
        >
          Add Subnet
        </p-button>
        <div class="subnet-list">
          <p class="title-wrapper">
            <span class="title">Subnet Name</span>
            <span class="title">CIDR Block</span>
          </p>
          <div
            v-for="(subnet, idx) in subnetList"
            :key="idx"
            ref="subnetInput"
            class="input-wrapper"
          >
            <p-field-group
              :invalid="!subnet.subnetName"
              :invalid-text="'No Subnet Name'"
            >
              <p-text-input
                v-model="subnet.subnetName"
                :invalid="!subnet.subnetName"
              />
            </p-field-group>
            <!-- :disabled="subnet.subnetName.length > 0" -->
            <p-field-group
              :invalid="!subnet.cidrBlock"
              :invalid-text="'No CIDR Block'"
            >
              <p-text-input
                v-model="subnet.cidrBlock"
                :invalid="!subnet.cidrBlock"
              />
            </p-field-group>
            <!-- :disabled="subnet.cidrBlock.length > 0" -->
            <p-i
              v-if="router.currentRoute.name === 'vpcSubnets'"
              class="icon-close"
              name="ic_close"
              @click="deleteSelectedVPCSubnet(idx)"
            />
            <p-i
              v-else
              class="icon-close"
              name="ic_close"
              @click="deleteSelectedSubnet(idx)"
            />
          </div>
        </div>
      </template>
    </widget-layout>
    <div class="action-buttons">
      <slot name="buttons" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.subnet-page-layer {
  @apply px-[1.5rem] py-[1.5rem];
  .subnet-page-top {
    @apply flex gap-[0.75rem];
    p {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.375rem;
    }
    .go-back {
      cursor: pointer;
    }
  }
}

.widget-layout {
  min-height: 45.25rem;
  .icon-plus {
    @apply mb-[1.5rem];
  }
  .subnet-list {
    .title-wrapper {
      @apply flex gap-[9.25rem] mb-[1rem];
      .title {
        font-size: 1rem;
        font-weight: 700;
      }
    }
  }
}

.input-wrapper {
  @apply flex gap-[1rem];
  .icon-close {
    cursor: pointer;
    margin-top: 4px;
  }
}

.action-buttons {
  @apply flex justify-end gap-[1rem] mt-[1.5rem];
}
</style>
