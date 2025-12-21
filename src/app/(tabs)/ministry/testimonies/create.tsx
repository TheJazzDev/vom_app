import { CreateTestimonyForm } from '@/src/components/Testimony';
import { useTheme } from '@/src/hooks';
import { useAuthSlice, useTestimonySlice } from '@/src/store/slices';
import { createTestimonyThunk } from '@/src/store/thunks';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';
import type { TestimonyCategory } from '@/src/services/testimony';

export default function CreateTestimonyScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useAuthSlice();
  const { isCreatingTestimony, successMessage, error } = useTestimonySlice();

  useEffect(() => {
    if (successMessage) {
      Alert.alert('Praise God!', successMessage, [
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
      category: TestimonyCategory;
      isAnonymous: boolean;
      mediaUrls: string[];
    }) => {
      if (!user?.id) {
        Alert.alert('Error', 'You must be logged in to share a testimony');
        return;
      }

      await dispatch(
        createTestimonyThunk({
          title: data.title,
          content: data.content,
          category: data.category,
          status: 'approved',
          isAnonymous: data.isAnonymous,
          authorId: user.id,
          authorName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Member',
          authorAvatar: user.profilePic || null,
          mediaUrls: data.mediaUrls,
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
          title: 'Share Testimony',
          headerBackTitle: 'Back',
        }}
      />
      <CreateTestimonyForm
        onSubmit={handleSubmit}
        isLoading={isCreatingTestimony}
      />
    </SafeAreaView>
  );
}
