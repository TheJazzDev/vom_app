import { ProgrammeTemplateRenderer } from '@/src/components';
import { useProgrammeLogic } from '@/src/hooks/programme';
import React from 'react';

const CurrentProgrammeScreen = () => {
  const { currentProgramme } = useProgrammeLogic();

  return <ProgrammeTemplateRenderer programme={currentProgramme} />;
};

export default CurrentProgrammeScreen;
