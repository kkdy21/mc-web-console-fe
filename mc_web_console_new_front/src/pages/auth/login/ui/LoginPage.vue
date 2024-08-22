<script setup lang="ts">
import LoginForm from '@/features/auth/ui/LoginForm.vue';
import LoginLeftContainer from '@/pages/auth/login/ui/LoginLeftContainer.vue';
import LoginRightContainer from '@/pages/auth/login/ui/LoginRightContainer.vue';
</script>

<template>
  <section class="login-page">
    <div class="login-container-wrapper">
      <LoginLeftContainer></LoginLeftContainer>
      <LoginRightContainer></LoginRightContainer>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.login-page {
  width: 100%;
  height: 100%;

  .login-container-wrapper {
    display: flex;
    height: 100%;
  }
}
</style>
