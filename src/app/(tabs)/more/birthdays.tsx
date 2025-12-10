import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { dispatch } from '@/src/store';
import { useDirectorySlice } from '@/src/store/slices/directorySlice';
import { fetchAllMembersThunk } from '@/src/store/thunks/directory';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl } from 'react-native';

interface BirthdayMember extends UserProfile {
  dayOfMonth: number;
  isPast: boolean;
  isToday: boolean;
}

export default function BirthdaysPage() {
  const theme = useTheme();
  const { allMembers } = useDirectorySlice();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchAllMembersThunk());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchAllMembersThunk());
    } catch (error) {
      console.error('Error refreshing birthdays:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const monthlyBirthdays = useMemo(() => {
    const today = new Date();
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long' });
    const currentDay = today.getDate();

    const birthdays: BirthdayMember[] = allMembers
      .filter((member) => {
        if (!member.dob) return false;

        // Parse format like "January 12", "May 9", "November 27"
        const dobParts = member.dob.trim().split(' ');
        if (dobParts.length !== 2) return false;

        const birthMonth = dobParts[0];
        return birthMonth === currentMonth;
      })
      .map((member) => {
        const dobParts = member.dob.trim().split(' ');
        const dayOfMonth = parseInt(dobParts[1], 10);
        const isToday = dayOfMonth === currentDay;
        const isPast = dayOfMonth < currentDay;

        return {
          ...member,
          dayOfMonth,
          isPast,
          isToday,
        };
      })
      .sort((a, b) => a.dayOfMonth - b.dayOfMonth);

    const pastBirthdays = birthdays.filter((b) => b.isPast && !b.isToday);
    const todayBirthdays = birthdays.filter((b) => b.isToday);
    const upcomingBirthdays = birthdays.filter((b) => !b.isPast && !b.isToday);

    return {
      pastBirthdays,
      todayBirthdays,
      upcomingBirthdays,
      allBirthdays: birthdays,
    };
  }, [allMembers]);

  const currentMonthName = new Date().toLocaleDateString('en-US', {
    month: 'long',
  });

  const formatBirthdayDate = (dayOfMonth: number) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const date = new Date(currentYear, currentMonth, dayOfMonth);

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const BirthdayCard = ({ member }: { member: BirthdayMember }) => (
    <Pressable
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: member.isToday ? '#8B5CF6' : theme.border,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: member.isToday
          ? '#8B5CF6'
          : member.isPast
            ? theme.muted
            : '#10B981',
      }}
      android_ripple={{ color: 'rgba(139,92,246,0.1)' }}
    >
      <View className="flex-row items-center">
        {/* Date Circle */}
        <View
          className="w-16 h-16 rounded-full items-center justify-center mr-4"
          style={{
            backgroundColor: member.isToday
              ? '#8B5CF615'
              : `${theme.primary}15`,
          }}
        >
          <Text
            variant="h3"
            className="font-bold"
            style={{
              color: member.isToday ? '#8B5CF6' : theme.primary,
            }}
          >
            {member.dayOfMonth}
          </Text>
        </View>

        {/* Member Info */}
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text
              variant="h4"
              className="font-bold flex-1"
              style={{ color: theme.heading }}
            >
              {member.firstName} {member.lastName}
            </Text>
            {member.isToday && (
              <View
                className="px-2 py-1 rounded-full"
                style={{ backgroundColor: '#8B5CF615' }}
              >
                <Text
                  variant="caption"
                  className="font-bold"
                  style={{ color: '#8B5CF6' }}
                >
                  TODAY
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center mb-1">
            <IconSymbol name="birthday.cake" size={14} color={theme.muted} />
            <Text
              variant="body"
              className="ml-2"
              style={{ color: theme.muted }}
            >
              {formatBirthdayDate(member.dayOfMonth)}
            </Text>
          </View>

          {member.position && member.position.length > 0 && (
            <Text variant="caption" style={{ color: theme.muted }}>
              {member.position[0]}
            </Text>
          )}
        </View>

        {/* Birthday Icon */}
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: '#8B5CF615' }}
        >
          <IconSymbol name="birthday.cake" size={20} color="#8B5CF6" />
        </View>
      </View>
    </Pressable>
  );

  const SectionHeader = ({
    title,
    count,
    icon,
  }: {
    title: string;
    count: number;
    icon: string;
  }) => (
    <View className="flex-row items-center justify-between mb-4 mt-2">
      <View className="flex-row items-center">
        <View
          className="w-8 h-8 rounded-full items-center justify-center mr-2"
          style={{ backgroundColor: '#8B5CF615' }}
        >
          <IconSymbol name={icon as any} size={16} color="#8B5CF6" />
        </View>
        <Text
          variant="h4"
          className="font-bold"
          style={{ color: theme.heading }}
        >
          {title}
        </Text>
      </View>
      <View
        className="px-3 py-1 rounded-full"
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Text
          variant="caption"
          className="font-semibold"
          style={{ color: theme.muted }}
        >
          {count}
        </Text>
      </View>
    </View>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <View className="items-center py-8">
      <View
        className="w-16 h-16 rounded-full items-center justify-center mb-3"
        style={{ backgroundColor: '#8B5CF615' }}
      >
        <IconSymbol name="birthday.cake" size={32} color="#8B5CF6" />
      </View>
      <Text
        variant="body"
        className="text-center"
        style={{ color: theme.muted }}
      >
        {message}
      </Text>
    </View>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-white/20 p-2 rounded-full mr-3">
            <IconSymbol name="birthday.cake" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text variant="h2" className="text-white font-bold">
              {currentMonthName} Birthdays
            </Text>
            <Text variant="body" className="text-white/90">
              {monthlyBirthdays.allBirthdays.length} celebration
              {monthlyBirthdays.allBirthdays.length !== 1 ? 's' : ''} this month
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-4">
          <View className="bg-white/20 rounded-lg px-3 py-2 flex-1">
            <Text variant="h4" className="text-white font-bold">
              {monthlyBirthdays.todayBirthdays.length}
            </Text>
            <Text variant="caption" className="text-white/80">
              Today
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2 flex-1">
            <Text variant="h4" className="text-white font-bold">
              {monthlyBirthdays.upcomingBirthdays.length}
            </Text>
            <Text variant="caption" className="text-white/80">
              Upcoming
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2 flex-1">
            <Text variant="h4" className="text-white font-bold">
              {monthlyBirthdays.pastBirthdays.length}
            </Text>
            <Text variant="caption" className="text-white/80">
              Past
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Birthday List */}
      <FlatList
        data={[
          { type: 'section', key: 'today' },
          ...monthlyBirthdays.todayBirthdays.map((b) => ({
            type: 'birthday',
            key: b.id,
            data: b,
          })),
          { type: 'section', key: 'upcoming' },
          ...monthlyBirthdays.upcomingBirthdays.map((b) => ({
            type: 'birthday',
            key: b.id,
            data: b,
          })),
          { type: 'section', key: 'past' },
          ...monthlyBirthdays.pastBirthdays.map((b) => ({
            type: 'birthday',
            key: b.id,
            data: b,
          })),
        ]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          if (item.type === 'section') {
            if (item.key === 'today') {
              return (
                <View className="px-4 pt-4">
                  <SectionHeader
                    title="Celebrating Today"
                    count={monthlyBirthdays.todayBirthdays.length}
                    icon="gift.fill"
                  />
                  {monthlyBirthdays.todayBirthdays.length === 0 && (
                    <EmptyState message="No birthdays today" />
                  )}
                </View>
              );
            }
            if (item.key === 'upcoming') {
              return (
                <View className="px-4 pt-2">
                  <SectionHeader
                    title="Upcoming This Month"
                    count={monthlyBirthdays.upcomingBirthdays.length}
                    icon="calendar.badge.plus"
                  />
                  {monthlyBirthdays.upcomingBirthdays.length === 0 && (
                    <EmptyState message="No upcoming birthdays this month" />
                  )}
                </View>
              );
            }
            if (item.key === 'past') {
              return (
                <View className="px-4 pt-2">
                  <SectionHeader
                    title="Earlier This Month"
                    count={monthlyBirthdays.pastBirthdays.length}
                    icon="clock.fill"
                  />
                  {monthlyBirthdays.pastBirthdays.length === 0 && (
                    <EmptyState message="No birthdays earlier this month" />
                  )}
                </View>
              );
            }
          }
          if (item.type === 'birthday' && 'data' in item) {
            return (
              <View className="px-4">
                <BirthdayCard member={item.data as BirthdayMember} />
              </View>
            );
          }
          return null;
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
            colors={['#FFFFFF']}
          />
        }
        ListEmptyComponent={
          <View className="items-center py-12">
            <IconSymbol name="birthday.cake" size={48} color={theme.muted} />
            <Text
              variant="h4"
              className="mt-4 font-semibold"
              style={{ color: theme.heading }}
            >
              No Birthdays This Month
            </Text>
            <Text
              variant="body"
              className="mt-2 text-center px-8"
              style={{ color: theme.muted }}
            >
              Check back next month for upcoming celebrations
            </Text>
          </View>
        }
      />
    </View>
  );
}
