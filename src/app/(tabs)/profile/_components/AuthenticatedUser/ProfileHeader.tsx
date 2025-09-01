import { Card, IconSymbol, Text, View } from '@/src/components';
import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { getUserInitials } from '@/src/utils';
import React from 'react';
import { Image } from 'react-native';

const ProfileHeader = () => {
  const theme = useTheme();
  const { currentMember } = useAuthSlice();

  return (
    <Card variant="gradient-soft">
      <View className="items-center py-4">
        <View className="relative mb-4">
          <View className="w-24 h-24 bg-primary/20 dark:bg-primary/10 rounded-full items-center justify-center border-4 border-white dark:border-gray-600 shadow-lg">
            {currentMember?.avatar ? (
              <Image
                source={{ uri: currentMember.avatar }}
                className="w-24 h-24 rounded-full"
              />
            ) : currentMember?.firstName ? (
              <Text
                variant="h1"
                className="text-primary dark:text-primary-light"
              >
                {getUserInitials(
                  currentMember.firstName,
                  currentMember.lastName,
                )}
              </Text>
            ) : (
              <IconSymbol name="person" size={32} color={theme.primary} />
            )}
          </View>
          {currentMember?.verified && (
            <View className="absolute bottom-0.5 right-1 w-6 h-6 bg-green-600 rounded-full items-center justify-center border-2 border-white dark:border-gray-800">
              <IconSymbol name="checkmark" size={14} color="#fff" />
            </View>
          )}
        </View>

        <Text
          variant="h3"
          className="text-center mb-1 text-gray-900 dark:text-white"
        >
          {currentMember?.title} {currentMember?.firstName}{' '}
          {currentMember?.lastName}
        </Text>

        {/* {currentMember?.department && (
          <Text
            variant="body"
            className="text-center mb-2 text-primary dark:text-primary-light font-semibold"
          >
            {currentMember.department} Department
          </Text>
        )} */}

        <View className="flex-row items-center gap-4">
          {currentMember?.email && (
            <View className="flex-row items-center gap-2">
              <IconSymbol name="envelope" size={16} color={theme.muted} />
              <Text variant="caption">{currentMember.email}</Text>
            </View>
          )}
          {currentMember?.primaryPhone && (
            <View className="flex-row items-center gap-1">
              <IconSymbol name="phone" size={14} color={theme.muted} />
              <Text
                variant="caption"
                className="text-gray-600 dark:text-gray-400"
              >
                {currentMember.primaryPhone}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

export default ProfileHeader;
