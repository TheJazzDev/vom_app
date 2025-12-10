import { Card, Divider, IconSymbol, Text, View } from '@/src/components';
import { useTheme, useThemeMode } from '@/src/hooks';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, Switch } from 'react-native';

type ThemeMode = 'automatic' | 'light' | 'dark';

interface SettingOption {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'radio';
  value?: boolean;
  onPress?: () => void;
  icon: string;
}

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
  icon: string;
  theme: any;
}) => (
  <Pressable
    onPress={onPress}
    className="flex-row justify-between items-center px-4 py-4"
    android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
  >
    <View className="flex-row items-center">
      <View className="mr-4">
        <IconSymbol size={20} color={theme.muted} name={icon as any} />
      </View>
      <Text className="font-medium" style={{ color: theme.text }}>
        {label}
      </Text>
    </View>

    <View
      className="w-5 h-5 rounded-full border-2 justify-center items-center"
      style={{ borderColor: theme.muted }}
    >
      {selected && (
        <View
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: theme.primary }}
        />
      )}
    </View>
  </Pressable>
);

const SettingItem = ({
  option,
  theme,
  onToggle,
}: {
  option: SettingOption;
  theme: any;
  onToggle?: (id: string, value: boolean) => void;
}) => (
  <Pressable
    onPress={option.onPress}
    className="flex-row justify-between items-center px-4 py-4"
    android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
  >
    <View className="flex-row items-center flex-1">
      <View className="mr-4">
        <IconSymbol size={20} color={theme.muted} name={option.icon as any} />
      </View>
      <View className="flex-1">
        <Text className="font-medium mb-1" style={{ color: theme.text }}>
          {option.label}
        </Text>
        {option.description && (
          <Text className="text-sm" style={{ color: theme.muted }}>
            {option.description}
          </Text>
        )}
      </View>
    </View>

    {option.type === 'toggle' && onToggle && (
      <Switch
        value={option.value || false}
        onValueChange={(value) => onToggle(option.id, value)}
        trackColor={{ false: theme.border, true: `${theme.primary}50` }}
        thumbColor={option.value ? theme.primary : theme.muted}
      />
    )}

    {option.type === 'navigation' && (
      <IconSymbol name="chevron.right" size={16} color={theme.muted} />
    )}
  </Pressable>
);

export default function Settings() {
  const theme = useTheme();
  const router = useRouter();
  const { themeMode, setThemeMode } = useThemeMode();
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    eventReminders: true,
    prayerRequests: true,
    announcements: true,
  });

  const handleThemeChange = (newTheme: ThemeMode) => {
    setThemeMode(newTheme);
  };

  const handleNotificationToggle = (settingId: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [settingId]: value,
    }));
  };

  const handleAccountAction = (action: string) => {
    switch (action) {
      case 'profile':
        router.push('/profile');
        break;
      case 'privacy':
        Alert.alert(
          'Privacy Policy',
          'Privacy policy details would be shown here.',
        );
        break;
      case 'help':
        Alert.alert(
          'Help & Support',
          'Contact support or visit our help center.',
        );
        break;
      case 'about':
        router.push('/about');
        break;
      case 'logout':
        Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: () => {
              // Handle logout
              router.replace('/auth');
            },
          },
        ]);
        break;
    }
  };

  const notificationOptions: SettingOption[] = [
    {
      id: 'pushNotifications',
      label: 'Push Notifications',
      description: 'Receive notifications on your device',
      type: 'toggle',
      value: notificationSettings.pushNotifications,
      icon: 'bell.fill',
    },
    {
      id: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive updates via email',
      type: 'toggle',
      value: notificationSettings.emailNotifications,
      icon: 'envelope.fill',
    },
    {
      id: 'smsNotifications',
      label: 'SMS Notifications',
      description: 'Receive text message alerts',
      type: 'toggle',
      value: notificationSettings.smsNotifications,
      icon: 'message.badge.fill',
    },
    {
      id: 'eventReminders',
      label: 'Event Reminders',
      description: 'Get notified about upcoming events',
      type: 'toggle',
      value: notificationSettings.eventReminders,
      icon: 'calendar.badge.plus',
    },
    {
      id: 'prayerRequests',
      label: 'Prayer Request Updates',
      description: 'Notifications for new prayer requests',
      type: 'toggle',
      value: notificationSettings.prayerRequests,
      icon: 'hands.sparkles.fill',
    },
    {
      id: 'announcements',
      label: 'Church Announcements',
      description: 'Important church updates and news',
      type: 'toggle',
      value: notificationSettings.announcements,
      icon: 'megaphone.fill',
    },
  ];

  const accountOptions: SettingOption[] = [
    {
      id: 'profile',
      label: 'Edit Profile',
      description: 'Update your personal information',
      type: 'navigation',
      onPress: () => handleAccountAction('profile'),
      icon: 'person.crop.circle.fill',
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      description: 'View our privacy policy',
      type: 'navigation',
      onPress: () => handleAccountAction('privacy'),
      icon: 'hand.raised.fill',
    },
    {
      id: 'help',
      label: 'Help & Support',
      description: 'Get help or contact support',
      type: 'navigation',
      onPress: () => handleAccountAction('help'),
      icon: 'questionmark.circle.fill',
    },
    {
      id: 'about',
      label: 'About',
      description: 'App version and information',
      type: 'navigation',
      onPress: () => handleAccountAction('about'),
      icon: 'info.circle.fill',
    },
  ];

  return (
    <View
      scrollable
      gradient
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <View className="pt-4 pb-2">
        <Text
          variant="h2"
          className="font-bold"
          style={{ color: theme.heading }}
        >
          Settings
        </Text>
        <Text variant="body" style={{ color: theme.muted }}>
          Customize your app experience
        </Text>
      </View>

      <View className="flex-1">
        {/* Theme Settings */}
        <Text
          variant="h4"
          className="font-semibold mt-6 mb-4"
          style={{ color: theme.heading }}
        >
          Appearance
        </Text>

        <Card variant="outlined" className="p-0 mb-2">
          <ThemeOption
            theme={theme}
            label="Automatic"
            selected={themeMode === 'automatic'}
            onPress={() => handleThemeChange('automatic')}
            icon="circle.lefthalf.fill"
          />
          <Divider height={1} />
          <ThemeOption
            theme={theme}
            label="Light"
            selected={themeMode === 'light'}
            onPress={() => handleThemeChange('light')}
            icon="sun.max.fill"
          />
          <Divider height={1} />
          <ThemeOption
            theme={theme}
            label="Dark"
            selected={themeMode === 'dark'}
            onPress={() => handleThemeChange('dark')}
            icon="moon.fill"
          />
        </Card>

        <Text variant="caption" className="mb-6" style={{ color: theme.muted }}>
          Automatic theme follows your device&apos;s system settings
        </Text>

        {/* Notification Settings */}
        <Text
          variant="h4"
          className="font-semibold mb-4"
          style={{ color: theme.heading }}
        >
          Notifications
        </Text>

        <Card variant="outlined" className="p-0 mb-6">
          {notificationOptions.map((option, index) => (
            <View key={option.id}>
              <SettingItem
                option={option}
                theme={theme}
                onToggle={handleNotificationToggle}
              />
              {index < notificationOptions.length - 1 && <Divider height={1} />}
            </View>
          ))}
        </Card>

        {/* Account Settings */}
        <Text
          variant="h4"
          className="font-semibold mb-4"
          style={{ color: theme.heading }}
        >
          Account
        </Text>

        <Card variant="outlined" className="p-0 mb-6">
          {accountOptions.map((option, index) => (
            <View key={option.id}>
              <SettingItem option={option} theme={theme} />
              {index < accountOptions.length - 1 && <Divider height={1} />}
            </View>
          ))}
        </Card>

        {/* App Version */}
        <View className="items-center pb-8">
          <Text variant="caption" style={{ color: theme.muted }}>
            Valley of Mercy Church App
          </Text>
          <Text variant="caption" style={{ color: theme.muted }}>
            Version 1.0.0
          </Text>
        </View>
      </View>
    </View>
  );
}
