import React, { createContext, ReactNode, useContext, useState } from 'react';
import { UnauthorizedModal } from '../components/RouteProtection/UnauthorizedModal';

interface UnauthorizedAttempt {
  route: string;
  timestamp: number;
}

const UnauthorizedModalContext = createContext<{
  unauthorizedAttempt: UnauthorizedAttempt | null;
  setUnauthorizedAttempt: (attempt: UnauthorizedAttempt | null) => void;
  clearUnauthorizedAttempt: () => void;
} | null>(null);

export function UnauthorizedModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [unauthorizedAttempt, setUnauthorizedAttempt] =
    useState<UnauthorizedAttempt | null>(null);

  const clearUnauthorizedAttempt = () => {
    setUnauthorizedAttempt(null);
  };

  return (
    <UnauthorizedModalContext.Provider
      value={{
        unauthorizedAttempt,
        setUnauthorizedAttempt,
        clearUnauthorizedAttempt,
      }}
    >
      {children}

      {/* Global modal */}
      <UnauthorizedModal
        visible={!!unauthorizedAttempt}
        onClose={clearUnauthorizedAttempt}
        route={unauthorizedAttempt?.route || ''}
      />
    </UnauthorizedModalContext.Provider>
  );
}

export function useUnauthorizedModal() {
  const context = useContext(UnauthorizedModalContext);
  if (!context) {
    throw new Error(
      'useUnauthorizedModal must be used within UnauthorizedModalProvider',
    );
  }
  return context;
}
