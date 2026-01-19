import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import type { DailyPrayer } from '@/src/services/dailyPrayer';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native';

interface TodaysPrayerWidgetProps {
  prayer: DailyPrayer | null;
  isLoading?: boolean;
  onPress?: () => void;
}

export const TodaysPrayerWidget: React.FC<TodaysPrayerWidgetProps> = ({
  prayer,
  isLoading = false,
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (prayer) {
      router.push(`/ministry/daily-prayers/${prayer.id}` as any);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#F97316', '#EA580C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <ActivityIndicator color="white" size="large" />
          <Text className="text-white/80 mt-2">
            Loading today&apos;s prayer...
          </Text>
        </LinearGradient>
      </View>
    );
  }

  if (!prayer) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#F97316', '#EA580C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View className="items-center py-4">
            <IconSymbol name="sun.max.fill" size={32} color="white" />
            <Text className="text-white/90 mt-2 text-center">
              No prayer available for today
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <LinearGradient
        colors={['#F97316', '#EA580C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
              <IconSymbol name="sun.max.fill" size={18} color="white" />
            </View>
            <Text className="text-white/90 font-semibold">
              Today&apos;s Prayer
            </Text>
          </View>
          <IconSymbol name="chevron.right" size={18} color="white" />
        </View>

        {/* Title */}
        <Text className="text-white font-bold text-lg mb-2" numberOfLines={2}>
          {prayer.title}
        </Text>

        {/* Scripture */}
        <View className="bg-white/15 rounded-xl p-3 mb-3">
          <Text
            className="text-white/90 italic text-sm leading-5"
            numberOfLines={2}
          >
            &quot;{prayer.scriptureText}&quot;
          </Text>
          <Text className="text-white/70 text-xs font-semibold mt-1">
            — {prayer.scriptureReference}
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <Text className="text-sm">❤️</Text>
            <Text className="text-white/80 text-sm">{prayer.likesCount}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-sm">💬</Text>
            <Text className="text-white/80 text-sm">
              {prayer.commentsCount}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loadingContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  gradient: {
    padding: 16,
  },
});

export default TodaysPrayerWidget;
