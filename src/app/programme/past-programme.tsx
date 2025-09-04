import { ProgrammeList, Spacer, View } from '@/src/components';
import { getUpcomingPrograms } from '@/src/utils';
import React from 'react';

const UpcomingProgrammeScreen = () => {
  const upcoming = getUpcomingPrograms();

  return (
    <View gradient scrollable>
      <Spacer height={16} />
      <ProgrammeList data={upcoming} />
    </View>
  );
};

export default UpcomingProgrammeScreen;
