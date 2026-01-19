import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Appearance } from 'react-native';

type ThemeMode = 'automatic' | 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@vom_app_theme_preference';

// Helper function to apply theme synchronously during initialization
const applyThemeImmediate = (mode: ThemeMode) => {
  switch (mode) {
    case 'automatic':
      Appearance.setColorScheme(null);
      break;
    case 'light':
      Appearance.setColorScheme('light');
      break;
    case 'dark':
      Appearance.setColorScheme('dark');
      break;
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize with system theme to prevent flash
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    // Default to 'automatic' but apply system theme immediately
    applyThemeImmediate('automatic');
    return 'automatic';
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['automatic', 'light', 'dark'].includes(savedTheme)) {
        setThemeModeState(savedTheme as ThemeMode);
      } else {
        // No saved preference, apply system theme immediately
        applyTheme('automatic');
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyTheme = (mode: ThemeMode) => {
    switch (mode) {
      case 'automatic':
        Appearance.setColorScheme(null);
        break;
      case 'light':
        Appearance.setColorScheme('light');
        break;
      case 'dark':
        Appearance.setColorScheme('dark');
        break;
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};
