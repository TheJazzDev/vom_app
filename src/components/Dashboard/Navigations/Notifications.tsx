import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export const Notifications = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(ROUTES.NOTIFICATIONS)}
      style={{ marginRight: 0 }}
    >
      <Ionicons size={24} name="notifications" color={theme.muted} />
    </TouchableOpacity>
  );
};
