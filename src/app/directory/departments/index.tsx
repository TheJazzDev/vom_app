import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FlatList, Image, Pressable, View } from 'react-native';

// Updated department data based on your actual departments
const DEPARTMENTS = [
  {
    id: 'interpretation',
    name: 'Interpretation',
    description:
      'Translating and interpreting services for multilingual congregation',
    memberCount: 18,
    ageRange: '18+ years',
    head: {
      name: 'Sister Grace Adebayo',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Brother Samuel Okafor',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Sister Mercy Bello',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#3B82F6', '#1E40AF'],
    icon: 'bubble.left.and.bubble.right.fill',
    meetingDay: 'Thursdays 6:00 PM',
  },
  {
    id: 'programme',
    name: 'Programme',
    description:
      'Planning, organizing and coordinating all church events and services',
    memberCount: 25,
    ageRange: '18+ years',
    head: {
      name: 'Deacon John Ogundimu',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Sister Faith Akinola',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Brother Daniel Okoro',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#10B981', '#047857'],
    icon: 'calendar.badge.plus',
    meetingDay: 'Tuesdays 7:00 PM',
  },
  {
    id: 'media',
    name: 'Media',
    description:
      'Managing church communications, photography, and video production',
    memberCount: 22,
    ageRange: '16+ years',
    head: {
      name: 'Brother David Okechukwu',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Sister Jennifer Adamu',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Brother Michael Ezeonu',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#8B5CF6', '#7C3AED'],
    icon: 'camera.fill',
    meetingDay: 'Wednesdays 6:30 PM',
  },
  {
    id: 'treasury',
    name: 'Treasury',
    description:
      'Managing church finances, tithes, offerings and financial records',
    memberCount: 12,
    ageRange: '21+ years',
    head: {
      name: 'Elder Paul Eze',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Sister Ruth Adegbite',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Brother Emmanuel Nwoke',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#F59E0B', '#D97706'],
    icon: 'dollarsign.circle.fill',
    meetingDay: 'Fridays 7:30 PM',
  },
  {
    id: 'technical',
    name: 'Technical',
    description:
      'Sound engineering, lighting, and audiovisual equipment management',
    memberCount: 20,
    ageRange: '16+ years',
    head: {
      name: 'Brother Joshua Afolabi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Brother Peter Emeka',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Sister Esther Ogbonna',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#06B6D4', '#0891B2'],
    icon: 'speaker.wave.3.fill',
    meetingDay: 'Saturdays 5:00 PM',
  },
  {
    id: 'drama',
    name: 'Drama',
    description:
      'Theatrical performances, skits, and creative presentations for ministry',
    memberCount: 30,
    ageRange: '12+ years',
    head: {
      name: 'Sister Mary Chukwu',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Brother Stephen Udoh',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Sister Joy Anioma',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#EC4899', '#BE185D'],
    icon: 'theatermasks.fill',
    meetingDay: 'Saturdays 3:00 PM',
  },
  {
    id: 'it',
    name: 'IT',
    description:
      'Information Technology, website management, and digital infrastructure',
    memberCount: 15,
    ageRange: '18+ years',
    head: {
      name: 'Brother Abraham Okafor',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Sister Rebecca Ojo',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Brother Isaac Nnamdi',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#6366F1', '#4338CA'],
    icon: 'desktopcomputer',
    meetingDay: 'Thursdays 7:00 PM',
  },
  {
    id: 'evangelism',
    name: 'Evangelism',
    description: 'Spreading the Gospel, soul winning, and outreach programs',
    memberCount: 45,
    ageRange: '16+ years',
    head: {
      name: 'Evangelist Matthew Ikenna',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Sister Deborah Akpan',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Brother Timothy Nwosu',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#EF4444', '#DC2626'],
    icon: 'megaphone.fill',
    meetingDay: 'Saturdays 4:00 PM',
  },
  {
    id: 'sanitation',
    name: 'Sanitation',
    description:
      'Maintaining cleanliness and hygiene throughout church premises',
    memberCount: 35,
    ageRange: '16+ years',
    head: {
      name: 'Sister Hannah Ugwu',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
    },
    assistant: {
      name: 'Brother James Okwu',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    },
    secretary: {
      name: 'Sister Patience Obi',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    },
    gradient: ['#10B981', '#059669'],
    icon: 'sparkles',
    meetingDay: 'Saturdays 8:00 AM',
  },
];

export default function DirectoryDepartments() {
  const theme = useTheme();
  const router = useRouter();

  const DepartmentCard = ({ department }: { department: any }) => (
    <Pressable
      onPress={() =>
        router.push(`/directory/departments/${department.id}` as any)
      }
      className="mb-4 rounded-xl overflow-hidden"
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <LinearGradient
        colors={department.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 20, position: 'relative', minHeight: 160 }}
      >
        {/* Background Icon */}
        <View
          style={{ position: 'absolute', top: -20, right: -20, opacity: 0.15 }}
        >
          <IconSymbol name={department.icon} size={120} color="white" />
        </View>

        <View style={{ position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center flex-1">
              <View className="bg-white/20 p-2 rounded-full mr-3">
                <IconSymbol name={department.icon} size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text
                  variant="h3"
                  className="text-white dark:text-gray-200 font-bold"
                >
                  {department.name}
                </Text>
                <Text
                  variant="caption"
                  className="text-white/80 dark:text-gray-200"
                >
                  {department.memberCount} members • {department.ageRange}
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color="white" />
          </View>

          {/* Description */}
          <Text
            variant="body"
            className="text-white/90 dark:text-gray-200 mb-4 leading-5"
          >
            {department.description}
          </Text>

          {/* Meeting Info */}
          <View className="bg-white/20 rounded-lg p-3 mb-3">
            <View className="flex-row items-center">
              <IconSymbol name="calendar" size={16} color="white" />
              <Text
                variant="caption"
                className="text-white dark:text-gray-200 ml-2 font-semibold"
              >
                {department.meetingDay}
              </Text>
            </View>
          </View>

          {/* Leadership */}
          <View>
            <Text
              variant="caption"
              className="text-white/80 dark:text-gray-100 font-semibold mb-2"
            >
              LEADERSHIP
            </Text>
            <View className="flex-row justify-between">
              {/* Head */}
              <View className="flex-1 mr-3">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: department.head.avatar }}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <View>
                    <Text
                      variant="caption"
                      className="text-white/60 dark:text-gray-100"
                    >
                      Head
                    </Text>
                    <Text
                      variant="caption"
                      className="text-white dark:text-gray-200 font-semibold"
                      numberOfLines={1}
                    >
                      {department.head.name}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Assistant */}
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: department.assistant.avatar }}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <View>
                    <Text
                      variant="caption"
                      className="text-white/60 dark:text-gray-100"
                    >
                      Assistant
                    </Text>
                    <Text
                      variant="caption"
                      className="text-white dark:text-gray-200 font-semibold"
                      numberOfLines={1}
                    >
                      {department.assistant.name}
                    </Text>
                  </View>
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
          Church Departments
        </Text>
        <Text variant="body" style={{ color: theme.muted }}>
          Various ministries serving God and building His kingdom
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
              {DEPARTMENTS.length}
            </Text>
            <Text variant="caption" style={{ color: theme.muted }}>
              Departments
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
              {DEPARTMENTS.reduce((total, dept) => total + dept.memberCount, 0)}
            </Text>
            <Text variant="caption" style={{ color: theme.muted }}>
              Total Members
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
              27
            </Text>
            <Text variant="caption" style={{ color: theme.muted }}>
              Leaders
            </Text>
          </View>
        </View>
      </View>

      {/* Departments List */}
      <FlatList
        data={DEPARTMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DepartmentCard department={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />

      {/* Join Department CTA */}
      <View className="mx-4 mb-4">
        <LinearGradient
          colors={[theme.primary, theme.secondary || theme.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 12, padding: 16 }}
        >
          <View className="flex-row items-center">
            <View className="bg-white/20 p-3 rounded-full mr-4">
              <IconSymbol name="person.badge.plus" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text variant="h4" className="text-white font-bold mb-1">
                Want to Join a Department?
              </Text>
              <Text variant="body" className="text-white/90">
                Contact any department head or speak to a pastor
              </Text>
            </View>
            <IconSymbol
              name="arrow.right.circle.fill"
              size={24}
              color="white"
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
