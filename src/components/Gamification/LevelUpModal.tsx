import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { LevelConfig } from '@/src/services/gamification';
import React, { useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
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
          withSpring(1, { damping: 10, stiffness: 120 }),
        ),
      );

      // Rotate icon
      rotation.value = withDelay(
        200,
        withSequence(
          withTiming(15, { duration: 100 }),
          withTiming(-15, { duration: 100 }),
          withTiming(10, { duration: 100 }),
          withTiming(-10, { duration: 100 }),
          withTiming(0, { duration: 100 }),
        ),
      );
    }
  }, [visible, newLevel]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }, { rotate: `${rotation.value}deg` }],
  }));

  if (!newLevel) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            { backgroundColor: theme.card },
            containerStyle,
          ]}
        >
          {/* Confetti-like decorations */}
          <View style={styles.decorations}>
            <Text style={[styles.decoration, { top: 10, left: 20 }]}>✨</Text>
            <Text style={[styles.decoration, { top: 30, right: 25 }]}>🎉</Text>
            <Text style={[styles.decoration, { bottom: 80, left: 15 }]}>
              ⭐
            </Text>
            <Text style={[styles.decoration, { bottom: 60, right: 20 }]}>
              🌟
            </Text>
          </View>

          {/* Level Up Text */}
          <Text style={[styles.levelUpText, { color: newLevel.color }]}>
            LEVEL UP!
          </Text>

          {/* Level Icon */}
          <Animated.View
            style={[
              styles.iconContainer,
              { backgroundColor: `${newLevel.color}20` },
              iconStyle,
            ]}
          >
            <Text style={styles.levelIcon}>{newLevel.icon}</Text>
          </Animated.View>

          {/* Level Info */}
          <Text style={[styles.levelNumber, { color: newLevel.color }]}>
            Level {newLevel.level}
          </Text>
          <Text
            variant="h2"
            style={[styles.levelName, { color: theme.heading }]}
          >
            {newLevel.name}
          </Text>
          <Text
            variant="body"
            style={[styles.description, { color: theme.muted }]}
          >
            {newLevel.description}
          </Text>

          {/* Points to next level */}
          {newLevel.level < 14 && (
            <View
              style={[
                styles.nextLevelInfo,
                { backgroundColor: `${theme.brand}10` },
              ]}
            >
              <Text variant="caption" style={{ color: theme.muted }}>
                Keep going! You&apos;re on your way to becoming{' '}
                <Text style={{ color: theme.brand, fontWeight: '600' }}>
                  {newLevel.level < 14
                    ? `Level ${newLevel.level + 1}`
                    : 'the ultimate!'}
                </Text>
              </Text>
            </View>
          )}

          {newLevel.level === 14 && (
            <View
              style={[
                styles.maxLevelBadge,
                { backgroundColor: newLevel.color },
              ]}
            >
              <Text style={styles.maxLevelText}>
                🏆 MAXIMUM LEVEL ACHIEVED! 🏆
              </Text>
            </View>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            onPress={onClose}
            style={[styles.continueButton, { backgroundColor: newLevel.color }]}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  decorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decoration: {
    position: 'absolute',
    fontSize: 24,
  },
  levelUpText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 16,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  levelIcon: {
    fontSize: 64,
  },
  levelNumber: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  levelName: {
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  nextLevelInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  maxLevelBadge: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  maxLevelText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
  },
  continueButton: {
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 12,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
