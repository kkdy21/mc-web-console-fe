import { RouteConfig } from 'vue-router';
import { MENU_ID } from '@/entities/menu';
import { OrganizationsPage } from '@/pages/organizations';
import { UsersPage } from '@/pages/users';

export const ORGANIZATIONS_ROUTE = {
  _NAME: 'organizations',
  // _NAME: MENU_ID.ACCOUNT_AND_ACCESS_ORGANIZATIONS,
  USERS: {
    _NAME: 'users',
  },
  APPROVALS: {
    _NAME: 'approvals',
  },
  ACCESS_CONTROLS: {
    _NAME: 'accessControls',
  },
} as const;

const organizationsRoutes: RouteConfig[] = [
  {
    path: 'organizations',
    name: ORGANIZATIONS_ROUTE._NAME,
    component: OrganizationsPage,
    meta: {
      lsbVisible: true,
      menuId: MENU_ID.ACCOUNT_AND_ACCESS_ORGANIZATIONS,
    },
    children: [
      {
        path: 'users',
        name: ORGANIZATIONS_ROUTE.USERS._NAME,
        meta: {
          lsbVisible: true,
          menuId: MENU_ID.ACCOUNT_AND_ACCESS_ORGANIZATIONS,
        },
        component: UsersPage,
      },
    ],
  },
];

export default organizationsRoutes;
