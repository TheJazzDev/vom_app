import React from 'react';
import { ScrollView, View } from 'react-native';
import { IconSymbol } from '../../Icons';
import { Text } from '../../UI';
import NoProgrammeState from '../components/NoProgrammeState';
import { ShiloServiceTemplate } from './ShiloService';
import { SundayServiceTemplate } from './SundayService';
import { VigilServiceTemplate } from './VigilService';

interface ProgrammeTemplateRendererProps {
  programme: SundayProgramme | ShiloProgramme | VigilProgramme | null;
}

export const ProgrammeTemplateRenderer: React.FC<
  ProgrammeTemplateRendererProps
> = ({ programme }) => {
  if (!programme) {
    return <NoProgrammeState />;
  }

  const programmeType = programme.type.toLowerCase();

  switch (programmeType) {
    case 'sunday':
      return <SundayServiceTemplate data={programme as SundayProgramme} />;
    case 'shilo':
      return <ShiloServiceTemplate data={programme as ShiloProgramme} />;
    case 'vigil':
      return <VigilServiceTemplate data={programme as VigilProgramme} />;
    default:
      return (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, flexGrow: 1 }}
        >
          <View className="flex-1 justify-center items-center p-8">
            <View className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mb-6">
              <IconSymbol
                name="exclamationmark.triangle"
                size={32}
                color="#dc2626"
              />
            </View>
            <Text
              variant="h4"
              className="text-center mb-2 font-semibold text-red-600 dark:text-red-400"
            >
              Programme Error
            </Text>
            <Text className="text-center text-gray-600 dark:text-gray-400">
              Unknown programme type: "{programmeType}"
            </Text>
            <Text className="text-center text-sm text-gray-500 dark:text-gray-500 mt-2">
              Please contact support if this issue persists
            </Text>
          </View>
        </ScrollView>
      );
  }
};
