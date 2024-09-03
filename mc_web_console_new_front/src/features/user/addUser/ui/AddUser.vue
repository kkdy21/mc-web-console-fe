<script setup lang="ts">
import {
  PTextInput,
  PFieldGroup,
  PButton,
  PFieldTitle,
  PI,
} from '@cloudforet-test/mirinae';
import { useInputModel } from '@/shared/hooks/input/useInputModel.ts';
import { i18n } from '@/app/i18n';
import {
  useAddUser,
  validateConfirmPassword,
  validateId,
  validatePassword,
} from '@/entities';
import { ref, watch } from 'vue';
import { IAxiosResponse } from '@/shared/libs';

interface IAddUser {
  email?: string;
  firstName?: string;
  lastName?: string;
  id: string;
  password: string;
}

const id = useInputModel<string>('', validateId, 0);
const password = useInputModel<string>('', validatePassword, 0);
const passwordConfirm = useInputModel<string>('', validatePassword, 10);
const lastName = useInputModel<string>('');
const firstName = useInputModel<string>('');

const validationMsg = ref<string | null>(null);
const emit = defineEmits(['modalClose']);

const addUser = useAddUser<IAxiosResponse<any>, IAddUser>(null);

watch([addUser.error, addUser.errorMsg], nv => {
  validationMsg.value = nv[1];
});

const handleClose = () => {
  emit('modalClose', 'Modal Data!');
};

const handleAdd = async () => {
  if (
    !id.touched.value ||
    !password.touched.value ||
    !passwordConfirm.touched.value
  ) {
    await Promise.all([
      id.exeValidation(id.value.value),
      password.exeValidation(password.value.value),
      passwordConfirm.exeValidation(passwordConfirm.value.value),
    ]);
  }
  const res = validateConfirmPassword(
    password.value.value,
    passwordConfirm.value.value,
  );
  if (res.message) {
    passwordConfirm.errorMessage.value = res.message;
  }
  passwordConfirm.isValid.value = res.isValid;

  validationMsg.value =
    id.errorMessage.value ||
    password.errorMessage.value ||
    validationMsg.value ||
    passwordConfirm.errorMessage.value ||
    null;

  if (
    id.isValid.value &&
    password.isValid.value &&
    passwordConfirm.isValid.value
  ) {
    addUser.execute({
      id: id.value.value,
      password: password.value.value,
      firstName: firstName.value.value,
      lastName: lastName.value.value,
    });
  }
};
</script>

<template>
  <div class="add-user-modal">
    <div v-if="validationMsg" class="error-msg-box">
      <span class="error-msg">{{ validationMsg }}</span>
      <p-i
        name="ic_close"
        width="1.5rem"
        height="1.5rem"
        class="cursor-pointer"
        color="inherit"
        @click="validationMsg = ''"
      >
      </p-i>
    </div>
    <form class="add-user-form" @submit="() => {}">
      <!--      //id-->
      <p-field-group
        :label="i18n.t('AUTH.LOGIN.USER_ID')"
        :invalid="!id.isValid.value"
        required
      >
        <template #default="{ invalid }">
          <p-text-input
            v-model="id.value.value"
            block
            :invalid="invalid"
            @blur="id.onBlur"
          ></p-text-input>
        </template>
      </p-field-group>

      <!--pw-->
      <section class="password-section">
        <p-field-group
          :label="'Password'"
          :invalid="!password.isValid.value"
          required
        >
          <template #default="{ invalid }">
            <p-text-input
              type="password"
              appearance-type="masking"
              v-model="password.value.value"
              block
              :invalid="invalid"
              @blur="password.onBlur"
            ></p-text-input>
          </template>
        </p-field-group>
        <p-field-group
          :label="'Confirm Password'"
          :invalid="!passwordConfirm.isValid.value"
          required
        >
          <template #default="{ invalid }">
            <p-text-input
              type="password"
              appearance-type="masking"
              v-model="passwordConfirm.value.value"
              block
              :invalid="invalid"
              @blur="passwordConfirm.onBlur"
            ></p-text-input>
          </template>
        </p-field-group>
      </section>

      <!--      name-->
      <section class="name-section">
        <div class="field-title-box">
          <PFieldTitle
            >Name
            <template #right>
              <span class="field-optional-title">(optional)</span>
            </template>
          </PFieldTitle>
        </div>
        <div class="name-input-box">
          <p-text-input
            v-model="lastName.value.value"
            block
            :invalid="!lastName.isValid.value"
            @blur="lastName.onBlur"
            :placeholder="'Last Name'"
          ></p-text-input>

          <p-text-input
            v-model="firstName.value.value"
            block
            :invalid="!firstName.isValid.value"
            :placeholder="'First Name'"
            @blur="firstName.onBlur"
          ></p-text-input>
        </div>
      </section>
    </form>

    <footer class="footer">
      <PButton :style-type="'transparent'" @click="handleClose">cancel</PButton>
      <PButton :loading="addUser.isLoading.value" @click="handleAdd"
        >Add
      </PButton>
    </footer>
  </div>
</template>

<style scoped lang="postcss">
.add-user-modal{
  @apply relative;
}
.error-msg-box {
  @apply absolute bg-red-100 text-red-500;
  display: flex;
  justify-content: space-between;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2.25rem;
  padding: 0.5rem;

  .error-msg {
    font-size: 0.875rem;
    line-height: 140%;
  }
}

.add-user-form {
  @apply flex flex-col bg-gray-100;

  padding: 16px;
  gap: 16px;
  border-radius: 6px;

  .p-field-group {
    margin-bottom: 0;
  }

  :deep(.invalid-feedback) {
    display: block !important;
    margin-top: 0.25rem;
  }

  .password-section {
    @apply bg-white flex flex-col;
    padding: 12px;
    gap: 16px;
    border-radius: 6px;
  }

  .name-section {
    .field-title-box {
      padding-bottom: 0.25rem;

      .field-optional-title {
        @apply font-normal text-xs text-gray-500;
      }
    }

    .name-input-box {
      @apply flex;
      gap: 8px;
    }
  }
}

.footer {
  @apply flex justify-end;
  margin-top: 24px;
  gap: 16px;
}
</style>
