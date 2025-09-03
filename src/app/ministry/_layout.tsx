// ministry/_layout.tsx
import { Stack } from 'expo-router';

export default function MinistryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Ministry",
          headerShown: false // Let drawer handle this
        }}
      />
      <Stack.Screen
        name="bible-study"
        options={{ title: "Bible Study" }}
      />
      <Stack.Screen
        name="recent-sermons"
        options={{ title: "Recent Sermons" }}
      />
      <Stack.Screen
        name="prayer-request"
        options={{ title: "Prayer Requests" }}
      />
      <Stack.Screen
        name="testimonies"
        options={{ title: "Testimonies" }}
      />
    </Stack>
  );
}
