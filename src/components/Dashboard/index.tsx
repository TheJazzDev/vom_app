import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { getCurrentTimeGreeting } from '@/src/utils';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView } from 'react-native';
import { HelloWave, Text, View } from '..';
import Announcement from './Announcement';
import Devotionals from './Devotionals';
import NextService from './NextService';
import PrayerRequest from './PrayerRequest';
import QuickAccess from './QuickAccess';
import RecentSermons from './RecentSermons';

export default function Dashboard() {
  const theme = useTheme();
  const { currentUser } = useAuthSlice();

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <LinearGradient
        colors={[theme.primary, theme.brand]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 20, height: 100 }}
      >
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Text
              variant="h2"
              className="text-white dark:text-white/90 font-bold mr-2"
            >
              {getCurrentTimeGreeting()}{' '}
              {currentUser ? currentUser.firstName : 'Guest'}
            </Text>
            <HelloWave />
          </View>
          <Text variant="body" className="text-white/90 dark:text-white/80">
            Stay connected with church activities
          </Text>
        </View>
      </LinearGradient>

      <Devotionals />
      <View style={{ padding: 10, marginTop: -4 }}>
        <NextService />
        <Announcement />
        <RecentSermons />
        <PrayerRequest />
        <QuickAccess />
      </View>
    </ScrollView>
  );
}
