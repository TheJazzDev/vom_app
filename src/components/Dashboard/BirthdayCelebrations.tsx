import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useDirectorySlice } from '@/src/store/slices/directorySlice';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const BirthdayCelebrations = () => {
  const theme = useTheme();
  const { allMembers } = useDirectorySlice();

  const birthdayMembers = useMemo(() => {
    const today = new Date();
    const todayMonth = today.toLocaleDateString('en-US', { month: 'long' });
    const todayDay = today.getDate();

    return allMembers.filter((member) => {
      if (!member.dob) return false;

      // Parse format like "January 12", "May 9", "November 27"
      const dobParts = member.dob.trim().split(' ');
      if (dobParts.length !== 2) return false;

      const birthMonth = dobParts[0];
      const birthDay = parseInt(dobParts[1], 10);

      return birthMonth === todayMonth && birthDay === todayDay;
    });
  }, [allMembers]);

  const hasCelebrants = birthdayMembers.length > 0;

  return (
    <Card variant="outlined" className="mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#8B5CF615' }}
          >
            <IconSymbol name="birthday.cake" size={18} color="#8B5CF6" />
          </View>
          <Text variant="h4" color="heading" className="font-bold">
            Birthday Celebrations
          </Text>
        </View>
        <Link href={ROUTES.BIRTHDAYS}>
          <Text variant="body" style={{ color: theme.primary }}>
            View all
          </Text>
        </Link>
      </View>

      {hasCelebrants ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
        >
          {birthdayMembers.map((member, index) => (
            <Pressable
              key={member.id}
              style={{
                marginRight: index < birthdayMembers.length - 1 ? 12 : 0,
                width: 140,
              }}
            >
              <LinearGradient
                colors={['#8B5CF6', '#6D28D9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 12,
                  padding: 12,
                  alignItems: 'center',
                }}
              >
                <View
                  className="w-16 h-16 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  {member.avatar ? (
                    <View
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Avatar image would go here */}
                      <Text className="text-2xl text-white font-bold">
                        {member.firstName.charAt(0)}
                        {member.lastName.charAt(0)}
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-2xl text-white font-bold">
                      {member.firstName.charAt(0)}
                      {member.lastName.charAt(0)}
                    </Text>
                  )}
                </View>

                <Text
                  variant="body"
                  className="text-white font-semibold text-center mb-1"
                  numberOfLines={2}
                >
                  {member.firstName} {member.lastName}
                </Text>

                <View className="flex-row items-center">
                  <IconSymbol name="birthday.cake" size={12} color="white" />
                  <Text variant="caption" className="text-white/90 ml-1">
                    Today
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
          }}
        >
          <View
            className="w-12 h-12 rounded-full items-center justify-center mb-3"
            style={{ backgroundColor: '#8B5CF615' }}
          >
            <IconSymbol name="birthday.cake" size={24} color="#8B5CF6" />
          </View>
          <Text
            variant="body"
            className="text-center font-medium mb-1"
            style={{ color: theme.heading }}
          >
            No Birthdays Today
          </Text>
          <Text
            variant="caption"
            className="text-center"
            style={{ color: theme.muted }}
          >
            Check back tomorrow to celebrate with others
          </Text>
        </View>
      )}
    </Card>
  );
};

export default BirthdayCelebrations;
