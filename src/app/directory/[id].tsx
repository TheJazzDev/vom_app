import {
  Badge,
  BandBadge,
  Button,
  ContactInfo,
  IconSymbol,
  Spacer,
  Text,
  View,
} from '@/src/components';
import { mockMembers } from '@/src/constants/members';
import { useTheme } from '@/src/hooks';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

export default function MembersDetails() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  const selectedMember = mockMembers.find((member) => member.memberId === id);

  if (!selectedMember) {
    return;
  }

  return (
    <View scrollable gradient>
      <Spacer height={20} />
      <Image
        source={{ uri: selectedMember.avatar }}
        className="w-32 h-32 rounded-md mx-auto"
      />
      <Text variant="h3" className="text-center my-4">
        {selectedMember.title} {selectedMember.firstName}{' '}
        {selectedMember.lastName}
      </Text>

      {/* Roles */}
      <View className="mb-4">
        <View className="flex-row items-center gap-4">
          <IconSymbol name="shield.checkered" size={20} color="#6B7280" />
          <Text variant="h5">Roles</Text>
        </View>
        <View className="flex-row gap-2 mt-2 flex-wrap">
          {selectedMember.position.map((role: string) => (
            <Badge key={role} size="sm" variant="outline">
              {role}
            </Badge>
          ))}
        </View>
      </View>

      {/* Bands */}
      <View className="mb-4">
        <View className="flex-row items-center gap-4">
          <IconSymbol name="person.3.sequence.fill" size={20} color="#6B7280" />
          <Text variant="h5">Bands</Text>
        </View>
        <View className="flex-row gap-2 mt-2 flex-wrap">
          {selectedMember.band.map((band: string) => (
            <BandBadge key={band} band={band} />
          ))}
          {selectedMember.band.length === 0 && <Text>-</Text>}
        </View>
      </View>

      {/* Contact Info */}
      <View className="mb-4">
        <View className="flex-row items-center gap-4">
          <IconSymbol name="info.bubble.fill" size={20} color="#6B7280" />
          <Text variant="h5">Contact Information</Text>
        </View>
        <ContactInfo member={selectedMember} />
      </View>

      {/* Buttons */}
      <View className="flex flex-row gap-2">
        <Button
          textVariant="h6"
          className="w-[49%]"
          icon={
            <IconSymbol name="phone.fill" size={16} color={theme.natural} />
          }
        >
          Hello
        </Button>
        <Button
          textVariant="h6"
          // style={{}}
          className="w-[49%]"
          variant="outline"
          icon={
            <IconSymbol
              name="message.badge.fill"
              size={16}
              color={theme.primary}
            />
          }
        >
          Hello
        </Button>
      </View>
    </View>
  );
}
