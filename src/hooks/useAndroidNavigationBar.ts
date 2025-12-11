import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Detect Android navigation bar style
 * Returns true if device has gesture navigation (swipe),
 * false if it has button navigation (old style)
 */
export function useAndroidNavigationBar() {
  const insets = useSafeAreaInsets();
  const [hasButtonNavigation, setHasButtonNavigation] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      // If bottom inset is > 0 and < 24, it's likely button navigation
      // Gesture navigation typically has 0 inset or very small inset
      // Button navigation typically has 48dp (about 24-48px) inset
      const isButtonNav = insets.bottom >= 24;
      setHasButtonNavigation(isButtonNav);
    }
  }, [insets.bottom]);

  return {
    hasButtonNavigation,
    shouldApplyBottomSafeArea: Platform.OS === 'android' ? hasButtonNavigation : true,
  };
}
