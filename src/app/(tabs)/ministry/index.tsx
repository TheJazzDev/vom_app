import { MinistryCard } from '@/src/components';
import { Text } from '@/src/components/UI';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { MINISTRY_OPTIONS } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View, Pressable } from 'react-native';

export default function MinistryIndex() {
  const theme = useTheme();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Enhanced Hero Section */}
      <LinearGradient
        colors={['#7C3AED', '#6B21A8', '#4C1D95']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 32,
          paddingBottom: 32,
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
                <IconSymbol
                  name="book.fill"
                  size={22}
                  color="white"
                />
              </View>
              <Text
                variant="h1"
                className="text-white font-bold"
              >
                Ministry
              </Text>
            </View>
            <Text
              variant="body"
              className="text-white/90 leading-6 pr-2"
            >
              Grow spiritually through our programs and connect with God's family
            </Text>
          </View>

          {/* Optional: Menu Button */}
          <Pressable
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center ml-2"
          >
            <IconSymbol
              name="ellipsis.circle"
              size={22}
              color="white"
            />
          </Pressable>
        </View>

        {/* Feature Highlights */}
        {/* <View className="flex-row gap-2 mt-4">
          <View className="flex-1 bg-white/20 rounded-2xl px-4 py-3 border border-white/10">
            <View className="flex-row items-center gap-2 mb-1">
              <IconSymbol name="book.closed.fill" size={18} color="white" />
              <Text variant="h4" className="text-white font-bold">
                Bible Study
              </Text>
            </View>
            <Text variant="caption" className="text-white/80">
              Weekly sessions
            </Text>
          </View>

          <View className="flex-1 bg-white/20 rounded-2xl px-4 py-3 border border-white/10">
            <View className="flex-row items-center gap-2 mb-1">
              <IconSymbol name="hands.sparkles.fill" size={18} color="white" />
              <Text variant="h4" className="text-white font-bold">
                Prayer
              </Text>
            </View>
            <Text variant="caption" className="text-white/80">
              Join us daily
            </Text>
          </View>
        </View> */}

        {/* Scripture Highlight */}
        <View className="mt-4 bg-white/10 rounded-2xl px-4 py-3 border border-white/10 backdrop-blur-sm">
          <View className="flex-row items-start gap-2">
            <IconSymbol name="quote.opening" size={16} color="white" />
            <View className="flex-1">
              <Text variant="caption" className="text-white/90 italic leading-5 mb-1">
                "Therefore go and make disciples of all nations..."
              </Text>
              <Text variant="caption" className="text-white/70 font-semibold">
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
            <Text
              variant="caption"
              style={{ color: theme.muted }}
            >
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

        {/* Enhanced Call to Action */}
        <View
          className="mt-8 rounded-2xl p-6 border"
          style={{
            backgroundColor: `${theme.brand}08`,
            borderColor: `${theme.brand}20`,
          }}
        >
          <View className="flex-row items-start gap-3 mb-3">
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
                style={{ color: theme.muted }}
              >
                Join us in building God's kingdom through fellowship, worship, and service. Every member has a role to play in our church family.
              </Text>
            </View>
          </View>

          {/* Quick Action Buttons */}
          <View className="flex-row gap-2 mt-4">
            <Pressable
              className="flex-1 rounded-xl py-3 items-center flex-row justify-center gap-2"
              style={{ backgroundColor: theme.brand }}
            >
              <IconSymbol name="plus.circle.fill" size={18} color="white" />
              <Text variant="body" className="text-white font-semibold">
                Join Now
              </Text>
            </Pressable>
            <Pressable
              className="flex-1 rounded-xl py-3 items-center flex-row justify-center gap-2 border"
              style={{ borderColor: theme.brand }}
            >
              <IconSymbol name="info.circle" size={18} color={theme.brand} />
              <Text
                variant="body"
                className="font-semibold"
                style={{ color: theme.brand }}
              >
                Learn More
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}