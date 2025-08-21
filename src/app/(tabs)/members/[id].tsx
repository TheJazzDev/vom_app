import { Badge, BandBadge, ContactInfo, Text, View,  Button, IconSymbol } from '@/src/components';
import { mockMembers } from '@/src/constants/members';
import { useTheme } from '@/src/hooks';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView } from 'react-native';

export default function MembersDetails() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();

  const selectedMember = mockMembers.find((member) => member.id === id);

  if (!selectedMember) {
    return;
  }

  return (
    <ScrollView>
      <View className='py-4 px-2'>
        <Image
          source={{ uri: selectedMember.image }}
          className='w-32 h-32 rounded-md mx-auto'
        />
        <Text variant='h3' className='text-center my-4'>
          {selectedMember.title} {selectedMember.firstName}{' '}
          {selectedMember.lastName}
        </Text>

        {/* Roles */}
        <View className='mb-4'>
          <View className='flex-row items-center gap-4'>
            <IconSymbol name='shield.checkered' size={20} color='#6B7280' />
            <Text variant='h5'>Roles</Text>
          </View>
          <View className='flex-row gap-2 mt-2 flex-wrap'>
            {selectedMember.roles.map((role: string) => (
              <Badge key={role} size='sm' variant='secondary'>
                {role}
              </Badge>
            ))}
          </View>
        </View>

        {/* Bands */}
        <View className='mb-4'>
          <View className='flex-row items-center gap-4'>
            <IconSymbol
              name='person.3.sequence.fill'
              size={20}
              color='#6B7280'
            />
            <Text variant='h5'>Bands</Text>
          </View>
          <View className='flex-row gap-2 mt-2 flex-wrap'>
            {selectedMember.band.map((band: string) => (
              <BandBadge key={band} band={band} />
            ))}
          </View>
        </View>

        {/* Contact Info */}
        <View className='mb-4'>
          <View className='flex-row items-center gap-4'>
            <IconSymbol name='info.bubble.fill' size={20} color='#6B7280' />
            <Text variant='h5'>Contact Information</Text>
          </View>
          <ContactInfo member={selectedMember} />
        </View>

        {/* Buttons */}
        <View className='flex flex-row gap-2'>
          <Button
            textVariant='h4'
            className='w-[50%]'
            icon={
              <IconSymbol
                name='phone.fill'
                size={16}
                color={theme.background}
              />
            }>
            Hello
          </Button>
          <Button
            textVariant='h4'
            className='w-[50%]'
            variant='secondary'
            icon={
              <IconSymbol
                name='message.badge.fill'
                size={16}
                color={theme.text}
              />
            }>
            Hello
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
