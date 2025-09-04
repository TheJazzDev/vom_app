// directory/bands.tsx
import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FlatList, Image, Pressable, View } from 'react-native';

// Band data based on your enum
const BANDS = [
  {
    id: 'choir',
    name: 'Choir',
    description: 'Leading worship through songs and hymns',
    memberCount: 35,
    captain: {
      name: 'Grace Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'David Wilson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Mary Smith',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#8B5CF6', '#A855F7'],
    icon: 'music.note',
  },
  {
    id: 'love-divine',
    name: 'Love Divine',
    description: "Spreading God's love through service and fellowship",
    memberCount: 42,
    captain: {
      name: 'Sarah Davis',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'John Miller',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Lisa Brown',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#EC4899', '#BE185D'],
    icon: 'heart.fill',
  },
  {
    id: 'daniel',
    name: 'Daniel',
    description: 'Standing firm in faith and righteousness',
    memberCount: 28,
    captain: {
      name: 'Michael Johnson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'James Wilson',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Ruth Davis',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#3B82F6', '#1E40AF'],
    icon: 'shield.fill',
  },
  {
    id: 'deborah',
    name: 'Deborah',
    description: 'Women of strength and wisdom in leadership',
    memberCount: 38,
    captain: {
      name: 'Rebecca Thompson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'Esther Adams',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Hannah Lee',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#10B981', '#047857'],
    icon: 'crown.fill',
  },
  {
    id: 'queen-esther',
    name: 'Queen Esther',
    description: 'For such a time as this - serving with purpose',
    memberCount: 33,
    captain: {
      name: 'Esther Wilson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'Naomi Brown',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Miriam Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#F59E0B', '#D97706'],
    icon: 'sparkles',
  },
  {
    id: 'good-women',
    name: 'Good Women',
    description: 'Virtuous women building the kingdom',
    memberCount: 45,
    captain: {
      name: 'Priscilla Davis',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'Lydia Miller',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Tabitha Wilson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#EF4444', '#DC2626'],
    icon: 'person.2.fill',
  },
  {
    id: 'warden',
    name: 'Warden',
    description: 'Guardians of the church and its values',
    memberCount: 25,
    captain: {
      name: 'Samuel Thompson',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'Joshua Adams',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Caleb Lee',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#6B7280', '#374151'],
    icon: 'shield.lefthalf.filled',
  },
  {
    id: 'john-beloved',
    name: 'John Beloved',
    description: 'Beloved disciples walking in love and truth',
    memberCount: 31,
    captain: {
      name: 'Andrew Johnson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'Peter Wilson',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Philip Davis',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#06B6D4', '#0891B2'],
    icon: 'person.fill.checkmark',
  },
  {
    id: 'faith',
    name: 'Faith',
    description: 'Walking by faith, not by sight',
    memberCount: 29,
    captain: {
      name: 'Abraham Smith',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'Isaac Brown',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Jacob Wilson',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#8B5CF6', '#7C3AED'],
    icon: 'hands.sparkles.fill',
  },
  {
    id: 'holy-mary',
    name: 'Holy Mary',
    description: 'Blessed among women, serving with humility',
    memberCount: 37,
    captain: {
      name: 'Mary Magdalene',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    viceCaptain: {
      name: 'Martha Stewart',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Elizabeth Johnson',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#3B82F6', '#1D4ED8'],
    icon: 'star.circle.fill',
  },
];

export default function DirectoryBands() {
  const theme = useTheme();
  const router = useRouter();

  const BandCard = ({ band }: { band: any }) => (
    <Pressable
      onPress={() => router.push(`/directory/bands/${band.id}` as any)}
      className="mb-4 rounded-xl overflow-hidden"
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <LinearGradient
        colors={band.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 20, position: 'relative' }}
      >
        {/* Background Icon */}
        <View
          style={{ position: 'absolute', top: -10, right: -10, opacity: 0.2 }}
        >
          <IconSymbol name={band.icon} size={100} color="white" />
        </View>

        <View style={{ position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="bg-white/20 p-2 rounded-full mr-3">
                <IconSymbol name={band.icon} size={20} color="white" />
              </View>
              <View>
                <Text variant="h3" className="text-white font-bold">
                  {band.name}
                </Text>
                <Text variant="caption" className="text-white/80">
                  {band.memberCount} members
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color="white" />
          </View>

          {/* Description */}
          <Text variant="body" className="text-white/90 mb-4 leading-5">
            {band.description}
          </Text>

          {/* Leadership */}
          <View>
            <Text
              variant="caption"
              className="text-white/80 font-semibold mb-2"
            >
              LEADERSHIP
            </Text>
            <View className="flex-row items-center space-x-4">
              {/* Captain */}
              <View className="flex-row items-center">
                <Image
                  source={{ uri: band.captain.avatar }}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <View>
                  <Text variant="caption" className="text-white/60">
                    Captain
                  </Text>
                  <Text variant="caption" className="text-white font-semibold">
                    {band.captain.name}
                  </Text>
                </View>
              </View>

              {/* Vice Captain */}
              <View className="flex-row items-center">
                <Image
                  source={{ uri: band.viceCaptain.avatar }}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <View>
                  <Text variant="caption" className="text-white/60">
                    Vice Captain
                  </Text>
                  <Text variant="caption" className="text-white font-semibold">
                    {band.viceCaptain.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <View className="px-4 pt-4 pb-6">
        <Text
          variant="h2"
          className="font-bold mb-2"
          style={{ color: theme.heading }}
        >
          Church Bands
        </Text>
        <Text variant="body" style={{ color: theme.muted }}>
          Our various bands serving God with their unique purposes and callings
        </Text>

        {/* Stats */}
        <View className="flex-row mt-4 space-x-4">
          <View
            className="flex-1 rounded-lg p-3"
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text
              variant="h3"
              className="font-bold"
              style={{ color: theme.primary }}
            >
              {BANDS.length}
            </Text>
            <Text variant="caption" style={{ color: theme.muted }}>
              Total Bands
            </Text>
          </View>
          <View
            className="flex-1 rounded-lg p-3"
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text
              variant="h3"
              className="font-bold"
              style={{ color: theme.primary }}
            >
              {BANDS.reduce((total, band) => total + band.memberCount, 0)}
            </Text>
            <Text variant="caption" style={{ color: theme.muted }}>
              Total Members
            </Text>
          </View>
        </View>
      </View>

      {/* Bands List */}
      <FlatList
        data={BANDS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BandCard band={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
