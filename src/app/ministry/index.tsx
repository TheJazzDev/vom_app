import { MinistryCard } from '@/src/components';
import { Text } from '@/src/components/UI';
import { MINISTRY_OPTIONS } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, ScrollView, View } from 'react-native';

export default function MinistryIndex() {
  const theme = useTheme();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      {/* Hero Section */}
      <View className="relative h-48 mb-6">
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
          }}
          className="flex-1 justify-end"
          imageStyle={{ opacity: 0.7 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            className="absolute inset-0"
          />
          <View className="p-6 relative z-10">
            <Text variant="h1" className="text-white font-bold mb-2">
              Ministry
            </Text>
            <Text variant="body" className="text-white/90 leading-6">
              Grow spiritually through our various ministry programs and connect
              with God's family
            </Text>
          </View>
        </ImageBackground>
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
            Join us in building God's kingdom through fellowship, worship, and
            service. Every member has a role to play in our church family.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
