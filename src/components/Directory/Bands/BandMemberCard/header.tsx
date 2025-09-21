import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
// import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export const bandMemberHeader = ({
  selectedBand,
  bandMembers,
  router,
}: {
  selectedBand: any;
  bandMembers: UserProfile[];
  router: any;
}) => {
  return (
    <View className="bg-white dark:bg-dark-background px-4 py-4 mb-4 border-b border-gray-200">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-lg bg-gray-100"
        >
          <IconSymbol name='arrow.left' size={24} color="#374151" />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-gray-900">
            {selectedBand?.name || 'BandData'}
          </Text>
          <Text className="text-sm text-gray-600 mt-0.5">
            {bandMembers?.length}{' '}
            {bandMembers?.length === 1 ? 'Member' : 'Members'}
          </Text>
        </View>

        <View className={`p-2 rounded-lg ${selectedBand?.gradient[0]}/10`}>
          <IconSymbol
            name={selectedBand?.icon}
            size={24}
            color={selectedBand?.gradient[0]}
          />
        </View>
      </View>
    </View>
  );
};
