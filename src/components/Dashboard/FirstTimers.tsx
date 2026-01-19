import { ROUTES } from '@/src/constants/routes';
import { useTheme } from '@/src/hooks';
import { useFirstTimerSlice } from '@/src/store/slices';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const FirstTimers = () => {
  const theme = useTheme();
  const router = useRouter();

  const { activeFirstTimers, isLoading } = useFirstTimerSlice();

  // Show only the first 3 active first timers - filter out null values
  const displayFirstTimers =
    activeFirstTimers && activeFirstTimers.length > 0
      ? activeFirstTimers.filter((ft) => ft != null).slice(0, 3)
      : [];

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
      return date.toLocaleDateString();
    }
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

  // Don't show the card if there are no active first timers
  // Hide during initial loading to avoid flash of loading state
  if (!activeFirstTimers || activeFirstTimers.length === 0) {
    return null;
  }

  return (
    <Card variant="outlined" className="mb-4">
      <Pressable
        onPress={() => router.push(ROUTES.FIRST_TIMERS)}
        android_ripple={{ color: 'rgba(16,185,129,0.1)' }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: '#10B98115' }}
            >
              <IconSymbol
                name="person.badge.plus.fill"
                size={18}
                color="#10B981"
              />
            </View>
            <View className="flex-1">
              <Text variant="h4" color="heading" className="font-bold">
                First Timers
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                Displayed for 48 hours
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            {displayFirstTimers.length > 0 && (
              <View
                className="px-2 py-1 rounded-full mr-2"
                style={{ backgroundColor: '#10B98120' }}
              >
                <Text
                  variant="caption"
                  className="font-semibold"
                  style={{ color: '#10B981' }}
                >
                  {activeFirstTimers.length}
                </Text>
              </View>
            )}
            <IconSymbol name="chevron.right" size={16} color={theme.muted} />
          </View>
        </View>
      </Pressable>

      {displayFirstTimers.map((firstTimer, index) => (
        <View
          key={firstTimer.id}
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            padding: 16,
            marginBottom: index < displayFirstTimers.length - 1 ? 12 : 0,
            borderLeftWidth: 4,
            borderLeftColor: '#10B981',
          }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center flex-1">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: '#10B98120' }}
              >
                <IconSymbol name="person.fill" size={18} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text color="heading" className="font-semibold text-base">
                  {firstTimer.firstName} {firstTimer.lastName}
                </Text>
                <Text variant="caption" style={{ color: theme.muted }}>
                  {getProgrammeLabel(firstTimer.programmeType)}
                </Text>
              </View>
            </View>
            <View
              className="px-2 py-1 rounded"
              style={{ backgroundColor: '#10B98110' }}
            >
              <Text
                variant="caption"
                className="font-medium"
                style={{ color: '#10B981' }}
              >
                {formatVisitDate(firstTimer.visitDate)}
              </Text>
            </View>
          </View>

          {firstTimer.prayerRequest && (
            <View
              className="mt-2 p-2 rounded"
              style={{ backgroundColor: theme.muted + '10' }}
            >
              <Text variant="caption" style={{ color: theme.muted }}>
                Prayer: {firstTimer.prayerRequest}
              </Text>
            </View>
          )}
        </View>
      ))}

      {!isLoading &&
        displayFirstTimers.length > 0 &&
        activeFirstTimers.length > 3 && (
          <Pressable
            onPress={() => router.push(ROUTES.FIRST_TIMERS)}
            className="mt-3 py-2 rounded-lg"
            style={{ backgroundColor: '#10B98110' }}
            android_ripple={{ color: 'rgba(16,185,129,0.1)' }}
          >
            <View className="flex-row items-center justify-center">
              <Text
                variant="body"
                className="font-medium"
                style={{ color: '#10B981' }}
              >
                View all {activeFirstTimers.length} first timers
              </Text>
              <IconSymbol name="chevron.right" size={14} color="#10B981" />
            </View>
          </Pressable>
        )}
    </Card>
  );
};

export default FirstTimers;
