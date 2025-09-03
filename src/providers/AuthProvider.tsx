import React, { useEffect, useState } from 'react';
import { LoadingScreen } from '../components';
import { useFirebasePersistence } from '../hooks/useFirebasePersistence';
import { useAuthSlice } from '../store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthenticated } = useAuthSlice();
  const [isAppReady, setIsAppReady] = useState(false);

  useFirebasePersistence();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('📱 App ready - showing UI');
      setIsAppReady(true);
    }, 500);

    if (currentUser && isAuthenticated) {
      console.log('📱 Persisted user found, showing app immediately');
      clearTimeout(timer);
      setIsAppReady(true);
    }

    return () => clearTimeout(timer);
  }, [currentUser, isAuthenticated]);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
