import { useRouter } from 'expo-router';
import { IconSymbol } from '../../Icons';
import { Button, Text, View } from '../../UI';

const NoProgrammeState = () => {
  const router = useRouter();

  return (
    <View gradient className="flex-col h-5/6 px-4">
      <View className="flex-1 items-center mt-12">
        <View className="mb-6 w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center shadow-lg">
          <IconSymbol name="building.2" size={64} color="#3b82f6" />
        </View>
        <Text variant="h4">There are no services currently in progress</Text>

        <Button
          variant="outline"
          onPress={() => router.push('/programme/upcoming')}
          className="w-full mt-6"
        >
          {/* <IconSymbol name="calendar" size={16} color={theme.muted} /> */}
          <Text>View Upcoming Services</Text>
        </Button>
      </View>

      <View className="items-center flex-">
        <IconSymbol name="quote.opening" size={24} color="#6b7280" />
        <Text
          variant="body"
          className="text-center italic mt-3 mb-2 text-gray-700 dark:text-gray-300"
        >
          &quot;But those who hope in the Lord will renew their strength. They
          will soar on wings like eagles.&quot;
        </Text>
        <Text variant="caption" className="text-gray-500 dark:text-gray-400">
          Isaiah 40:31
        </Text>
      </View>
    </View>
  );
};

export default NoProgrammeState;
