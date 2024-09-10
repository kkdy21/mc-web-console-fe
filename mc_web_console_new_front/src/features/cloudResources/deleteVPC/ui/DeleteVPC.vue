<script setup lang="ts">
import { PIconButton } from '@cloudforet-test/mirinae';
import { useDeleteVPC } from '@/entities';

const resDeleteVPC = useDeleteVPC<any, null | { nsId: string; vNetId: string }>(
  null,
);

const props = defineProps({
  label: String,
  focus: Boolean,
  focusedData: Object,
});

const handleDelete = async () => {
  console.log(props.focusedData);
  const { data } = await resDeleteVPC.execute({
    pathParams: {
      nsId: 'ns01',
      vNetId: props.focusedData,
    },
  });

  console.log(data);
};
</script>

<template>
  <div class="tool">
    <p v-if="focus">{{ label }}</p>
    <p-icon-button
      name="ic_delete"
      @click="$emit('button-click', handleDelete())"
    />
  </div>
</template>
