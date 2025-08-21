import { Text, View, Button, IconSymbol } from '@/src/components';
import React from 'react';

const guestFeatures = [
  'View all church services and events',
  'Browse member directory',
  'Access church activities and ministries',
];

const accountFeatures = [
  'Personal profile and preferences',
  "Service notifications when you're scheduled",
  'Prayer request submissions',
  'Community interaction features',
];

const profile = () => {
  return (
    <View className='py-6' safe={true}>
      <View className='mx-auto bg-background-tertiary dark:bg-background-dark-tertiary p-6 rounded-full'>
        <IconSymbol name='person' size={40} color='gray' />
      </View>
      <Text variant='h2' className='text-center my-2'>
        Welcome, Guest
      </Text>
      <Text variant='paragraph' className='text-center max-w-[85vw] mx-auto'>
        Sign in to access your profile, get notification, and connect with the
        community
      </Text>

      <View className='flex-col gap-3 my-6'>
        <Button variant='primary' textVariant='h5'>
          Sign In
        </Button>
        <Button variant='outline' textVariant='h5'>
          Create Account
        </Button>
      </View>

      <View className='p-4 bg-background-tertiary dark:bg-background-dark-tertiary rounded-xl gap-0.5'>
        <Text variant='h5'>As a guest, you can:</Text>
        {guestFeatures.map((feature, index) => (
          <Text key={index} color='secondary'>
            <>&bull; </>
            {feature}
          </Text>
        ))}
        <Text variant='h5' className='mt-2'>
          With an account, you can:
        </Text>
        {accountFeatures.map((feature, index) => (
          <Text key={index} color='secondary'>
            <>&bull; </>
            {feature}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default profile;
