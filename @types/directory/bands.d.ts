import { ViewProps } from 'react-native';

declare global {
  type BandKeys =
    | 'CHOIR'
    | LOVE_DIVINE
    | DANIEL
    | DEBORAH
    | QUEEN_ESTHER
    | GOOD_WOMEN
    | WARDEN
    | JOHN_BELOVED
    | FAITH
    | HOLY_MARY
    | UNASSIGNED;

  type BandRole =
    | 'Captain'
    | 'Choir Master'
    | 'Vice Captain'
    | 'Assistant Choir Master'
    | 'Secretary'
    | 'Member';

  interface BandData {
    name: BandKeys;
    role: BandRole;
  }

  interface BandBadgeProps extends ViewProps {
    band: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'gradient' | 'glow' | 'minimal' | 'outlined';
    showIcon?: boolean;
    className?: string;
  }

  export interface Band {
    id: BandKeys;
    name: string;
    displayName: string;
    description: string;
    icon1: tIconSymbolName;
    icon2: string;
    gradient: GradientColor;
    createdAt: string;
    isActive: boolean;
    memberCount: number;
    leadership: BandLeadership;
    meetingDay?: string | null;
    meetingTime?: string | null;
  }

  type BandWithMembers = Band & { members: UserProfile[] };
}

export {};
