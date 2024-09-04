export const MENU_ID = Object.freeze({
  // Setting
  // Account & Access
  SETTING: 'settings',
  ACCOUNT_AND_ACCESS: 'accountAndAccess',
  ACCOUNT_AND_ACCESS_ORGANIZATIONS: 'organizations',
  ORGANIZATIONS_USERS: 'users',
  ORGANIZATIONS_APPROVALS: 'approvals',
  ORGANIZATIONS_ACCESS_CONTROLS: 'accessControls',

  // Environment
  ENVIRONMENT: 'environment',
  ENVIRONMENT_CLOUD_RESOURCES: 'cloudResources',
  // ENVIRONMENT_

  // Operations
  // Manage
  OPERATION: 'operations',
  MANAGE: 'manage',
  MANAGE_WORKLOADS: 'workloads',
  WORKLOADS_MCI: 'mci',
  WORKLOADS_PMK: 'pmk',
  MANAGE_WORKSPACE: 'workspaces',
  WORKSPACES: 'workspaces',
});

export const MENU_ID_TO_NAME = Object.freeze({
  [MENU_ID.SETTING]: 'Settings',
  [MENU_ID.ACCOUNT_AND_ACCESS]: 'Account & Access',
  [MENU_ID.ACCOUNT_AND_ACCESS_ORGANIZATIONS]: 'Organizations',
  [MENU_ID.ORGANIZATIONS_USERS]: 'Users',
  [MENU_ID.ORGANIZATIONS_APPROVALS]: 'Approvals',
  [MENU_ID.ORGANIZATIONS_ACCESS_CONTROLS]: 'Access Controls',

  [MENU_ID.ENVIRONMENT]: 'Environment',
  [MENU_ID.ENVIRONMENT_CLOUD_RESOURCES]: 'Cloud Resources',

  [MENU_ID.OPERATION]: 'Operations',
  [MENU_ID.MANAGE]: 'Manage',
  [MENU_ID.MANAGE_WORKLOADS]: 'Workloads',
  [MENU_ID.WORKLOADS_MCI]: 'MCI',
  [MENU_ID.WORKLOADS_PMK]: 'PMK',

  [MENU_ID.MANAGE_WORKSPACE]: 'Workspaces',
});
