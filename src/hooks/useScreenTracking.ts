import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';

/**
 * Hook to track screen views for analytics
 * Call this in your root layout or individual screens
 *
 * @example
 * ```tsx
 * function MyScreen() {
 *   useScreenTracking();
 *   return <View>...</View>;
 * }
 * ```
 */
export function useScreenTracking() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    // Only track if pathname actually changed
    if (pathname && pathname !== previousPathname.current) {
      previousPathname.current = pathname;

      // Log screen view
      console.log('[Analytics] Screen view:', {
        screen_name: pathname,
        timestamp: new Date().toISOString(),
      });

      // TODO: Replace with your analytics service
      // Examples:
      // - Firebase Analytics: analytics().logScreenView({ screen_name: pathname });
      // - Segment: analytics.screen(pathname);
      // - Amplitude: amplitude.track('Screen View', { screen_name: pathname });
      // - Custom API: fetch('/api/analytics/screen-view', { method: 'POST', body: JSON.stringify({ screen: pathname }) });

      // For now, we're just logging to console
      // When you're ready to add analytics:
      // 1. Install your analytics package (e.g., @react-native-firebase/analytics)
      // 2. Import it here
      // 3. Replace the console.log with the actual analytics call
    }
  }, [pathname]);
}

/**
 * Hook to track specific events in your app
 * @param eventName - Name of the event to track
 * @param params - Optional parameters to send with the event
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const trackEvent = useEventTracking();
 *
 *   const handleButtonPress = () => {
 *     trackEvent('button_press', { button_name: 'donate' });
 *   };
 *
 *   return <Button onPress={handleButtonPress}>Donate</Button>;
 * }
 * ```
 */
export function useEventTracking() {
  return (eventName: string, params?: Record<string, any>) => {
    console.log('[Analytics] Event:', {
      event_name: eventName,
      params,
      timestamp: new Date().toISOString(),
    });

    // TODO: Replace with your analytics service
    // Examples:
    // - Firebase Analytics: analytics().logEvent(eventName, params);
    // - Segment: analytics.track(eventName, params);
    // - Amplitude: amplitude.track(eventName, params);
  };
}
