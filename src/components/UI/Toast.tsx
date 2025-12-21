import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '../Icons';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastConfig {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastProps {
  toast: ToastConfig;
  onDismiss: (id: string) => void;
}

const TOAST_ICONS: Record<ToastType, string> = {
  success: 'checkmark.circle.fill',
  error: 'xmark.circle.fill',
  warning: 'exclamationmark.triangle.fill',
  info: 'info.circle.fill',
};

const TOAST_COLORS: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
  success: {
    bg: '#ECFDF5',
    border: '#A7F3D0',
    icon: '#059669',
    text: '#065F46',
  },
  error: {
    bg: '#FEF2F2',
    border: '#FECACA',
    icon: '#DC2626',
    text: '#991B1B',
  },
  warning: {
    bg: '#FFFBEB',
    border: '#FDE68A',
    icon: '#D97706',
    text: '#92400E',
  },
  info: {
    bg: '#EFF6FF',
    border: '#BFDBFE',
    icon: '#2563EB',
    text: '#1E40AF',
  },
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const colors = TOAST_COLORS[toast.type];
  const iconName = TOAST_ICONS[toast.type];
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    const timer = setTimeout(() => {
      dismissToast();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(toast.id);
    });
  };

  return (
    <Animated.View
      className="absolute top-0 left-4 right-4 rounded-xl border z-[9999]"
      style={{
        transform: [{ translateY }],
        opacity,
        marginTop: insets.top + 8,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <Pressable
        className="flex-row items-center p-3"
        onPress={dismissToast}
        android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      >
        <View
          className="w-9 h-9 rounded-full justify-center items-center mr-3"
          style={{ backgroundColor: `${colors.icon}15` }}
        >
          <IconSymbol name={iconName as any} size={20} color={colors.icon} />
        </View>

        <View className="flex-1 mr-2">
          <Text
            className="text-[15px] font-semibold"
            style={{ color: colors.text }}
            numberOfLines={1}
          >
            {toast.title}
          </Text>
          {toast.message && (
            <Text
              className="text-[13px] mt-0.5 opacity-85"
              style={{ color: colors.text }}
              numberOfLines={2}
            >
              {toast.message}
            </Text>
          )}
        </View>

        {toast.action && (
          <Pressable
            className="px-3 py-1.5 rounded-md mr-2"
            style={{ backgroundColor: `${colors.icon}15` }}
            onPress={() => {
              toast.action?.onPress();
              dismissToast();
            }}
          >
            <Text className="text-[13px] font-semibold" style={{ color: colors.icon }}>
              {toast.action.label}
            </Text>
          </Pressable>
        )}

        <Pressable
          className="p-1"
          onPress={dismissToast}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IconSymbol name="xmark" size={16} color={colors.text} />
        </Pressable>
      </Pressable>
    </Animated.View>
  );
};

export default Toast;
