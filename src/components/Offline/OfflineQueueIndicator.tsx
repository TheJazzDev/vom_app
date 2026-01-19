import React from 'react';
import { View, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from '@/src/components/UI';
import { IconSymbol } from '@/src/components/Icons';
import { useOfflineManager, useTheme } from '@/src/hooks';
import * as Haptics from 'expo-haptics';

/**
 * Component that shows offline queue status and allows manual sync
 *
 * @example
 * ```tsx
 * <OfflineQueueIndicator />
 * ```
 */
export const OfflineQueueIndicator: React.FC = () => {
  const theme = useTheme();
  const { isOnline, queueLength, isProcessing, syncNow } = useOfflineManager();

  if (queueLength === 0) {
    return null;
  }

  const handleSync = async () => {
    if (!isOnline || isProcessing) return;

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await syncNow();
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('[OfflineQueueIndicator] Error syncing:', error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isOnline
            ? theme.primary + '15'
            : theme.destructive + '15',
        },
      ]}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: isOnline ? theme.primary : theme.destructive },
          ]}
        >
          <IconSymbol
            name={isOnline ? 'arrow.clockwise.icloud' : 'icloud.slash'}
            size={16}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.heading }]}>
            {queueLength} {queueLength === 1 ? 'item' : 'items'} queued
          </Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            {isOnline ? 'Ready to sync' : 'Will sync when online'}
          </Text>
        </View>

        {isOnline && (
          <Pressable
            onPress={handleSync}
            disabled={isProcessing}
            style={[
              styles.syncButton,
              { backgroundColor: theme.primary },
              isProcessing && styles.syncButtonDisabled,
            ]}
            android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <IconSymbol name="arrow.clockwise" size={16} color="#FFFFFF" />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
  },
  syncButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncButtonDisabled: {
    opacity: 0.6,
  },
});

export default OfflineQueueIndicator;
