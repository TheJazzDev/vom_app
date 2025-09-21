import { IconSymbol } from '@/src/components/Icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ActionButtons = () => {
  return (
    <View className="flex-row gap-3 mb-8">
      <TouchableOpacity className="flex-1 bg-blue-600 py-4 rounded-xl items-center">
        <View className="flex-row items-center">
          <IconSymbol name="phone.fill" size={18} color="white" />
          <Text className="text-white font-semibold ml-2">Call</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 bg-green-600 py-4 rounded-xl items-center">
        <View className="flex-row items-center">
          <IconSymbol name="envelope.fill" size={18} color="white" />
          <Text className="text-white font-semibold ml-2">Message</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
