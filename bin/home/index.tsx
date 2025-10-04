import Dashboard from '@/src/components/Dashboard';
import { dispatch } from '@/src/store';
import { fetchUpcomingProgrammes } from '@/src/store/thunks/programme';
import React, { useCallback, useEffect, useState } from 'react';

const HomePage = () => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUpcomingProgrammes());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchUpcomingProgrammes());
    } catch (error) {
      console.error('Error refreshing programmes:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return <Dashboard refreshing={refreshing} onRefresh={onRefresh} />;
};

export default HomePage;
