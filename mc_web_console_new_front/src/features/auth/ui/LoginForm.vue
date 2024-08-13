<script setup lang="ts">
import { PButton, PTextInput } from '@cloudforet-test/mirinae';
import { useGetLogin } from '@/entities';
import { IUser, IUserResponse } from '@/entities/user/model/types.ts';
import { ref, watch } from 'vue';
import { IApiState, IAxiosResponse } from '@/shared/libs';
import { useAuth } from '@/features/auth/model/useAuth.ts';

const loginData: IUser = {
  id: 'mcpadmin',
  password: 'mcpuserpassword',
};

let res = ref<IApiState<IAxiosResponse<IUserResponse>>>({});
const auth = useAuth();

const handleLogin = async () => {
  res.value = useGetLogin<IUserResponse, IUser>(loginData);
};

watch(
  res,
  async (newRes, oldRes) => {
    if (res.value.success && res.value.data?.responseData) {
      const auth = useAuth();
      auth.setUser({ ...res.value.data.responseData, id: loginData.id });
    } else {
      console.log(res.value.error);
    }

    if (!res.value.loading) {
      console.log(auth.sessionUser.data);
    }
  },
  {
    deep: true,
  },
);
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
      <p v-if="res.loading">Loading</p>
      <p v-if="!res.loading && res.success">{{ res.data }}</p>
      <p v-if="!res.loading && !res.success">{{ res.error }}</p>
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
