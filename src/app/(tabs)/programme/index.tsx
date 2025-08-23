import {
  Spacer,
  SundayServiceTemplate,
  Tab,
  UpcomimgCard,
  View,
} from '@/src/components';
import { sundayProgramme } from '@/src/constants';
import { upcomingPrograms } from '@/src/constants/upcoming';
import React, { useState } from 'react';
import { FlatList, Platform } from 'react-native';

export default function Programme() {
  const [section, setSection] = useState<ServiceSections>('Current');

  const upcoming = upcomingPrograms.filter(
    (program) => program.status === 'upcoming'
  );
  const past = upcomingPrograms.filter((program) => program.status === 'past');

  return (
    <View safe>
      <Tab<ServiceSections>
        value={section}
        onChange={setSection}
        indicatorType='line'
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
      {section === 'Upcoming' && (
        <View className='py-6' safe>
          <FlatList
            data={upcoming}
            keyExtractor={(program) => program.id}
            renderItem={({ item }) => <UpcomimgCard programmes={item} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
          />
        </View>
      )}
      {section === 'Past' && (
        <View className='py-6' safe>
          <FlatList
            data={past}
            keyExtractor={(program) => program.id}
            renderItem={({ item }) => <UpcomimgCard programmes={item} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
          />
        </View>
      )}
    </View>
  );
}
