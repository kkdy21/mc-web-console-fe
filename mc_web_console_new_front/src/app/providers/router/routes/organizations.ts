import { RouteConfig } from 'vue-router';
import { MENU_ID } from '@/entities';
import { OrganizationsPage } from '@/pages/organizations';
import { UserPage } from '@/pages/account&access/users';
import { ROLE_TYPE } from '@/shared/libs/accessControl/pageAccessHelper/constant';

export const ORGANIZATIONS_ROUTE = {
  _NAME: 'Organizations',
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
      menuId: MENU_ID.ORGANIZATIONS,
      requiresAuth: true,
      role: [ROLE_TYPE.PLATFORM_ADMIN, ROLE_TYPE.VIEWER],
    },
    children: [
      {
        path: 'users',
        name: ORGANIZATIONS_ROUTE.USERS._NAME,
        meta: {
          lsbVisible: true,
          menuId: MENU_ID.ORGANIZATIONS,
          requiresAuth: true,
          role: [ROLE_TYPE.PLATFORM_ADMIN, ROLE_TYPE.VIEWER],
        },
        component: UserPage,
      },
    ],
  },
];

export default organizationsRoutes;
