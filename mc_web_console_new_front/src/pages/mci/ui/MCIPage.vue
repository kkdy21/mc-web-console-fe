<script setup lang="ts">
import MciList from '@/widgets/workload/mci/mciList/ui/MciList.vue';
import { reactive, ref } from 'vue';
import { PTab } from '@cloudforet-test/mirinae';
import MciDetail from '@/widgets/workload/mci/mciDetail/ui/MciDetail.vue';
import { useMCIStore } from '@/entities/mci/model';
import VmGroups from '@/widgets/workload/vmGroups/ui/VmGroups.vue';

const pageName = 'MCI';

const tabState = reactive({
  activeTab: 'detail',
  tabs: [
    {
      name: 'detail',
      label: 'Detail',
    },
    {
      name: 'server',
      label: 'Server',
    },
  ],
});

const selectedMciId = reactive<{ mciId: string | null }>({ mciId: null });

function handleSelectMciTableRow(id: string) {
  selectedMciId.mciId = id;
}
</script>

<template>
  <div :class="`${pageName}-page page`">
    <header :class="`${pageName}-page-header`">
      <p>{{ pageName }}</p>
    </header>
    <section :class="`${pageName}-page-body`">
      <MciList @select-row="handleSelectMciTableRow"></MciList>
      <p
        v-if="!selectedMciId.mciId"
        class="flex justify-center text-gray-300 text-sm font-normal"
      >
        Select an item for more details.
      </p>
      <div>
        <p-tab :tabs="tabState.tabs" v-model="tabState.activeTab">
          <template #detail>
            <MciDetail :selectedMciId="selectedMciId"></MciDetail>
          </template>
          <template #server>
            <VmGroups ns-id="t" mci-id="t"></VmGroups>
          </template>
        </p-tab>
      </div>
    </section>
  </div>
</template>

<style scoped lang="postcss"></style>
