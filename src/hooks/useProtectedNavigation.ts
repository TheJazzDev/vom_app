import {
  getRouteConfig,
  isProtected,
  isUnprotected,
  RouteValues,
} from '@/src/constants/routes';
import { useAuthSlice } from '@/src/store';
import { useRouter } from 'expo-router';
import { useUnauthorizedModal } from '../providers/UnauthorizedModalProvider';

export function useProtectedNavigation() {
  const router = useRouter();
  const { isAuthenticated } = useAuthSlice();
  const { setUnauthorizedAttempt } = useUnauthorizedModal();

  const doNavigate = (target: RouteValues, replace?: boolean) => {
    return replace ? router.replace(target as any) : router.push(target as any);
  };

  const navigateTo = (route: RouteValues, replace?: boolean) => {
    const config = getRouteConfig(route);

    // Instead of navigating, show the modal
    if (isProtected(route) && !isAuthenticated) {
      setUnauthorizedAttempt({
        route,
        timestamp: Date.now(),
      });
      return false;
    }

    if (isUnprotected(route) && isAuthenticated) {
      const fallback = config?.fallbackRoute || '/';
      doNavigate(fallback, replace);
      return false;
    }

    // Normal navigation
    doNavigate(route, replace);
    return true;
  };

  const canAccess = (route: string): boolean => {
    if (isProtected(route)) {
      return isAuthenticated;
    }
    if (isUnprotected(route)) {
      return !isAuthenticated;
    }
    return true;
  };

  return {
    navigateTo,
    canAccess,
    isAuthenticated,
  };
}
