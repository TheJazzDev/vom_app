import { Link, Stack } from 'expo-router';

import { Text, View } from '@/src/components';

function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text variant="h3">This screen does not exist.</Text>
        <Link href="/home" className="mt-4 py-4">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

export default NotFoundScreen;
