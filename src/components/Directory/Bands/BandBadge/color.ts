import { BandKeysEnum } from '@/src/enum';

export const getBandColor = (
  band: string,
  variant: BandBadgeProps['variant'],
) => {
  const bandColorMap: Record<string, any> = {
    [BandKeysEnum.CHOIR]: {
      default: {
        container: 'bg-[#E9D5FF] dark:bg-[#4C1D95]',
        text: 'text-[#6B21A8] dark:text-[#E9D5FF]',
        border: 'border-[#E9D5FF] dark:border-[#6B21A8]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#F3E8FF&lsqb; dark:shadow-&lsqb;#2E1065&lsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#E9D5FF] to-[#D8B4FE] dark:from-[#4C1D95] dark:to-[#5B21B6]',
        text: 'text-[#6B21A8] dark:text-[#E9D5FF]',
        border: 'border-[#D8B4FE] dark:border-[#7E22CE]',
        shadow:
          'shadow shadow-&lsqb;#E9D5FF&lsqb; dark:shadow-&lsqb;#2E1065&lsqb;',
      },
      glow: {
        container: 'bg-[#E9D5FF] dark:bg-[#4C1D95]',
        text: 'text-[#6B21A8] dark:text-[#E9D5FF]',
        border: 'border-[#C084FC] dark:border-[#9333EA] border',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#D8B4FE&lsqb; dark:shadow-&lsqb;#5B21B6&lsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#6B21A8] dark:text-[#A855F7]',
        border: 'border-[#C084FC] dark:border-[#A855F7] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#E9D5FF]/50 dark:bg-[#4C1D95]/50',
        text: 'text-[#6B21A8] dark:text-[#E9D5FF]',
        border: 'border-transparent',
        shadow: '',
      },
    },

    [BandKeysEnum.LOVE_DIVINE]: {
      default: {
        container: 'bg-[#A7F3D0] dark:bg-[#064E3B]',
        text: 'text-[#065F46] dark:text-[#A7F3D0]',
        border: 'border-[#A7F3D0] dark:border-[#065F46]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#D1FAE5&lsqb; dark:shadow-&lsqb;#064E3B&lsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#A7F3D0] to-[#6EE7B7] dark:from-[#064E3B] dark:to-[#065F46]',
        text: 'text-[#065F46] dark:text-[#A7F3D0]',
        border: 'border-[#6EE7B7] dark:border-[#047857]',
        shadow:
          'shadow shadow-&lsqb;#A7F3D0&lsqb; dark:shadow-&lsqb;#064E3B&lsqb;',
      },
      glow: {
        container: 'bg-[#A7F3D0] dark:bg-[#064E3B]',
        text: 'text-[#065F46] dark:text-[#A7F3D0]',
        border: 'border-[#34D399] dark:border-[#059669] border',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#6EE7B7&lsqb; dark:shadow-&lsqb;#065F46&lsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#065F46] dark:text-[#34D399]',
        border: 'border-[#34D399] dark:border-[#10B981] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#A7F3D0]/50 dark:bg-[#064E3B]/50',
        text: 'text-[#065F46] dark:text-[#A7F3D0]',
        border: 'border-transparent',
        shadow: '',
      },
    },
    [BandKeysEnum.DEBORAH]: {
      default: {
        container: 'bg-[#FECACA] dark:bg-[#7F1D1D]',
        text: 'text-[#991B1B] dark:text-[#FECACA]',
        border: 'border-[#FECACA] dark:border-[#7F1D1D]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FEE2E2&lsqb; dark:shadow-&lsqb;#7F1D1D&lsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FECACA] to-[#FCA5A5] dark:from-[#7F1D1D] dark:to-[#991B1B]',
        text: 'text-[#991B1B] dark:text-[#FECACA]',
        border: 'border-[#FCA5A5] dark:border-[#B91C1C]',
        shadow:
          'shadow shadow-&lsqb;#FECACA&lsqb; dark:shadow-&lsqb;#7F1D1D&lsqb;',
      },
      glow: {
        container: 'bg-[#FECACA] dark:bg-[#7F1D1D]',
        text: 'text-[#991B1B] dark:text-[#FECACA]',
        border: 'border-[#F87171] dark:border-[#DC2626] border',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#FCA5A5&lsqb; dark:shadow-&lsqb;#991B1B&lsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#991B1B] dark:text-[#F87171]',
        border: 'border-[#F87171] dark:border-[#EF4444] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#FECACA]/50 dark:bg-[#7F1D1D]/50',
        text: 'text-[#991B1B] dark:text-[#FECACA]',
        border: 'border-transparent',
        shadow: '',
      },
    },

    [BandKeysEnum.DANIEL]: {
      default: {
        container: 'bg-[#BFDBFE] dark:bg-[#1E3A8A]',
        text: 'text-[#1E40AF] dark:text-[#BFDBFE]',
        border: 'border-[#BFDBFE] dark:border-[#1E3A8A]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#DBEAFE&lsqb; dark:shadow-&lsqb;#1E3A8A&lsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#BFDBFE] to-[#93C5FD] dark:from-[#1E3A8A] dark:to-[#1E40AF]',
        text: 'text-[#1E40AF] dark:text-[#BFDBFE]',
        border: 'border-[#93C5FD] dark:border-[#1D4ED8]',
        shadow:
          'shadow shadow-&lsqb;#BFDBFE&lsqb; dark:shadow-&lsqb;#1E3A8A&lsqb;',
      },
      glow: {
        container: 'bg-[#BFDBFE] dark:bg-[#1E3A8A]',
        text: 'text-[#1E40AF] dark:text-[#BFDBFE]',
        border: 'border-[#60A5FA] dark:border-[#2563EB] border',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#93C5FD&lsqb; dark:shadow-&lsqb;#1E40AF&lsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#1E40AF] dark:text-[#60A5FA]',
        border: 'border-[#60A5FA] dark:border-[#3B82F6] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#BFDBFE]/50 dark:bg-[#1E3A8A]/50',
        text: 'text-[#1E40AF] dark:text-[#BFDBFE]',
        border: 'border-transparent',
        shadow: '',
      },
    },

    [BandKeysEnum.QUEEN_ESTHER]: {
      default: {
        container: 'bg-[#FBCFE8] dark:bg-[#831843]',
        text: 'text-[#9D174D] dark:text-[#FBCFE8]',
        border: 'border-[#FBCFE8] dark:border-[#831843]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FCE7F3&lsqb; dark:shadow-&lsqb;#831843&lsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FBCFE8] to-[#F9A8D4] dark:from-[#831843] dark:to-[#9D174D]',
        text: 'text-[#9D174D] dark:text-[#FBCFE8]',
        border: 'border-[#F9A8D4] dark:border-[#BE185D]',
        shadow:
          'shadow shadow-&lsqb;#FBCFE8&lsqb; dark:shadow-&lsqb;#831843&lsqb;',
      },
      glow: {
        container: 'bg-[#FBCFE8] dark:bg-[#831843]',
        text: 'text-[#9D174D] dark:text-[#FBCFE8]',
        border: 'border-[#F472B6] dark:border-[#DB2777] border',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#F9A8D4&lsqb; dark:shadow-&lsqb;#9D174D&lsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#9D174D] dark:text-[#F472B6]',
        border: 'border-[#F472B6] dark:border-[#EC4899] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#FBCFE8]/50 dark:bg-[#831843]/50',
        text: 'text-[#9D174D] dark:text-[#FBCFE8]',
        border: 'border-transparent',
        shadow: '',
      },
    },
    [BandKeysEnum.GOOD_WOMEN]: {
      default: {
        container: 'bg-[#FED7AA] dark:bg-[#7C2D12]',
        text: 'text-[#9A3412] dark:text-[#FED7AA]',
        border: 'border-[#FED7AA] dark:border-[#7C2D12]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FFEDD5&lsqb; dark:shadow-&lsqb;#7C2D12&lsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FED7AA] to-[#FDBA74] dark:from-[#7C2D12] dark:to-[#9A3412]',
        text: 'text-[#9A3412] dark:text-[#FED7AA]',
        border: 'border-[#FDBA74] dark:border-[#C2410C]',
        shadow:
          'shadow shadow-&lsqb;#FED7AA&lsqb; dark:shadow-&lsqb;#7C2D12&lsqb;',
      },
      glow: {
        container: 'bg-[#FED7AA] dark:bg-[#7C2D12]',
        text: 'text-[#9A3412] dark:text-[#FED7AA]',
        border: 'border-[#FB923C] dark:border-[#EA580C] border',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#FDBA74&lsqb; dark:shadow-&lsqb;#9A3412&lsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#9A3412] dark:text-[#FB923C]',
        border: 'border-[#FB923C] dark:border-[#F97316] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#FED7AA]/50 dark:bg-[#7C2D12]/50',
        text: 'text-[#9A3412] dark:text-[#FED7AA]',
        border: 'border-transparent',
        shadow: '',
      },
    },

    [BandKeysEnum.WARDEN]: {
      default: {
        container: 'bg-[#FDE68A] dark:bg-[#78350F]',
        text: 'text-[#92400E] dark:text-[#FDE68A]',
        border: 'border-[#FDE68A] dark:border-[#78350F]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FEF3C7&lsqb; dark:shadow-&lsqb;#78350F&lsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] dark:from-[#78350F] dark:to-[#92400E]',
        text: 'text-[#92400E] dark:text-[#FDE68A]',
        border: 'border border-[#FCD34D] dark:border-[#B45309]',
        shadow:
          'shadow shadow-&lsqb;#FDE68A&lsqb; dark:shadow-&lsqb;#78350F&lsqb;',
      },
      glow: {
        container: 'bg-[#FDE68A] dark:bg-[#78350F]',
        text: 'text-[#92400E] dark:text-[#FDE68A]',
        border: 'border-[#FBBF24] dark:border-[#D97706] border',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#FCD34D&lsqb; dark:shadow-&lsqb;#92400E&lsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#92400E] dark:text-[#FBBF24]',
        border: 'border-[#FBBF24] dark:border-[#F59E0B] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#FDE68A]/50 dark:bg-[#78350F]/50',
        text: 'text-[#92400E] dark:text-[#FDE68A]',
        border: 'border-transparent',
        shadow: '',
      },
    },
    [BandKeysEnum.FAITH]: {
      default: {
        container: 'bg-[#FFD700] dark:bg-[#0C4A6E]',
        text: 'text-[#075985] dark:text-[#FFD700]',
        border: 'border-[#FFD700] dark:border-[#0C4A6E]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FDE047&rsqb; dark:shadow-&lsqb;#0C4A6E&rsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FFD700] to-[#7DD3FC] dark:from-[#0C4A6E] dark:to-[#075985]',
        text: 'text-[#075985] dark:text-[#FFD700]',
        border: 'border-[#7DD3FC] dark:border-[#0369A1]',
        shadow:
          'shadow shadow-&lsqb;#FFD700&rsqb; dark:shadow-&lsqb;#0C4A6E&rsqb;',
      },
      glow: {
        container: 'bg-[#FFD700] dark:bg-[#0C4A6E]',
        text: 'text-[#075985] dark:text-[#FFD700]',
        border: 'border-[#38BDF8] dark:border-[#0284C7]',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#7DD3FC&rsqb; dark:shadow-&lsqb;#075985&rsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#075985] dark:text-[#38BDF8]',
        border: 'border border-[#38BDF8] dark:border-[#0EA5E9]',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#FFD700]/50 dark:bg-[#0C4A6E]/50',
        text: 'text-[#075985] dark:text-[#FFD700]',
        border: 'border-transparent',
        shadow: '',
      },
    },
    [BandKeysEnum.JOHN_BELOVED]: {
      default: {
        container: 'bg-[#FEF08A] dark:bg-[#713F12]',
        text: 'text-[#854D0E] dark:text-[#FEF08A]',
        border: 'border-[#FEF08A] dark:border-[#713F12]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FEFCE8&rsqb; dark:shadow-&lsqb;#713F12&rsqb;',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FEF08A] to-[#FDE68A] dark:from-[#713F12] dark:to-[#854D0E]',
        text: 'text-[#854D0E] dark:text-[#FEF08A]',
        border: 'border border-[#FDE68A] dark:border-[#A16207]',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FEF08A&rsqb; dark:shadow-&lsqb;#713F12&rsqb;',
      },
      glow: {
        container: 'bg-[#FEF08A] dark:bg-[#713F12]',
        text: 'text-[#854D0E] dark:text-[#FEF08A]',
        border: 'border-[#FACC15] dark:border-[#CA8A04] border',
        shadow:
          'shadow shadow-lg shadow-&lsqb;#FDE68A&rsqb; dark:shadow-&lsqb;#854D0E&rsqb;',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#854D0E] dark:text-[#FACC15]',
        border: 'border-[#FACC15] dark:border-[#EAB308] border',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FACC15&rsqb; dark:shadow-&lsqb;#EAB308&rsqb;',
      },
      minimal: {
        container: 'bg-[#FEF08A]/50 dark:bg-[#713F12]/50',
        text: 'text-[#854D0E] dark:text-[#FEF08A]',
        border: 'border-transparent',
        shadow:
          'shadow shadow-sm shadow-&lsqb;#FEF08A&rsqb;/50 dark:shadow-&lsqb;#713F12&rsqb;/50',
      },
    },
  };

  const defaultColors = {
    default: {
      container: 'bg-gray-200 dark:bg-gray-900',
      text: 'text-gray-800 dark:text-gray-200',
      border: 'border-gray-200 dark:border-gray-800',
      shadow: 'shadow shadow-sm shadow-gray-100 dark:shadow-gray-900',
    },
    gradient: {
      container:
        'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-900 dark:to-gray-800',
      text: 'text-gray-800 dark:text-gray-200',
      border: 'border-gray-300 dark:border-gray-700',
      shadow: 'shadow shadow-gray-200 dark:shadow-gray-900',
    },
    glow: {
      container: 'bg-gray-200 dark:bg-gray-900',
      text: 'text-gray-800 dark:text-gray-200',
      border: 'border-gray-400 dark:border-gray-600 border',
      shadow: 'shadow shadow-lg shadow-gray-300 dark:shadow-gray-800',
    },
    outlined: {
      container: 'bg-transparent',
      text: 'text-gray-800 dark:text-gray-400',
      border: 'border-gray-400 dark:border-gray-500 border',
      shadow: '',
    },
    minimal: {
      container: 'bg-gray-200/50 dark:bg-gray-900/50',
      text: 'text-gray-800 dark:text-gray-200',
      border: 'border-transparent',
      shadow: '',
    },
  };

  const bandColors = bandColorMap[band] || defaultColors;
  return bandColors[variant!] || bandColors.default;
};
