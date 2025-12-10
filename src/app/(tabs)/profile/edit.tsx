import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { Card, Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { dispatch, useAuthSlice } from '@/src/store';
import { updateUserProfileThunk } from '@/src/store/thunks/auth';
import { getUserInitials } from '@/src/utils';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';

export default function EditProfile() {
  const theme = useTheme();
  const router = useRouter();
  const { currentUser } = useAuthSlice();
  const [isSaving, setIsSaving] = useState(false);

  // Editable fields state
  const [primaryPhone, setPrimaryPhone] = useState(
    currentUser?.primaryPhone || '',
  );
  const [secondaryPhone, setSecondaryPhone] = useState(
    currentUser?.secondaryPhone || '',
  );
  const [address, setAddress] = useState(currentUser?.address || '');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update user profile in database
      await dispatch(
        updateUserProfileThunk({
          primaryPhone,
          secondaryPhone,
          address,
        }),
      ).unwrap();

      Alert.alert('Success', 'Your profile has been updated successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert(
        'Error',
        'Failed to update profile. Please try again.',
        [{ text: 'OK' }],
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard changes?',
      [
        {
          text: 'Keep Editing',
          style: 'cancel',
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => router.back(),
        },
      ],
    );
  };

  const ReadOnlyField = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string;
    icon?: string;
  }) => (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        {icon && (
          <IconSymbol
            name={icon as any}
            size={16}
            color={theme.muted}
            style={{ marginRight: 6 }}
          />
        )}
        <Text
          variant="caption"
          className="font-semibold"
          style={{ color: theme.muted }}
        >
          {label}
        </Text>
        <View
          className="ml-2 px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${theme.muted}15` }}
        >
          <Text
            variant="caption"
            className="text-xs"
            style={{ color: theme.muted }}
          >
            Read-only
          </Text>
        </View>
      </View>
      <View
        className="px-4 py-3 rounded-lg"
        style={{
          backgroundColor: `${theme.muted}10`,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Text variant="body" style={{ color: theme.text }}>
          {value}
        </Text>
      </View>
    </View>
  );

  const EditableField = ({
    label,
    value,
    onChangeText,
    placeholder,
    icon,
    keyboardType = 'default',
    multiline = false,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    icon?: string;
    keyboardType?: 'default' | 'email-address' | 'phone-pad';
    multiline?: boolean;
  }) => (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        {icon && (
          <IconSymbol
            name={icon as any}
            size={16}
            color={theme.primary}
            style={{ marginRight: 6 }}
          />
        )}
        <Text
          variant="caption"
          className="font-semibold"
          style={{ color: theme.heading }}
        >
          {label}
        </Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.muted}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: multiline ? 12 : 14,
          fontSize: 15,
          color: theme.text,
          minHeight: multiline ? 80 : 50,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
    </View>
  );

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Photo Section */}
      <View className="px-4 py-6 items-center">
        <View className="relative mb-3">
          <View
            className="w-28 h-28 rounded-full overflow-hidden"
            style={{
              borderWidth: 3,
              borderColor: theme.primary,
            }}
          >
            {currentUser?.avatar ? (
              <Image
                source={{ uri: currentUser.avatar }}
                className="w-full h-full"
              />
            ) : (
              <View
                className="w-full h-full items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <Text variant="h1" className="text-white font-bold">
                  {currentUser?.firstName &&
                    getUserInitials(
                      currentUser.firstName,
                      currentUser.lastName,
                    )}
                </Text>
              </View>
            )}
          </View>
          <Pressable
            className="absolute bottom-0 right-0 w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: theme.primary,
              borderWidth: 3,
              borderColor: theme.background,
            }}
            onPress={() =>
              Alert.alert('Change Photo', 'Photo upload feature coming soon!')
            }
          >
            <IconSymbol name="camera.fill" size={18} color="white" />
          </Pressable>
        </View>
        <Text variant="caption" style={{ color: theme.muted }}>
          Tap to change profile photo
        </Text>
      </View>

      <View className="px-4 pb-6">
        {/* Info Notice */}
        <Card
          variant="outlined"
          className="rounded-xl p-4 mb-6"
          style={{
            backgroundColor: `${theme.primary}05`,
            borderColor: `${theme.primary}30`,
          }}
        >
          <View className="flex-row items-start">
            <IconSymbol
              name="info.circle.fill"
              size={20}
              color={theme.primary}
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <View className="flex-1">
              <Text
                variant="body"
                className="font-semibold mb-1"
                style={{ color: theme.primary }}
              >
                Protected Information
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                Personal details like name and date of birth are protected.
                Contact church admin to update these fields.
              </Text>
            </View>
          </View>
        </Card>

        {/* Read-Only Section */}
        <Text
          variant="h6"
          className="font-bold mb-3"
          style={{ color: theme.heading }}
        >
          Personal Information
        </Text>

        <ReadOnlyField
          label="Full Name"
          value={`${currentUser?.title} ${currentUser?.firstName} ${currentUser?.lastName}`}
          icon="person.fill"
        />

        <ReadOnlyField
          label="Date of Birth"
          value={currentUser?.dob || 'Not provided'}
          icon="calendar"
        />

        <ReadOnlyField
          label="Gender"
          value={currentUser?.gender || 'Not specified'}
          icon="person.crop.circle"
        />

        <ReadOnlyField
          label="Email Address"
          value={currentUser?.email || 'No email provided'}
          icon="envelope.fill"
        />

        {/* Editable Section */}
        <Text
          variant="h6"
          className="font-bold mb-3 mt-6"
          style={{ color: theme.heading }}
        >
          Contact Information
        </Text>

        <EditableField
          label="Primary Phone"
          value={primaryPhone}
          onChangeText={setPrimaryPhone}
          placeholder="+234 801 234 5678"
          keyboardType="phone-pad"
          icon="phone.fill"
        />

        <EditableField
          label="Secondary Phone (Optional)"
          value={secondaryPhone}
          onChangeText={setSecondaryPhone}
          placeholder="+234 801 234 5678"
          keyboardType="phone-pad"
          icon="phone.badge.plus"
        />

        <EditableField
          label="Home Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your home address"
          icon="location.fill"
          multiline
        />

        {/* Action Buttons */}
        <View className="flex-row gap-3 mt-6 mb-4">
          <Pressable
            onPress={handleCancel}
            disabled={isSaving}
            className="flex-1 py-4 rounded-xl items-center"
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              opacity: isSaving ? 0.5 : 1,
            }}
          >
            <Text
              variant="body"
              className="font-semibold"
              style={{ color: theme.muted }}
            >
              Cancel
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSave}
            disabled={isSaving}
            className="flex-1 py-4 rounded-xl items-center"
            style={{
              backgroundColor: theme.primary,
              opacity: isSaving ? 0.7 : 1,
            }}
          >
            {isSaving ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text variant="body" className="font-semibold text-white">
                Save Changes
              </Text>
            )}
          </Pressable>
        </View>

        {/* Admin Contact Notice */}
        <Card
          variant="outlined"
          className="rounded-xl p-4 mt-4"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.card,
          }}
        >
          <View className="flex-row items-start">
            <IconSymbol
              name="exclamationmark.circle"
              size={20}
              color={theme.muted}
              style={{ marginRight: 10, marginTop: 2 }}
            />
            <View className="flex-1">
              <Text
                variant="body"
                className="font-semibold mb-1"
                style={{ color: theme.heading }}
              >
                Need to Update Protected Fields?
              </Text>
              <Text
                variant="caption"
                className="mb-2"
                style={{ color: theme.muted }}
              >
                Contact church administration to update your name, birthday, or
                other protected information.
              </Text>
              <Pressable
                onPress={() => router.push('/more/contact')}
                className="self-start"
              >
                <Text
                  variant="caption"
                  className="font-semibold"
                  style={{ color: theme.primary }}
                >
                  Contact Admin →
                </Text>
              </Pressable>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
