import { useTheme } from '@/src/hooks';
import { getUserInitials } from '@/src/utils';
import React from 'react';
import { Alert, Image, Linking } from 'react-native';
import { IconSymbol } from '../../Icons';
import Spacer from '../../Spacer';
import { Badge, Button, Text, View } from '../../UI';
import { BandBadge } from '../Bands';
import ContactInfo from './Card/ContactInfo';

const MemberProfileDetail = ({ member }: { member: UserProfile }) => {
  const theme = useTheme();

  if (!member) {
    return null;
  }

  const hasAvatar = member.avatar && member.avatar.trim() !== '';

  const handleCall = async () => {
    if (!member.primaryPhone || member.primaryPhone.trim() === '') {
      Alert.alert(
        'No Phone Number',
        'This member does not have a phone number.',
      );
      return;
    }

    const phoneNumber = `tel:${member.primaryPhone}`;
    const supported = await Linking.canOpenURL(phoneNumber);

    if (supported) {
      await Linking.openURL(phoneNumber);
    } else {
      Alert.alert('Error', 'Your device does not support this action.');
    }
  };

  return (
    <View gradient scrollable>
      <Spacer height={20} />
      <View className="mx-auto">
        {hasAvatar ? (
          <Image
            source={{ uri: member.avatar }}
            className="w-32 h-32 rounded-full mr-4"
          />
        ) : (
          <View className="w-32 h-32 rounded-full mr-4 bg-gray-400 dark:bg-gray-700 flex items-center justify-center">
            <Text variant="h1" color="neutral" className="font-semibold">
              {getUserInitials(member.firstName, member.lastName)}
            </Text>
          </View>
        )}
      </View>
      <Text variant="h3" className="text-center my-4">
        {member.title} {member.firstName} {member.lastName}
      </Text>

      {/* Roles */}
      <View className="mb-6">
        <View className="flex-row items-center gap-4">
          <IconSymbol name="shield.checkered" size={20} color="#6B7280" />
          <Text variant="h5">Roles</Text>
        </View>
        {member.position?.length > 0 ? (
          <View className="flex-row gap-2 mt-2 flex-wrap">
            {member.position.map((role: string) => (
              <Badge key={role} size="sm" variant="outline">
                {role}
              </Badge>
            ))}
          </View>
        ) : (
          <Text>-</Text>
        )}
      </View>

      {/* Bands */}
      <View className="mb-6">
        <View className="flex-row items-center gap-4">
          <IconSymbol name="person.3.sequence.fill" size={20} color="#6B7280" />
          <Text variant="h5">Bands</Text>
        </View>
        <View className="flex-row gap-2 mt-2 flex-wrap">
          {member?.bandKeys?.length > 0 ? (
            member?.bandKeys.map((band: BandKeys) => (
              <BandBadge key={band} band={band} />
            ))
          ) : (
            <Text>-</Text>
          )}
        </View>
      </View>

      {/* Contact Info */}
      <View className="mb-6">
        <View className="flex-row items-center gap-4">
          <IconSymbol name="info.bubble.fill" size={20} color="#6B7280" />
          <Text variant="h5">Contact Information</Text>
        </View>
        <ContactInfo member={member} />
      </View>

      {/* Buttons */}
      <View className="flex flex-row gap-2">
        <Button
          onPress={handleCall}
          textVariant="h6"
          className="w-[49%]"
          icon={
            <IconSymbol name="phone.fill" size={16} color={theme.natural} />
          }
        >
          Call
        </Button>
        <Button
          textVariant="h6"
          className="w-[49%]"
          variant="outline"
          color="brand"
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
};

export default MemberProfileDetail;
