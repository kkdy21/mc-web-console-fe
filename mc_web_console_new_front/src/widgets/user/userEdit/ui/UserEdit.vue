<script setup lang="ts">
import { i18n } from '@/app/i18n';
import {
  PFieldGroup,
  PSelectDropdown,
  PTextInput,
} from '@cloudforet-test/mirinae';
import { useGetWorkspaceList } from '@/entities/workspace/api';
import { onMounted, reactive, watch } from 'vue';
import { IWorkspaceData } from '@/entities/workspace/model/types.ts';
import { UserInformationTableType, UserWorkspaceTableType } from '@/entities';

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

const t = [
  {
    userId: 'd670921b-487b-4351-a67b-d3cda1d2a4c1',
  },
];

interface IMenu {
  name: string;
  label: string;
  type: string;
}

const props = defineProps<IProps>();
console.log(props.workspaces);
const workspaceList = reactive({
  menu: [],
  selected: [],
  resWorkspaceList: useGetWorkspaceList(),
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

const handleSuccess = () => {};
</script>

<template>
  <div class="user-edit-box">
    <section>
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
    <section>
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
            :placeholder="'Select a role'"
            :page-size="5"
            use-fixed-menu-style
            is-filterable
          />
        </template>
      </p-field-group>
    </section>
  </div>
</template>

<style scoped lang="postcss">
.user-edit-box {
}
</style>
