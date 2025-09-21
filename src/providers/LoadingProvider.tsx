import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoadingScreen } from '../components';
import { auth } from '../config/firebase';

interface LoadingContextType {
  isAppLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  isAppLoading: true,
});

export const useAppLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(
        '🔥 Auth state changed:',
        user ? 'authenticated' : 'unauthenticated',
      );
      setIsAuthReady(true);
    });

    return unsubscribe;
  }, []);

  const isAppLoading = !isAuthReady;

  if (isAppLoading) {
    return <LoadingScreen />;
  }

  return (
    <LoadingContext.Provider
      value={{
        isAppLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
