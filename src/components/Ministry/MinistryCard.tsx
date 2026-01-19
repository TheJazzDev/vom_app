import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { IconSymbol } from '../Icons';
import { Text } from '../UI';

export const MinistryCard = memo(
  ({ ministry }: { ministry: MinistryCardProps }) => {
    const theme = useTheme();
    const router = useRouter();

    const handlePress = useCallback(() => {
      router.push(ministry.route as any);
    }, [router, ministry.route]);

    const gradientColor = ministry.gradient[0];

    const containerStyle = useMemo(
      () => ({
        backgroundColor: `${gradientColor}08`,
        borderWidth: 1,
        borderColor: `${gradientColor}20`,
      }),
      [gradientColor],
    );

    const accentStyle = useMemo(
      () => ({
        backgroundColor: gradientColor,
      }),
      [gradientColor],
    );

    const iconContainerStyle = useMemo(
      () => ({
        backgroundColor: `${gradientColor}15`,
      }),
      [gradientColor],
    );

    return (
      <Pressable
        onPress={handlePress}
        className="mb-3 rounded-2xl overflow-hidden border"
        style={containerStyle}
      >
        <View className="flex-row">
          {/* Colored Side Accent */}
          <View className="w-1.5" style={accentStyle} />

          <View className="flex-1 p-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              <View
                className="w-12 h-12 rounded-2xl items-center justify-center"
                style={iconContainerStyle}
              >
                <IconSymbol
                  name={ministry.icon}
                  size={22}
                  color={gradientColor}
                />
              </View>

              <View className="flex-1">
                <Text
                  variant="h4"
                  className="font-bold mb-1"
                  style={{ color: theme.heading }}
                >
                  {ministry.title}
                </Text>
                <Text variant="caption" style={{ color: theme.muted }}>
                  {ministry.description}
                </Text>
              </View>
            </View>

            <View className="items-end gap-2">
              <View
                className="px-2 py-1 rounded-full"
                style={iconContainerStyle}
              >
                {/* Badge placeholder */}
              </View>
              <IconSymbol name="chevron.right" size={18} color={theme.muted} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  },
);

MinistryCard.displayName = 'MinistryCard';
