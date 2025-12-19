import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useNavigationSource, useTheme } from '@/src/hooks';
import { useAnnouncementSlice } from '@/src/store/slices';
import { dispatch } from '@/src/store/store';
import { fetchAnnouncementById } from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

export default function AnnouncementDetail() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sourceRoute, clearSourceRoute } = useNavigationSource();

  const { announcementById, isAnnouncementByIdLoading, announcementByIdError } =
    useAnnouncementSlice();

  const handleBack = () => {
    if (sourceRoute) {
      clearSourceRoute();
      router.replace(sourceRoute as any);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchAnnouncementById(id));
    }
  }, [id]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return theme.muted;
    }
  };

  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      event: '#3B82F6',
      info: '#10B981',
      volunteer: '#F59E0B',
      financial: '#8B5CF6',
      registration: '#EF4444',
      general: '#6B7280',
    };
    return typeColors[type] || theme.muted;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isAnnouncementByIdLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text
          variant="body"
          className="mt-4"
          style={{ color: theme.muted }}
        >
          Loading announcement...
        </Text>
      </View>
    );
  }

  if (announcementByIdError || !announcementById) {
    return (
      <View
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: theme.background }}
      >
        <IconSymbol name="exclamationmark.triangle" size={48} color={theme.muted} />
        <Text
          variant="h3"
          className="mt-4 font-semibold text-center"
          style={{ color: theme.heading }}
        >
          Announcement Not Found
        </Text>
        <Text
          variant="body"
          className="mt-2 text-center"
          style={{ color: theme.muted }}
        >
          {announcementByIdError || 'This announcement could not be loaded.'}
        </Text>
        <Pressable
          onPress={handleBack}
          className="mt-6 px-6 py-3 rounded-full"
          style={{ backgroundColor: theme.primary }}
        >
          <Text variant="body" className="text-white font-semibold">
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient
        colors={[getTypeColor(announcementById.type), '#DC2626']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-4">
          <Pressable
            onPress={handleBack}
            className="bg-white/20 p-2 rounded-full mr-3"
          >
            <IconSymbol name="chevron.left" size={24} color="white" />
          </Pressable>
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <View
                className="px-3 py-1 rounded-full mr-2"
                style={{
                  backgroundColor: `${getPriorityColor(announcementById.priority)}`,
                }}
              >
                <Text
                  variant="caption"
                  className="text-white font-semibold capitalize"
                >
                  {announcementById.priority} Priority
                </Text>
              </View>
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Text
                  variant="caption"
                  className="text-white font-semibold capitalize"
                >
                  {announcementById.type}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text variant="h2" className="text-white font-bold mb-2">
          {announcementById.title}
        </Text>

        <View className="flex-row items-center">
          <IconSymbol name="calendar" size={16} color="white" />
          <Text variant="body" className="text-white/90 ml-2">
            {formatDate(announcementById.date)}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Author & Read Time */}
        <View
          className="flex-row items-center justify-between p-4 rounded-xl mb-4"
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <View className="flex-row items-center flex-1">
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: `${theme.primary}15` }}
            >
              <IconSymbol name="person.fill" size={20} color={theme.primary} />
            </View>
            <View className="flex-1">
              <Text
                variant="caption"
                className="mb-1"
                style={{ color: theme.muted }}
              >
                Posted by
              </Text>
              <Text
                variant="body"
                className="font-semibold"
                style={{ color: theme.heading }}
              >
                {announcementById.author}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <IconSymbol name="clock" size={16} color={theme.muted} />
            <Text
              variant="caption"
              className="ml-1"
              style={{ color: theme.muted }}
            >
              {announcementById.readTime}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View
          className="p-4 rounded-xl mb-4"
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text
            variant="h4"
            className="font-semibold mb-3"
            style={{ color: theme.heading }}
          >
            Announcement Details
          </Text>
          <Text
            variant="body"
            className="leading-7"
            style={{ color: theme.text }}
          >
            {announcementById.content}
          </Text>
        </View>

        {/* Tags */}
        {announcementById.tags && announcementById.tags.length > 0 && (
          <View
            className="p-4 rounded-xl"
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text
              variant="h4"
              className="font-semibold mb-3"
              style={{ color: theme.heading }}
            >
              Related Topics
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {announcementById.tags.map((tag, index) => (
                <View
                  key={index}
                  className="px-3 py-2 rounded-full"
                  style={{ backgroundColor: `${theme.primary}10` }}
                >
                  <Text variant="body" style={{ color: theme.primary }}>
                    #{tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
