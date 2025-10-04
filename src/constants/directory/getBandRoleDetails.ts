import { ColorSchemeName } from 'react-native';

export const getBandRoleDetails = (role: BandRole, mode: ColorSchemeName) => {
  const isDark = mode === 'dark';

  switch (role) {
    case 'Captain':
    case 'Choir Master':
      return {
        icon: 'crown',
        color: isDark ? '#facc15' : '#f59e0b',
        bgColor: isDark ? '#422006' : '#fef3c7',
        label: role,
      };

    case 'Vice Captain':
    case 'Assistant Choir Master':
      return {
        icon: 'shield',
        color: isDark ? '#a78bfa' : '#8b5cf6',
        bgColor: isDark ? '#2e1065' : '#f3e8ff',
        label: role,
      };

    case 'Secretary':
      return {
        icon: 'file',
        color: isDark ? '#34d399' : '#10b981',
        bgColor: isDark ? '#022c22' : '#d1fae5',
        label: 'Secretary',
      };

    case 'Member':
      return {
        icon: 'person',
        color: isDark ? '#9ca3af' : '#6b7280',
        bgColor: isDark ? '#111827' : '#f3f4f6',
        label: 'Member',
      };

    default:
      return {
        icon: 'person',
        color: isDark ? '#9ca3af' : '#6b7280',
        bgColor: isDark ? '#1f2937' : '#f9fafb',
        label: role ?? 'Unknown',
      };
  }
};
