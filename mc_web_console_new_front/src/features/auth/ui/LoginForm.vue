<script setup lang="ts">
import { PButton, PTextInput, PFieldGroup } from '@cloudforet-test/mirinae';
import { useGetLogin, useGetUserRole } from '@/entities';
import { IUser, IUserResponse } from '@/entities/user/model/types.ts';
import { reactive, watch } from 'vue';
import { useAuth } from '@/features/auth/model/useAuth.ts';
import { i18n } from '@/app/i18n';
import { TranslateResult } from 'vue-i18n';

const loginData: IUser = {
  id: 'mcpadmin',
  password: 'mcpuserpassword',
};

const resLogin = useGetLogin<IUserResponse, IUser | null>(null);
const resUserInfo = useGetUserRole<IUserResponse>();
const auth = useAuth();

const handleLogin = () => {
  resLogin.execute({ request: loginData });
};

watch(resLogin.data, () => {
  auth.setUser({
    ...resLogin.data.value?.responseData,
    id: loginData.id,
    role: '',
  });
  // McmpRouter.getRouter().push({ name: DASHBOARD_ROUTE.AWS._NAME });

  resUserInfo.execute();
});

const checkPassword = () => {
  if (
    loginData.password.replace(/ /g, '').length !== loginData.password.length ||
    !loginData.password
  ) {
    validationState.isPasswordValid = false;
    validationState.passwordInvalidText = i18n.t(
      'COMMON.SIGN_IN.PASSWORD_REQUIRED',
    );
  } else {
    validationState.isPasswordValid = true;
    validationState.passwordInvalidText = '';
  }
};

const checkUserId = () => {
  if (!loginData.id) {
    validationState.isIdValid = false;
    validationState.idInvalidText = i18n.t('COMMON.SIGN_IN.USER_ID_REQUIRED');
  } else {
    validationState.isIdValid = true;
    validationState.idInvalidText = '';
  }
};

const validationState = reactive({
  isIdValid: undefined as undefined | boolean,
  idInvalidText: '' as TranslateResult,
  isPasswordValid: undefined as undefined | boolean,
  passwordInvalidText: '' as TranslateResult,
  isPasswordCheckValid: undefined as undefined | boolean,
  passwordCheckInvalidText: '' as TranslateResult,
});
</script>

<template>
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
  <section class="login-form-wrapper">
    <header>
      <p class="title">{{ i18n.t('AUTH.LOGIN._NAME') }}</p>
    </header>
    <section class="section">
      <p-field-group
        :label="i18n.t('AUTH.LOGIN.USER_ID')"
        :invalid="validationState.isIdValid === false"
        required
      >
        <template #default="{ invalid }">
          <p-text-input
            v-model="loginData.id"
            :invalid="invalid"
            :placeholder="'id'"
            block
          ></p-text-input>
        </template>
      </p-field-group>
      <p-field-group
        :label="i18n.t('AUTH.LOGIN.PASSWORD')"
        :invalid="validationState.isPasswordValid === false"
        required
      >
        <template #default="{ invalid }">
          <p-text-input
            type="password"
            appearance-type="masking"
            v-model="loginData.password"
            :invalid="invalid"
            :placeholder="i18n.t('AUTH.LOGIN.PASSWORD')"
            block
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
  }
  .footer {
    .login-in-btn {
      width: 100%;
      margin-top: 40px;
    }
  }
}
</style>
