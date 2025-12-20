import { IconSymbol } from '@/src/components/Icons';
import { useNavigationSource, useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface SourceAwareBackButtonProps {
  tintColor?: string;
  canGoBack?: boolean;
}

/**
 * A back button that is aware of cross-tab navigation sources.
 * When navigating from notifications to a screen in another tab,
 * pressing back will return to notifications instead of the tab's index.
 */
export const SourceAwareBackButton: React.FC<SourceAwareBackButtonProps> = ({
  tintColor,
  canGoBack = true,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const { sourceRoute, clearSourceRoute } = useNavigationSource();

  const color = tintColor || theme.brand;

  const handlePress = () => {
    if (sourceRoute) {
      // Navigate back to the source route (e.g., notifications)
      clearSourceRoute();
      router.replace(sourceRoute as any);
    } else if (canGoBack) {
      // Default back behavior
      router.back();
    }
  };

  if (!canGoBack && !sourceRoute) {
    return null;
  }

  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <View style={styles.content}>
        <IconSymbol
          name="chevron.left"
          size={Platform.OS === 'ios' ? 22 : 24}
          color={color}
        />
        {Platform.OS === 'ios' && (
          <Text style={[styles.label, { color }]}>Back</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: Platform.OS === 'ios' ? -8 : 0,
    paddingRight: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 17,
    marginLeft: -4,
  },
});

export default SourceAwareBackButton;
