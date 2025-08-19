/**
 * App Color System
 * Structured color palette with semantic naming for better maintainability
 */

const brand = {
  primary: '#8B5CF6',
  primaryLight: '#A78BFA',
  primaryDark: '#7C3AED',
};

const neutral = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
};

const semantic = {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

const lightTheme = {
  text: {
    primary: '#11181C',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: neutral.white,
  },
  background: {
    primary: '#F9FAFB',
    secondary: neutral.white,
    tertiary: '#F3F4F6',
    elevated: neutral.white,
  },
  border: {
    primary: '#E5E7EB',
    secondary: '#D1D5DB',
    focus: brand.primary,
  },
  interactive: {
    primary: brand.primary,
    secondary: '#F3F4F6',
    disabled: '#D1D5DB',
    hover: brand.primaryLight,
  },
  icon: {
    primary: '#4B5563',
    secondary: '#9CA3AF',
    active: brand.primary,
    inactive: '#D1D5DB',
  },
  navigation: {
    background: neutral.white,
    border: '#E5E7EB',
    activeTint: brand.primary,
    inactiveTint: '#6B7280',
  },
  surface: {
    card: neutral.white,
    modal: neutral.white,
    overlay: 'rgba(0, 0, 0, 0.5)',
    logo: '#A1CEDC',
  },
  status: semantic,
};

const darkTheme = {
  text: {
    primary: '#FFFFFF',
    secondary: '#A3A3A3',
    tertiary: '#6B7280',
    inverse: '#11181C',
  },
  background: {
    primary: '#010101',
    secondary: '#161B21',
    tertiary: '#1F2937',
    elevated: '#262626',
  },
  border: {
    primary: '#374151',
    secondary: '#4B5563',
    focus: brand.primary,
  },
  interactive: {
    primary: brand.primary,
    secondary: '#374151',
    disabled: '#4B5563',
    hover: brand.primaryLight,
  },
  icon: {
    primary: '#9CA3AF',
    secondary: '#6B7280',
    active: brand.primary,
    inactive: '#4B5563',
  },
  navigation: {
    background: '#161B21',
    border: '#374151',
    activeTint: brand.primary,
    inactiveTint: '#9CA3AF',
  },
  surface: {
    card: '#161B21',
    modal: '#262626',
    overlay: 'rgba(0, 0, 0, 0.7)',
    logo: '#1D3D47',
  },
  status: semantic,
};

// export const getColor = (path: string, theme: 'light' | 'dark') => {
//   const keys = path.split('.');
//   let color: any = Colors[theme];

//   for (const key of keys) {
//     color = color?.[key];
//   }

//   return color || '#000000';
// };

// export const createColorGetter = (isDarkMode: boolean) => {
//   return (path: string) => getColor(path, isDarkMode ? 'dark' : 'light');
// };

export const Colors = {
  light: {
    border: lightTheme.border.primary,
    card: lightTheme.surface.card,
    background2: lightTheme.background.tertiary,
    text: lightTheme.text.primary,
    text600: lightTheme.text.secondary,
    background: lightTheme.background.primary,
    icon: lightTheme.icon.primary,
    activeTint: lightTheme.interactive.primary,
    uiBackground: lightTheme.background.primary,
    inactiveTint: lightTheme.navigation.inactiveTint,
    navBackground: lightTheme.navigation.background,
    logoBackground: lightTheme.surface.logo,
  },
  dark: {
    border: darkTheme.border.primary,
    background2: darkTheme.background.elevated,
    card: darkTheme.surface.card,
    text: darkTheme.text.primary,
    text600: darkTheme.text.secondary,
    background: darkTheme.background.primary,
    icon: darkTheme.icon.primary,
    activeTint: darkTheme.interactive.primary,
    uiBackground: darkTheme.background.primary,
    inactiveTint: darkTheme.navigation.inactiveTint,
    navBackground: darkTheme.navigation.background,
    logoBackground: darkTheme.surface.logo,
  },
};

export const AppColors = {
  brand,
  neutral,
  semantic,
  themed: Colors,
};
