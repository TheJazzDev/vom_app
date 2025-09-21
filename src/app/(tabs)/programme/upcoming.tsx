import { PastAndUpcomingScreen } from '@/src/components/Programme/screens/PastAndUpcoming';
import { dispatch, useProgrammeSlice } from '@/src/store';
import { fetchUpcomingProgrammes } from '@/src/store/thunks/programme';
import React, { useEffect } from 'react';

const UpcomingProgrammeScreen = () => {
  const {
    upcomingProgrammes,
    isUpcomingProgrammesLoading,
    upcomingProgrammesError,
  } = useProgrammeSlice();

  useEffect(() => {
    dispatch(fetchUpcomingProgrammes());
  }, []);

  return (
    <PastAndUpcomingScreen
      programmes={upcomingProgrammes}
      isLoading={isUpcomingProgrammesLoading}
      error={upcomingProgrammesError}
      title="Upcoming Programmes"
      subtitle="Stay updated with all upcoming church services"
      emptyMessage="No upcoming programmes found"
      refreshAction={fetchUpcomingProgrammes}
      showRefreshControl={true}
    />
  );
};

export default UpcomingProgrammeScreen;
