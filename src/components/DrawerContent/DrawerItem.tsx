import { useTheme } from '@/src/hooks';
import { dispatch, logoutThunk } from '@/src/store';
import { usePathname, useRouter } from 'expo-router';
import { Platform, Pressable, Text } from 'react-native';
import { IconSymbol } from '../Icons';

type DrawerItemProps = {
  label: string;
  route: any;
  iconName: any;
};

const DrawerItem = ({ label, route, iconName }: DrawerItemProps) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const focused = pathname === route;

  const onPress = () => {
    return route === '/logout'
      ? dispatch(logoutThunk())
      : router.replace(route);
  };

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
      className={`flex-row items-center py-4 px-4 rounded-lg ${
        focused ? 'bg-primary ' : ''
      }`}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? theme.secondary : 'transparent',
        },
      ]}
    >
      <IconSymbol
        name={iconName}
        color={
          focused ? theme.natural : route === '/logout' ? 'red' : theme.muted
        }
        size={Platform.OS === 'ios' ? 24 : 20}
      />
      <Text
        style={{
          fontSize: 14,
          marginLeft: 16,
          fontWeight: 600,
          color: focused
            ? theme.natural
            : route === '/logout'
              ? 'red'
              : theme.muted,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default DrawerItem;
