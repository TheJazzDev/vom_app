import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export function HapticTab(props: BottomTabBarButtonProps) {
  const triggerHaptic = async (style: 'light' | 'selection') => {
    try {
      if (style === 'light') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        await Haptics.selectionAsync();
      }
    } catch (error) {
      // Haptics may not be available on all devices
      console.debug('[HapticTab] Haptic feedback not available:', error);
    }
  };

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        // Light haptic feedback when pressing down
        triggerHaptic('light');
        props.onPressIn?.(ev);
      }}
      onPress={(ev) => {
        // Selection haptic feedback when tab changes
        triggerHaptic('selection');
        props.onPress?.(ev);
      }}
    />
  );
}
