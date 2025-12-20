import React, { createContext, ReactNode, useContext, useState } from 'react';

interface NavigationSourceContextType {
  sourceRoute: string | null;
  setSourceRoute: (route: string | null) => void;
  clearSourceRoute: () => void;
}

const NavigationSourceContext = createContext<NavigationSourceContextType>({
  sourceRoute: null,
  setSourceRoute: () => {},
  clearSourceRoute: () => {},
});

export const NavigationSourceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sourceRoute, setSourceRoute] = useState<string | null>(null);

  const clearSourceRoute = () => setSourceRoute(null);

  return (
    <NavigationSourceContext.Provider
      value={{ sourceRoute, setSourceRoute, clearSourceRoute }}
    >
      {children}
    </NavigationSourceContext.Provider>
  );
};

export const useNavigationSource = () => {
  const context = useContext(NavigationSourceContext);
  if (!context) {
    throw new Error(
      'useNavigationSource must be used within NavigationSourceProvider',
    );
  }
  return context;
};
