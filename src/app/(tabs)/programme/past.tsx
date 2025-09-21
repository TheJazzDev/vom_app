import { PastAndUpcomingScreen } from '@/src/components/Programme/screens/PastAndUpcoming';
import { dispatch, useProgrammeSlice } from '@/src/store';
import { fetchPastProgrammes } from '@/src/store/thunks/programme';
import React, { useEffect } from 'react';

const PastProgrammeScreen = () => {
  const { pastProgrammes, isPastProgrammesLoading, pastProgrammesError } =
    useProgrammeSlice();

  useEffect(() => {
    dispatch(fetchPastProgrammes());
  }, []);

  return (
    <PastAndUpcomingScreen
      programmes={pastProgrammes}
      isLoading={isPastProgrammesLoading}
      error={pastProgrammesError}
      title="Past Programmes"
      subtitle="Previously held church services and events"
      emptyMessage="No past programmes found"
      refreshAction={fetchPastProgrammes}
      showRefreshControl={false}
    />
  );
};

export default PastProgrammeScreen;
