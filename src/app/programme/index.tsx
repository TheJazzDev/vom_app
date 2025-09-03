import {
  ProgrammeList,
  ProgrammeTemplateRenderer,
  Spacer,
  Tab,
  View,
} from '@/src/components';
import { useProgrammeLogic } from '@/src/hooks/programme';
import { getPastPrograms, getUpcomingPrograms } from '@/src/utils';
import React, { useState } from 'react';

export default function Programme() {
  const [section, setSection] = useState<ServiceSections>('Current');
  const { currentProgramme } = useProgrammeLogic();

  const upcoming = getUpcomingPrograms();
  const past = getPastPrograms();

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
        <ProgrammeTemplateRenderer programme={currentProgramme} />
      )}

      {section === 'Upcoming' && <ProgrammeList data={upcoming} />}

      {section === 'Past' && <ProgrammeList data={past} />}
    </View>
  );
}
