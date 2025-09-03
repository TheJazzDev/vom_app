import { getCurrentTimeGreeting } from '@/src/utils';
import { ScrollView } from 'react-native';
import { IconSymbol } from '../../Icons';
import { Text, View } from '../../UI';

const NoProgrammeState = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        height: '95%',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center mt-6">
        <View className="w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center shadow-lg">
          <IconSymbol name="building.2" size={64} color="#3b82f6" />
        </View>
        <Text variant="h3" className="text-center mb-2 font-bold mt-6">
          {getCurrentTimeGreeting()}!
        </Text>
        <Text
          variant="h5"
          className="text-center text-gray-600 dark:text-gray-400"
        >
          No service is currently in progress
        </Text>
        <Text
          variant="body"
          className="text-center mb-6 text-gray-600 dark:text-gray-400"
        >
          Please check upcoming sections
        </Text>
      </View>

      <View className="items-center">
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
    </ScrollView>
  );
};

export default NoProgrammeState;
