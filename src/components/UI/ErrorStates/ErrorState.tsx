import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from '@/src/components/UI';
import { IconSymbol } from '@/src/components/Icons';
import { useTheme } from '@/src/hooks';
import { getErrorMessage } from '@/src/utils/errorHandler';

interface ErrorStateProps {
  /**
   * Error object or message
   */
  error: unknown;
  /**
   * Custom title (overrides default based on error)
   */
  title?: string;
  /**
   * Custom description (overrides default based on error)
   */
  description?: string;
  /**
   * Retry button text
   * @default "Try Again"
   */
  retryText?: string;
  /**
   * Retry callback
   */
  onRetry?: () => void;
  /**
   * Show error details in dev mode
   * @default true
   */
  showDetails?: boolean;
}

/**
 * Error state component for displaying errors with retry option
 *
 * @example
 * ```tsx
 * {error && (
 *   <ErrorState
 *     error={error}
 *     onRetry={() => refetch()}
 *   />
 * )}
 * ```
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  title,
  description,
  retryText = 'Try Again',
  onRetry,
  showDetails = true,
}) => {
  const theme = useTheme();
  const errorMessage = getErrorMessage(error);
  const errorDetails = (error as any)?.message || String(error);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: theme.destructive + '20' },
        ]}
      >
        <IconSymbol
          name="exclamationmark.triangle"
          size={48}
          color={theme.destructive}
        />
      </View>

      <Text variant="h3" style={[styles.title, { color: theme.heading }]}>
        {title || 'Something went wrong'}
      </Text>

      <Text variant="body" style={[styles.description, { color: theme.muted }]}>
        {description || errorMessage}
      </Text>

      {__DEV__ && showDetails && errorDetails && (
        <View
          style={[
            styles.detailsContainer,
            {
              backgroundColor: theme.destructive + '10',
              borderColor: theme.destructive + '30',
            },
          ]}
        >
          <Text
            variant="caption"
            style={[styles.detailsText, { color: theme.destructive }]}
          >
            {errorDetails}
          </Text>
        </View>
      )}

      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={[styles.button, { backgroundColor: theme.primary }]}
          android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <IconSymbol name="arrow.clockwise" size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>{retryText}</Text>
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
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
    maxWidth: 300,
  },
  detailsText: {
    fontSize: 12,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorState;
