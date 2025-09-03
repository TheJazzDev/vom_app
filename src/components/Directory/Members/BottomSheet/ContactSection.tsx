import { IconSymbol, Text } from '../..';
import React from 'react';
import { View } from 'react-native';

interface ContactSectionProps {
  member: MemberProfile;
}

const ContactSection: React.FC<ContactSectionProps> = ({ member }) => {
  if (
    !member.email &&
    !member.primaryPhone &&
    !member.secondaryPhone &&
    !member.address
  ) {
    return null;
  }

  return (
    <View className="mb-6">
      <Text variant="h4" className="mb-4 font-bold">
        Contact Information
      </Text>

      {member.email && (
        <View className="flex-row items-center mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <IconSymbol name="envelope" size={20} color="#6b7280" />
          <View className="ml-3 flex-1">
            <Text
              variant="caption"
              className="text-gray-500 dark:text-gray-400"
            >
              Email
            </Text>
            <Text variant="body">{member.email}</Text>
          </View>
        </View>
      )}

      {member.primaryPhone && (
        <View className="flex-row items-center mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <IconSymbol name="phone" size={20} color="#6b7280" />
          <View className="ml-3 flex-1">
            <Text
              variant="caption"
              className="text-gray-500 dark:text-gray-400"
            >
              Primary Phone
            </Text>
            <Text variant="body">{member.primaryPhone}</Text>
          </View>
        </View>
      )}

      {member.secondaryPhone && (
        <View className="flex-row items-center mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <IconSymbol name="phone" size={20} color="#6b7280" />
          <View className="ml-3 flex-1">
            <Text
              variant="caption"
              className="text-gray-500 dark:text-gray-400"
            >
              Secondary Phone
            </Text>
            <Text variant="body">{member.secondaryPhone}</Text>
          </View>
        </View>
      )}

      {member.address && (
        <View className="flex-row items-start mb-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <IconSymbol name="location" size={20} color="#6b7280" />
          <View className="ml-3 flex-1">
            <Text
              variant="caption"
              className="text-gray-500 dark:text-gray-400"
            >
              Address
            </Text>
            <Text variant="body">{member.address}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ContactSection;
