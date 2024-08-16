<script setup lang="ts">
import { PButton, PTextInput } from '@cloudforet-test/mirinae';
import { useGetLogin, useGetUserRole } from '@/entities';
import { IUser, IUserResponse } from '@/entities/user/model/types.ts';
import { ref, watch } from 'vue';
import { IApiState, useAsync, useAxiosPost } from '@/shared/libs';
import { useAuth } from '@/features/auth/model/useAuth.ts';
import { jwtDecode } from 'jwt-decode';

const loginData: IUser = {
  id: 'mcpadmin',
  password: 'mcpuserpassword',
};

// let resLogin = useGetLogin<IUserResponse, IUser>(null);
let resLogin = useGetLogin<IUserResponse, IUser | null>(null);
console.log(resLogin);
let resUserInfo = ref<IApiState<any>>({});
const auth = useAuth();
const handleLogin = () => {
  resLogin.execute({ request: loginData });
  // resLogin.value = useGetLogin<IUserResponse, IUser>(loginData);
};
// const jwtDecodeTest = (accesstoken: string) => {
//   var token = jwtDecode(accesstoken);
//   console.log(token);
// };

// watch(
//   resLogin,
//   () => {
//     if (resLogin.value.success && resLogin.value.data?.responseData) {
//       const auth = useAuth();
//       auth.setUser({ ...resLogin.value.data.responseData, id: loginData.id });
//       resUserInfo.value = useGetUserRole<any>();
//       jwtDecodeTest(auth.getUser().access_token);
//     } else {
//       //FIXME error message 띄우는 방식 추가
//       console.log(resLogin.value.error);
//     }
//   },
//   {
//     deep: true,
//   },
// );

watch(
  resUserInfo,
  () => {
    console.log(resUserInfo);
  },
  { deep: true },
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
      <p v-if="resLogin.status === 'idle'">idle</p>
      <p v-if="resLogin.status === 'isLoading'">Loading</p>
      <p v-if="resLogin.status === 'success'">{{ resLogin.data }}</p>
      <p v-if="resLogin.status === 'error'">{{ resLogin.error }}</p>
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
