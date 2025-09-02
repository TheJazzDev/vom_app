import React, { useEffect, useState } from 'react';
import { LoadingScreen } from '../components';
import { useFirebasePersistence } from '../hooks/useFirebasePersistence';
import { useAuthSlice } from '../store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { currentMember, isAuthenticated } = useAuthSlice();
  const [isAppReady, setIsAppReady] = useState(false);

  // Initialize Firebase persistence (runs in background)
  useFirebasePersistence();

  useEffect(() => {
    // App is ready immediately if we have persisted data OR after a short delay
    const timer = setTimeout(() => {
      console.log('📱 App ready - showing UI');
      setIsAppReady(true);
    }, 500); // Very short delay just for Redux Persist to rehydrate

    // If we have persisted user data, show app immediately
    if (currentMember && isAuthenticated) {
      console.log('📱 Persisted user found, showing app immediately');
      clearTimeout(timer);
      setIsAppReady(true);
    }

    return () => clearTimeout(timer);
  }, [currentMember, isAuthenticated]);

  // Show loading only for a very brief moment while Redux rehydrates
  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
