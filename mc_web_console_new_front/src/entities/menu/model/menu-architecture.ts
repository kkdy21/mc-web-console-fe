import type { Menu } from '@/entities';
import { MENU_ID } from '@/entities';

// menu list
export const MENU_LIST: Menu[] = [
  {
    id: MENU_ID.ORGANIZATIONS,
    needPermissionByRole: true,
    subMenuList: [{ id: MENU_ID.USERS, needPermissionByRole: true }],
  },
  {
    id: MENU_ID.VPC,
    needPermissionByRole: true,
  },
];
