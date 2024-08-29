import { RouteConfig } from 'vue-router';
import { MENU_ID } from '@/entities/menu';
import { CloudResourcesPage } from '@/pages/cloudResources';
import { NetworksPage } from '@/pages/networks';
import { SecuritysPage } from '@/pages/securitys';

export const CLOUD_RESOURCES_ROUTE = {
  _NAME: 'CloudResources',
  NETWORKS: {
    _NAME: 'Networks',
  },
  SECURITY: {
    _NAME: 'Securitys',
  },
  MYIMAGES: {
    _NAME: 'MyImages',
  },
} as const;

const cloudResourcesRoutes: RouteConfig[] = [
  {
    path: 'cloud-resources',
    name: CLOUD_RESOURCES_ROUTE._NAME,
    component: CloudResourcesPage,
    meta: {
      lsbVisible: true,
      menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
    },
    children: [
      {
        path: 'networks',
        name: CLOUD_RESOURCES_ROUTE.NETWORKS._NAME,
        meta: {
          lsbVisible: true,
          menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
        },
        component: NetworksPage,
      },
      {
        path: 'securitys',
        name: CLOUD_RESOURCES_ROUTE.SECURITY._NAME,
        meta: {
          lsbVisible: true,
          menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
        },
        component: SecuritysPage,
      },
    ],
  },
];

export default cloudResourcesRoutes;
