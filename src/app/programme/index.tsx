import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

export default function ProgrammeIndex() {
  const theme = useTheme();
  const router = useRouter();

  const programmeOptions = [
    {
      title: 'Current Programme',
      description: "View what's happening right now",
      route: ROUTES.CURRENT_PROGRAMME,
      icon: 'play.circle.fill',
      status: 'Live',
      color: '#10B981',
    },
    {
      title: 'Upcoming Programmes',
      description: "See what's coming up next",
      route: ROUTES.UPCOMING_PROGRAMME,
      icon: 'calendar.badge.plus',
      status: '5 Events',
      color: '#3B82F6',
    },
    {
      title: 'Past Programmes',
      description: 'Browse our previous programmes and recordings',
      route: ROUTES.PAST_PROGRAMME,
      icon: 'clock.arrow.circlepath',
      status: 'View History',
      color: '#EF4444',
    },
  ];

  const quickStats = [
    { label: 'This Week', value: '7', color: theme.primary },
    { label: 'This Month', value: '28', color: theme.secondary },
    { label: 'Total', value: '150+', color: theme.tertiary },
  ];

  const ProgrammeCard = ({ programme }: { programme: any }) => (
    <Pressable
      onPress={() => router.push(programme.route as any)}
      className="mb-4 rounded-xl overflow-hidden"
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
      }}
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
    >
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <View
              className="p-3 rounded-full mr-4"
              style={{ backgroundColor: `${programme.color}15` }}
            >
              <IconSymbol
                name={programme.icon}
                size={24}
                color={programme.color}
              />
            </View>
            <View className="flex-1">
              <Text
                variant="h4"
                className="font-semibold mb-1"
                style={{ color: theme.heading }}
              >
                {programme.title}
              </Text>
              <Text
                variant="subtitle2"
                style={{ color: theme.muted }}
                numberOfLines={2}
              >
                {programme.description}
              </Text>
            </View>
          </View>

          <View
            className="px-3 py-1 rounded-full ml-2"
            style={{ backgroundColor: `${programme.color}15` }}
          >
            <Text
              variant="caption"
              className="font-semibold"
              style={{ color: programme.color }}
            >
              {programme.status}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <Text
            variant="caption"
            className="mr-2"
            style={{ color: theme.muted }}
          >
            Tap to view
          </Text>
          <IconSymbol name="arrow.right" size={14} color={theme.muted} />
        </View>
      </View>
    </Pressable>
  );

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <View className="relative h-56 mb-6">
        <LinearGradient
          colors={['#3B82F6', '#1E40AF', '#6F42F2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            padding: 24,
          }}
        >
          <Text variant="h1" className="text-white font-bold mb-2">
            Programmes
          </Text>
          <Text variant="body" className="text-white/90 leading-6 mb-4">
            Stay connected with all church activities, services, and special
            events
          </Text>

          {/* Quick Stats */}
          <View className="flex-row">
            {quickStats.map((stat, index) => (
              <View
                key={index}
                className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm mr-2"
              >
                <Text variant="h4" className="text-white font-bold">
                  {stat.value}
                </Text>
                <Text variant="caption" className="text-white/80">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Programme Options */}
      <View className="px-4">
        <Text
          variant="h3"
          className="font-semibold mb-4"
          style={{ color: theme.heading }}
        >
          Browse Programmes
        </Text>

        {programmeOptions.map((programme) => (
          <ProgrammeCard key={programme.route} programme={programme} />
        ))}
      </View>

      {/* Featured Programme */}
      <View className="mx-4 mb-4 mt-4">
        <Text
          variant="h3"
          className="font-semibold mb-2"
          style={{ color: theme.heading }}
        >
          Featured This Week
        </Text>

        <LinearGradient
          colors={[theme.primary, theme.secondary || theme.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 12,
            padding: 24,
          }}
        >
          <View className="flex-row items-center mb-3">
            <IconSymbol name="star.fill" size={20} color="white" />
            <Text variant="caption" className="text-white ml-2 font-semibold">
              FEATURED
            </Text>
          </View>
          <Text variant="h3" className="text-white font-bold mb-2">
            Sunday Worship Service
          </Text>
          <Text variant="body" className="text-white/90 mb-4 leading-6">
            Join us for an inspiring time of worship, fellowship, and powerful
            ministry
          </Text>
          <View className="flex-row items-center">
            <IconSymbol name="clock.fill" size={16} color="white" />
            <Text variant="caption" className="text-white ml-2">
              Every Sunday • 9:00 AM
            </Text>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
