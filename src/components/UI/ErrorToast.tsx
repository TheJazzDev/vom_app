import { Text, View } from '@/src/components';
import React, { useEffect } from 'react';

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
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        onClearError?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, onClearError, duration]);

  if (!error) return null;

  return (
    <View className="mb-4 p-3 bg-red-50 rounded-lg">
      <Text className="text-red-600 text-center text-sm">{error}</Text>
    </View>
  );
};
