<script setup lang="ts">
import {
  PButtonModal,
  PPaneLayout,
  PTextInput,
  PFieldGroup,
  PTextarea,
  PRadio,
  PEmpty,
  PToggleButton,
  PDivider,
  PLink,
} from '@cloudforet-test/mirinae';
import { computed, reactive, ref } from 'vue';
import { vpcStore } from '@/shared/libs';
import { ListDropDown } from '@/widgets/layout/listDropDown';

const vpcStoreInstance = vpcStore.useVpcStore();

const isConnectionEmpty = ref<boolean>(true);
const selectedConnection = ref<any>();
const isWithSubnet = ref<boolean>(false);

const PROVIDER_LIST = ['AWS', 'Azure', 'Google'];
const LOCATION_LIST = ['Asia Pracific', 'Europe', 'North America'];
const REGION_LIST = ['Seoul', 'Tokyo', 'Singapore'];

// TODO: change api response
const state = reactive({
  provider: PROVIDER_LIST.flatMap(provider => {
    return { name: provider };
  }),
  selectedProvider: '',
  location: LOCATION_LIST.flatMap(location => {
    return { name: location };
  }),
  selectedLocation: '',
  region: REGION_LIST.flatMap(region => {
    return { name: region };
  }),
  selectedRegion: '',
  connectionList: computed(() => {
    return [
      { key: 'connection1', name: 'Connection 1' },
      { key: 'connection2', name: 'Connection 2' },
      { key: 'connection3', name: 'Connection 3' },
    ];
  }),
});

const textData = reactive({
  vpcName: '',
  description: '',
  selectedConnection: '',
  cidrBlock: '',
});

const isSelectedProvider = computed(() => {
  return state.selectedProvider !== '';
});
const isSelectedLocation = computed(() => {
  return state.selectedLocation !== '';
});

const handleCheck = (value: boolean) => {
  isWithSubnet.value = value;
};

const handleClose = () => {
  vpcStoreInstance.setCreateVpcModalVisible(false);
};

const handleClickProvider = (prv: string) => {
  state.selectedProvider = prv;
};

const handleClickLocation = (location: string) => {
  state.selectedLocation = location;
};

const handleClickRegion = (region: string) => {
  state.selectedRegion = region;
};
</script>

<template>
  <p-button-modal
    :visible="true"
    header-title="Create VPC"
    size="md"
    @close="handleClose"
    @cancel="handleClose"
    @confirm="handleClose"
  >
    <template #body>
      <p-pane-layout class="create-vpc-layout">
        <div class="create-vpc">
          <p-pane-layout class="layout layout-top">
            <p-field-group label="VPC Name">
              <p-text-input v-model="textData.vpcName" placeholder="VPC Name" />
            </p-field-group>
            <p-field-group label="Description">
              <p-textarea />
            </p-field-group>
          </p-pane-layout>
          <p-pane-layout class="layout layout-middle">
            <p>Connection</p>
            <div class="select-container">
              <list-drop-down
                :menu="state.provider"
                :list="PROVIDER_LIST"
                @update:selectedItem="handleClickProvider"
              />
              <list-drop-down
                :menu="state.location"
                :list="LOCATION_LIST"
                :is-disabled="!isSelectedProvider"
                @update:selectedItem="handleClickLocation"
              />
              <list-drop-down
                :menu="state.region"
                :list="REGION_LIST"
                :is-disabled="!isSelectedLocation"
                @update:selectedItem="handleClickRegion"
              />
            </div>
            <div v-if="isConnectionEmpty" class="connection-data">
              <p-radio
                v-for="(connection, idx) in state.connectionList"
                :key="connection.key"
                v-model="selectedConnection"
                class="radio-button"
                :value="connection.key"
              >
                <!-- :value="connection" -->
                {{ connection.name }}
              </p-radio>
            </div>
            <div v-else class="empty-image">
              <p-empty show-image image-size="sm" title="No Data">
                Select Provider and Region
              </p-empty>
            </div>
          </p-pane-layout>
          <p-pane-layout class="layout layout-bottom">
            <p-field-group label="CIDR Block">
              <p-text-input placeholder="ex) 10.0.0.1/24" />
            </p-field-group>
          </p-pane-layout>
          <p-pane-layout class="layout with-subnet">
            <div class="subnet-toggle">
              <p-toggle-button
                :value="isWithSubnet"
                @change-toggle="handleCheck"
              />
              <span>With subnet</span>
            </div>
            <p-divider class="divider" />
            <p-link
              text="Go add subnet"
              :to="{ name: 'subnets' }"
              :highlight="isWithSubnet"
              :disabled="!isWithSubnet"
              action-icon="internal-link"
            />
          </p-pane-layout>
        </div>
      </p-pane-layout>
    </template>
    <template #close-button>
      <span>Cancel</span>
    </template>
    <template #confirm-button>
      <!-- TODO: disable 처리 -->
      <span>Confirm</span>
    </template>
  </p-button-modal>
</template>

<style scoped lang="postcss">
:deep(.modal-content) {
  min-height: 57.5rem;
}
.create-vpc-layout {
  @apply bg-[#F7F7F7] p-[1rem] border-none;
  p {
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    .optional {
      margin-left: 0.25rem;
      color: #898995;
      font-size: 0.75rem;
      font-weight: 400;
    }
  }
  .create-vpc {
    .p-field-group {
      margin-bottom: 0;
    }
  }
  .p-text-input {
    @apply mb-[0.75rem];
  }
  .layout {
    @apply p-[0.75rem] mb-[1rem];
  }
  .layout-middle {
    .select-container {
      @apply flex gap-[0.25rem];
      .text-container {
        padding: 0.5rem;
        cursor: pointer;
        &:hover {
          @apply bg-blue-100;
        }
        &.selected {
          @apply bg-blue-200;
        }
        .select-text {
          font-size: 0.875rem;
          font-weight: 400;
        }
      }
    }
    .connection-data {
      @apply mt-[1.1875rem] mb-[3.6875rem] flex flex-col;
      .radio-button {
        @apply p-[0.5rem];
      }
      .selected {
        @apply bg-[#E0F2FF];
      }
    }
    .empty-image {
      @apply flex justify-evenly w-full h-full overflow-auto p-8;
    }
  }
  .layout-bottom {
    .p-text-input {
      @apply mb-0;
    }
  }
  .with-subnet {
    margin-bottom: 0;
    .subnet-toggle {
      @apply flex gap-[0.5rem];
      span {
        font-size: 0.875rem;
        font-weight: 700;
      }
    }
    .divider {
      @apply my-[0.75rem];
    }
  }
}
:deep(.p-select-dropdown) {
  @apply w-[14rem];
}
</style>
