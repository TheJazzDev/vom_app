import { useTheme } from '@/src/hooks';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';
import { Link } from 'expo-router';

const PrayerRequest = () => {
  const theme = useTheme();

  return (
    <Card variant="outlined" className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#8B5CF615' }}
          >
            <IconSymbol name="hands.sparkles.fill" size={18} color="#8B5CF6" />
          </View>
          <Text variant="h4" color="heading" className="font-bold">
            Prayer Requests
          </Text>
        </View>
        <Link href="/ministry/prayer-request">
          <Text variant="body" style={{ color: theme.primary }}>
            View all
          </Text>
        </Link>
      </View>

      <View
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text color="heading" className="font-semibold mb-1">
              Prayer for healing and restoration
            </Text>
            <Text variant="body" style={{ color: theme.muted }}>
              Sister Grace A. • 2 hours ago
            </Text>
          </View>
          <Text variant="caption" style={{ color: theme.primary }}>
            12 prayers
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          padding: 16,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text color="heading" className="font-semibold mb-1">
              Safe travels and journey mercies
            </Text>
            <Text variant="body" style={{ color: theme.muted }}>
              Brother Samuel O. • 4 hours ago
            </Text>
          </View>
          <Text variant="caption" style={{ color: theme.primary }}>
            8 prayers
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default PrayerRequest;
