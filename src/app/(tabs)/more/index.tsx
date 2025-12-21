import { InfoCategoryCardCompact } from '@/src/components/ChurchInfo/InfoCategoryCard';
import { IconSymbol, IconSymbolName } from '@/src/components/Icons/IconSymbol';
import { Card, Text } from '@/src/components/UI';
import { INFO_CATEGORIES, ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Quick action items configuration
const QUICK_ACTIONS = [
  {
    title: 'Settings',
    icon: 'gearshape.fill' as IconSymbolName,
    route: ROUTES.SETTINGS,
    color: '#8B5CF6',
    description: 'App preferences',
  },
  {
    title: 'About Us',
    icon: 'info.circle.fill' as IconSymbolName,
    route: ROUTES.ABOUT,
    color: '#3B82F6',
    description: 'Our mission',
  },
  {
    title: 'Contact',
    icon: 'phone.fill' as IconSymbolName,
    route: ROUTES.CONTACT,
    color: '#10B981',
    description: 'Get in touch',
  },
];

// Additional menu items
const ADDITIONAL_ITEMS = [
  {
    title: 'Birthdays',
    icon: 'gift.fill' as IconSymbolName,
    route: ROUTES.BIRTHDAYS,
    color: '#EC4899',
    description: 'Celebrate with members',
  },
];

export default function MoreIndex() {
  const theme = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error refreshing more page:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const QuickActionCard = ({ item }: { item: (typeof QUICK_ACTIONS)[0] }) => (
    <Pressable
      onPress={() => router.push(item.route)}
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 16,
        padding: 12,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
      android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
    >
      <View
        className="w-10 h-10 rounded-xl items-center justify-center mb-2"
        style={{ backgroundColor: `${item.color}15` }}
      >
        <IconSymbol name={item.icon} size={20} color={item.color} />
      </View>
      <Text
        variant="body"
        className="font-semibold mb-0.5"
        style={{ color: theme.heading }}
      >
        {item.title}
      </Text>
      <Text
        variant="caption"
        className="text-xs"
        style={{ color: theme.muted }}
      >
        {item.description}
      </Text>
    </Pressable>
  );

  // Beautiful Birthdays card component
  const BirthdayCard = ({ item }: { item: (typeof ADDITIONAL_ITEMS)[0] }) => (
    <Pressable
      onPress={() => router.push(item.route)}
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        shadowColor: item.color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
      }}
      android_ripple={{ color: 'rgba(236,72,153,0.1)' }}
    >
      <View className="flex-row items-center">
        <View
          className="w-16 h-16 rounded-2xl items-center justify-center mr-4"
          style={{
            backgroundColor: `${item.color}20`,
            borderWidth: 2,
            borderColor: `${item.color}40`,
          }}
        >
          <IconSymbol name={item.icon} size={28} color={item.color} />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text
              variant="h5"
              className="font-bold"
              style={{ color: theme.heading }}
            >
              {item.title}
            </Text>
            <View
              className="ml-2 px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <Text
                variant="caption"
                className="font-semibold text-xs"
                style={{ color: item.color }}
              >
                New
              </Text>
            </View>
          </View>
          <Text variant="body" className="mb-2" style={{ color: theme.muted }}>
            {item.description}
          </Text>
          <View className="flex-row items-center">
            <Text
              variant="caption"
              className="font-semibold"
              style={{ color: item.color }}
            >
              View celebrations
            </Text>
            <IconSymbol
              name="arrow.right"
              size={14}
              color={item.color}
              style={{ marginLeft: 4 }}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView
      edges={[]}
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      >
        {/* Simple Header */}
        <View className="px-4 pt-12 pb-3">
          <Text
            variant="h1"
            className="font-bold mb-1"
            style={{ color: theme.heading }}
          >
            More
          </Text>
          <Text variant="body" style={{ color: theme.muted }}>
            Explore church resources and information
          </Text>
        </View>

        {/* Compact Quick Actions Grid */}
        <View className="px-4 mb-6">
          <Text
            variant="h6"
            className="font-semibold mb-3"
            style={{ color: theme.heading }}
          >
            Quick Access
          </Text>
          <View className="flex-row gap-2">
            {QUICK_ACTIONS.map((action) => (
              <QuickActionCard key={action.route} item={action} />
            ))}
          </View>
        </View>

        {/* Church Activities Section */}
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text
                variant="h6"
                className="font-semibold mb-1"
                style={{ color: theme.heading }}
              >
                Church Activities
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                Stay updated with events and programs
              </Text>
            </View>
          </View>

          {INFO_CATEGORIES.map((category) => (
            <InfoCategoryCardCompact key={category.route} category={category} />
          ))}
        </View>

        {/* Leaderboard Card */}
        <View className="px-4 mb-6">
          <Text
            variant="h6"
            className="font-semibold mb-3"
            style={{ color: theme.heading }}
          >
            Community
          </Text>
          <Pressable
            onPress={() => router.push('/more/leaderboard')}
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 20,
              padding: 20,
              marginBottom: 12,
              shadowColor: '#F59E0B',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 5,
            }}
            android_ripple={{ color: 'rgba(245,158,11,0.1)' }}
          >
            <View className="flex-row items-center">
              <View
                className="w-16 h-16 rounded-2xl items-center justify-center mr-4"
                style={{
                  backgroundColor: '#F59E0B20',
                  borderWidth: 2,
                  borderColor: '#F59E0B40',
                }}
              >
                <IconSymbol name="trophy.fill" size={28} color="#F59E0B" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text
                    variant="h5"
                    className="font-bold"
                    style={{ color: theme.heading }}
                  >
                    Leaderboard
                  </Text>
                  <View
                    className="ml-2 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#F59E0B20' }}
                  >
                    <Text
                      variant="caption"
                      className="font-semibold text-xs"
                      style={{ color: '#F59E0B' }}
                    >
                      New
                    </Text>
                  </View>
                </View>
                <Text variant="body" className="mb-2" style={{ color: theme.muted }}>
                  See how you rank among members
                </Text>
                <View className="flex-row items-center">
                  <Text
                    variant="caption"
                    className="font-semibold"
                    style={{ color: '#F59E0B' }}
                  >
                    View rankings
                  </Text>
                  <IconSymbol
                    name="arrow.right"
                    size={14}
                    color="#F59E0B"
                    style={{ marginLeft: 4 }}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Beautiful Birthdays Card */}
        <View className="px-4 mb-6">
          <Text
            variant="h6"
            className="font-semibold mb-3"
            style={{ color: theme.heading }}
          >
            Celebrations
          </Text>
          {ADDITIONAL_ITEMS.map((item) => (
            <BirthdayCard key={item.route} item={item} />
          ))}
        </View>

        {/* Help & Support Card */}
        <View className="px-4 mb-8">
          <Card
            variant="outlined"
            className="rounded-2xl p-5"
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.card,
            }}
          >
            <View className="flex-row items-start">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <IconSymbol
                  name="questionmark.circle.fill"
                  size={24}
                  color={theme.primary}
                />
              </View>
              <View className="flex-1">
                <Text
                  variant="h6"
                  className="font-semibold mb-1"
                  style={{ color: theme.heading }}
                >
                  Need Help or Prayer?
                </Text>
                <Text
                  variant="body"
                  className="mb-3"
                  style={{ color: theme.muted }}
                >
                  Our team is here to support you spiritually and practically
                </Text>
                <Pressable
                  onPress={() => router.push(ROUTES.CONTACT)}
                  className="self-start px-4 py-2 rounded-full"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <Text
                    variant="body"
                    className="font-semibold"
                    style={{ color: theme.primary }}
                  >
                    Get in Touch
                  </Text>
                </Pressable>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
