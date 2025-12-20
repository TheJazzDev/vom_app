import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string;
  isWifi: boolean;
  isCellular: boolean;
}

/**
 * Hook to monitor network connectivity status
 *
 * @example
 * const { isConnected, isInternetReachable } = useNetworkStatus();
 *
 * if (!isConnected) {
 *   return <OfflineBanner />;
 * }
 */
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
    isWifi: false,
    isCellular: false,
  });

  useEffect(() => {
    // Get initial state
    NetInfo.fetch().then(handleNetworkChange);

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNetworkChange = (state: NetInfoState) => {
    setNetworkStatus({
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable,
      type: state.type,
      isWifi: state.type === 'wifi',
      isCellular: state.type === 'cellular',
    });
  };

  /**
   * Manually refresh network status
   */
  const refresh = async (): Promise<NetworkStatus> => {
    const state = await NetInfo.fetch();
    const status: NetworkStatus = {
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable,
      type: state.type,
      isWifi: state.type === 'wifi',
      isCellular: state.type === 'cellular',
    };
    setNetworkStatus(status);
    return status;
  };

  return {
    ...networkStatus,
    refresh,
    // Convenience: true only if we're sure we're online
    isOnline: networkStatus.isConnected && networkStatus.isInternetReachable !== false,
    // Convenience: true only if we're sure we're offline
    isOffline: !networkStatus.isConnected || networkStatus.isInternetReachable === false,
  };
};

export default useNetworkStatus;
