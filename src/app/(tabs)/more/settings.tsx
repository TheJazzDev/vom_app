import { Card, Divider, IconSymbol, Text, View } from '@/src/components';
import { useTheme, useThemeMode, useToast } from '@/src/hooks';
import { useAuthSlice, useNotificationSlice } from '@/src/store';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Linking, Pressable, Switch, Platform } from 'react-native';

type ThemeMode = 'automatic' | 'light' | 'dark';

interface SettingOption {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'radio';
  value?: boolean;
  onPress?: () => void;
  icon: string;
  disabled?: boolean;
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
    disabled={option.disabled}
    style={{ opacity: option.disabled ? 0.5 : 1 }}
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
        disabled={option.disabled}
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
  const toast = useToast();
  const { themeMode, setThemeMode } = useThemeMode();
  const { currentUser } = useAuthSlice();
  const { settings, permissionStatus, loadSettings, saveSettings } =
    useNotificationSlice();

  // Load settings on mount
  useEffect(() => {
    if (currentUser?.id) {
      loadSettings(currentUser.id);
    }
  }, [currentUser?.id]);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setThemeMode(newTheme);
  };

  const handleNotificationToggle = async (
    settingId: string,
    value: boolean,
  ) => {
    if (!currentUser?.id) {
      toast.error('Please log in to change settings');
      return;
    }

    // If toggling main notifications off, show confirmation
    if (settingId === 'enabled' && !value) {
      Alert.alert(
        'Disable Notifications',
        'You will no longer receive push notifications from the app. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Disable',
            style: 'destructive',
            onPress: () => {
              saveSettings(currentUser.id, { [settingId]: value });
              toast.success('Notifications disabled');
            },
          },
        ],
      );
      return;
    }

    saveSettings(currentUser.id, { [settingId]: value });

    if (settingId === 'enabled' && value) {
      toast.success('Notifications enabled');
    }
  };

  const handleOpenNotificationSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
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
              router.replace('/auth');
            },
          },
        ]);
        break;
    }
  };

  const notificationsDisabled =
    !settings.enabled || permissionStatus === 'denied';

  const notificationOptions: SettingOption[] = [
    {
      id: 'enabled',
      label: 'Push Notifications',
      description:
        permissionStatus === 'denied'
          ? 'Enable in device settings'
          : 'Receive notifications on your device',
      type: 'toggle',
      value: settings.enabled && permissionStatus !== 'denied',
      icon: 'bell.fill',
      onPress:
        permissionStatus === 'denied'
          ? handleOpenNotificationSettings
          : undefined,
    },
    {
      id: 'announcements',
      label: 'Church Announcements',
      description: 'Important church updates and news',
      type: 'toggle',
      value: settings.announcements,
      icon: 'megaphone.fill',
      disabled: notificationsDisabled,
    },
    {
      id: 'programmes',
      label: 'Event Reminders',
      description: 'Get notified about upcoming events',
      type: 'toggle',
      value: settings.programmes,
      icon: 'calendar.badge.plus',
      disabled: notificationsDisabled,
    },
    {
      id: 'prayers',
      label: 'Daily Prayers',
      description: 'Daily prayer notifications',
      type: 'toggle',
      value: settings.prayers,
      icon: 'hands.sparkles.fill',
      disabled: notificationsDisabled,
    },
    {
      id: 'reminders',
      label: 'Service Reminders',
      description: 'Sunday service and special event reminders',
      type: 'toggle',
      value: settings.reminders,
      icon: 'clock.fill',
      disabled: notificationsDisabled,
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

        {permissionStatus === 'denied' && (
          <Pressable
            onPress={handleOpenNotificationSettings}
            className="mb-4 p-4 rounded-lg flex-row items-center"
            style={{ backgroundColor: `${theme.error}15` }}
          >
            <IconSymbol
              name="exclamationmark.triangle.fill"
              size={20}
              color={theme.error}
            />
            <View className="ml-3 flex-1">
              <Text className="font-medium" style={{ color: theme.error }}>
                Notifications Disabled
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                Tap to enable notifications in device settings
              </Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color={theme.error} />
          </Pressable>
        )}

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
