import { RouteConfig } from 'vue-router';
import { MENU_ID } from '@/entities';
import { WorkloadsPage } from '@/pages/workloads';
import { MCIPage } from '@/pages/mci';

export const WORKLOADS_ROUTE = {
  _NAME: 'Workloads',
  MCI: {
    _NAME: 'mci',
  },
  PMK: {
    _NAME: 'pmk',
  },
};

const workloadsRoutes: RouteConfig[] = [
  {
    path: 'workloads',
    name: WORKLOADS_ROUTE._NAME,
    component: WorkloadsPage,
    meta: {
      lsbVisible: true,
      menuId: MENU_ID.MANAGE_WORKLOADS,
    },
    children: [
      {
        path: 'mci',
        name: WORKLOADS_ROUTE.MCI._NAME,
        component: MCIPage,
        meta: {
          lsbVisible: true,
          menuId: MENU_ID.MANAGE_WORKLOADS,
        },
      },
    ],
  },
];

export default workloadsRoutes;
