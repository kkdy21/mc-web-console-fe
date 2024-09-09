<script setup lang="ts">
import { i18n } from '@/app/i18n';
import {
  PButton,
  PFieldGroup,
  PSelectDropdown,
  PTextInput,
} from '@cloudforet-test/mirinae';
import {
  useEditWorkspaceList,
  useGetWorkspaceList,
} from '@/entities/workspace/api';
import { onMounted, reactive, watch } from 'vue';
import { IWorkspaceData } from '@/entities/workspace/model/types.ts';
import { UserInformationTableType, UserWorkspaceTableType } from '@/entities';
import { axiosInstance } from '@/shared/libs/api/instance.ts';
import { showErrorMessage, showSuccessMessage } from '@/shared/utils';

interface IProps {
  id?: string;
  fullName?: string;
  role?: string;
  workspaces?: Partial<
    Record<
      UserInformationTableType | UserWorkspaceTableType | 'originalData',
      any
    >
  >[];
}

interface IMenu {
  name: string;
  label: string;
  type: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(['close']);

const workspaceList = reactive({
  menu: [],
  selected: [],
  resWorkspaceList: useGetWorkspaceList(),
  resEditWorkspaceList: useEditWorkspaceList(null),
});

const roleList = reactive({
  menu: [{ name: 'ac3ebd80-a089-4341-8fe6-44c5a8073ec4', label: 'testRole' }],
  selected: [],
});

const organizWorkspaceListToDropDownMenu = (
  workspace: IWorkspaceData,
): IMenu => {
  return {
    name: workspace.id,
    label: workspace.name,
    type: 'item',
  };
};

onMounted(() => {
  workspaceList.resWorkspaceList.execute().then(res => {
    if (res.data.responseData && res.data.responseData.length > 0) {
      workspaceList.menu = res.data.responseData.map(workspace =>
        organizWorkspaceListToDropDownMenu(workspace),
      );
      workspaceList.selected = workspaceList.menu.filter(workspace =>
        props.workspaces!.some(
          diffWorkspace => workspace.name === diffWorkspace.userId,
        ),
      );
    }
  });
});

const handleConfirm = async () => {
  try {
    const EDIT_USER_WORKSPACE_MAPPING = 'createworkspaceuserrolemappingbyname';

    const promiseArr = workspaceList.selected.map(workspace => {
      return axiosInstance.post(EDIT_USER_WORKSPACE_MAPPING, {
        request: {
          workspaceId: workspace.name,
          userId: props.id,
          roleId: roleList.selected[0].name,
        },
      });
    });

    await Promise.all(promiseArr);
    emit('close', { isSuccess: true });
    showSuccessMessage('Success', 'Edit Success');
  } catch (e) {
    emit('close', { isSuccess: false });
    showErrorMessage('Error', 'Error');
  }
};
</script>

<template>
  <div class="user-edit-box">
    <div class="user-edit-body">
      <section class="user-info-section">
        <p-field-group :label="i18n.t('AUTH.LOGIN.USER_ID')" disabled required>
          <template #default>
            <p-text-input v-model="props.id" block disabled />
          </template>
        </p-field-group>
        <p-field-group :label="'Name'" disabled required>
          <template #default>
            <p-text-input v-model="props.fullName" block disabled />
          </template>
        </p-field-group>
      </section>
      <section class="user-info-section">
        <p>Workspace Mapping</p>
        <hr />
        <br />
        <p-field-group :label="'This users will have access to'" required block>
          <template #default>
            <p-select-dropdown
              show-select-marker
              :menu="workspaceList.menu"
              :placeholder="'Select one workspace of more'"
              :style="{ display: 'block' }"
              use-fixed-menu-style
              multi-selectable
              :selected.sync="workspaceList.selected"
              :page-size="5"
              :appearance-type="'badge'"
              :show-clear-selection="true"
              :loading="workspaceList.resWorkspaceList.isLoading"
              show-delete-all-button
            />
          </template>
        </p-field-group>
        <p-field-group :label="'With a role'" required>
          <template #default>
            <p-select-dropdown
              :menu="roleList.menu"
              :selected.sync="roleList.selected"
              :placeholder="'Select a role'"
              :page-size="5"
              use-fixed-menu-style
              is-filterable
            />
          </template>
        </p-field-group>
      </section>
    </div>
    <footer class="custom-modal-footer">
      <PButton
        :style-type="'transparent'"
        @click="() => emit('close', { isSuccess: false })"
        >cancel
      </PButton>
      <PButton
        :loading="workspaceList.resEditWorkspaceList.isLoading"
        @click="handleConfirm"
        >Add
      </PButton>
    </footer>
  </div>
</template>

<style scoped lang="postcss">
.user-edit-box {
  .user-edit-body {
    @apply bg-gray-100 p-4;

    .user-info-section {
      @apply bg-white p-3;

      & > p {
        @apply mb-2;
      }
    }
  }
}
</style>
