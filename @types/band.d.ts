import { ViewProps } from 'react-native';

declare global {
    interface BandBadgeProps extends ViewProps {
        band: string;
        size?: 'sm' | 'md' | 'lg';
        variant?: 'default' | 'gradient' | 'glow' | 'minimal' | 'outlined';
        showIcon?: boolean;
        className?: string;
      }
}

export {}