import React from 'react';
import { Image, View } from 'react-native';
import { getUserInitials } from '../utils';
import { Text } from './UI';

type Variant = 'extralSmall' | 'small' | 'medium' | 'large';

const sizeMap: Record<Variant, string> = {
  extralSmall: 'w-6 h-6',
  small: 'w-12 h-12',
  medium: 'w-20 h-20',
  large: 'w-24 h-24',
};

const UserAvatar = ({
  avatar,
  firstName,
  lastName,
  variant = 'small',
}: {
  avatar: string;
  firstName: string;
  lastName: string;
  variant?: Variant;
}) => {
  const hasAvatar = avatar && avatar.trim() !== '';
  const sizeClass = sizeMap[variant];

  return (
    <View>
      {hasAvatar ? (
        <Image
          source={{ uri: avatar }}
          className={`${sizeClass} rounded-full mr-`}
        />
      ) : (
        <View
          className={`${sizeClass} rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
        >
          <Text
            variant={variant === 'extralSmall' ? 'caption' : 'h5'}
            color="primary"
            className="font-semibold"
          >
            {getUserInitials(firstName, lastName)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserAvatar;
