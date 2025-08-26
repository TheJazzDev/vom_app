import { Card, Divider, IconSymbol, Text, View } from '@/src/components';
import { useTheme } from '@/src/hooks';
import React, { useEffect, useState } from 'react';
import { Appearance, Pressable, StyleSheet } from 'react-native';

type ThemeMode = 'automatic' | 'light' | 'dark';

const ThemeOption = ({
  label,
  selected,
  onPress,
  icon,
  theme,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon: any;
  theme: any;
}) => (
  <Pressable onPress={onPress} style={[styles.option]}>
    <View className="flex-row gap-2">
      {icon && <View style={{ marginRight: 15 }}>{icon}</View>}
      <Text className="">{label}</Text>
    </View>
    <View style={[styles.radioOuter, { borderColor: theme.muted }]}>
      {selected && (
        <View style={[styles.radioInner, { backgroundColor: theme.muted }]} />
      )}
    </View>
  </Pressable>
);

export default function Settings() {
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('automatic');
  const [, setSystemTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setThemeMode(newTheme);

    switch (newTheme) {
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

  const getSelectedTheme = () => {
    return themeMode;
  };

  return (
    <View gradient scrollable>
      <Text variant="h5" className="m-4 mb-1">
        Theme
      </Text>

      <Card
        variant="outlined"
        className="p-0 border-muted dark:border-dark-muted"
      >
        <ThemeOption
          theme={theme}
          label="Automatic"
          selected={getSelectedTheme() === 'automatic'}
          onPress={() => handleThemeChange('automatic')}
          icon={
            <IconSymbol
              size={20}
              color={theme.muted}
              name="circle.lefthalf.fill"
            />
          }
        />
        <Divider colorVariant="muted" height={1.1} />
        <ThemeOption
          theme={theme}
          label="Light"
          selected={getSelectedTheme() === 'light'}
          onPress={() => handleThemeChange('light')}
          icon={
            <IconSymbol size={20} color={theme.muted} name="sun.max.fill" />
          }
        />
        <Divider colorVariant="muted" height={1.1} />
        <ThemeOption
          theme={theme}
          label="Dark"
          selected={getSelectedTheme() === 'dark'}
          onPress={() => handleThemeChange('dark')}
          icon={<IconSymbol size={20} color={theme.muted} name="moon.fill" />}
        />
      </Card>

      <Text variant="body2" className="mt-2">
        Automatic is only supported on operating systems that allow you to
        control the system-wide color scheme.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
