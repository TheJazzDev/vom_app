import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { getUserInitials } from '../utils';
import { Text } from './UI';
import { useTheme } from '../hooks';

type Variant = 'extraSmall' | 'small' | 'medium' | 'large';

const sizeConfig: Record<
  Variant,
  { size: number; fontSize: 'caption' | 'body' | 'h5' | 'h4' }
> = {
  extraSmall: { size: 24, fontSize: 'caption' },
  small: { size: 48, fontSize: 'body' },
  medium: { size: 80, fontSize: 'h5' },
  large: { size: 96, fontSize: 'h4' },
};

interface UserAvatarProps {
  avatar?: string | null;
  firstName?: string;
  lastName?: string;
  variant?: Variant;
  showBorder?: boolean;
}

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

/**
 * User avatar component with automatic image caching.
 * Falls back to initials when no avatar is available.
 */
const UserAvatar = memo(
  ({
    avatar,
    firstName = '',
    lastName = '',
    variant = 'small',
    showBorder = false,
  }: UserAvatarProps) => {
    const theme = useTheme();
    const hasAvatar = avatar && avatar.trim() !== '';
    const config = sizeConfig[variant];

    const initials = useMemo(
      () => getUserInitials(firstName, lastName),
      [firstName, lastName],
    );

    const containerStyle = useMemo(
      () => ({
        width: config.size,
        height: config.size,
        borderRadius: config.size / 2,
        borderWidth: showBorder ? 2 : 0,
        borderColor: theme.primary,
        overflow: 'hidden' as const,
      }),
      [config.size, showBorder, theme.primary],
    );

    if (hasAvatar) {
      return (
        <View style={containerStyle}>
          <Image
            source={{ uri: avatar }}
            style={styles.image}
            contentFit="cover"
            placeholder={{ blurhash: BLURHASH }}
            transition={200}
            cachePolicy="memory-disk"
          />
        </View>
      );
    }

    return (
      <View
        style={[
          containerStyle,
          {
            backgroundColor: `${theme.primary}15`,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text
          variant={config.fontSize}
          style={{ color: theme.primary, fontWeight: '600' }}
        >
          {initials}
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

UserAvatar.displayName = 'UserAvatar';

export default UserAvatar;
