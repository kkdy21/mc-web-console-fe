<script setup lang="ts">
import { PButton, PTextInput } from '@cloudforet-test/mirinae';
import { api } from '@/entities';
import { IUser, IUserResponse } from '@/entities/user/model/types.ts';
import { IApiResponse } from '@/shared/libs/api/request.ts';

const loginData: IUser = {
  id: 'mcpadmin',
  password: 'mcpuserpassword',
};

const handleLogin = async () => {
  const { success, data, error }: IApiResponse<IUserResponse> =
    await api.getLogin<IUserResponse, IUser>(loginData.id, loginData.password);
};
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
</style>
