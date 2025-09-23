import { ProgrammeTemplateRenderer } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons';
import { Button, Card, Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { dispatch, useProgrammeSlice } from '@/src/store';
import { fetchProgrammeById } from '@/src/store/thunks/programme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const ProgrammeDetails = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { clearProgrammeById } = useProgrammeSlice();

  const { programmeById, isProgrammeByIdLoading, programmeByIdError } =
    useProgrammeSlice();

  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(fetchProgrammeById(id));
    }

    return () => {
      dispatch(clearProgrammeById());
    };
  }, [id, clearProgrammeById]);

  // Loading State
  if (isProgrammeByIdLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
        <View className="items-center">
          <ActivityIndicator size="large" color={theme.primary} />
          <Text
            variant="body"
            className="mt-4 text-gray-600 dark:text-gray-400"
          >
            Loading programme details...
          </Text>
        </View>
      </View>
    );
  }

  // Error State
  if (programmeByIdError) {
    return (
      <View gradient scrollable>
        <View className="flex-1 justify-center items-center">
          <Card className="p-6 w-full max-w-sm">
            <View className="items-center">
              <View className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mb-4">
                <IconSymbol
                  name="exclamationmark.triangle"
                  size={28}
                  color={theme.muted}
                />
              </View>

              <Text
                variant="h4"
                className="text-center mb-2 text-red-600 dark:text-red-400"
              >
                Failed to Load Programme
              </Text>

              <Text className="text-center text-gray-600 dark:text-gray-400 mb-4">
                {programmeByIdError}
              </Text>

              <View className="flex-row gap-3 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onPress={() => router.back()}
                >
                  <IconSymbol name="arrow.left" size={16} color={theme.muted} />
                  <Text className="ml-1">Go Back</Text>
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onPress={() => {
                    if (id && typeof id === 'string') {
                      dispatch(fetchProgrammeById(id));
                    }
                  }}
                >
                  <IconSymbol
                    name="arrow.clockwise"
                    size={16}
                    color={theme.muted}
                  />
                  <Text className="ml-1">Retry</Text>
                </Button>
              </View>
            </View>
          </Card>
        </View>
      </View>
    );
  }

  // No Programme Found State
  if (!programmeById) {
    return (
      <View gradient scrollable>
        <View className="flex-1 justify-center items-center">
          <Card className="p-6 w-full max-w-sm">
            <View className="items-center">
              <View className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-4">
                <IconSymbol name="doc.text" size={28} color={theme.muted} />
              </View>

              <Text
                variant="h4"
                className="text-center mb-2 text-gray-900 dark:text-gray-100"
              >
                Programme Not Found
              </Text>

              <Text className="text-center text-gray-600 dark:text-gray-400 mb-4">
                The programme you&apos;re looking for doesn&apos;t exist or may
                have been removed.
              </Text>

              <Button
                variant="outline"
                size="sm"
                onPress={() => router.back()}
                className="w-full"
              >
                <IconSymbol name="arrow.left" size={16} color={theme.muted} />
                <Text className="ml-1">Go Back</Text>
              </Button>
            </View>
          </Card>
        </View>
      </View>
    );
  }

  // Success State - Render the programme
  return <ProgrammeTemplateRenderer programme={programmeById} />;
};

export default ProgrammeDetails;
