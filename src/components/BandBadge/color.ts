import { Bands } from '@/src/enum/bands';

export const getBandColor = (
  band: string,
  variant: BandBadgeProps['variant']
) => {
  const bandColorMap: Record<string, any> = {
    [Bands.Choir]: {
      default: {
        container: 'bg-[#E9D5FF] dark:bg-[#4C1D95]',
        text: 'text-[#6B21A8] dark:text-[#E9D5FF]',
        border: 'border-[#E9D5FF] dark:border-[#6B21A8]',
        shadow: 'shadow shadow-sm shadow-[#F3E8FF] dark:shadow-[#2E1065]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#E9D5FF] to-[#D8B4FE] dark:from-[#4C1D95] dark:to-[#5B21B6]',
        text: 'text-[#6B21A8] dark:text-[#E9D5FF]',
        border: 'border-[#D8B4FE] dark:border-[#7E22CE]',
        shadow: 'shadow shadow-[#E9D5FF] dark:shadow-[#2E1065]',
      },
      glow: {
        container: 'bg-[#E9D5FF] dark:bg-[#4C1D95]',
        text: 'text-[#6B21A8] dark:text-[#E9D5FF]',
        border: 'border-[#C084FC] dark:border-[#9333EA] border',
        shadow: 'shadow shadow-lg shadow-[#D8B4FE] dark:shadow-[#5B21B6]',
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

    [Bands.LoveDevine]: {
      default: {
        container: 'bg-[#A7F3D0] dark:bg-[#064E3B]',
        text: 'text-[#065F46] dark:text-[#A7F3D0]',
        border: 'border-[#A7F3D0] dark:border-[#065F46]',
        shadow: 'shadow shadow-sm shadow-[#D1FAE5] dark:shadow-[#064E3B]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#A7F3D0] to-[#6EE7B7] dark:from-[#064E3B] dark:to-[#065F46]',
        text: 'text-[#065F46] dark:text-[#A7F3D0]',
        border: 'border-[#6EE7B7] dark:border-[#047857]',
        shadow: 'shadow shadow-[#A7F3D0] dark:shadow-[#064E3B]',
      },
      glow: {
        container: 'bg-[#A7F3D0] dark:bg-[#064E3B]',
        text: 'text-[#065F46] dark:text-[#A7F3D0]',
        border: 'border-[#34D399] dark:border-[#059669] border',
        shadow: 'shadow shadow-lg shadow-[#6EE7B7] dark:shadow-[#065F46]',
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

    [Bands.YouthFellowship]: {
      default: {
        container: 'bg-[#C7D2FE] dark:bg-[#312E81]',
        text: 'text-[#3730A3] dark:text-[#C7D2FE]',
        border: 'border-[#C7D2FE] dark:border-[#312E81]',
        shadow: 'shadow shadow-sm shadow-[#E0E7FF] dark:shadow-[#312E81]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#C7D2FE] to-[#A5B4FC] dark:from-[#312E81] dark:to-[#3730A3]',
        text: 'text-[#3730A3] dark:text-[#C7D2FE]',
        border: 'border-[#A5B4FC] dark:border-[#4338CA]',
        shadow: 'shadow shadow-[#C7D2FE] dark:shadow-[#312E81]',
      },
      glow: {
        container: 'bg-[#C7D2FE] dark:bg-[#312E81]',
        text: 'text-[#3730A3] dark:text-[#C7D2FE]',
        border: 'border-[#818CF8] dark:border-[#4F46E5] border',
        shadow: 'shadow shadow-lg shadow-[#A5B4FC] dark:shadow-[#3730A3]',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#3730A3] dark:text-[#818CF8]',
        border: 'border-[#818CF8] dark:border-[#6366F1] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#C7D2FE]/50 dark:bg-[#312E81]/50',
        text: 'text-[#3730A3] dark:text-[#C7D2FE]',
        border: 'border-transparent',
        shadow: '',
      },
    },

    [Bands.Deborah]: {
      default: {
        container: 'bg-[#FECACA] dark:bg-[#7F1D1D]',
        text: 'text-[#991B1B] dark:text-[#FECACA]',
        border: 'border-[#FECACA] dark:border-[#7F1D1D]',
        shadow: 'shadow shadow-sm shadow-[#FEE2E2] dark:shadow-[#7F1D1D]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FECACA] to-[#FCA5A5] dark:from-[#7F1D1D] dark:to-[#991B1B]',
        text: 'text-[#991B1B] dark:text-[#FECACA]',
        border: 'border-[#FCA5A5] dark:border-[#B91C1C]',
        shadow: 'shadow shadow-[#FECACA] dark:shadow-[#7F1D1D]',
      },
      glow: {
        container: 'bg-[#FECACA] dark:bg-[#7F1D1D]',
        text: 'text-[#991B1B] dark:text-[#FECACA]',
        border: 'border-[#F87171] dark:border-[#DC2626] border',
        shadow: 'shadow shadow-lg shadow-[#FCA5A5] dark:shadow-[#991B1B]',
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

    [Bands.Daniel]: {
      default: {
        container: 'bg-[#BFDBFE] dark:bg-[#1E3A8A]',
        text: 'text-[#1E40AF] dark:text-[#BFDBFE]',
        border: 'border-[#BFDBFE] dark:border-[#1E3A8A]',
        shadow: 'shadow shadow-sm shadow-[#DBEAFE] dark:shadow-[#1E3A8A]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#BFDBFE] to-[#93C5FD] dark:from-[#1E3A8A] dark:to-[#1E40AF]',
        text: 'text-[#1E40AF] dark:text-[#BFDBFE]',
        border: 'border-[#93C5FD] dark:border-[#1D4ED8]',
        shadow: 'shadow shadow-[#BFDBFE] dark:shadow-[#1E3A8A]',
      },
      glow: {
        container: 'bg-[#BFDBFE] dark:bg-[#1E3A8A]',
        text: 'text-[#1E40AF] dark:text-[#BFDBFE]',
        border: 'border-[#60A5FA] dark:border-[#2563EB] border',
        shadow: 'shadow shadow-lg shadow-[#93C5FD] dark:shadow-[#1E40AF]',
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

    [Bands.QueenEsther]: {
      default: {
        container: 'bg-[#FBCFE8] dark:bg-[#831843]',
        text: 'text-[#9D174D] dark:text-[#FBCFE8]',
        border: 'border-[#FBCFE8] dark:border-[#831843]',
        shadow: 'shadow shadow-sm shadow-[#FCE7F3] dark:shadow-[#831843]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FBCFE8] to-[#F9A8D4] dark:from-[#831843] dark:to-[#9D174D]',
        text: 'text-[#9D174D] dark:text-[#FBCFE8]',
        border: 'border-[#F9A8D4] dark:border-[#BE185D]',
        shadow: 'shadow shadow-[#FBCFE8] dark:shadow-[#831843]',
      },
      glow: {
        container: 'bg-[#FBCFE8] dark:bg-[#831843]',
        text: 'text-[#9D174D] dark:text-[#FBCFE8]',
        border: 'border-[#F472B6] dark:border-[#DB2777] border',
        shadow: 'shadow shadow-lg shadow-[#F9A8D4] dark:shadow-[#9D174D]',
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
    [Bands.GoodWomen]: {
      default: {
        container: 'bg-[#FED7AA] dark:bg-[#7C2D12]',
        text: 'text-[#9A3412] dark:text-[#FED7AA]',
        border: 'border-[#FED7AA] dark:border-[#7C2D12]',
        shadow: 'shadow shadow-sm shadow-[#FFEDD5] dark:shadow-[#7C2D12]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FED7AA] to-[#FDBA74] dark:from-[#7C2D12] dark:to-[#9A3412]',
        text: 'text-[#9A3412] dark:text-[#FED7AA]',
        border: 'border-[#FDBA74] dark:border-[#C2410C]',
        shadow: 'shadow shadow-[#FED7AA] dark:shadow-[#7C2D12]',
      },
      glow: {
        container: 'bg-[#FED7AA] dark:bg-[#7C2D12]',
        text: 'text-[#9A3412] dark:text-[#FED7AA]',
        border: 'border-[#FB923C] dark:border-[#EA580C] border',
        shadow: 'shadow shadow-lg shadow-[#FDBA74] dark:shadow-[#9A3412]',
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

    [Bands.Warden]: {
      default: {
        container: 'bg-[#FDE68A] dark:bg-[#78350F]',
        text: 'text-[#92400E] dark:text-[#FDE68A]',
        border: 'border-[#FDE68A] dark:border-[#78350F]',
        shadow: 'shadow shadow-sm shadow-[#FEF3C7] dark:shadow-[#78350F]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] dark:from-[#78350F] dark:to-[#92400E]',
        text: 'text-[#92400E] dark:text-[#FDE68A]',
        border: 'border-[#FCD34D] dark:border-[#B45309]',
        shadow: 'shadow shadow-[#FDE68A] dark:shadow-[#78350F]',
      },
      glow: {
        container: 'bg-[#FDE68A] dark:bg-[#78350F]',
        text: 'text-[#92400E] dark:text-[#FDE68A]',
        border: 'border-[#FBBF24] dark:border-[#D97706] border',
        shadow: 'shadow shadow-lg shadow-[#FCD34D] dark:shadow-[#92400E]',
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
    [Bands.ChildrenMinistry]: {
      default: {
        container: 'bg-[#BAE6FD] dark:bg-[#0C4A6E]',
        text: 'text-[#075985] dark:text-[#BAE6FD]',
        border: 'border-[#BAE6FD] dark:border-[#0C4A6E]',
        shadow: 'shadow shadow-sm shadow-[#E0F2FE] dark:shadow-[#0C4A6E]',
      },
      gradient: {
        container:
          'bg-gradient-to-r from-[#BAE6FD] to-[#7DD3FC] dark:from-[#0C4A6E] dark:to-[#075985]',
        text: 'text-[#075985] dark:text-[#BAE6FD]',
        border: 'border-[#7DD3FC] dark:border-[#0369A1]',
        shadow: 'shadow shadow-[#BAE6FD] dark:shadow-[#0C4A6E]',
      },
      glow: {
        container: 'bg-[#BAE6FD] dark:bg-[#0C4A6E]',
        text: 'text-[#075985] dark:text-[#BAE6FD]',
        border: 'border-[#38BDF8] dark:border-[#0284C7] border',
        shadow: 'shadow shadow-lg shadow-[#7DD3FC] dark:shadow-[#075985]',
      },
      outlined: {
        container: 'bg-transparent',
        text: 'text-[#075985] dark:text-[#38BDF8]',
        border: 'border-[#38BDF8] dark:border-[#0EA5E9] border',
        shadow: '',
      },
      minimal: {
        container: 'bg-[#BAE6FD]/50 dark:bg-[#0C4A6E]/50',
        text: 'text-[#075985] dark:text-[#BAE6FD]',
        border: 'border-transparent',
        shadow: '',
      },
    },

    [Bands.JohnBeloved]: {
      default: {
        container: '#FEF08A dark:#713F12',
        text: '#854D0E dark:#FEF08A',
        border: '#FEF08A dark:#713F12',
        shadow: '#FEFCE8 dark:#713F12',
      },
      gradient: {
        container: 'from:#FEF08A to:#FDE68A dark:from:#713F12 dark:to:#854D0E',
        text: '#854D0E dark:#FEF08A',
        border: '#FDE68A dark:#A16207',
        shadow: '#FEF08A dark:#713F12',
      },
      glow: {
        container: '#FEF08A dark:#713F12',
        text: '#854D0E dark:#FEF08A',
        border: '#FACC15 dark:#CA8A04',
        shadow: '#FDE68A dark:#854D0E',
      },
      outlined: {
        container: 'transparent',
        text: '#854D0E dark:#FACC15',
        border: '#FACC15 dark:#EAB308',
        shadow: '',
      },
      minimal: {
        container: '#FEF08A80 dark:#713F1280',
        text: '#854D0E dark:#FEF08A',
        border: 'transparent',
        shadow: '',
      },
    },
    [Bands.Faith]: {
      default: {
        container: '#FEF9C3 dark:#0A0A00',
        text: '#A16207 dark:#FEF08A',
        border: '#FEF08A dark:#713F12',
        shadow: '#FEFCE8 dark:#713F12',
      },
      gradient: {
        container: 'from:#FEF9C3 to:#FDE68A dark:from:#0A0A00 dark:to:#854D0E',
        text: '#A16207 dark:#FEF08A',
        border: '#FDE68A dark:#A16207',
        shadow: '#FEF08A dark:#713F12',
      },
      glow: {
        container: '#FEF9C3 dark:#0A0A00',
        text: '#A16207 dark:#FEF08A',
        border: '#FACC15 dark:#CA8A04',
        shadow: '#FDE68A dark:#854D0E',
      },
      outlined: {
        container: 'transparent',
        text: '#A16207 dark:#FACC15',
        border: '#FACC15 dark:#EAB308',
        shadow: '',
      },
      minimal: {
        container: '#FEF9C380 dark:#0A0A0080',
        text: '#A16207 dark:#FEF08A',
        border: 'transparent',
        shadow: '',
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
