import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Custom hook to handle Android back button behavior
 * @param handler - Function to execute when back button is pressed. Return true to prevent default back behavior.
 * @param enabled - Whether the handler is enabled (default: true)
 */
export function useBackHandler(
  handler: () => boolean,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handler,
    );

    return () => backHandler.remove();
  }, [handler, enabled]);
}
