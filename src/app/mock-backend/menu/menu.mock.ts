export interface BackendMenuItem {
  code: string;
  label: string;
  children?: BackendMenuItem[];
}

export const MENU_MOCK: BackendMenuItem[] = [
  {
    code: 'DASHBOARD',
    label: 'Dashboard',
    children: [
      { code: 'DASHBOARD_HOME', label: 'Home' },
      { code: 'DASHBOARD_SETTINGS', label: 'Impostazioni' }
    ]
  },
  {
    code: 'POLICIES',
    label: 'Polizze',
    children: [
      { code: 'POLICIES_ACTIVE', label: 'Polizze attive' },
      { code: 'POLICIES_PENDING', label: 'Polizze da attivare' },
      {
        code: 'POLICIES_HISTORY',
        label: 'Storico',
        children: [
          { code: 'POLICIES_HISTORY_YEAR', label: 'Per anno' },
          { code: 'POLICIES_HISTORY_CUSTOMER', label: 'Per cliente' }
        ]
      }
    ]
  },
  {
    code: 'CUSTOMERS',
    label: 'Clienti',
    children: [
      { code: 'CUSTOMERS_LIST', label: 'Elenco clienti' },
      { code: 'CUSTOMERS_CREATE', label: 'Nuovo cliente' }
    ]
  },
  {
    code: 'SETTINGS',
    label: 'Impostazioni',
    children: [
      { code: 'SETTINGS_PROFILE', label: 'Profilo' },
      { code: 'SETTINGS_SECURITY', label: 'Sicurezza' }
    ]
  }
];
