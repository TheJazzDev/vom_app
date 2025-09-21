import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const RecentSermons = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Card variant="outlined" className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#10B98115' }}
          >
            <IconSymbol name="book.fill" size={18} color="#10B981" />
          </View>
          <Text variant="h4" color="heading" className="font-bold">
            Recent Sermons
          </Text>
        </View>
        <Link href={ROUTES.RECENT_SERMONS}>
          <Text variant="body" style={{ color: theme.primary }}>
            View all
          </Text>
        </Link>
      </View>

      <Pressable
        onPress={() => router.push('/ministry/recent-sermons/1' as any)}
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <View className="flex-row items-center">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-4"
            style={{ backgroundColor: '#3B82F615' }}
          >
            <IconSymbol name="play.circle.fill" size={24} color="#3B82F6" />
          </View>
          <View className="flex-1">
            <Text color="heading" className="font-semibold mb-1">
              More Than Conquerors
            </Text>
            <Text variant="body" style={{ color: theme.muted }}>
              Pastor David Johnson • 30 min
            </Text>
            <Text variant="caption" style={{ color: theme.primary }}>
              March 10, 2025 • 1.2k views
            </Text>
          </View>
        </View>
      </Pressable>

      <Pressable
        onPress={() => router.push('/ministry/recent-sermons/2' as any)}
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          padding: 16,
        }}
      >
        <View className="flex-row items-center">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-4"
            style={{ backgroundColor: '#10B98115' }}
          >
            <IconSymbol name="play.circle.fill" size={24} color="#10B981" />
          </View>
          <View className="flex-1">
            <Text color="heading" className="font-semibold mb-1">
              The Power of Love
            </Text>
            <Text variant="body" style={{ color: theme.muted }}>
              Elder Michael Brown • 25 min
            </Text>
            <Text variant="caption" style={{ color: theme.primary }}>
              March 8, 2025 • 890 views
            </Text>
          </View>
        </View>
      </Pressable>
    </Card>
  );
};

export default RecentSermons;
