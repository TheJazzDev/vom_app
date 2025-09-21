import { MinistryCard } from '@/src/components';
import { Text } from '@/src/components/UI';
import { MINISTRY_OPTIONS } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';

export default function MinistryIndex() {
  const theme = useTheme();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      {/* Hero Section */}
      <View className="relative mb-6">
        <LinearGradient
          colors={['#6B46C1', '#1E40AF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View className="p-4 relative z-10">
          <Text
            variant="h1"
            className="text-white dark:text-white/90 font-bold mb-2"
          >
            Ministry
          </Text>
          <Text
            variant="body"
            className="text-white/90 dark:text-white/80 leading-6"
          >
            Grow spiritually through our various ministry programs and connect
            with God&apos;s family
          </Text>
        </View>
      </View>

      {/* Ministry Options */}
      <View className="px-4 pb-6">
        <Text
          variant="h3"
          className="mb-4 font-semibold"
          style={{ color: theme.heading }}
        >
          Explore Our Ministry
        </Text>

        <View className="space-y-4">
          {MINISTRY_OPTIONS.map((option) => (
            <MinistryCard key={option.route} {...option} />
          ))}
        </View>

        {/* Call to Action */}
        <View className="mt-8 bg-primary/5 rounded-lg p-6 border border-primary/20">
          <Text
            variant="h4"
            className="font-semibold mb-2"
            style={{ color: theme.primary }}
          >
            Get Involved
          </Text>
          <Text
            variant="body"
            className="leading-6"
            style={{ color: theme.muted }}
          >
            Join us in building God&apos;s kingdom through fellowship, worship,
            and service. Every member has a role to play in our church family.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
