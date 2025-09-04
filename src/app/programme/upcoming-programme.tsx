import { ProgrammeList, Spacer, View } from '@/src/components';
import { getPastPrograms } from '@/src/utils';
import React from 'react';

const UpcomingProgrammeScreen = () => {
  const past = getPastPrograms();

  return (
    <View gradient scrollable>
      <Spacer height={16} />
      <ProgrammeList data={past} />
    </View>
  );
};

export default UpcomingProgrammeScreen;
