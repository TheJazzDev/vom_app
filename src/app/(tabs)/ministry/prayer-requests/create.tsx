import { CreatePrayerRequestForm } from '@/src/components/PrayerRequest';
import { useTheme } from '@/src/hooks';
import { useAuthSlice, usePrayerRequestSlice } from '@/src/store/slices';
import { createPrayerRequestThunk } from '@/src/store/thunks';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';
import type { PrayerRequestCategory } from '@/src/services/prayerRequest';

export default function CreatePrayerRequestScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useAuthSlice();
  const { isCreatingRequest, successMessage, error } = usePrayerRequestSlice();

  useEffect(() => {
    if (successMessage) {
      Alert.alert('Success', successMessage, [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  }, [successMessage, router]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleSubmit = useCallback(
    async (data: {
      title: string;
      content: string;
      category: PrayerRequestCategory;
      isAnonymous: boolean;
      isUrgent: boolean;
    }) => {
      if (!user?.odUserId) {
        Alert.alert('Error', 'You must be logged in to submit a prayer request');
        return;
      }

      await dispatch(
        createPrayerRequestThunk({
          title: data.title,
          content: data.content,
          category: data.category,
          status: 'active',
          isAnonymous: data.isAnonymous,
          isUrgent: data.isUrgent,
          authorId: user.odUserId,
          authorName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Member',
          authorAvatar: user.profilePic || null,
        })
      );
    },
    [dispatch, user]
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <Stack.Screen
        options={{
          title: 'New Prayer Request',
          headerBackTitle: 'Back',
        }}
      />
      <CreatePrayerRequestForm
        onSubmit={handleSubmit}
        isLoading={isCreatingRequest}
      />
    </SafeAreaView>
  );
}
