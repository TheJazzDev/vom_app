import { Spacer, View } from '@/src/components';
import React from 'react';
import MembershipDetails from './_components/MembershipDetails';
import PersonalInfo from './_components/PersonalInfo';
import ProfileHeader from './_components/ProfileHeader';

const ProfileScreen = () => {
  return (
    <View gradient scrollable>
      <Spacer height={12} />
      <ProfileHeader />
      <Spacer height={8} />
      <MembershipDetails />
      <Spacer height={8} />
      <PersonalInfo />
    </View>
  );
};

export default ProfileScreen;
