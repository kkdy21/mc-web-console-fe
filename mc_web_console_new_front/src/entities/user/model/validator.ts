import { i18n } from '@/app/i18n';

export function validateEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email) || i18n.t('AUTH.LOGIN.EMAIL_INVALID');
}

export function validatePassword(password: string) {
  if (!password.length) {
    return i18n.t('AUTH.LOGIN.PASSWORD_REQUIRED');
  } else if (password.includes(' ')) {
    return i18n.t('AUTH.LOGIN.PASSWORD_INCLUDE_SPACES');
  }

  return true;
}

export function validateId(id: string) {
  if (!id.length) {
    return i18n.t('AUTH.LOGIN.USER_ID_REQUIRED');
  }

  return true;
}
