import React from 'react';
import { IconSymbol } from '../../Icons';
import { Card, Text, View } from '../../UI';
import NoProgrammeState from '../components/NoProgrammeState';
import { ShiloServiceTemplate } from './ShiloService';
import { SundayServiceTemplate } from './SundayService';
import { VigilServiceTemplate } from './VigilService';

export const ProgrammeTemplateRenderer = ({
  programme,
}: {
  programme: AllProgrammes;
}) => {
  if (!programme) {
    return <NoProgrammeState />;
  }

  const programmeType = programme.type.toLowerCase();

  switch (programmeType) {
    case 'sunday':
      return <SundayServiceTemplate data={programme as SundayProgramme} />;
    case 'shiloh':
      return <ShiloServiceTemplate data={programme as ShilohProgramme} />;
    case 'vigil':
      return <VigilServiceTemplate data={programme as VigilProgramme} />;
    default:
      return (
        <View gradient scrollable>
          <View className="flex-1 justify-center items-center p-6">
            <Card className="p-6 w-full max-w-sm">
              <View className="items-center">
                <View className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mb-6">
                  <IconSymbol
                    name="exclamationmark.triangle"
                    size={32}
                    color="red"
                  />
                </View>

                <Text
                  variant="h4"
                  className="text-center mb-2 text-red-600 dark:text-red-400"
                >
                  Programme Error
                </Text>

                <Text className="text-center text-gray-600 dark:text-gray-400 mb-2">
                  Unknown programme type:
                </Text>

                <View className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg mb-4">
                  <Text className="text-gray-800 dark:text-gray-200 font-mono">
                    {programmeType}
                  </Text>
                </View>

                <Text className="text-center text-sm text-gray-500 dark:text-gray-500 mb-6">
                  This programme type is not supported yet. Please contact
                  support if this issue persists.
                </Text>
              </View>
            </Card>
          </View>
        </View>
      );
  }
};
