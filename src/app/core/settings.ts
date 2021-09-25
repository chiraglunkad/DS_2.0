export interface AppSettings {
  navPos?: 'side' | 'top';
  dir?: 'ltr' | 'rtl';
  theme?: 'light' | 'dark';
  headerPos?: 'fixed' | 'static' | 'above';
  sidenavOpened?: boolean;
  sidenavCollapsed?: boolean;
  language?: string;
}

export const defaults: AppSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'light',
  headerPos: 'fixed',
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
};
