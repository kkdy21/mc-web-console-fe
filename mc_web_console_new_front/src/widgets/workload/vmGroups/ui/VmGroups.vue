<script setup lang="ts">
import { PButton, PSelectCard, PToolbox } from '@cloudforet-test/mirinae';
import { useVmGroupsModel } from '@/widgets/workload/vmGroups/model';
import { onBeforeMount, onMounted, reactive, watch } from 'vue';

interface IProps {
  nsId: string;
  mciId: string | null;
}

const props = defineProps<IProps>();
const emit = defineEmits(['selectCard']);
const { cardState, vmGroupStore, resVmGroups, fetchVmGroups } =
  useVmGroupsModel<IProps>(props);

watch(props, nv => {
  fetchVmGroups(nv);
});

watch(cardState, () => {
  console.log(cardState.selected);
});

onMounted(() => {
  fetchVmGroups(props);
  vmGroupStore.setVmGroups([{ id: 'test1' }, { id: 'test2' }, { id: 'test3' }]);
});

function handleClick(id: string) {
  emit('selectCard', { groupId: id });
}
</script>

<template>
  <div>
    <p-toolbox :page-size-changeable="false">
      <template #left-area>
        <p-button style-type="tertiary" icon-left="ic_plus_bold">
          Add Server
        </p-button>
      </template>
    </p-toolbox>
    <div class="w-full overflow p-8 flex flex-wrap">
      <p-select-card
        v-for="(value, _) in cardState.cardData"
        :key="value.name"
        v-model="cardState.selected"
        :loading="resVmGroups.isLoading.value"
        :value="value.name"
        :multi-selectable="true"
        @click="handleClick(value.name)"
      >
        <template #default="scope">
          {{ scope }}
          {{ value }}
        </template>
      </p-select-card>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
