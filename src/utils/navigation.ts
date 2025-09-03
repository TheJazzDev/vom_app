import { usePathname, useRouter } from 'expo-router';
import { ROUTES, RouteValues } from '../constants';

export const useNavigationHelpers = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isRootRoute = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    return segments.length <= 1;
  };

  const canGoBack = () => {
    return !isRootRoute(pathname) && router.canGoBack();
  };

  const navigateBack = () => {
    if (canGoBack()) {
      router.back();
    } else {
      // Fallback to home if no back history
      router.replace(ROUTES.HOME);
    }
  };

  // Type-safe navigation function
  const navigateTo = (route: RouteValues) => {
    router.push(route as any);
  };

  // For dynamic routes with parameters
  const navigateToWithParams = (route: string) => {
    router.push(route as any);
  };

  // Replace current route
  const replaceTo = (route: RouteValues) => {
    router.replace(route as any);
  };

  return {
    canGoBack: canGoBack(),
    navigateBack,
    navigateTo,
    navigateToWithParams,
    replaceTo,
    isRootRoute: isRootRoute(pathname),
    currentPath: pathname,
  };
};

// Hook for header configuration
export const useHeaderConfig = () => {
  const { canGoBack, navigateBack } = useNavigationHelpers();

  return {
    shouldShowBackButton: canGoBack,
    backHandler: navigateBack,
  };
};

// Navigation helper functions (can be used outside components)
export const navigationHelpers = {
  isRootRoute: (path: string) => {
    const segments = path.split('/').filter(Boolean);
    return segments.length <= 1;
  },

  buildDynamicRoute: (template: string, params: Record<string, string>) => {
    let route = template;
    Object.entries(params).forEach(([key, value]) => {
      route = route.replace(`[${key}]`, value);
    });
    return route;
  },
};
