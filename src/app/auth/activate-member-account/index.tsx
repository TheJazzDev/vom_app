import { BandBadge, Card, Text, View } from '@/src/components';
import { dispatch, useAuthSlice } from '@/src/store';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Email from './Email';
import Phone from './Phone';

export default function ActivateAccountScreen() {
  const router = useRouter();
  const { authType } = useLocalSearchParams<{ authType?: string }>();
  const { foundMember, clearError, clearFoundMember } = useAuthSlice();

  const handleBackToSearch = () => {
    router.push('/auth/find-member');
    dispatch(clearFoundMember());
    dispatch(clearError());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
    >
      <View gradient scrollable>
        <View className="items-center py-4 mb-1">
          <Text variant="h3" className="font-bold">
            Member Found!
          </Text>
          <Text className="text-center mt-1 text-gray-600 dark:text-gray-400 max-w-[90%]">
            We found your member profile in our database
          </Text>
        </View>

        <Card
          variant="outlined"
          className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-800"
        >
          <View className="items-center">
            <Text variant="h4" className="font-bold text-center">
              {foundMember?.title} {foundMember?.firstName}{' '}
              {foundMember?.lastName}
            </Text>

            {foundMember && (
              <View className="flex-row items-center gap-2 my-4">
                {foundMember.bandKeys?.length > 0 && (
                  <BandBadge
                    variant="outlined"
                    band={foundMember.bandKeys[0]}
                  />
                )}
                {foundMember.bandKeys?.length > 1 && (
                  <BandBadge
                    variant="outlined"
                    band={foundMember.bandKeys[1]}
                  />
                )}
                {foundMember.bandKeys?.length > 2 && (
                  <Text variant="overline" style={{ fontSize: 8 }}>
                    +{foundMember.bandKeys.length - 2} more
                  </Text>
                )}
              </View>
            )}

            <View className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm">
              <Text className="text-sm">
                Join Date: {foundMember?.joinDate}
              </Text>
            </View>
          </View>
        </Card>

        {authType === 'phone' && (
          <Phone handleBackToSearch={handleBackToSearch} />
        )}
        {authType === 'email' && (
          <Email handleBackToSearch={handleBackToSearch} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
