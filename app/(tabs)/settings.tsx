import { ThemedText, ThemedView } from '@/components';
import React, { useState } from 'react';
import { Appearance, StyleSheet, Switch, View } from 'react-native';

const Settings = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    Appearance.getColorScheme() === 'dark'
  );

  const toggleTheme = () => {
    const newScheme = isDarkTheme ? 'light' : 'dark';
    Appearance.setColorScheme(newScheme);
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Settings</ThemedText>
      <View style={styles.switchRow}>
        <ThemedText>Dark Mode</ThemedText>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
      </View>
    </ThemedView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
});
