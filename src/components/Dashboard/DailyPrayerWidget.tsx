import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useDailyPrayerSlice } from '@/src/store/slices/dailyPrayerSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const DailyPrayerWidget = () => {
  const theme = useTheme();
  const router = useRouter();
  const { prayers, isLoadingPrayers } = useDailyPrayerSlice();

  // Get today's prayer
  const todaysPrayer = useMemo(() => {
    if (!prayers || prayers.length === 0) return null;
    const today = new Date().toISOString().split('T')[0];
    return prayers
      .filter((p) => p != null)
      .find((prayer) => {
        const prayerDate = new Date(prayer.date).toISOString().split('T')[0];
        return prayerDate === today && prayer.isActive;
      });
  }, [prayers]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card variant="ghost" className="mb-4 relative overflow-hidden">
      <LinearGradient
        colors={['#F59E0B15', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <View className="relative z-10">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: '#F59E0B20' }}
            >
              <IconSymbol name="sun.max.fill" size={22} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text variant="h4" color="heading" className="font-bold">
                Today&apos;s Prayer
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                {todaysPrayer
                  ? formatDate(todaysPrayer.date)
                  : 'Daily spiritual guidance'}
              </Text>
            </View>
          </View>
          <Link href={ROUTES.DAILY_PRAYERS}>
            <View className="flex-row items-center">
              <Text
                variant="body"
                className="font-medium mr-1"
                style={{ color: '#F59E0B' }}
              >
                View All
              </Text>
              <IconSymbol name="arrow.right" size={14} color="#F59E0B" />
            </View>
          </Link>
        </View>

        {isLoadingPrayers && !todaysPrayer ? (
          <View className="items-center justify-center py-4">
            <ActivityIndicator size="small" color={theme.primary} />
            <Text
              variant="caption"
              className="mt-1.5"
              style={{ color: theme.muted }}
            >
              Loading today&apos;s prayer...
            </Text>
          </View>
        ) : !todaysPrayer ? (
          <View className="items-center justify-center py-5">
            <IconSymbol name="sun.max" size={28} color={theme.muted} />
            <Text
              variant="body"
              className="mt-1.5 text-sm"
              style={{ color: theme.muted }}
            >
              No prayer for today
            </Text>
            <Text
              variant="caption"
              className="mt-0.5 text-center"
              style={{ color: theme.muted }}
            >
              Check back later for daily prayers
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={() =>
              router.push(`/(tabs)/ministry/daily-prayers/${todaysPrayer.id}` as any)
            }
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: '#F59E0B30',
              borderLeftWidth: 4,
              borderLeftColor: '#F59E0B',
              borderRadius: 12,
              padding: 16,
            }}
            android_ripple={{ color: 'rgba(245,158,11,0.1)' }}
          >
            <View className="flex-row items-start mb-3">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: '#F59E0B15' }}
              >
                <IconSymbol name="book.closed.fill" size={18} color="#F59E0B" />
              </View>
              <View className="flex-1">
                <Text
                  color="heading"
                  className="font-bold mb-1 text-base"
                  numberOfLines={2}
                >
                  {todaysPrayer.title}
                </Text>
                {todaysPrayer.verse && (
                  <Text
                    variant="caption"
                    className="font-medium"
                    style={{ color: '#F59E0B' }}
                  >
                    {todaysPrayer.verse}
                  </Text>
                )}
              </View>
            </View>

            {todaysPrayer.prayerPoints &&
              todaysPrayer.prayerPoints.length > 0 && (
                <View
                  className="rounded-lg p-3 mb-3"
                  style={{ backgroundColor: '#F59E0B08' }}
                >
                  <Text
                    variant="caption"
                    className="font-semibold mb-2"
                    style={{ color: theme.heading }}
                  >
                    Prayer Points:
                  </Text>
                  {todaysPrayer.prayerPoints
                    .filter((p: any) => p != null && p !== '')
                    .slice(0, 2)
                    .map((point: string, index: number) => (
                      <View key={index} className="flex-row items-start mb-1">
                        <Text
                          variant="caption"
                          style={{ color: '#F59E0B', marginRight: 6 }}
                        >
                          •
                        </Text>
                        <Text
                          variant="caption"
                          className="flex-1"
                          style={{ color: theme.body }}
                          numberOfLines={1}
                        >
                          {point}
                        </Text>
                      </View>
                    ))}
                  {todaysPrayer.prayerPoints.length > 2 && (
                    <Text
                      variant="caption"
                      className="mt-1"
                      style={{ color: theme.muted }}
                    >
                      +{todaysPrayer.prayerPoints.length - 2} more
                    </Text>
                  )}
                </View>
              )}

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <IconSymbol
                  name="person.2.fill"
                  size={14}
                  color={theme.muted}
                />
                <Text
                  variant="caption"
                  className="ml-1"
                  style={{ color: theme.muted }}
                >
                  {todaysPrayer.prayedCount || 0} prayed today
                </Text>
              </View>
              <View
                className="px-3 py-1.5 rounded-full"
                style={{ backgroundColor: '#F59E0B' }}
              >
                <Text variant="caption" className="text-white font-semibold">
                  Pray Now
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </View>
    </Card>
  );
};

export default DailyPrayerWidget;
