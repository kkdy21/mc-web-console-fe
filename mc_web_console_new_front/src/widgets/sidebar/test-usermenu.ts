import { useMenuPerUserStore } from '@/entities/user/store/menuPerUserStore';

export const useUserMenu = () => {
  const menuPerUserStore = useMenuPerUserStore();
  console.log(menuPerUserStore);

  return {
    userMenuInfo: menuPerUserStore.userMenuInfo,
  };
};
