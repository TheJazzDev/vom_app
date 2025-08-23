import { Text, View } from '@/src/components';
import { upcomingPrograms } from '@/src/constants/upcoming';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const ProgrammeDetails = () => {
  const { id } = useLocalSearchParams();

  const selectedProgramme = upcomingPrograms.find(
    (programme) => programme.id === id
  );

  if (!selectedProgramme) {
    return;
  }

  return (
    <View safe>
      <Text variant='h2'>ProgrammeDetails</Text>
      <Text>{selectedProgramme.type}</Text>
      <Text>{selectedProgramme.topic}</Text>
    </View>
  );
};

export default ProgrammeDetails;

