import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { LevelConfig } from '@/src/services/gamification';
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
  withDelay,
  withTiming,
} from 'react-native-reanimated';

interface LevelUpModalProps {
  visible: boolean;
  newLevel: LevelConfig | null;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  visible,
  newLevel,
  onClose,
}) => {
  const theme = useTheme();
  const scale = useSharedValue(0);
  const iconScale = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (visible && newLevel) {
      scale.value = 0;
      iconScale.value = 0;
      rotation.value = 0;

      // Animate modal
      scale.value = withSpring(1, {
        damping: 12,
        stiffness: 100,
      });

      // Animate icon with delay
      iconScale.value = withDelay(
        200,
        withSequence(
          withSpring(1.3, { damping: 8, stiffness: 100 }),
          withSpring(1, { damping: 10, stiffness: 120 })
        )
      );

      // Rotate icon
      rotation.value = withDelay(
        200,
        withSequence(
          withTiming(15, { duration: 100 }),
          withTiming(-15, { duration: 100 }),
          withTiming(10, { duration: 100 }),
          withTiming(-10, { duration: 100 }),
          withTiming(0, { duration: 100 })
        )
      );
    }
  }, [visible, newLevel]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  if (!newLevel) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 items-center justify-center p-6">
        <Animated.View
          className="w-full max-w-[340px] rounded-3xl p-8 items-center relative overflow-hidden"
          style={[
            { backgroundColor: theme.card },
            containerStyle,
          ]}
        >
          {/* Confetti-like decorations */}
          <View className="absolute top-0 left-0 right-0 bottom-0">
            <Text className="absolute text-2xl top-2.5 left-5">✨</Text>
            <Text className="absolute text-2xl top-7.5 right-6">🎉</Text>
            <Text className="absolute text-2xl bottom-20 left-4">⭐</Text>
            <Text className="absolute text-2xl bottom-15 right-5">🌟</Text>
          </View>

          {/* Level Up Text */}
          <Text className="text-sm font-extrabold tracking-[4px] mb-4" style={{ color: newLevel.color }}>
            LEVEL UP!
          </Text>

          {/* Level Icon */}
          <Animated.View
            className="w-30 h-30 rounded-full items-center justify-center mb-4"
            style={[
              { backgroundColor: `${newLevel.color}20` },
              iconStyle,
            ]}
          >
            <Text className="text-6xl">{newLevel.icon}</Text>
          </Animated.View>

          {/* Level Info */}
          <Text
            className="text-base font-bold mb-1"
            style={{ color: newLevel.color }}
          >
            Level {newLevel.level}
          </Text>
          <Text
            variant="h2"
            className="font-extrabold mb-2 text-center"
            style={{ color: theme.heading }}
          >
            {newLevel.name}
          </Text>
          <Text
            variant="body"
            className="text-center mb-5"
            style={{ color: theme.textSecondary }}
          >
            {newLevel.description}
          </Text>

          {/* Points to next level */}
          {newLevel.level < 14 && (
            <View
              className="px-4 py-3 rounded-xl mb-5"
              style={{ backgroundColor: `${theme.brand}10` }}
            >
              <Text variant="caption" style={{ color: theme.textSecondary }}>
                Keep going! You&apos;re on your way to becoming{' '}
                <Text className="font-semibold" style={{ color: theme.brand }}>
                  {newLevel.level < 14 ? `Level ${newLevel.level + 1}` : 'the ultimate!'}
                </Text>
              </Text>
            </View>
          )}

          {newLevel.level === 14 && (
            <View
              className="px-5 py-3 rounded-xl mb-5"
              style={{ backgroundColor: newLevel.color }}
            >
              <Text className="text-white font-bold text-xs text-center">
                🏆 MAXIMUM LEVEL ACHIEVED! 🏆
              </Text>
            </View>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            onPress={onClose}
            className="px-12 py-3.5 rounded-xl"
            style={{ backgroundColor: newLevel.color }}
          >
            <Text className="text-white font-bold text-base">Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};
