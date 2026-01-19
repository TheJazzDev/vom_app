import { useTheme } from '@/src/hooks';
import { getStackScreenOptions } from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';

export default function TestimoniesLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={getStackScreenOptions(theme)}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Testimonies',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Testimony',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'Share Testimony',
          presentation: 'fullScreenModal',
          animation: 'fade',
        }}
      />
    </Stack>
  );
}
