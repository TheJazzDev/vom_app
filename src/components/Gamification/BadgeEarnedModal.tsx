import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { Badge } from '@/src/services/gamification/badges';
import React, { useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
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
          withTiming(0, { duration: 1500 }),
        ),
        -1,
        true,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            { backgroundColor: theme.card },
            containerStyle,
          ]}
        >
          {/* Header */}
          <Text style={[styles.headerText, { color: theme.brand }]}>
            {badges.length === 1 ? 'BADGE EARNED!' : 'BADGES EARNED!'}
          </Text>

          {/* Badges */}
          <View style={styles.badgesContainer}>
            {badges.map((badge, index) => {
              const color = getCategoryColor(badge.category);
              return (
                <Animated.View
                  key={badge.id}
                  style={[styles.badgeItem, { backgroundColor: `${color}10` }]}
                >
                  <Animated.View
                    style={[
                      styles.badgeIconContainer,
                      { backgroundColor: `${color}20` },
                      shimmerStyle,
                    ]}
                  >
                    <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  </Animated.View>
                  <Text style={[styles.badgeName, { color: theme.heading }]}>
                    {badge.name}
                  </Text>
                  <Text
                    variant="caption"
                    style={[styles.badgeDescription, { color: theme.muted }]}
                    numberOfLines={2}
                  >
                    {badge.description}
                  </Text>
                  <View
                    style={[styles.earnedBadge, { backgroundColor: color }]}
                  >
                    <Text style={styles.earnedText}>✓ Earned</Text>
                  </View>
                </Animated.View>
              );
            })}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={onClose}
            style={[styles.continueButton, { backgroundColor: theme.brand }]}
          >
            <Text style={styles.continueButtonText}>Awesome!</Text>
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
    padding: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 20,
  },
  badgesContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 20,
  },
  badgeItem: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  badgeIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeIcon: {
    fontSize: 40,
  },
  badgeName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeDescription: {
    textAlign: 'center',
    marginBottom: 12,
  },
  earnedBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  earnedText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
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
