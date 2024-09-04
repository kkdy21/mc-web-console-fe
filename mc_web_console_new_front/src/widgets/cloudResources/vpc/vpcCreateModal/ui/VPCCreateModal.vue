<script setup lang="ts">
import {
  PButtonModal,
  PPaneLayout,
  PTextInput,
  PTextarea,
  PSelectDropdown,
  PRadio,
  PEmpty,
  PToggleButton,
  PDivider,
  PLink,
} from '@cloudforet-test/mirinae';
import { computed, reactive, ref } from 'vue';
import { vpcStore } from '@/shared/libs';

const emit = defineEmits(['closeModal']);

const isConnectionEmpty = ref<boolean>(true);
const selectedConnection = ref<any>();
const isWithSubnet = ref<boolean>(false);

// TODO: change api response
const state = reactive({
  provider: computed(() => {
    return 'AWS';
  }),
  location: computed(() => {
    return 'Asia Pracific';
  }),
  region: computed(() => {
    return 'Seoul';
  }),
  connectionList: computed(() => {
    return [
      { key: 'connection1', name: 'Connection 1' },
      { key: 'connection2', name: 'Connection 2' },
      { key: 'connection3', name: 'Connection 3' },
    ];
  }),
});

const isSelectedProvider = computed(() => {
  return state.provider !== '';
});
const isSelectedLocation = computed(() => {
  return state.location !== '';
});

const handleCheck = (value: boolean) => {
  isWithSubnet.value = value;
};

const vpcStoreInstance = vpcStore.useVpcStore();
const handleClose = () => {
  vpcStoreInstance.setCreateVpcModalVisible(false);
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
            <p>VPC Name</p>
            <p-text-input placeholder="VPC Name" />
            <p>
              <span>Description</span>
              <span class="optional">(optional)</span>
            </p>
            <p-textarea />
          </p-pane-layout>
          <p-pane-layout class="layout layout-middle">
            <p>Connection</p>
            <div class="select-container">
              <p-select-dropdown :menu="['AWS', 'Azure', 'Google']">
                <template #dropdown-button>
                  <div>
                    <span>{{ state.provider }}</span>
                  </div>
                </template>
              </p-select-dropdown>
              <p-select-dropdown :disabled="!isSelectedProvider">
                <template #dropdown-button>
                  <div>
                    <span>{{ state.location }}</span>
                  </div>
                </template>
              </p-select-dropdown>
              <p-select-dropdown :disabled="!isSelectedLocation">
                <template #dropdown-button>
                  <div>
                    <span>{{ state.region }}</span>
                  </div>
                </template>
              </p-select-dropdown>
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
            <p>CIDR Block</p>
            <p-text-input class="cidr-text" placeholder="ex) 10.0.0.1/24" />
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
              new-tab
            />
          </p-pane-layout>
        </div>
      </p-pane-layout>
    </template>
    <template #close-button>
      <span>Cancel</span>
    </template>
    <template #confirm-button>
      <span>Confirm</span>
    </template>
  </p-button-modal>
</template>

<style scoped lang="postcss">
:deep(.modal-content) {
  min-height: 56.125rem;
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
  .p-text-input {
    @apply mb-[0.75rem];
  }
  .layout {
    @apply p-[0.75rem] mb-[1rem];
  }
  .layout-middle {
    .select-container {
      @apply flex gap-[0.25rem];
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
    .cidr-text {
      margin: 0;
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
