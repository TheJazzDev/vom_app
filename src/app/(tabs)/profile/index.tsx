import { useAuthSlice } from '@/src/store';
import React from 'react';
import AuthenticatedUserProfile from './_components/AuthenticatedUser';
import GuestProfile from './_components/Guest';

const ProfileScreen = () => {
  const { currentMember, isAuthenticated } = useAuthSlice();
  console.log({ isAuthenticated, currentMember });

  // More explicit authentication check
  return isAuthenticated && currentMember ? (
    <AuthenticatedUserProfile />
  ) : (
    <GuestProfile />
  );
};

export default ProfileScreen;
