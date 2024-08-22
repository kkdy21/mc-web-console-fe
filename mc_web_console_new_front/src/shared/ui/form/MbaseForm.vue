<script setup lang="ts">
import { IAxiosResponse, IUseAxiosWrapperReturnType } from '@/shared/libs';

interface IMForm<T, D> {
  handleSubmit: (
    e?: Event | undefined,
  ) => Promise<
    | IUseAxiosWrapperReturnType<T, D>
    | IAxiosResponse<IUseAxiosWrapperReturnType<T, D>>
  >;
  errorMsg?: string;
}

const props = withDefaults(defineProps<IMForm>(), {
  errorMsg: undefined,
});

props.handleSubmit();
</script>

<template>
  <div class="form-container">
    <header></header>
    <section>
      <form novalidate @submit="handleSubmit"></form>
    </section>
    <footer></footer>
  </div>
</template>

<style scoped lang="postcss">
.form-container {
  @apply flex flex-col;
  width: 100%;
  height: 100%;
}
</style>
