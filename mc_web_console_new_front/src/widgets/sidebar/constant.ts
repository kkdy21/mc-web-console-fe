import { i18n } from '@/app/language';

const { t } = i18n;

interface Location {
  name?: string;
  path?: string;
}

export interface Menu {
  id: string;
  label: string;
  icon: string;
  to: Location;
  subMenuList?: Menu[] | any[];
}

export interface MenuCategory {
  category: 'Manage' | 'Analytics' | 'Environment' | 'Account & Access';
  menuList: Menu[];
}

export const SIDEBAR_MENU: MenuCategory[] = [
  {
    category: 'Manage',
    menuList: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'ic_service_dashboard',
        to: {
          // name: 'dashboard',
          // TODO: temporary
          name: 'vpc-crud',
          path: '/main/dashboard',
        },
        subMenuList: [
          {
            id: 'dashboard1',
            label: 'Dashboard1',
            icon: 'ic_service_dashboard',
            to: {
              name: 'vpc-crud',
              path: '/main/dashboard',
            },
          },
          {
            id: 'dashboard2',
            label: 'Dashboard2',
            icon: 'ic_service_dashboard',
            to: {
              name: 'vpc-crud',
              path: '',
            },
          },
        ],
      },
      {
        id: 'workspaces',
        label: 'Workspaces',
        icon: 'ic_service_cloud-service',
        to: {
          name: 'aws-dashboard',
        },
      },
      {
        id: 'project',
        label: 'Project',
        icon: 'ic_service_project',
        to: {
          name: 'project',
        },
      },
      {
        id: 'workloads',
        label: 'Workloads',
        icon: 'ic_cloud-filled',
        to: {
          name: 'workloads',
        },
      },
      {
        id: 'servicesManagement',
        label: 'Services Management',
        icon: 'ic_cloud-filled',
        to: {
          name: 'servicesManagement',
        },
      },
      {
        id: 'cloudMetaData',
        label: 'Cloud Meta Data',
        icon: 'ic_cloud-filled',
        to: {
          name: 'cloudMetaData',
        },
      },
      {
        id: 'workflows',
        label: 'Workflows',
        icon: 'ic_cloud-filled',
        to: {
          name: 'workflows',
        },
      },
    ],
  },
  {
    category: 'Analytics',
    menuList: [
      {
        id: 'monitorings',
        label: 'Monitorings',
        icon: 'ic_cloud-filled',
        to: {
          name: 'monitorings',
        },
      },
      {
        id: 'thirdPartyMonitoringTool',
        label: '3rd Party ...',
        icon: 'ic_cloud-filled',
        to: {
          name: 'thirdPartyMonitoringTool',
        },
      },
    ],
  },
  {
    category: 'Environment',
    menuList: [
      {
        id: 'cloudSps',
        label: 'Cloud SPs',
        icon: 'ic_cloud-filled',
        to: {
          name: 'cloudSps',
        },
      },
    ],
  },
  {
    category: 'Account & Access',
    menuList: [
      {
        id: 'organizations',
        label: 'Organizations',
        icon: 'ic_cloud-filled',
        to: {
          name: 'organizations',
        },
      },
    ],
  },
];
// export const SIDEBAR_MENU: Menu[] = [
// {
//   id: 'dashboard',
//   label: 'Dashboard',
//   icon: 'ic_service_dashboard',
//   category: 'manage',
//   to: {
//     name: 'dashboard',
//     path: '/main/dashboard',
//   },
// },
//   {
//     id: 'workspaces',
//     label: 'Workspaces',
//     icon: 'ic_service_cloud-service',
//     category: 'manage',
//     to: {
//       name: 'workspaces',
//     },
//   },
//   {
//     id: 'project',
//     label: 'Project',
//     icon: 'ic_service_project',
//     category: 'manage',
//     to: {
//       name: 'project',
//     },
//   },
//   {
//     id: 'workloads',
//     label: 'Workloads',
//     icon: 'ic_cloud-filled',
//     category: 'manage',
//     to: {
//       name: 'workloads',
//     },
//   },
//   {
//     id: 'servicesManagement',
//     label: 'Services Management',
//     icon: 'ic_cloud-filled',
//     category: 'manage',
//     to: {
//       name: 'servicesManagement',
//     },
//   },
//   {
//     id: 'cloudMetaData',
//     label: 'Cloud Meta Data',
//     icon: 'ic_cloud-filled',
//     category: 'manage',
//     to: {
//       name: 'cloudMetaData',
//     },
//   },
//   {
//     id: 'workflows',
//     label: 'Workflows',
//     icon: 'ic_cloud-filled',
//     category: 'manage',
//     to: {
//       name: 'workflows',
//     },
//   },
//   {
//     id: 'monitorings',
//     label: 'Monitorings',
//     icon: 'ic_cloud-filled',
//     category: 'analytics',
//     to: {
//       name: 'monitorings',
//     },
//   },
//   {
//     id: 'thirdPartyMonitoringTool',
//     label: '3rd Party ...',
//     icon: 'ic_cloud-filled',
//     category: 'analytics',
//     to: {
//       name: 'thirdPartyMonitoringTool',
//     },
//   },
//   {
//     id: 'cloudSps',
//     label: 'Cloud SPs',
//     icon: 'ic_cloud-filled',
//     category: 'environment',
//     to: {
//       name: 'cloudSps',
//     },
//   },
//   {
//     id: 'organizations',
//     label: 'Organizations',
//     icon: 'ic_cloud-filled',
//     category: 'accountAndAccess',
//     to: {
//       name: 'organizations',
//     },
//   },
// ];

// export const MENU_INFO_MAP: Record<MenuId, MenuInfo> = Object.freeze({
//   [MENU_ID.MANAGE]: {
//     menuId: MENU_ID.MANAGE,
//     routeName: 'manage',
//     translationId: t('sidebar.manage'),
//   },
// });
