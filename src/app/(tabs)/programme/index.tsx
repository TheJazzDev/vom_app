import {
  Spacer,
  SundayServiceTemplate,
  Tab,
  UpcomimgCard,
  View,
} from '@/src/components';
import { sundayProgramme } from '@/src/constants';
import { upcomingPrograms } from '@/src/constants/upcoming';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { FlatList, Platform } from 'react-native';

export default function Programme() {
  const [section, setSection] = useState<ServiceSections>('Current');

  const tabBarHeight = useBottomTabBarHeight();

  const upcoming = upcomingPrograms.filter(
    (program) => program.status === 'upcoming',
  );
  const past = upcomingPrograms.filter((program) => program.status === 'past');

  return (
    <View gradient>
      <Tab<ServiceSections>
        value={section}
        onChange={setSection}
        variant="underline"
        tabs={[
          { label: 'Current', value: 'Current' },
          { label: 'Upcoming', value: 'Upcoming' },
          { label: 'Past', value: 'Past' },
        ]}
      />
      <Spacer height={10} />
      {section === 'Current' && (
        <SundayServiceTemplate data={sundayProgramme} />
      )}
      <View>
        {section === 'Upcoming' && (
          <FlatList
            data={upcoming}
            keyExtractor={(program) => program.id}
            renderItem={({ item }) => <UpcomimgCard programmes={item} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: tabBarHeight + 24,
            }}
          />
        )}
        {section === 'Past' && (
          <FlatList
            data={past}
            keyExtractor={(program) => program.id}
            renderItem={({ item }) => <UpcomimgCard programmes={item} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: tabBarHeight + 24,
            }}
          />
        )}
      </View>
    </View>
  );
}
