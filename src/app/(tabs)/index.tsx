import Dashboard from '@/src/components/Dashboard';
import { dispatch } from '@/src/store';
import { fetchAnnouncements } from '@/src/store/thunks';
import { fetchAllMembersThunk } from '@/src/store/thunks/directory';
import { fetchUpcomingProgrammes } from '@/src/store/thunks/programme';
import React, { useCallback, useEffect, useState } from 'react';

const HomePage = () => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUpcomingProgrammes());
    dispatch(fetchAllMembersThunk());
    dispatch(fetchAnnouncements());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(fetchUpcomingProgrammes()),
        dispatch(fetchAllMembersThunk()),
        dispatch(fetchAnnouncements()),
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return <Dashboard refreshing={refreshing} onRefresh={onRefresh} />;
};

export default HomePage;
