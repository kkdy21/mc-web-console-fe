import { RouteConfig } from 'vue-router';
import { MENU_ID } from '@/entities/menu';
import { CloudResourcesPage } from '@/pages/cloudResources';
import { ManageSubnetPage, ManageSubnetFromVPCPage } from '@/pages/subnet';
import { NetworksPage } from '@/pages/networks';
import { SecuritysPage } from '@/pages/securitys';

export const CLOUD_RESOURCES_ROUTE = {
  _NAME: 'CloudResources',
  VPC: {
    _NAME: 'VPC',
  },
  VPC_SUBNETS: {
    _NAME: 'vpcSubnets',
  },
  SUBNETS: {
    _NAME: 'subnets',
  },
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
      // lsbVisible: true,
      menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
    },
    children: [
      // {
      //   path: 'networks',
      //   name: CLOUD_RESOURCES_ROUTE.NETWORKS._NAME,
      //   meta: {
      //     lsbVisible: true,
      //     menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
      //   },
      //   component: NetworksPage,
      // },
      // {
      //   path: 'securitys',
      //   name: CLOUD_RESOURCES_ROUTE.SECURITY._NAME,
      //   meta: {
      //     lsbVisible: true,
      //     menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
      //   },
      //   component: SecuritysPage,
      // },
    ],
  },
  {
    path: 'cloud-resources/vpc/subnets',
    name: CLOUD_RESOURCES_ROUTE.VPC_SUBNETS._NAME,
    meta: {
      menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
    },
    component: ManageSubnetPage,
  },
  {
    path: 'cloud-resources/subnets',
    name: CLOUD_RESOURCES_ROUTE.SUBNETS._NAME,
    meta: {
      menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
    },
    component: ManageSubnetFromVPCPage,
  },
];

export default cloudResourcesRoutes;
