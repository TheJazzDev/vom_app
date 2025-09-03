import React from 'react';
import { FlatList, Platform } from 'react-native';
import UpcomimgCard from '../templates/Upcoming';

interface ProgrammeListProps {
  data: any[];
}

export const ProgrammeList: React.FC<ProgrammeListProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(program) => program.id}
      renderItem={({ item }) => <UpcomimgCard programmes={item} />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingBottom: 24,
      }}
    />
  );
};
