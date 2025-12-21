import { useTheme } from '@/src/hooks';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Text } from '../UI/Text';
import { View } from '../UI/View';

interface MediaFile {
  uri: string;
  type: 'image' | 'video';
  name?: string;
}

interface MediaUploaderProps {
  mediaFiles: MediaFile[];
  onMediaChange: (files: MediaFile[]) => void;
  maxFiles?: number;
  allowedTypes?: ('image' | 'video')[];
  disabled?: boolean;
  placeholder?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  mediaFiles,
  onMediaChange,
  maxFiles = 5,
  allowedTypes = ['image'],
  disabled = false,
  placeholder = 'Add photos or videos',
}) => {
  const theme = useTheme();
  const [isUploading, setIsUploading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant access to your photo library to upload media.',
      );
      return false;
    }
    return true;
  };

  const pickMedia = async () => {
    if (disabled || isUploading) return;
    if (mediaFiles.length >= maxFiles) {
      Alert.alert('Limit Reached', `You can only upload up to ${maxFiles} files.`);
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsUploading(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: allowedTypes.includes('video')
          ? ImagePicker.MediaTypeOptions.All
          : ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: maxFiles - mediaFiles.length,
      });

      if (!result.canceled && result.assets) {
        const newFiles: MediaFile[] = result.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.type === 'video' ? 'video' : 'image',
          name: asset.fileName || undefined,
        }));

        onMediaChange([...mediaFiles, ...newFiles].slice(0, maxFiles));
      }
    } catch (error) {
      console.error('Media picker error:', error);
      Alert.alert('Error', 'Failed to pick media. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeMedia = (index: number) => {
    const newFiles = [...mediaFiles];
    newFiles.splice(index, 1);
    onMediaChange(newFiles);
  };

  const renderMediaItem = (file: MediaFile, index: number) => (
    <View key={index} className="relative mr-3">
      <Image source={{ uri: file.uri }} className="w-[100px] h-[100px] rounded-lg" />
      {file.type === 'video' && (
        <View className="absolute inset-0 items-center justify-center bg-black/30 rounded-lg">
          <Text className="text-2xl">▶️</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => removeMedia(index)}
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 items-center justify-center"
        disabled={disabled}
      >
        <Text className="text-white text-xs font-bold">✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      >
        {mediaFiles.map((file, index) => renderMediaItem(file, index))}

        {mediaFiles.length < maxFiles && (
          <TouchableOpacity
            onPress={pickMedia}
            disabled={disabled || isUploading}
            className="w-[100px] h-[100px] rounded-lg border-2 border-dashed items-center justify-center p-2"
            style={{
              backgroundColor: theme.isDark ? '#374151' : '#F3F4F6',
              borderColor: theme.isDark ? '#4B5563' : '#D1D5DB',
            }}
          >
            {isUploading ? (
              <ActivityIndicator color={theme.brand} />
            ) : (
              <>
                <Text className="text-3xl mb-1">📷</Text>
                <Text
                  className="text-xs text-center"
                  style={{ color: theme.textSecondary }}
                >
                  {placeholder}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>

      <Text
        className="text-xs mt-2"
        style={{ color: theme.textSecondary }}
      >
        {mediaFiles.length}/{maxFiles} files
      </Text>
    </View>
  );
};

export default MediaUploader;
