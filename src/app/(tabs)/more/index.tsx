import { InfoCategoryCardCompact } from '@/src/components/ChurchInfo/InfoCategoryCard';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { Text } from '@/src/components/UI';
import { INFO_CATEGORIES, ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

export default function MoreIndex() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED', '#6366F1']}
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
        {/* Header with Icon */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-2">
              <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                <IconSymbol name="ellipsis.circle" size={24} color="white" />
              </View>
              <Text variant="h1" className="text-white font-bold">
                More
              </Text>
            </View>
            <Text variant="body" className="text-white/90 leading-6 pr-2">
              Stay informed about everything happening at Valley of Mercy Church
            </Text>
          </View>

          {/* Settings Quick Access */}
          <Pressable
            onPress={() => router.push('/more/settings')}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center ml-2"
          >
            <IconSymbol name="gearshape.fill" size={22} color="white" />
          </Pressable>
        </View>

        {/* Quick Access Cards */}
        <View className="flex-row gap-2 mt-4">
          <Pressable
            onPress={() => router.push(ROUTES.ABOUT)}
            className="flex-1 bg-white/20 rounded-2xl px-4 py-3 border border-white/10"
          >
            <IconSymbol name="info.circle.fill" size={20} color="white" />
            <Text variant="body" className="text-white font-semibold mt-2">
              About Us
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push(ROUTES.CONTACT)}
            className="flex-1 bg-white/20 rounded-2xl px-4 py-3 border border-white/10"
          >
            <IconSymbol name="phone.fill" size={20} color="white" />
            <Text variant="body" className="text-white font-semibold mt-2">
              Contact
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* Information Categories */}
      <View className="px-4 pb-6">
        {/* Section Header */}
        <View className="mb-4">
          <Text
            variant="h3"
            className="font-bold mb-1"
            style={{ color: theme.heading }}
          >
            What's Happening
          </Text>
          <Text variant="caption" style={{ color: theme.muted }}>
            Stay updated with church activities and news
          </Text>
        </View>

        {INFO_CATEGORIES.map((category) => (
          <InfoCategoryCardCompact key={category.route} category={category} />
        ))}
      </View>
    </ScrollView>
  );
}
