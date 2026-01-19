import Dashboard from '@/src/components/Dashboard';
import { dispatch } from '@/src/store';
import { useAuthSlice } from '@/src/store/slices';
import { fetchAnnouncements, fetchActiveFirstTimers } from '@/src/store/thunks';
import { fetchAllMembersThunk } from '@/src/store/thunks/directory';
import { fetchUpcomingProgrammes } from '@/src/store/thunks/programme';
import { fetchSermonsThunk } from '@/src/store/thunks/sermonThunks';
import { fetchPrayerRequestsThunk } from '@/src/store/thunks/prayerRequestThunks';
import { fetchDailyPrayersThunk } from '@/src/store/thunks/dailyPrayerThunks';
import { fetchTestimoniesThunk } from '@/src/store/thunks/testimonyThunks';
import {
  fetchUserEngagementThunk,
  fetchUserBadgesThunk,
} from '@/src/store/thunks/gamificationThunks';
import React, { useCallback, useEffect, useState } from 'react';

const HomePage = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Get current user ID from auth state
  const { user } = useAuthSlice();
  const userId = user?.id;

  useEffect(() => {
    // Core dashboard data
    dispatch(fetchUpcomingProgrammes());
    dispatch(fetchAllMembersThunk());
    dispatch(fetchAnnouncements());
    dispatch(fetchActiveFirstTimers());

    // Ministry data
    dispatch(fetchSermonsThunk());
    dispatch(fetchPrayerRequestsThunk());
    dispatch(fetchDailyPrayersThunk());
    dispatch(fetchTestimoniesThunk());

    // Gamification data (only if user is logged in)
    if (userId) {
      dispatch(fetchUserEngagementThunk(userId));
      dispatch(fetchUserBadgesThunk(userId));
    }
  }, [userId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Dispatch all fetches - they run in parallel automatically
      await Promise.all([
        dispatch(fetchUpcomingProgrammes()).unwrap(),
        dispatch(fetchAllMembersThunk()).unwrap(),
        dispatch(fetchAnnouncements()).unwrap(),
        dispatch(fetchActiveFirstTimers()).unwrap(),
        dispatch(fetchSermonsThunk()).unwrap(),
        dispatch(fetchPrayerRequestsThunk()).unwrap(),
        dispatch(fetchDailyPrayersThunk()).unwrap(),
        dispatch(fetchTestimoniesThunk()).unwrap(),
        // Conditionally add gamification thunks if user is logged in
        ...(userId
          ? [
              dispatch(fetchUserEngagementThunk(userId)).unwrap(),
              dispatch(fetchUserBadgesThunk(userId)).unwrap(),
            ]
          : []),
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [userId]);

  return <Dashboard refreshing={refreshing} onRefresh={onRefresh} />;
};

export default HomePage;
