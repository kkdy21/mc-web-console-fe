//기본라우터는 dashboard이고 하위폴더에 속한 폴더 경로를 여기서 정의
import { RouteConfig } from 'vue-router';
import AlibabaPage from './alibaba/AlibabaPage.vue';
import AwsPage from './aws/AwsPage.vue';
import { MENU_ID } from '@/widgets/menuCategory/ui/sidebar-config';

export const DASHBOARD_ROUTE = {
  _NAME: 'mciDashboard',
  ALIBABA: {
    _NAME: 'alibaba-dashboard',
  },
  AWS: {
    _NAME: 'aws-dashboard',
  },
  VPC_CRUD: {
    _NAME: 'vpc-crud',
  },
} as const;

const dashboardRoutes: RouteConfig[] = [
  {
    path: 'dashboard',
    name: DASHBOARD_ROUTE._NAME,
    component: { template: '<router-view/>' },
    meta: {
      roles: [],
    },
    children: [
      {
        path: 'alibaba',
        name: DASHBOARD_ROUTE.ALIBABA._NAME,
        component: AlibabaPage,
        meta: {
          roles: ['admin'],
        },
      },
      {
        path: 'aws',
        name: 'organizations',
        component: AwsPage,
        // meta: {
        //   roles: ['client'],
        // },
      },
      {
        path: 'vpc-crud',
        name: 'cloudResources',
        component: () => import('./vpc/VpcPage.vue'),
        meta: {
          lsbVisible: true,
          menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
        },
        children: [
          {
            path: 'networks',
            name: 'Networks',
            meta: {
              lsbVisible: true,
              menuId: MENU_ID.ENVIRONMENT_CLOUD_RESOURCES,
            },
            component: () => import('./vpc/Network.vue'),
          },
        ],
        // redirect: () => ({
        //   name: 'Networks',
        // }),
        // children: [
        //   {
        //     path: 'preferences',
        //     name: 'Networks',
        //     meta: {
        //       lsbVisible: true,
        //     },
        //     component: () => import('./aws/AwsPage.vue'),
        //   },
        // ],
        // meta: {
        //   roles: ['client'],
        // },
      },
    ],
  },
];

export default dashboardRoutes;
