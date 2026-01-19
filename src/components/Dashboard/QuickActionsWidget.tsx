import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { IconSymbol, IconSymbolName } from '../Icons/IconSymbol';
import { Card, Text, View } from '../UI';

interface QuickAction {
  title: string;
  icon: IconSymbolName;
  route: string;
  color: string;
  bgColor: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    title: 'Submit Prayer',
    icon: 'hands.sparkles.fill',
    route: '/create-prayer-request',
    color: '#DB2777',
    bgColor: '#DB277715',
  },
  {
    title: 'Share Testimony',
    icon: 'quote.bubble.fill',
    route: '/create-testimony',
    color: '#10B981',
    bgColor: '#10B98115',
  },
  {
    title: 'View Directory',
    icon: 'person.3.fill',
    route: ROUTES.DIRECTORY,
    color: '#3B82F6',
    bgColor: '#3B82F615',
  },
  {
    title: 'Leaderboard',
    icon: 'trophy.fill',
    route: '/more/leaderboard',
    color: '#F59E0B',
    bgColor: '#F59E0B15',
  },
];

const QuickActionsWidget = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleAction = (route: string) => {
    router.push(route as any);
  };

  return (
    <Card variant="outlined" className="mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View
            className="w-8 h-8 rounded-full items-center justify-center mr-2.5"
            style={{ backgroundColor: `${theme.brand}15` }}
          >
            <IconSymbol name="bolt.fill" size={16} color={theme.brand} />
          </View>
          <Text variant="h4" color="heading" className="font-bold text-base">
            Quick Actions
          </Text>
        </View>
      </View>

      <View className="flex-row flex-wrap" style={{ gap: 8 }}>
        {QUICK_ACTIONS.map((action, index) => (
          <Pressable
            key={index}
            onPress={() => handleAction(action.route)}
            style={{
              flex: 1,
              minWidth: '48%',
              maxWidth: '48.5%',
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            android_ripple={{ color: action.color + '10' }}
          >
            <View
              className="w-9 h-9 rounded-full items-center justify-center mr-2.5"
              style={{ backgroundColor: action.bgColor }}
            >
              <IconSymbol name={action.icon} size={18} color={action.color} />
            </View>
            <Text
              variant="caption"
              className="font-semibold flex-1"
              style={{ color: theme.heading, fontSize: 13 }}
              numberOfLines={2}
            >
              {action.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </Card>
  );
};

export default QuickActionsWidget;
