import { TranslateResult } from 'vue-i18n';

export const MENU_ID = Object.freeze({
  MANAGE: 'manage',
  ANALYTICS: 'analytics',
  ENVIRONMENT: 'environment',
  ACCOUNT_AND_ACCESS: 'accountAccess',
  DASHBOARD: 'dashboard',
  WORKSPACES: 'workspaces',
  ENVIRONMENT_CLOUD_RESOURCES: 'cloudResources',
});

export type MenuId = (typeof MENU_ID)[keyof typeof MENU_ID];

export interface Menu {
  id: MenuId | string;
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
  // highlightTag?:
}

export interface DisplayMenu extends Menu {
  show?: boolean;
  label: TranslateResult;
  icon?: string;
  to: Location;
  subMenuList?: DisplayMenu[];
  href?: string;
}

export interface DipslayState {
  visibleSidebar: boolean;
  isInitialized: boolean;
  uncheckedNotificationCount: number;
  uncheckedNoticeCount: number;
  isSignInFailed: boolean;
  gnbNotificationLastReadTime: string;
}

export interface SidebarProps {
  styleType: string;
  disableButton: boolean;
  size: string;
  isFixedSize: boolean;
  disableScroll: boolean;
}
