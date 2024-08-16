<script setup lang="ts">
import { PButton, PTextInput } from '@cloudforet-test/mirinae';
import { useGetLogin, useGetUserRole } from '@/entities';
import { IUser, IUserResponse } from '@/entities/user/model/types.ts';
import { watch } from 'vue';
import { useAuth } from '@/features/auth/model/useAuth.ts';
import { jwtDecode } from 'jwt-decode';

const loginData: IUser = {
  id: 'mcpadmin',
  password: 'mcpuserpassword',
};

let resLogin = useGetLogin<IUserResponse, IUser | null>(null);
let resUserInfo = useGetUserRole<any>();
const auth = useAuth();
const handleLogin = () => {
  resLogin.execute({ request: loginData });
};

watch(resLogin.data, () => {
  let userData: IUserResponse & { id: string } = {
    access_token: resLogin.data.value?.responseData?.access_token,
    expires_in: resLogin.data.value?.responseData?.expires_in,
    refresh_token: resLogin.data.value?.responseData?.refresh_token,
    refresh_expires_in: resLogin.data.value?.responseData?.refresh_expires_in,
    role: 'admin',
    id: 'test',
  };
  const auth = useAuth();
  auth.setUser(userData);

  resUserInfo.execute();
  // jwtDecodeTest(auth.getUser().access_token);
});
</script>

<template>
  <div class="login-box">
    <fieldset
      style="
        border: 3px solid black;
        border-radius: 20px;
        padding: 20px;
        margin: 20px 0 20px 0;
      "
    >
      <legend>Login</legend>
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        "
      >
        <div style="display: flex; flex-direction: column; align-items: start">
          <label>id</label>
          <p-text-input v-model="loginData.id" />
        </div>
        <div style="display: flex; flex-direction: column; align-items: start">
          <label>password</label>
          <p-text-input v-model="loginData.password" />
        </div>
      </div>

      <p-button
        style="margin-top: 20px"
        styleType="primary"
        size="md"
        :loading="false"
        href="#"
        :iconLeft="null"
        :iconRight="null"
        :block="false"
        :disabled="false"
        :readonly="false"
        @click="handleLogin"
      >
        Login
      </p-button>
    </fieldset>
    <div class="res-test-box">
      <p v-if="resLogin.status.value === 'idle'">idle</p>
      <p v-if="resLogin.status.value === 'loading'">Loading</p>
      <p v-if="resLogin.status.value === 'success'">
        {{ resLogin.data }}
      </p>
      <p v-if="resLogin.status.value === 'error'">{{ resLogin.errorMsg }}</p>
    </div>
    <div>
      <p>{{ auth.getUser() }}</p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.login-box {
  display: flex;
  gap: 20px;
}

.login-buttons {
  display: flex;
  gap: 5px;
}

.res-test-box {
  width: 400px;
  border: 1px solid red;
}
</style>
