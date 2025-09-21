import React from 'react';
import { View } from 'react-native';
import { IconSymbol } from '../../../Icons/IconSymbol';
import { Text } from '../../../UI';

type ContactInfoProps = {
  member: UserProfile;
};

export default function ContactInfo({ member }: ContactInfoProps) {
  return (
    <View className="mt-2 p-y border border-border dark:border-border-dark rounded-xl">
      <View className="flex-row items-center gap-2 px-4 py-2 border-b border-border dark:border-border-dark">
        <IconSymbol name="phone" size={16} color="green" />
        <View className="flex-1">
          <Text variant="caption">Phone</Text>
          <Text color="body" variant="label">
            {member.primaryPhone || '-'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2 px-4 py-2 border-b border-border dark:border-border-dark">
        <IconSymbol name="mail" size={16} color="green" />
        <View className="flex-1">
          <Text variant="caption">Email</Text>
          <Text color="body" variant="label">
            {member.email || '-'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2 px-4 py-2 border-b border-border dark:border-border-dark">
        <IconSymbol name="location.circle" size={16} color="green" />
        <View className="flex-1">
          <Text variant="caption">Address</Text>
          <Text color="body" variant="label">
            {member.address || '-'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2 px-4 py-2 border-b border-border dark:border-border-dark">
        <IconSymbol name="birthday.cake" size={16} color="green" />
        <View className="flex-1">
          <Text variant="caption">Date of Birth</Text>
          <Text color="body" variant="label">
            {member.dob || '-'}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2 px-4 py-2 ">
        <IconSymbol name="timer.square" size={16} color="green" />
        <View className="flex-1">
          <Text variant="caption">Join Date</Text>
          <Text color="body" variant="label">
            {member.joinDate || '-'}
          </Text>
        </View>
      </View>
    </View>
  );
}
