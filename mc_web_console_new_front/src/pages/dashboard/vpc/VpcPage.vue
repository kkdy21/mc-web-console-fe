<script setup lang="ts">
import { useRoute } from 'vue-router/composables';
import { computed, reactive } from 'vue';
import VerticalPageLayout from '@/app/Layouts/verticalPageLayout/VerticalPageLayout.vue';
import VpcLSB from './VpcLSB.vue';
import { useLSBStore } from '@/shared/libs/store/lsb-store';
import { useMenuPerUserStore } from '@/entities/user/store/menuPerUserStore';
import { storeToRefs } from 'pinia';

const route = useRoute();

const lsbStore = useLSBStore();
const { submenuInfo } = storeToRefs(lsbStore);

const menuPerUserStore = useMenuPerUserStore();
const { flattendMenus } = storeToRefs(menuPerUserStore);

const state = reactive({
  lsbVisible: computed<boolean>(() => route.meta?.lsbVisible),
});
</script>

<template>
  <fragment>
    <vertical-page-layout v-if="state.lsbVisible">
      <template #sidebar>
        <vpc-l-s-b
          :parent-menu-name="submenuInfo.parentMenuName"
          :submenus="submenuInfo.submenus"
        />
      </template>
      <template #default>
        <router-view />
      </template>
    </vertical-page-layout>
    <general-page-layout v-else>
      <router-view />
    </general-page-layout>
  </fragment>
</template>
