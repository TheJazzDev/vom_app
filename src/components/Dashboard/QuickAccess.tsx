import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const QuickAccess = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Card variant="outlined" className="mb-6">
      <Text variant="h4" color="heading" className="font-bold mb-4">
        Quick Access
      </Text>
      <View className="flex-row justify-between">
        <Pressable
          onPress={() => router.push('/directory' as any)}
          className="items-center flex-1"
        >
          <View
            className="w-12 h-12 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: `${theme.primary}15` }}
          >
            <IconSymbol name="person.3.fill" size={20} color={theme.primary} />
          </View>
          <Text
            variant="caption"
            className="text-center font-semibold"
            style={{ color: theme.text }}
          >
            Directory
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/ministry' as any)}
          className="items-center flex-1"
        >
          <View
            className="w-12 h-12 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: '#10B98115' }}
          >
            <IconSymbol name="cross.fill" size={20} color="#10B981" />
          </View>
          <Text
            variant="caption"
            className="text-center font-semibold"
            style={{ color: theme.text }}
          >
            Ministry
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/programme' as any)}
          className="items-center flex-1"
        >
          <View
            className="w-12 h-12 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: '#3B82F615' }}
          >
            <IconSymbol name="calendar.badge.plus" size={20} color="#3B82F6" />
          </View>
          <Text
            variant="caption"
            className="text-center font-semibold"
            style={{ color: theme.text }}
          >
            Programmes
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/info' as any)}
          className="items-center flex-1"
        >
          <View
            className="w-12 h-12 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: '#F59E0B15' }}
          >
            <IconSymbol name="info.circle.fill" size={20} color="#F59E0B" />
          </View>
          <Text
            variant="caption"
            className="text-center font-semibold"
            style={{ color: theme.text }}
          >
            Church Info
          </Text>
        </Pressable>
      </View>
    </Card>
  );
};

export default QuickAccess;
