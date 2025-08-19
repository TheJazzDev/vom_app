import {
    ThemedCard,
    ThemedDivider,
    Text,
    ThemedView,
} from '@/src/components';
import { IconSymbol } from '@/src/components/ui/IconSymbol';
import { useTheme } from '@/src/hooks';
import React, { useEffect, useState } from 'react';
import { Appearance, Pressable, StyleSheet, View } from 'react-native';

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
  <Pressable
    onPress={onPress}
    style={[styles.option, { borderBottomColor: theme.border }]}>
    <View style={styles.optionContent}>
      {icon && <View style={{ marginRight: 15 }}>{icon}</View>}
      <Text style={styles.optionLabel}>{label}</Text>
    </View>
    <View style={[styles.radioOuter, { borderColor: theme.border }]}>
      {selected && (
        <View style={[styles.radioInner, { backgroundColor: theme.border }]} />
      )}
    </View>
  </Pressable>
);

export default function Settings() {
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('automatic');
  const [_, setSystemTheme] = useState(Appearance.getColorScheme());

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
    <ThemedView safe={true}>
      <Text style={styles.sectionTitle}>Theme</Text>

      <ThemedCard border>
        <ThemeOption
          theme={theme}
          label='Automatic'
          selected={getSelectedTheme() === 'automatic'}
          onPress={() => handleThemeChange('automatic')}
          icon={
            <IconSymbol
              size={20}
              color={theme.border}
              name='circle.lefthalf.fill'
            />
          }
        />
        <ThemedDivider />
        <ThemeOption
          theme={theme}
          label='Light'
          selected={getSelectedTheme() === 'light'}
          onPress={() => handleThemeChange('light')}
          icon={
            <IconSymbol size={20} color={theme.border} name='sun.max.fill' />
          }
        />
        <ThemedDivider />
        <ThemeOption
          theme={theme}
          label='Dark'
          selected={getSelectedTheme() === 'dark'}
          onPress={() => handleThemeChange('dark')}
          icon={<IconSymbol size={20} color={theme.border} name='moon.fill' />}
        />
      </ThemedCard>

      <Text style={styles.note}>
        Automatic is only supported on operating systems that allow you to
        control the system-wide color scheme.
      </Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginVertical: 12,
    marginLeft: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionLabel: {
    fontSize: 16,
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
  note: {
    fontSize: 12,
    marginTop: 8,
    lineHeight: 16,
    marginLeft: 16,
  },
});
