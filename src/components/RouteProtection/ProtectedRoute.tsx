import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { usePathname, useRouter } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import { View } from 'react-native';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
  fallbackRoute?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = false,
  requireGuest = false,
  fallbackRoute,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuthSlice();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  useEffect(() => {
    if (isLoading) return; // Wait for auth state to load

    // Redirect authenticated users away from guest-only routes
    if (requireGuest && isAuthenticated) {
      const redirectTo = fallbackRoute || '/';
      router.replace(redirectTo as any);
      return;
    }

    // Redirect unauthenticated users away from protected routes
    // (This should only happen for routes that don't use the navigation interceptor)
    if (requireAuth && !isAuthenticated) {
      const redirectTo = fallbackRoute || '/auth';
      router.replace(redirectTo as any);
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAuth,
    requireGuest,
    fallbackRoute,
    pathname,
    router,
  ]);

  // Show loading while checking auth
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // Don't render if access should be blocked and we're redirecting
  if ((requireAuth && !isAuthenticated) || (requireGuest && isAuthenticated)) {
    return (
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        {/* Empty view while redirecting */}
      </View>
    );
  }

  return <>{children}</>;
}
