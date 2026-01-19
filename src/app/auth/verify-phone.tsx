import { Text, View } from '@/src/components';
import { dispatch, useAuthSlice, verifyPhoneAndSignInThunk } from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';

const verificationSchema = yup.object().shape({
  d1: yup.string().required().length(1),
  d2: yup.string().required().length(1),
  d3: yup.string().required().length(1),
  d4: yup.string().required().length(1),
});

type FormData = yup.InferType<typeof verificationSchema>;

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { error, foundMember, isActivatingMemberAccount, clearError } =
    useAuthSlice();

  const phoneNumber = params.phoneNumber as string;
  const verificationId = params.verificationId as string;

  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: yupResolver(verificationSchema),
    defaultValues: { d1: '', d2: '', d3: '', d4: '' },
  });

  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const code = Object.values(watch()).join('');

  const onSubmit = async (data: FormData) => {
    dispatch(clearError());
    const verificationCode = Object.values(data).join('');
    try {
      const result = await dispatch(
        verifyPhoneAndSignInThunk({
          member: foundMember as UserProfile,
          verificationId,
          code: verificationCode,
        }),
      );

      if (verifyPhoneAndSignInThunk.fulfilled.match(result)) {
        router.replace('/');
      }
    } catch (error: any) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-6">
          <Text variant="h2">Verify Phone Number</Text>
          <Text className="text-center mt-2 text-gray-600 dark:text-gray-300 max-w-[90%]">
            We&apos;ve sent a 4-digit verification code to
          </Text>
          <Text className="text-center font-semibold text-lg mt-1">
            {phoneNumber}
          </Text>
        </View>

        {/* 4-digit input */}
        <View className="flex-row justify-center gap-4 mb-6">
          {['d1', 'd2', 'd3', 'd4'].map((name, idx) => (
            <Controller
              key={name}
              control={control}
              name={name as keyof FormData}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  ref={inputs[idx]}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    if (text && idx < 3) inputs[idx + 1].current?.focus();
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && !value && idx > 0) {
                      inputs[idx - 1].current?.focus();
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl border rounded-lg"
                />
              )}
            />
          ))}
        </View>

        {/* Error */}
        {error && (
          <View className="mb-4 p-3 bg-red-50 rounded-lg">
            <Text className="text-red-600 text-center text-sm">{error}</Text>
          </View>
        )}

        {/* Verify Button */}
        <TouchableOpacity
          disabled={isActivatingMemberAccount || code.length !== 4}
          onPress={handleSubmit(onSubmit)}
          className={`py-4 rounded-lg mb-6 ${
            isActivatingMemberAccount || code.length !== 4
              ? 'bg-gray-400'
              : 'bg-blue-500'
          }`}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isActivatingMemberAccount ? 'Verifying...' : 'Verify Code'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
