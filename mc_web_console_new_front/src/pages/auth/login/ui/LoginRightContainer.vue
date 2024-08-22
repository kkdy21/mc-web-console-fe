<script setup lang="ts">
import LoginForm from '@/features/auth/ui/LoginForm.vue';
</script>

<template>
  <div class="login-right-container">
    <LoginForm />
  </div>
</template>

<style scoped lang="postcss">
.login-right-container {
  @apply flex justify-center items-center;
  flex: 2;
  border: 1px solid blue;
}
</style>
