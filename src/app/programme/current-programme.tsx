import { ProgrammeTemplateRenderer, View } from '@/src/components';
import { useProgrammeLogic } from '@/src/hooks/programme';
import React from 'react';

const CurrentProgrammScreen = () => {
  const { currentProgramme } = useProgrammeLogic();

  return (
    <View gradient>
      <ProgrammeTemplateRenderer programme={currentProgramme} />
    </View>
  );
};

export default CurrentProgrammScreen;
