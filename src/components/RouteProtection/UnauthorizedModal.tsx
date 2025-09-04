import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { BackHandler, Modal, Pressable, View } from 'react-native';

interface UnauthorizedModalProps {
  visible: boolean;
  onClose: () => void;
  route: string;
  routeName?: string;
}

export function UnauthorizedModal({
  visible,
  onClose,
  route,
  routeName,
}: UnauthorizedModalProps) {
  const theme = useTheme();
  const router = useRouter();

  // Get user-friendly route name and description
  const getRouteInfo = (path: string) => {
    const routeMap: Record<string, { name: string; description: string }> = {
      '/directory/members': {
        name: 'Members Directory',
        description:
          'Browse our church member directory, view member profiles, and connect with fellow believers.',
      },
      '/directory/children': {
        name: 'Children Directory',
        description:
          'Access children information, classes, and activities for our young church family.',
      },
      '/directory/bands': {
        name: 'Church Bands',
        description:
          'Explore our church bands, their members, and leadership structure.',
      },
      '/directory/departments': {
        name: 'Church Departments',
        description:
          'View all church departments, their activities, and how to get involved.',
      },
      '/ministry/prayer-request': {
        name: 'Prayer Requests',
        description:
          'Submit prayer requests and pray for fellow members in our prayer community.',
      },
      '/ministry/testimonies': {
        name: 'Testimonies',
        description:
          'Share your testimony and read inspiring stories from our church family.',
      },
      '/profile': {
        name: 'Your Profile',
        description:
          'Manage your church profile, update personal information, and track your involvement.',
      },
      '/notifications': {
        name: 'Notifications',
        description:
          'Receive personalized church updates, event reminders, and important announcements.',
      },
      '/settings': {
        name: 'Settings',
        description:
          'Customize your app preferences and manage your account settings.',
      },
    };

    return (
      routeMap[path] || {
        name: routeName || 'This Content',
        description: 'Access member-exclusive content and features.',
      }
    );
  };

  const routeInfo = getRouteInfo(route);

  const handleSignIn = () => {
    onClose();
    router.push('/auth' as any);
  };

  const handleClose = () => {
    onClose();
    // router.back();
  };

  // Prevent back button from closing modal on Android
  React.useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onClose();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View
          className="w-full max-w-sm rounded-2xl overflow-hidden"
          style={{ backgroundColor: theme.background }}
        >
          {/* Header with gradient */}
          <LinearGradient
            colors={[theme.primary, theme.secondary || theme.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingVertical: 16, alignItems: 'center' }}
          >
            <View className="bg-white/20 p-4 rounded-full mb-4">
              <IconSymbol name="lock" size={32} color="white" />
            </View>
            <Text variant="h3" className="text-white font-bold text-center">
              Members Only
            </Text>
          </LinearGradient>

          {/* Content */}
          <View className="p-6">
            <Text
              variant="h4"
              className="font-bold mb-1 text-center"
              style={{ color: theme.heading }}
            >
              {routeInfo.name}
            </Text>

            <Text
              variant="subtitle2"
              className="text-center mb-4"
              style={{ color: theme.muted }}
            >
              {routeInfo.description}
            </Text>

            <View
              className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6"
              style={{
                backgroundColor: `${theme.primary}08`,
                borderColor: `${theme.primary}30`,
              }}
            >
              <View className="flex-row items-center mb-2">
                <IconSymbol
                  name="info.circle.fill"
                  size={20}
                  color={theme.primary}
                />
                <Text
                  variant="h5"
                  className="ml-2 font-semibold"
                  style={{ color: theme.primary }}
                >
                  Authentication Required
                </Text>
              </View>
              <Text
                variant="body"
                className="leading-5"
                style={{ color: theme.text }}
              >
                Only signed-in church members can access this content. Join our
                church family to unlock all features!
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="gap-4">
              <Pressable
                onPress={handleSignIn}
                className="bg-primary rounded-lg py-4 px-6"
                android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
              >
                <View className="flex-row items-center justify-center">
                  <IconSymbol
                    name="person.badge.plus"
                    size={20}
                    color="white"
                  />
                  <Text variant="button" className="text-white font-bold ml-2">
                    Join Us
                  </Text>
                </View>
              </Pressable>

              <View className="flex-row">
                <Pressable
                  onPress={handleClose}
                  className="flex-1 border rounded-lg py-3 px-4"
                  style={{ borderColor: theme.border }}
                  android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
                >
                  <View className="flex-row items-center justify-center">
                    <IconSymbol name="x.circle" size={16} color={theme.muted} />
                    <Text
                      variant="button"
                      className="font-semibold ml-2"
                      style={{ color: theme.text }}
                    >
                      Close
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>

            {/* Church Info */}
            <View
              className="mt-6 pt-4 border-t"
              style={{ borderColor: theme.border }}
            >
              <Text
                variant="caption"
                className="text-center leading-5"
                style={{ color: theme.muted }}
              >
                Valley of Mercy Church welcomes everyone. Sign up to become part
                of our growing community and access member features.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
