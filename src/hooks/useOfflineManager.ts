import { useEffect } from 'react';
import { dispatch, useOfflineSlice } from '../store';
import { useNetworkStatus } from './useNetworkStatus';

export interface OfflineManagerOptions {
  autoSync?: boolean;
  debug?: boolean;
}

/**
 * Hook to manage offline queue and sync
 * Simplified version following codebase patterns
 */
export const useOfflineManager = (options: OfflineManagerOptions = {}) => {
  const { debug = false } = options;

  const { isOnline, queue, isProcessingQueue, setOnlineStatus } =
    useOfflineSlice();
  const { isOnline: networkIsOnline } = useNetworkStatus();

  // Sync Redux online status with network status
  useEffect(() => {
    if (networkIsOnline !== isOnline) {
      dispatch(setOnlineStatus(networkIsOnline));

      if (debug) {
        console.log(
          '[OfflineManager] Network status changed:',
          networkIsOnline,
        );
      }
    }
  }, [networkIsOnline, isOnline, setOnlineStatus, debug]);

  return {
    isOnline,
    queueLength: queue.length,
    isProcessing: isProcessingQueue,
  };
};

export default useOfflineManager;
