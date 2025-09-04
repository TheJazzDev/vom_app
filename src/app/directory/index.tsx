import { DirectoryCategoryCard } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { DIRECTORY_CATEGORIES } from '@/src/constants/directory';
import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

export default function DirectoryIndex() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <View className="px-4 pt-6 pb-4">
        <Text
          variant="h1"
          className="font-bold mb-2"
          style={{ color: theme.heading }}
        >
          Directory
        </Text>
        <Text
          variant="body"
          className="leading-6"
          style={{ color: theme.muted }}
        >
          Connect with our church family, explore our various bands, department
          and find your place in our community
        </Text>
      </View>

      {/* Stats Row */}
      <View className="flex-row px-4 mb-6">
        <View className="flex-1 bg-primary/5 rounded-lg p-2 mr-2">
          <Text
            variant="h2"
            className="font-bold"
            style={{ color: theme.primary }}
          >
            345+
          </Text>
          <Text variant="caption" style={{ color: theme.muted }}>
            Total Members
          </Text>
        </View>
        <View className="flex-1 bg-secondary/5 rounded-lg p-4 ml-2">
          <Text
            variant="h2"
            className="font-bold"
            style={{ color: theme.secondary }}
          >
            20+
          </Text>
          <Text variant="caption" style={{ color: theme.muted }}>
            Active Bands
          </Text>
        </View>
        <View className="flex-1 bg-secondary/5 rounded-lg p-4 ml-2">
          <Text
            variant="h2"
            className="font-bold"
            style={{ color: theme.secondary }}
          >
            5+
          </Text>
          <Text variant="caption" style={{ color: theme.muted }}>
            Departments
          </Text>
        </View>
      </View>

      {/* Categories */}
      <View className="px-4">
        {DIRECTORY_CATEGORIES.map((category) => (
          <DirectoryCategoryCard key={category.route} category={category} />
        ))}
      </View>

      {/* Bottom CTA */}
      <View className="mx-4 mb-6 bg-card border border-border rounded-lg p-6">
        <View className="flex-row items-center mb-3">
          <IconSymbol
            name="person.badge.plus"
            size={24}
            color={theme.primary}
          />
          <Text
            variant="h4"
            className="ml-3 font-semibold"
            style={{ color: theme.heading }}
          >
            New Here?
          </Text>
        </View>
        <Text
          variant="body"
          className="leading-6 mb-4"
          style={{ color: theme.muted }}
        >
          We&apos;d love to help you get connected! Contact our welcome team to
          find the perfect group for you.
        </Text>
        <Pressable
          onPress={() => router.push('/contact' as any)}
          className="bg-primary rounded-lg py-3 px-6 self-start"
        >
          <Text variant="button" className="text-white font-semibold">
            Get Connected
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
