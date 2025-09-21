import { dispatch, useAuthSlice } from '@/src/store';
import React, { useEffect, useState } from 'react';
import { Text } from './Text';
import { View } from './View';
import { usePathname } from 'expo-router';

interface ErrorToastProps {
  error: string | null;
  onClearError?: () => void;
  duration?: number;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({
  error,
  onClearError,
  duration = 5000,
}) => {
  const pathname = usePathname();
  const { clearError } = useAuthSlice();
  const [displayError, setDisplayError] = useState<string | null>(error);

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  useEffect(() => {
    if (displayError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
        setDisplayError(null);
        onClearError?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [displayError, onClearError, duration, pathname, clearError]);

  if (!displayError) return null;

  return (
    <View className="mb-4 p-3 bg-red-50 rounded-lg">
      <Text className="text-red-600 dark:text-red-900 text-center text-sm">
        {displayError}
      </Text>
    </View>
  );
};
