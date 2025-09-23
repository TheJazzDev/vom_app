import { useTheme } from '@/src/hooks';
import { useProtectedNavigation } from '@/src/hooks/useProtectedNavigation';
import { Href, usePathname, useRouter } from 'expo-router';
import { Platform, Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Text, View } from '../UI';

type DrawerItemProps = {
  props: any;
  label: string;
  route: string;
  iconName: any;
  badge?: string;
};

// const TAB_ROUTES: string[] = ['/', '/programme', '/directory', '/ministry'];

const DrawerItem = ({
  props,
  label,
  route,
  iconName,
  badge,
}: DrawerItemProps) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { canAccess } = useProtectedNavigation();

  const showLock = !canAccess(route);
  const focused = pathname === route;

  // const handlePress = () => {
  //   if (TAB_ROUTES.includes(route)) {
  //     router.push(route as Href);
  //   } else if (props?.navigation) {
  //     props.navigation.navigate(stripLeadingSlash(route));
  //   }
  // };

  return (
    <Pressable
      onPress={() => router.push(route as Href)}
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
      className={`flex-row items-center py-3 px-4 mb-1 rounded-lg ${
        focused ? 'bg-primary' : ''
      }`}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? theme.secondary
            : focused
              ? theme.primary
              : 'transparent',
          opacity: showLock ? 0.7 : 1,
        },
      ]}
    >
      <View className="flex-row items-center flex-1">
        <IconSymbol
          name={iconName}
          color={focused ? theme.natural : theme.muted}
          size={Platform.OS === 'ios' ? 20 : 18}
        />
        <Text
          style={{
            marginLeft: 16,
            fontWeight: 600,
            color: focused ? theme.natural : theme.muted,
          }}
        >
          {label}
        </Text>
      </View>

      <View className="flex-row items-center">
        {badge && (
          <View className="bg-red-500 rounded-full px-2 py-1 mr-2">
            <Text variant="caption" className="text-white font-bold">
              {badge}
            </Text>
          </View>
        )}
        {showLock && <IconSymbol name="lock" size={16} color={theme.muted} />}
      </View>
    </Pressable>
  );
};

export default DrawerItem;
