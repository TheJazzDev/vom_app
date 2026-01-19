import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { Toast, ToastConfig, ToastType } from '../components/UI/Toast';

interface ToastOptions {
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

interface ToastContextType {
  showToast: (type: ToastType, options: ToastOptions) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;
const generateId = () => `toast-${++toastId}`;

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 3,
}) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const showToast = useCallback(
    (type: ToastType, options: ToastOptions) => {
      const newToast: ToastConfig = {
        id: generateId(),
        type,
        ...options,
      };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        // Limit number of visible toasts
        return updated.slice(0, maxToasts);
      });
    },
    [maxToasts],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback(
    (title: string, message?: string) => {
      showToast('success', { title, message });
    },
    [showToast],
  );

  const error = useCallback(
    (title: string, message?: string) => {
      showToast('error', { title, message, duration: 6000 }); // Errors show longer
    },
    [showToast],
  );

  const warning = useCallback(
    (title: string, message?: string) => {
      showToast('warning', { title, message });
    },
    [showToast],
  );

  const info = useCallback(
    (title: string, message?: string) => {
      showToast('info', { title, message });
    },
    [showToast],
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        success,
        error,
        warning,
        info,
        dismiss,
        dismissAll,
      }}
    >
      {children}
      <View style={styles.toastContainer} pointerEvents="box-none">
        {toasts.map((toast, index) => (
          <View
            key={toast.id}
            style={[styles.toastWrapper, { top: index * 8 }]}
            pointerEvents="box-none"
          >
            <Toast toast={toast} onDismiss={dismiss} />
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  toastWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
