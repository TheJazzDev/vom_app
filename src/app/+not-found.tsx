import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedTexted, ThemedView } from '@/src/components';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedTexted type='title'>This screen does not exist.</ThemedTexted>
        <Link href='/' style={styles.link}>
          <ThemedTexted type='link'>Go to home screen!</ThemedTexted>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
