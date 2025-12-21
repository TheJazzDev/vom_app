import { useTheme } from '@/src/hooks';
import { formatDate } from '@/src/utils';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { IconSymbol } from '../../Icons';
import { Button, Card, Countdown, Text, View } from '../../UI';

const getTypeColorClasses = (programmeType: string) => {
  switch (programmeType.toLowerCase()) {
    case 'sunday':
      return {
        dot: 'bg-emerald-500 dark:bg-emerald-400',
        text: 'text-emerald-600 dark:text-emerald-400',
      };
    case 'shiloh':
      return {
        dot: 'bg-blue-500 dark:bg-blue-400',
        text: 'text-blue-600 dark:text-blue-400',
      };
    case 'vigil':
      return {
        dot: 'bg-purple-500 dark:bg-purple-400',
        text: 'text-purple-600 dark:text-purple-400',
      };
    default:
      return {
        dot: 'bg-gray-500 dark:bg-gray-400',
        text: 'text-gray-600 dark:text-gray-400',
      };
  }
};

const ProgrammeListCard = memo(({ programme }: { programme: AllProgrammes }) => {
  const theme = useTheme();
  const router = useRouter();

  const id = programme?.id;
  const topic = programme?.topic;
  const date = programme?.date;
  const type = programme?.type ?? '';

  const typeColors = useMemo(() => getTypeColorClasses(type), [type]);

  const handlePress = useCallback(() => {
    if (id) {
      router.push(`/programme/${id}`);
    }
  }, [router, id]);

  const handleAddToCalendar = useCallback(() => {
    Alert.alert('Add programme to calender feature is not available yet!');
  }, []);

  if (!programme) return null;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Card variant="outlined" className="mb-3">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className={`w-3 h-3 rounded-full mr-2 ${typeColors.dot}`} />
              <Text
                variant="h4"
                className="capitalize text-gray-900 dark:text-gray-100"
              >
                {type} Service
              </Text>
            </View>

            <View className="flex-row items-center gap-1 mb-2">
              <IconSymbol size={14} name="calendar" color={theme.brand} />
              <Text
                variant="caption"
                className="text-gray-600 dark:text-gray-400"
              >
                {formatDate(date)}
              </Text>
            </View>

            {topic && (
              <Text
                variant="subtitle1"
                className="text-gray-800 dark:text-gray-200"
              >
                Topic: {topic}
              </Text>
            )}
          </View>
          <Countdown targetDate={date} />
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-gray-300 dark:border-gray-600"
            onPress={handlePress}
          >
            <View className="flex-row items-center gap-1">
              <Text
                variant="caption"
                className="text-blue-600 dark:text-blue-400"
              >
                View Details
              </Text>
            </View>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="bg-gray-50 dark:bg-gray-800 py-2"
            onPress={handleAddToCalendar}
          >
            <IconSymbol
              size={16}
              name="calendar.badge.plus"
              color={theme.brand}
            />
          </Button>
        </View>
      </Card>
    </TouchableOpacity>
  );
});

ProgrammeListCard.displayName = 'ProgrammeListCard';

export default ProgrammeListCard;
