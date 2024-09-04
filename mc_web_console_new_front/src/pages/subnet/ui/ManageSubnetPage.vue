<script setup lang="ts">
import { PI, PButton, PTextInput, PFieldGroup } from '@cloudforet-test/mirinae';
import { WidgetLayout } from '@/widgets/widgetLayout';
import { useRouter } from 'vue-router/composables';
import { ref } from 'vue';

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

const deleteSelectedSubnet = (index: number) => {
  subnetList.value.splice(index, 1);
};

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

const handleAddingSubnet = () => {
  subnetList.value.push({
    subnetName: '',
    cidrBlock: '',
  });
};
</script>

<template>
  <div class="subnet-page-layer">
    <div class="subnet-page-top">
      <p-i name="ic_arrow-left" width="2rem" height="2rem" />
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
                :invalid="!subnet.subnetName"
                :value="subnet.subnetName"
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
              class="icon-close"
              name="ic_close"
              @click="deleteSelectedSubnet(idx)"
            />
          </div>
        </div>
      </template>
    </widget-layout>
    <div class="action-buttons">
      <p-button style-type="tertiary" @click="handleVpcPage">Cancel</p-button>
      <p-button @click="saveSubnetList">Save</p-button>
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
  }
}

.widget-layout {
  min-height: 45.25rem;
  .icon-plus {
    @apply mb-[1.5rem];
  }
  .subnet-list {
    .title-wrapper {
      @apply flex gap-[14.625rem] mb-[1rem];
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

:deep(.p-text-input) {
  @apply w-[20.875rem];
}

.action-buttons {
  @apply flex justify-end gap-[1rem] mt-[1.5rem];
}
</style>
