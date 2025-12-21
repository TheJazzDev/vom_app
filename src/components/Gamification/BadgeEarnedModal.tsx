import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { Badge } from '@/src/services/gamification/badges';
import React, { useEffect } from 'react';
import {
  Modal,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface BadgeEarnedModalProps {
  visible: boolean;
  badges: Badge[];
  onClose: () => void;
}

export const BadgeEarnedModal: React.FC<BadgeEarnedModalProps> = ({
  visible,
  badges,
  onClose,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(0);
  const shimmer = useSharedValue(0);

  useEffect(() => {
    if (visible && badges.length > 0) {
      scale.value = 0;
      shimmer.value = 0;

      scale.value = withSpring(1, {
        damping: 12,
        stiffness: 100,
      });

      shimmer.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1500 }),
          withTiming(0, { duration: 1500 })
        ),
        -1,
        true
      );
    }
  }, [visible, badges]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + shimmer.value * 0.3,
  }));

  if (badges.length === 0) return null;

  const getCategoryColor = (category: Badge['category']) => {
    const colors = {
      prayer: '#8B5CF6',
      study: '#10B981',
      community: '#F59E0B',
      streak: '#EF4444',
      special: '#3B82F6',
    };
    return colors[category];
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 items-center justify-center p-6">
        <Animated.View
          className="w-full max-w-[340px] rounded-3xl p-6 items-center"
          style={[
            { backgroundColor: theme.card },
            containerStyle,
          ]}
        >
          {/* Header */}
          <Text
            className="text-sm font-extrabold tracking-[3px] mb-5"
            style={{ color: theme.brand }}
          >
            {badges.length === 1 ? 'BADGE EARNED!' : 'BADGES EARNED!'}
          </Text>

          {/* Badges */}
          <View className="w-full gap-4 mb-5">
            {badges.map((badge, index) => {
              const color = getCategoryColor(badge.category);
              return (
                <Animated.View
                  key={badge.id}
                  className="p-4 rounded-2xl items-center"
                  style={{ backgroundColor: `${color}10` }}
                >
                  <Animated.View
                    className="w-20 h-20 rounded-full items-center justify-center mb-3"
                    style={[
                      { backgroundColor: `${color}20` },
                      shimmerStyle,
                    ]}
                  >
                    <Text className="text-[40px]">{badge.icon}</Text>
                  </Animated.View>
                  <Text
                    className="text-lg font-bold mb-1 text-center"
                    style={{ color: theme.heading }}
                  >
                    {badge.name}
                  </Text>
                  <Text
                    variant="caption"
                    className="text-center mb-3"
                    style={{ color: theme.textSecondary }}
                    numberOfLines={2}
                  >
                    {badge.description}
                  </Text>
                  <View
                    className="px-4 py-1.5 rounded-xl"
                    style={{ backgroundColor: color }}
                  >
                    <Text className="text-white font-semibold text-[13px]">✓ Earned</Text>
                  </View>
                </Animated.View>
              );
            })}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={onClose}
            className="px-12 py-3.5 rounded-xl"
            style={{ backgroundColor: theme.brand }}
          >
            <Text className="text-white font-bold text-base">Awesome!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
