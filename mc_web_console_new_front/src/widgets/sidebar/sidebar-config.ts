// TODO: 폴더 구조 정리 필요
export const MENU_ID = Object.freeze({
  MANAGE: 'manage',
  ANALYTICS: 'analytics',
  ENVIRONMENT: 'environment',
  ACCOUNT_AND_ACCESS: 'account_and_access',
  DASHBOARD: 'dashboard',
  WORKSPACES: 'workspaces',
});

export type MenuId = (typeof MENU_ID)[keyof typeof MENU_ID];

export interface Menu {
  id: MenuId;
  needPermissionByRole?: boolean;
  subMenuList?: Menu[];
  hideOnSidebar?: boolean;
  hideOnSiteMap?: boolean;
}

export interface MenuInfo {
  menuId: MenuId;
  routeName: string;
  translationId: string;
  icon?: string;
}
