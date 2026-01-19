import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

export interface StackScreenOptions {
  headerBackTitle: string;
  headerTitleAlign: 'left' | 'center' | 'right';
  headerTintColor: string;
  headerTitleStyle: {
    fontSize: number;
  };
  headerBackTitleStyle: {
    fontSize: number;
  };
  headerStyle: {
    backgroundColor: string;
  };
}

/**
 * Animation configurations for different navigation scenarios
 */
export const NAVIGATION_ANIMATIONS = {
  // Slide from right (default iOS style)
  slideFromRight: {
    animation: 'slide_from_right' as const,
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
  },

  // Slide from bottom (modal style)
  slideFromBottom: {
    animation: 'slide_from_bottom' as const,
    presentation: 'modal' as const,
    gestureEnabled: true,
    gestureDirection: 'vertical' as const,
  },

  // Fade transition (smooth, minimal)
  fade: {
    animation: 'fade' as const,
    gestureEnabled: false,
  },

  // Fade from bottom (nice for overlays)
  fadeFromBottom: {
    animation: 'fade_from_bottom' as const,
    gestureEnabled: true,
    gestureDirection: 'vertical' as const,
  },

  // Simple fade (for auth flows)
  simple: {
    animation: 'simple_push' as const,
    gestureEnabled: true,
  },

  // No animation (instant)
  none: {
    animation: 'none' as const,
    gestureEnabled: false,
  },
} as const;

/**
 * Creates unified stack navigator screen options with smooth animations
 * @param theme - The theme object containing colors
 * @param options - Optional overrides for specific screens
 * @returns Stack navigator screen options
 */
export function getStackScreenOptions(
  theme: {
    brand: string;
    background: string;
  },
  options?: {
    animation?: keyof typeof NAVIGATION_ANIMATIONS;
    gestureEnabled?: boolean;
  },
): Partial<NativeStackNavigationOptions> {
  const animationConfig = options?.animation
    ? NAVIGATION_ANIMATIONS[options.animation]
    : NAVIGATION_ANIMATIONS.slideFromRight;

  return {
    headerBackTitle: 'Back',
    headerTitleAlign: 'center',
    headerTintColor: theme.brand,
    headerTitleStyle: {
      fontSize: 14,
    },
    headerBackTitleStyle: {
      fontSize: 14,
    },
    headerStyle: {
      backgroundColor: theme.background,
    },
    contentStyle: {
      backgroundColor: theme.background,
    },
    // Ensure headers respect safe area (important for iOS)
    headerTransparent: false,
    headerBlurEffect: undefined,
    // Enable smooth animations and gestures
    ...animationConfig,
    gestureEnabled: options?.gestureEnabled ?? true,
    // iOS specific: Full screen swipe back
    fullScreenGestureEnabled: Platform.OS === 'ios',
    // Android specific: Custom back behavior
    // customAnimationOnGesture: true,
    animationTypeForReplace: 'push',
    // iOS optimization: Prevent blank screens during transitions
    animationDuration: Platform.OS === 'ios' ? 300 : 250,
    // Disable detach previous screen to prevent blank flashes
    // detachPreviousScreen: false,
  };
}

/**
 * Common header options for hiding the header on index/root screens
 */
export const HIDE_HEADER = {
  headerShown: false,
} as const;

/**
 * Modal presentation options for screens that should appear as modals
 */
export const MODAL_OPTIONS = {
  presentation: 'modal' as const,
  headerShown: true,
};
