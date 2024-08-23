<script setup lang="ts">
import { PButton, PTextInput, PFieldGroup } from '@cloudforet-test/mirinae';
import {
  useGetLogin,
  useGetUserRole,
  validateId,
  validatePassword,
} from '@/entities';
import { IUser, IUserResponse } from '@/entities/user/model/types.ts';
import { reactive, Ref, ref, watch } from 'vue';
import { useAuth } from '@/features/auth/model/useAuth.ts';
import { i18n } from '@/app/i18n';
import { TranslateResult } from 'vue-i18n';
import { useInputModel } from '@/shared/hooks/input/useInputModel.ts';

// const loginData: IUser = {
//   id: 'mcpadmin',
//   password: 'mcpuserpassword',
// };

// const resLogin = useGetLogin<IUserResponse, IUser | null>(null);
// const resUserInfo = useGetUserRole<IUserResponse>();
// const auth = useAuth();
const validationMsg: Ref<string | null> = ref<string | null>('');
const handleLogin = async () => {
  // resLogin.execute({ request: loginData });
  /*
   * TODO 1. validation
   *  2. 통과하면 전송
   * 3. validtation안되면직 실패 로직
   * */

  if (!userId.touched.value || !userPW.touched.value) {
    await Promise.all([
      userId.exeValidation(userId.value.value),
      userPW.exeValidation(userPW.value.value),
    ]);
  }
  validationMsg.value = userId.errorMessage.value || userPW.errorMessage.value;
  console.log(validationMsg);
};

const userId = useInputModel<string>('', validateId, 0);
const userPW = useInputModel<string>('', validatePassword, 0);
console.log(userId);
console.log(userPW);
// watch(resLogin.data, () => {
//   auth.setUser({
//     ...resLogin.data.value?.responseData,
//     id: loginData.id,
//     role: '',
//   });
//   // McmpRouter.getRouter().push({ name: DASHBOARD_ROUTE.AWS._NAME });
//
//   resUserInfo.execute();
// });
</script>

<template>
  <section class="login-form-wrapper">
    <header>
      <p class="title">
        {{ i18n.t('AUTH.LOGIN._NAME') }}
      </p>
      <p>
        {{ validationMsg }}
      </p>
    </header>
    <section class="section">
      <p-field-group
        :label="i18n.t('AUTH.LOGIN.USER_ID')"
        :invalid="!userId.isValid.value"
        required
      >
        <template #default="{ invalid }">
          <p-text-input
            v-model="userId.value.value"
            :invalid="invalid"
            :placeholder="'id'"
            block
            @blur="userId.onBlur"
          ></p-text-input>
        </template>
      </p-field-group>
      <p-field-group
        :label="i18n.t('AUTH.LOGIN.PASSWORD')"
        :invalid="!userPW.isValid.value"
        required
      >
        <template #default="{ invalid }">
          <p-text-input
            type="password"
            appearance-type="masking"
            v-model="userPW.value.value"
            :invalid="invalid"
            :placeholder="i18n.t('AUTH.LOGIN.PASSWORD')"
            block
            @blur="userPW.onBlur"
          ></p-text-input>
        </template>
      </p-field-group>
    </section>
    <footer class="footer">
      <p-button
        style-type="primary"
        type="submit"
        size="md"
        class="login-in-btn"
        @click="handleLogin"
      >
        {{ i18n.t('AUTH.LOGIN._NAME') }}
      </p-button>
    </footer>
  </section>
</template>

<style scoped lang="postcss">
.login-form-wrapper {
  @apply rounded-lg border-gray-200 border;

  width: 28.5rem;
  position: relative;
  align-self: center;
  padding: 2rem;
  background-color: white;

  .title {
    @apply text-display-md text-gray-900 font-bold;
    margin-bottom: 1.5rem;
  }

  .section {
    @apply flex flex-col;
    gap: 1.25rem;

    .p-field-group {
      margin-bottom: 0;
    }

    :deep(.invalid-feedback) {
      display: block !important;
      margin-top: 0.25rem;
    }
  }

  .footer {
    .login-in-btn {
      width: 100%;
      margin-top: 40px;
    }
  }
}
</style>
<!--  <div class="login-box">-->
<!--    <fieldset-->
<!--      style="-->
<!--        border: 3px solid black;-->
<!--        border-radius: 20px;-->
<!--        padding: 20px;-->
<!--        margin: 20px 0 20px 0;-->
<!--      "-->
<!--    >-->
<!--      <legend>Login</legend>-->
<!--      <div-->
<!--        style="-->
<!--          display: flex;-->
<!--          flex-direction: column;-->
<!--          align-items: center;-->
<!--          justify-content: center;-->
<!--          gap: 20px;-->
<!--        "-->
<!--      >-->
<!--        <div style="display: flex; flex-direction: column; align-items: start">-->
<!--          <label>id</label>-->
<!--          <p-text-input v-model="loginData.id" />-->
<!--        </div>-->
<!--        <div style="display: flex; flex-direction: column; align-items: start">-->
<!--          <label>password</label>-->
<!--          <p-text-input v-model="loginData.password" />-->
<!--        </div>-->
<!--      </div>-->

<!--      <p-button-->
<!--        style="margin-top: 20px"-->
<!--        styleType="primary"-->
<!--        size="md"-->
<!--        :loading="false"-->
<!--        href="#"-->
<!--        :iconLeft="null"-->
<!--        :iconRight="null"-->
<!--        :block="false"-->
<!--        :disabled="false"-->
<!--        :readonly="false"-->
<!--        @click="handleLogin"-->
<!--      >-->
<!--        Login-->
<!--      </p-button>-->
<!--    </fieldset>-->
<!--    <div class="res-test-box">-->
<!--      <p v-if="resLogin.status.value === 'idle'">idle</p>-->
<!--      <p v-if="resLogin.status.value === 'loading'">Loading</p>-->
<!--      <p v-if="resLogin.status.value === 'success'">-->
<!--        {{ resLogin.data }}-->
<!--      </p>-->
<!--      <p v-if="resLogin.status.value === 'error'">{{ resLogin.errorMsg }}</p>-->
<!--    </div>-->
<!--    <div>-->
<!--      <p>{{ auth.getUser() }}</p>-->
<!--    </div>-->
<!--  </div>-->
