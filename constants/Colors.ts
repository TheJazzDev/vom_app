/**
 * App Color System
 * Structured color palette with semantic naming for better maintainability
 */

// === BRAND COLORS ===
const brand = {
  primary: '#8B5CF6',        // Main brand purple
  primaryLight: '#A78BFA',   // Lighter shade for hover states
  primaryDark: '#7C3AED',    // Darker shade for active states
};

// === NEUTRAL COLORS ===
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

// === SEMANTIC COLORS ===
const semantic = {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// === THEME-SPECIFIC COLORS ===
const ColorStructure = {
  light: {
    // Text colors
    text: {
      primary: '#11181C',      // Main text color
      secondary: '#6B7280',    // Secondary text (gray-500)
      tertiary: '#9CA3AF',     // Tertiary text (gray-400)
      inverse: neutral.white,   // White text for dark backgrounds
    },

    // Background colors
    background: {
      primary: '#F9FAFB',      // Main app background (gray-50)
      secondary: neutral.white, // Card/modal backgrounds
      tertiary: '#F3F4F6',     // Subtle background areas (gray-100)
      elevated: neutral.white,  // Elevated surfaces (cards, modals)
    },

    // Border colors
    border: {
      primary: '#E5E7EB',      // Main borders (gray-200)
      secondary: '#D1D5DB',    // Secondary borders (gray-300)
      focus: brand.primary,     // Focused input borders
    },

    // Interactive colors
    interactive: {
      primary: brand.primary,   // Primary buttons, active states
      secondary: '#F3F4F6',    // Secondary buttons
      disabled: '#D1D5DB',     // Disabled state
      hover: brand.primaryLight, // Hover states
    },

    // Icon colors
    icon: {
      primary: '#4B5563',      // Main icons (gray-600)
      secondary: '#9CA3AF',    // Secondary icons (gray-400)
      active: brand.primary,    // Active/selected icons
      inactive: '#D1D5DB',     // Inactive icons
    },

    // Navigation
    navigation: {
      background: neutral.white,
      border: '#E5E7EB',
      activeTint: brand.primary,
      inactiveTint: '#6B7280',
    },

    // Special surfaces
    surface: {
      card: neutral.white,
      modal: neutral.white,
      overlay: 'rgba(0, 0, 0, 0.5)',
      logo: '#A1CEDC',
    },

    // Status colors
    status: semantic,
  },

  dark: {
    // Text colors
    text: {
      primary: '#FFFFFF',      // Main text color
      secondary: '#A3A3A3',    // Secondary text
      tertiary: '#6B7280',     // Tertiary text
      inverse: '#11181C',      // Dark text for light backgrounds
    },

    // Background colors
    background: {
      primary: '#010101',      // Main app background
      secondary: '#161B21',    // Card/modal backgrounds
      tertiary: '#1F2937',     // Subtle background areas
      elevated: '#262626',     // Elevated surfaces
    },

    // Border colors
    border: {
      primary: '#374151',      // Main borders
      secondary: '#4B5563',    // Secondary borders
      focus: brand.primary,     // Focused input borders
    },

    // Interactive colors
    interactive: {
      primary: brand.primary,   // Primary buttons, active states
      secondary: '#374151',    // Secondary buttons
      disabled: '#4B5563',     // Disabled state
      hover: brand.primaryLight, // Hover states
    },

    // Icon colors
    icon: {
      primary: '#9CA3AF',      // Main icons
      secondary: '#6B7280',    // Secondary icons
      active: brand.primary,    // Active/selected icons
      inactive: '#4B5563',     // Inactive icons
    },

    // Navigation
    navigation: {
      background: '#161B21',
      border: '#374151',
      activeTint: brand.primary,
      inactiveTint: '#9CA3AF',
    },

    // Special surfaces
    surface: {
      card: '#161B21',
      modal: '#262626',
      overlay: 'rgba(0, 0, 0, 0.7)',
      logo: '#1D3D47',
    },

    // Status colors
    status: semantic,
  },
};

// === UTILITY FUNCTIONS ===

/**
 * Get color value by path for the current theme
 * Usage: getColor('text.primary', 'light') or getColor('background.secondary', 'dark')
 */
export const getColor = (path: string, theme: 'light' | 'dark') => {
  const keys = path.split('.');
  let color: any = Colors[theme];

  for (const key of keys) {
    color = color?.[key];
  }

  return color || '#000000'; // Fallback to black
};

/**
 * Create theme-aware color getter
 * Usage in component: const color = useColor(); color('text.primary')
 */
export const createColorGetter = (isDarkMode: boolean) => {
  return (path: string) => getColor(path, isDarkMode ? 'dark' : 'light');
};

// === LEGACY COMPATIBILITY (if needed) ===
export const Colors = {
  light: {
    border: ColorStructure.light.border.primary,
    card: ColorStructure.light.surface.card,
    background2: ColorStructure.light.background.tertiary,
    text: ColorStructure.light.text.primary,
    text600: ColorStructure.light.text.secondary,
    background: ColorStructure.light.background.primary,
    icon: ColorStructure.light.icon.primary,
    activeTint: ColorStructure.light.interactive.primary,
    uiBackground: ColorStructure.light.background.primary,
    inactiveTint: ColorStructure.light.navigation.inactiveTint,
    navBackground: ColorStructure.light.navigation.background,
    logoBackground: ColorStructure.light.surface.logo,
  },
  dark: {
    border: ColorStructure.dark.border.primary,
    background2: ColorStructure.dark.background.elevated,
    card: ColorStructure.dark.surface.card,
    text: ColorStructure.dark.text.primary,
    text600: ColorStructure.dark.text.secondary,
    background: ColorStructure.dark.background.primary,
    icon: ColorStructure.dark.icon.primary,
    activeTint: ColorStructure.dark.interactive.primary,
    uiBackground: ColorStructure.dark.background.primary,
    inactiveTint: ColorStructure.dark.navigation.inactiveTint,
    navBackground: ColorStructure.dark.navigation.background,
    logoBackground: ColorStructure.dark.surface.logo,
  },
};