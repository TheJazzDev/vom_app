import { ROUTES } from '@/src/constants';
import { isUnprotected } from '@/src/constants/routes';
import { useScreenTracking } from '@/src/hooks/useScreenTracking';
import { useAuthSlice } from '@/src/store';
import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';

/**
 * NavigationGuard component that handles route protection logic
 * and screen tracking. Must be rendered inside the Redux Provider context.
 */
export function NavigationGuard() {
  const { isAuthenticated } = useAuthSlice();
  const pathname = usePathname();
  const router = useRouter();

  // Track screen views automatically
  useScreenTracking();

  useEffect(() => {
    // Skip if no pathname yet (initial render)
    if (!pathname) return;

    // Route guard: Redirect authenticated users away from auth screens
    if (isAuthenticated && isUnprotected(pathname)) {
      console.log(
        '[NavigationGuard] Authenticated user on unprotected route, redirecting to home',
      );
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, pathname, router]);

  // This component doesn't render anything
  return null;
}
