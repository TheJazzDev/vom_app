import { formatDate } from '@/src/utils';
import React from 'react';
import { View } from 'react-native';
import { IconSymbol } from '../Icons/IconSymbol';
import { Card, Text } from '../UI';

type ContactInfoProps = {
  member: Member;
};

export default function ContactInfo({ member }: ContactInfoProps) {
  return (
    <Card className='mt-2'>
      <View className='flex-row items-center gap-2 px-4 py-2 border-b border-border-primary dark:border-border-dark-primary'>
        <IconSymbol name='phone' size={16} color='green' />
        <View className='flex-1'>
          <Text variant='caption'>Phone</Text>
          <Text color='tertiary' variant='label'>
            {member.phone.join(', ')}
          </Text>
        </View>
      </View>

      <View className='flex-row items-center gap-2 px-4 py-2 border-b border-border-primary dark:border-border-dark-primary'>
        <IconSymbol name='mail' size={16} color='orange' />
        <View className='flex-1'>
          <Text variant='caption'>Email</Text>
          <Text color='tertiary' variant='label'>
            {member.email}
          </Text>
        </View>
      </View>

      <View className='flex-row items-center gap-2 px-4 py-2 border-b border-border-primary dark:border-border-dark-primary'>
        <IconSymbol name='location.circle' size={16} color='aqua' />
        <View className='flex-1'>
          <Text variant='caption'>Address</Text>
          <Text color='tertiary' variant='label'>
            {member.address}
          </Text>
        </View>
      </View>

      <View className='flex-row items-center gap-2 px-4 py-2 border-b border-border-primary dark:border-border-dark-primary'>
        <IconSymbol name='birthday.cake' size={16} color='blue' />
        <View className='flex-1'>
          <Text variant='caption'>Date of Birth</Text>
          <Text color='tertiary' variant='label'>
            {formatDate(member.dob)}
          </Text>
        </View>
      </View>

      <View className='flex-row items-center gap-2 px-4 py-2 '>
        <IconSymbol name='timer.square' size={16} color='purple' />
        <View className='flex-1'>
          <Text variant='caption'>Member Since</Text>
          <Text color='tertiary' variant='label'>
            {formatDate(member.joinDate)}
          </Text>
        </View>
      </View>
    </Card>
  );
}
