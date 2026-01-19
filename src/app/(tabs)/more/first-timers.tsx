import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { dispatch } from '@/src/store';
import { useFirstTimerSlice } from '@/src/store/slices';
import { fetchActiveFirstTimers } from '@/src/store/thunks/firstTimers';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl } from 'react-native';

export default function FirstTimersPage() {
  const theme = useTheme();
  const { activeFirstTimers, isLoading } = useFirstTimerSlice();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchActiveFirstTimers());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchActiveFirstTimers());
    } catch (error) {
      console.error('Error refreshing first timers:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const formatVisitDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getProgrammeLabel = (programmeType?: ProgrammeType) => {
    if (!programmeType) return 'Service';
    switch (programmeType) {
      case 'sunday':
        return 'Sunday Service';
      case 'shilo':
        return 'Shilo Service';
      case 'vigil':
        return 'Vigil Service';
      default:
        return 'Service';
    }
  };

  const categorizedFirstTimers = useMemo(() => {
    const today = activeFirstTimers.filter((ft) => {
      const visitDate = new Date(ft.visitDate);
      const now = new Date();
      const diffInHours = Math.floor(
        (now.getTime() - visitDate.getTime()) / (1000 * 60 * 60),
      );
      return diffInHours < 24;
    });

    const yesterday = activeFirstTimers.filter((ft) => {
      const visitDate = new Date(ft.visitDate);
      const now = new Date();
      const diffInHours = Math.floor(
        (now.getTime() - visitDate.getTime()) / (1000 * 60 * 60),
      );
      return diffInHours >= 24 && diffInHours < 48;
    });

    return {
      today,
      yesterday,
      all: activeFirstTimers,
    };
  }, [activeFirstTimers]);

  const FirstTimerCard = ({ firstTimer }: { firstTimer: FirstTimer }) => {
    const visitDate = new Date(firstTimer.visitDate);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - visitDate.getTime()) / (1000 * 60 * 60),
    );
    const isRecent = diffInHours < 24;

    return (
      <Pressable
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: isRecent ? '#10B981' : theme.border,
          borderRadius: 16,
          padding: 12,
          marginBottom: 12,
          borderLeftWidth: 4,
          borderLeftColor: isRecent ? '#10B981' : theme.muted,
        }}
        android_ripple={{ color: 'rgba(16,185,129,0.1)' }}
      >
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: '#10B98120' }}
            >
              <IconSymbol name="person.fill" size={20} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text
                variant="h5"
                className="font-bold mb-1"
                style={{ color: theme.heading }}
              >
                {firstTimer.firstName} {firstTimer.lastName}
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                {getProgrammeLabel(firstTimer.programmeType)}
              </Text>
            </View>
          </View>
          <View
            className="px-2 py-1 rounded"
            style={{ backgroundColor: isRecent ? '#10B98115' : '#6B728015' }}
          >
            <Text
              variant="caption"
              className="font-medium"
              style={{ color: isRecent ? '#10B981' : theme.muted }}
            >
              {formatVisitDate(firstTimer.visitDate)}
            </Text>
          </View>
        </View>

        {/* Contact Info */}
        <View className="mb-2">
          <View className="flex-row items-center mb-1">
            <IconSymbol name="phone.fill" size={14} color={theme.muted} />
            <Text variant="body" className="ml-2" style={{ color: theme.text }}>
              {firstTimer.phoneNumber}
            </Text>
          </View>
          <View className="flex-row items-center">
            <IconSymbol name="location.fill" size={14} color={theme.muted} />
            <Text
              variant="caption"
              className="ml-2 flex-1"
              style={{ color: theme.muted }}
            >
              {firstTimer.address}
            </Text>
          </View>
        </View>

        {/* Visit Date */}
        <View className="flex-row items-center mb-2">
          <IconSymbol name="calendar" size={14} color={theme.muted} />
          <Text
            variant="caption"
            className="ml-2"
            style={{ color: theme.muted }}
          >
            Visited: {formatFullDate(firstTimer.visitDate)}
          </Text>
        </View>

        {/* Prayer Request */}
        {firstTimer.prayerRequest && (
          <View
            className="mt-2 p-3 rounded-lg"
            style={{ backgroundColor: theme.muted + '10' }}
          >
            <View className="flex-row items-start mb-1">
              <IconSymbol
                name="hands.sparkles.fill"
                size={14}
                color={theme.primary}
              />
              <Text
                variant="caption"
                className="ml-2 font-semibold"
                style={{ color: theme.heading }}
              >
                Prayer Request
              </Text>
            </View>
            <Text variant="body" style={{ color: theme.text }}>
              {firstTimer.prayerRequest}
            </Text>
          </View>
        )}

        {/* Follow-up Status */}
        {firstTimer.followedUp && (
          <View className="flex-row items-center mt-2">
            <IconSymbol
              name="checkmark.circle.fill"
              size={14}
              color="#10B981"
            />
            <Text
              variant="caption"
              className="ml-2"
              style={{ color: '#10B981' }}
            >
              Followed up
              {firstTimer.followUpDate &&
                ` on ${formatFullDate(firstTimer.followUpDate)}`}
            </Text>
          </View>
        )}

        {/* Notes */}
        {firstTimer.notes && (
          <View
            className="mt-2 p-2 rounded"
            style={{ backgroundColor: theme.background }}
          >
            <Text variant="caption" style={{ color: theme.muted }}>
              Note: {firstTimer.notes}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

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
          style={{ backgroundColor: '#10B98115' }}
        >
          <IconSymbol name={icon as any} size={16} color="#10B981" />
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
        style={{ backgroundColor: '#10B98115' }}
      >
        <IconSymbol name="person.badge.plus" size={32} color="#10B981" />
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
        colors={['#10B981', '#059669']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-white/20 p-2 rounded-full mr-3">
            <IconSymbol name="person.badge.plus.fill" size={24} color="white" />
          </View>
          <View className="flex-1">
            <Text variant="h2" className="text-white dark:text-white font-bold">
              First Timers
            </Text>
            <Text variant="body" className="text-white/90 dark:text-white/90">
              {activeFirstTimers.length} visitor
              {activeFirstTimers.length !== 1 ? 's' : ''} in the last 48 hours
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-4">
          <View className="bg-white/20 rounded-lg px-3 py-2 flex-1">
            <Text variant="h4" className="text-white dark:text-white font-bold">
              {categorizedFirstTimers.today.length}
            </Text>
            <Text
              variant="caption"
              className="text-white/80 dark:text-white/80"
            >
              Last 24h
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2 flex-1">
            <Text variant="h4" className="text-white dark:text-white font-bold">
              {categorizedFirstTimers.yesterday.length}
            </Text>
            <Text
              variant="caption"
              className="text-white/80 dark:text-white/80"
            >
              24-48h ago
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2 flex-1">
            <Text variant="h4" className="text-white dark:text-white font-bold">
              {categorizedFirstTimers.all.length}
            </Text>
            <Text
              variant="caption"
              className="text-white/80 dark:text-white/80"
            >
              Total
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* First Timers List */}
      <FlatList
        data={[
          { type: 'section', key: 'today' },
          ...categorizedFirstTimers.today.map((ft) => ({
            type: 'firstTimer',
            key: ft.id,
            data: ft,
          })),
          { type: 'section', key: 'yesterday' },
          ...categorizedFirstTimers.yesterday.map((ft) => ({
            type: 'firstTimer',
            key: ft.id,
            data: ft,
          })),
        ]}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          if (item.type === 'section') {
            if (item.key === 'today') {
              return (
                <View className="px-4 pt-4">
                  <SectionHeader
                    title="Last 24 Hours"
                    count={categorizedFirstTimers.today.length}
                    icon="clock.fill"
                  />
                  {categorizedFirstTimers.today.length === 0 && (
                    <EmptyState message="No visitors in the last 24 hours" />
                  )}
                </View>
              );
            }
            if (item.key === 'yesterday') {
              return (
                <View className="px-4 pt-2">
                  <SectionHeader
                    title="24-48 Hours Ago"
                    count={categorizedFirstTimers.yesterday.length}
                    icon="calendar"
                  />
                  {categorizedFirstTimers.yesterday.length === 0 && (
                    <EmptyState message="No visitors in this time period" />
                  )}
                </View>
              );
            }
          }
          if (item.type === 'firstTimer' && 'data' in item) {
            return (
              <View className="px-4">
                <FirstTimerCard firstTimer={item.data as FirstTimer} />
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
          !isLoading && (
            <View className="items-center py-12">
              <IconSymbol
                name="person.badge.plus"
                size={48}
                color={theme.muted}
              />
              <Text
                variant="h4"
                className="mt-4 font-semibold"
                style={{ color: theme.heading }}
              >
                No Active First Timers
              </Text>
              <Text
                variant="body"
                className="mt-2 text-center px-8"
                style={{ color: theme.muted }}
              >
                First timers will appear here for 48 hours after their visit
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}
