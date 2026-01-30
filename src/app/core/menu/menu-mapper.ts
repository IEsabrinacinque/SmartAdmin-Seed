import { BackendMenuItem } from '@/app/mock-backend/menu/menu.mock';
import { MenuItemType } from '@/app/types/layout';

const ICON_MAP: Record<string, string> = {
  DASHBOARD: '/assets/icons/sprite.svg#trello',
  POLICIES: '/assets/icons/sprite.svg#file-text',
  CUSTOMERS: '/assets/icons/sprite.svg#user',
  SETTINGS: '/assets/icons/sprite.svg#settings',
};

const ROUTE_MAP: Record<string, string> = {
  DASHBOARD_HOME: '/myviews/dashboard',
  DASHBOARD_SETTINGS: '/settings',

  POLICIES_ACTIVE: '/policies/active',
  POLICIES_PENDING: '/policies/pending',
  POLICIES_HISTORY_YEAR: '/policies/history/year',
  POLICIES_HISTORY_CUSTOMER: '/policies/history/customer',

  CUSTOMERS_LIST: '/customers',
  CUSTOMERS_CREATE: '/customers/new',

  SETTINGS_PROFILE: '/settings/profile',
  SETTINGS_SECURITY: '/settings/security',
};

export function mapBackendMenuToSidebar(
  backendMenu: BackendMenuItem[]
): MenuItemType[] {
  return backendMenu.map(item => mapItem(item));
}

function mapItem(item: BackendMenuItem): MenuItemType {
  const hasChildren = !!item.children?.length;

  return {
    label: item.label,
    icon: ICON_MAP[item.code],
    isCollapsed: hasChildren,
    url: hasChildren ? undefined : ROUTE_MAP[item.code],
    children: item.children?.map(child => mapItem(child)),
  };
}
