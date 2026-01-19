import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useNotificationSlice } from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Text, View } from '../../UI';

export const Notifications = () => {
  const theme = useTheme();
  const router = useRouter();
  const { unreadCount } = useNotificationSlice();

  return (
    <TouchableOpacity
      onPress={() => router.push(ROUTES.NOTIFICATIONS)}
      style={{ marginRight: 0, position: 'relative' }}
    >
      <Ionicons size={24} name="notifications" color={theme.muted} />
      {unreadCount > 0 && (
        <View
          className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1"
          style={{
            borderWidth: 2,
            borderColor: theme.background,
          }}
        >
          <Text className="text-white text-[10px] font-bold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
