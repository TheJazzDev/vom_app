import {
  getRouteConfig,
  requiresAuth,
  requiresGuest,
} from '@/src/constants/routes';
import { useAuthSlice } from '@/src/store';
import { useRouter } from 'expo-router';
import { useUnauthorizedModal } from '../context/UnauthorizedModalProvider';

export function useProtectedNavigation() {
  const router = useRouter();
  const { isAuthenticated } = useAuthSlice();
  const { setUnauthorizedAttempt } = useUnauthorizedModal();

  const navigateTo = (route: string, options?: { replace?: boolean }) => {
    const config = getRouteConfig(route);

    // Check if route requires authentication
    if (requiresAuth(route) && !isAuthenticated) {
      // Instead of navigating, show the modal
      setUnauthorizedAttempt({
        route,
        timestamp: Date.now(),
      });
      return false;
    }

    // Check if route is guest-only
    if (requiresGuest(route) && isAuthenticated) {
      // Redirect to home instead
      const fallback = config?.fallbackRoute || '/';
      if (options?.replace) {
        router.replace(fallback as any);
      } else {
        router.push(fallback as any);
      }
      return false;
    }

    // Navigate normally
    if (options?.replace) {
      router.replace(route as any);
    } else {
      router.push(route as any);
    }
    return true;
  };

  const canAccess = (route: string): boolean => {
    if (requiresAuth(route)) {
      return isAuthenticated;
    }
    if (requiresGuest(route)) {
      return !isAuthenticated;
    }
    return true; // Public routes
  };

  return {
    navigateTo,
    canAccess,
    isAuthenticated,
  };
}
