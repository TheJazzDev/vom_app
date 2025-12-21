import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the app.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console (in production, send to error reporting service)
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo.componentStack);

    // TODO: Send to error reporting service (Sentry, Crashlytics, etc.)
    // errorReportingService.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <SafeAreaView className="flex-1 bg-slate-50">
          <View className="flex-1 justify-center items-center p-6">
            <Text className="text-6xl mb-4">😔</Text>
            <Text className="text-2xl font-bold text-slate-900 text-center mb-3">
              Oops! Something went wrong
            </Text>
            <Text className="text-base text-slate-500 text-center leading-6 mb-8 px-4">
              We&apos;re sorry, but something unexpected happened. Please try again.
            </Text>

            {__DEV__ && this.state.error && (
              <View className="bg-red-100 rounded-lg p-4 mb-6 w-full">
                <Text className="text-sm font-semibold text-red-600 mb-2">
                  Error Details:
                </Text>
                <Text className="text-xs text-red-900 font-mono">
                  {this.state.error.message}
                </Text>
              </View>
            )}

            <Pressable
              style={({ pressed }) => [
                {
                  shadowColor: '#3B82F6',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                },
                pressed && {
                  opacity: 0.9,
                  transform: [{ scale: 0.98 }],
                },
              ]}
              className="bg-blue-500 px-8 py-3.5 rounded-xl"
              onPress={this.handleRetry}
            >
              <Text className="text-white text-base font-semibold">Try Again</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
