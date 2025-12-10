import { useTheme } from '@/src/hooks';
import React from 'react';
import { Platform } from 'react-native';
import { Text, View } from '..';
import Announcement from './Announcement';
import BirthdayCelebrations from './BirthdayCelebrations';
import Devotionals from './Devotionals';
import { Notifications } from './Navigations/Notifications';
import { ProfileHeader } from './Navigations/ProfileHeader';
import NextService from './NextService';
import PrayerRequest from './PrayerRequest';
import QuickAccess from './QuickAccess';
import RecentSermons from './RecentSermons';

interface DashboardProps {
  refreshing: boolean;
  onRefresh: () => void | Promise<void>;
}

export default function Dashboard({ refreshing, onRefresh }: DashboardProps) {
  const theme = useTheme();

  return (
    <View gradient className="flex-1">
      <View
        id="header"
        className={`flex-row justify-between p-4 ${Platform.OS === 'ios' ? 'pt-3' : 'pt-6'}`}
      >
        <ProfileHeader />
        <Notifications />
      </View>
      <View
        scrollable
        refreshing={refreshing}
        onRefresh={onRefresh}
        refreshTintColor={theme.primary}
        refreshColors={[theme.primary]}
        paddingHorizontal={0}
      >
        <View className="px-4">
          <Text variant="h6" className="text-center">
            Stay connected with church activities
          </Text>
        </View>

        {/* <VerseOfTheDay /> */}
        <Devotionals />
        <View style={{ padding: 10, marginTop: -4 }}>
          <NextService />
          <BirthdayCelebrations />
          <Announcement />
          <RecentSermons />
          <PrayerRequest />
          <QuickAccess />
        </View>
      </View>
    </View>
  );
}
