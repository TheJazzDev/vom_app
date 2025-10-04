import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { truncateText } from '@/src/utils';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Badge, Card, Text, View } from '../UI';

const Announcement = () => {
  const theme = useTheme();
  // const router = useRouter();

  return (
    <Card variant="outlined" className="mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#EF444415' }}
          >
            <IconSymbol name="megaphone.fill" size={18} color="#EF4444" />
          </View>
          <Text variant="h4" color="heading" className="font-bold">
            Announcements
          </Text>
        </View>
        <Link href={ROUTES.ANNOUNCEMENT}>
          <Text variant="body" style={{ color: theme.primary }}>
            View all
          </Text>
        </Link>
      </View>

      <Pressable
        // onPress={() => router.push('/info/announcements/1' as any)}
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderLeftWidth: 4,
          borderLeftColor: '#EF4444',
        }}
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1 mr-3">
            <Text color="heading" className="font-semibold mb-2">
              Church Revival: 7 Days of Glory
            </Text>
            <Text variant="body" style={{ color: theme.muted }}>
              {truncateText(
                'Join us for a powerful 7-day revival program starting March 15th. Special guest minister...',
                80,
              )}
            </Text>
          </View>
          <Badge>High</Badge>
        </View>
      </Pressable>

      <Pressable
        // onPress={() => router.push('/info/announcements/2' as any)}
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: '#F59E0B',
        }}
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1 mr-3">
            <Text color="heading" className="font-semibold mb-2">
              Youth Camp Registration Open
            </Text>
            <Text variant="body" style={{ color: theme.muted }}>
              {truncateText(
                'Annual youth camp "Ignite 2024" registration is now open. Early bird discount...',
                80,
              )}
            </Text>
          </View>
          <Badge>Medium</Badge>
        </View>
      </Pressable>
    </Card>
  );
};

export default Announcement;
