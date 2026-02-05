import { MinistryCard } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { Text } from '@/src/components/UI';
import { MINISTRY_OPTIONS } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MinistryIndex() {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate API call - replace with actual API call when available
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error refreshing ministry:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView
      edges={['top']}
      style={{ backgroundColor: theme.background }}
      className="flex-1"
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
        {/* Enhanced Hero Section */}
        <LinearGradient
          colors={['#7C3AED', '#6B21A8', '#4C1D95']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 16,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {/* Header with Icon and Action */}
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                  <IconSymbol name="book.fill" size={22} color="white" />
                </View>
                <Text
                  variant="h1"
                  className="font-bold"
                  style={{ color: 'white' }}
                >
                  Ministry
                </Text>
              </View>
              <Text
                variant="body"
                className="leading-6 pr-2"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                Grow spiritually through our programs and connect with
                God&apos;s family
              </Text>
            </View>

            {/* Optional: Menu Button */}
            {/* <Pressable className="w-10 h-10 rounded-full bg-white/20 items-center justify-center ml-2">
              <IconSymbol name="ellipsis.circle" size={22} color="white" />
            </Pressable> */}
          </View>

          {/* Scripture Highlight */}
          <View className="mt-4 bg-white/10 rounded-2xl px-4 py-3 border border-white/10 backdrop-blur-sm">
            <View className="flex-row items-start gap-2">
              <IconSymbol name="quote.opening" size={16} color="white" />
              <View className="flex-1">
                <Text
                  variant="caption"
                  className="italic leading-5 mb-1"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  &ldquo;Therefore go and make disciples of all
                  nations...&rdquo;
                </Text>
                <Text
                  variant="caption"
                  className="font-semibold"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  Matthew 28:19
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Ministry Options Section */}
        <View className="px-4 pb-6">
          {/* Section Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text
                variant="h3"
                className="font-bold mb-1"
                style={{ color: theme.heading }}
              >
                Explore Our Ministry
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                {MINISTRY_OPTIONS.length} ways to get involved
              </Text>
            </View>
          </View>

          {/* Ministry Cards */}
          <View className="space-y-4">
            {MINISTRY_OPTIONS.map((ministry) => (
              <MinistryCard key={ministry.route} ministry={ministry} />
            ))}
          </View>

          {/* Call to Action */}
          <View
            className="mt-8 rounded-2xl p-4 border"
            style={{
              backgroundColor: `${theme.brand}08`,
              borderColor: `${theme.brand}20`,
            }}
          >
            <View className="flex-row items-start gap-3">
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: `${theme.brand}15` }}
              >
                <IconSymbol
                  name="heart.circle.fill"
                  size={24}
                  color={theme.brand}
                />
              </View>
              <View className="flex-1">
                <Text
                  variant="h4"
                  className="font-bold mb-1"
                  style={{ color: theme.brand }}
                >
                  Get Involved
                </Text>
                <Text
                  variant="body"
                  className="leading-6"
                  style={{ color: theme.text }}
                >
                  Join us in building God&apos;s kingdom through fellowship,
                  worship, and service. Every member has a role to play in our
                  church family.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
