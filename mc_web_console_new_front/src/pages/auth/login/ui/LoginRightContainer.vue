<script setup lang="ts">
import LoginForm from '@/features/auth/ui/LoginForm.vue';
import { IUser, IUserResponse, useGetLogin, useGetUserRole } from '@/entities';
import { watch } from 'vue';
import { useAuth } from '@/features/auth/model/useAuth.ts';
import { McmpRouter } from '@/app/providers/router';
import { DASHBOARD_ROUTE } from '@/pages/dashboard/dashboard.route.ts';

const resLogin = useGetLogin<IUserResponse, IUser | null>(null);
const resUserInfo = useGetUserRole<IUserResponse>();
const auth = useAuth();

watch(resLogin.data, () => {
  auth.setUser({
    ...resLogin.data.value?.responseData,
    id: 'test',
    role: 'test',
  });
  McmpRouter.getRouter().push({ name: DASHBOARD_ROUTE.AWS._NAME });

  resUserInfo.execute();
});
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
