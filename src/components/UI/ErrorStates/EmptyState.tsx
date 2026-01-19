import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/src/components/UI';
import { IconSymbol } from '@/src/components/Icons';
import { useTheme } from '@/src/hooks';

interface EmptyStateProps {
  /**
   * Icon name from SF Symbols
   */
  icon?: string;
  /**
   * Title text
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Primary action button text
   */
  actionText?: string;
  /**
   * Primary action callback
   */
  onAction?: () => void;
  /**
   * Secondary action button text
   */
  secondaryActionText?: string;
  /**
   * Secondary action callback
   */
  onSecondaryAction?: () => void;
}

/**
 * Empty state component for when there's no data
 *
 * @example
 * ```tsx
 * {data.length === 0 && (
 *   <EmptyState
 *     icon="tray"
 *     title="No items found"
 *     description="Get started by adding your first item"
 *     actionText="Add Item"
 *     onAction={() => navigate('/add')}
 *   />
 * )}
 * ```
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'tray',
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[styles.iconContainer, { backgroundColor: theme.muted + '20' }]}
      >
        <IconSymbol name={icon} size={48} color={theme.muted} />
      </View>

      <Text variant="h3" style={[styles.title, { color: theme.heading }]}>
        {title}
      </Text>

      {description && (
        <Text
          variant="body"
          style={[styles.description, { color: theme.muted }]}
        >
          {description}
        </Text>
      )}

      {actionText && onAction && (
        <Pressable
          onPress={onAction}
          style={[styles.button, { backgroundColor: theme.primary }]}
          android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <Text style={styles.buttonText}>{actionText}</Text>
        </Pressable>
      )}

      {secondaryActionText && onSecondaryAction && (
        <Pressable
          onPress={onSecondaryAction}
          style={[styles.secondaryButton, { borderColor: theme.border }]}
          android_ripple={{ color: theme.primary + '20' }}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.primary }]}>
            {secondaryActionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    maxWidth: 300,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmptyState;
