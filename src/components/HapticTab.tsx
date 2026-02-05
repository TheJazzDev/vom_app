import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        // Trigger haptic feedback on press
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } else {
          // Android uses selection feedback
          Haptics.selectionAsync();
        }

        props.onPressIn?.(ev);
      }}
      onPress={(ev) => {
        props.onPress?.(ev);
      }}
    />
  );
}
