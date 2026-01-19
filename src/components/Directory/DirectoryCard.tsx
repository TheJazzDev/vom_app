import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useProtectedNavigation } from '@/src/hooks/useProtectedNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';

export const DirectoryCategoryCard = memo(
  ({ category }: { category: DirectoryProps }) => {
    const { navigateTo, canAccess } = useProtectedNavigation();

    const hasAccess = useMemo(
      () => canAccess(category.route),
      [canAccess, category.route],
    );

    const handlePress = useCallback(() => {
      navigateTo(category.route);
    }, [navigateTo, category.route]);

    return (
      <Pressable
        onPress={handlePress}
        className="mb-3"
        android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
      >
        <LinearGradient
          colors={category.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 12,
            padding: 20,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <View
            style={{ position: 'absolute', top: -4, right: -4, opacity: 0.2 }}
          >
            <IconSymbol name={category.icon} size={100} color="white" />
          </View>

          <View style={{ position: 'relative', zIndex: 10 }}>
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-row gap-2 items-center">
                <View className="bg-white/20 p-3 rounded-full">
                  <IconSymbol name={category.icon} size={24} color="white" />
                </View>
                <Text
                  variant="h3"
                  className="text-white dark:text-white/90 font-bold"
                >
                  {category.title}
                </Text>
              </View>

              {!hasAccess && (
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: '#EF4444' }}
                >
                  <View className="flex-row items-center">
                    <IconSymbol name="lock" size={12} color="white" />
                    <Text
                      variant="caption"
                      className="text-white font-bold ml-1"
                    >
                      LOCKED
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <Text
              variant="body"
              className="text-white/90 dark:text-white/80 leading-5 mb-4"
            >
              {category.description}
            </Text>

            <View className="flex-row items-center">
              <Text
                variant="caption"
                className="text-white/90 dark:text-white/80 mr-2 font-semibold"
              >
                {hasAccess ? 'View Directory' : 'Members Only'}
              </Text>
              <IconSymbol
                name={hasAccess ? 'arrow.right' : 'lock'}
                size={16}
                color="white"
              />
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    );
  },
);

DirectoryCategoryCard.displayName = 'DirectoryCategoryCard';
