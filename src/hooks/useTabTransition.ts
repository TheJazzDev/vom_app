import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Hook that automatically animates tab transitions
 * Call this in your root tab layout or individual tab screens
 */
export function useTabTransition() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    // Only animate if pathname actually changed (prevents initial render animation)
    if (previousPathname.current && pathname !== previousPathname.current) {
      // Configure a smooth animation for tab changes
      LayoutAnimation.configureNext({
        duration: 200,
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        delete: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      });
    }
    previousPathname.current = pathname;
  }, [pathname]);
}

/**
 * Pre-configured animation configs for different scenarios
 */
export const TAB_ANIMATIONS = {
  // Smooth spring animation (recommended)
  spring: {
    duration: 250,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 0.7,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 0.7,
    },
    delete: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.opacity,
      springDamping: 0.7,
    },
  },

  // Quick fade (fast and smooth)
  fade: {
    duration: 150,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  },

  // Gentle ease (iOS-like)
  ease: {
    duration: 200,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  },
};

/**
 * Trigger a custom tab animation
 * @param animationType - Type of animation to use
 */
export function animateTabChange(
  animationType: keyof typeof TAB_ANIMATIONS = 'spring',
) {
  LayoutAnimation.configureNext(TAB_ANIMATIONS[animationType]);
}
