import Dashboard from '@/src/components/Dashboard';
import { dispatch } from '@/src/store';
import { fetchUpcomingProgrammes } from '@/src/store/thunks/programme';
import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    dispatch(fetchUpcomingProgrammes());
  }, []);

  return <Dashboard />;
};

export default HomePage;
