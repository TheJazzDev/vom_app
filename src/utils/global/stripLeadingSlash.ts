export const stripLeadingSlash = (route: string): string => {
  if (!route) return route;
  if (route === '/') return 'index';
  return route.startsWith('/') ? route.slice(1) : route;
};
