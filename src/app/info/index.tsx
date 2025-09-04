import { InfoCategoryCard } from '@/src/components/ChurchInfo';
import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { INFO_CATEGORIES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

export default function InfoIndex() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header Section */}
      <View className="relative mb-6">
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          className="flex-1 justify-end"
          style={{ padding: 16 }}
        >
          <View className="mb-4">
            <Text variant="h1" className="text-white font-bold mb-2">
              Church Info
            </Text>
            <Text variant="body" className="text-white/90 leading-6">
              Stay informed about everything happening at Valley of Mercy Church
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Information Categories */}
      <View className="px-4">
        <Text
          variant="h3"
          className="font-semibold mb-4"
          style={{ color: theme.heading }}
        >
          Browse Information
        </Text>

        {INFO_CATEGORIES.map((category) => (
          <InfoCategoryCard key={category.route} category={category} />
        ))}
      </View>

      {/* Emergency Contact */}
      <View className="mx-4 mb-6">
        <View className="bg-red-50 border border-red-200 rounded-xl p-4">
          <View className="flex-row items-center mb-3">
            <View className="bg-red-100 p-2 rounded-full">
              <IconSymbol
                name="exclamationmark.triangle.fill"
                size={20}
                color="#EF4444"
              />
            </View>
            <Text variant="h4" className="ml-3 font-semibold text-red-800">
              Emergency Contact
            </Text>
          </View>
          <Text variant="body" className="text-red-700 mb-3 leading-6">
            For urgent prayer requests or care needs, contact us immediately.
          </Text>
          <Pressable
            onPress={() => router.push('/contact' as any)}
            className="bg-red-600 rounded-lg py-3 px-4 self-start"
          >
            <View className="flex-row items-center">
              <IconSymbol name="phone.fill" size={16} color="white" />
              <Text variant="button" className="text-white font-semibold ml-2">
                Call Now
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
