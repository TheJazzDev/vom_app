import { Text, View, TextInput, Button } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { TESTIMONY_CATEGORIES, TestimonyCategory } from '@/src/services/testimony';
import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

interface CreateTestimonyFormProps {
  onSubmit: (data: {
    title: string;
    content: string;
    category: TestimonyCategory;
    isAnonymous: boolean;
    mediaUrls: string[];
  }) => Promise<void>;
  isLoading?: boolean;
}

export const CreateTestimonyForm: React.FC<CreateTestimonyFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<TestimonyCategory>('breakthrough');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a title for your testimony');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Required', 'Please share your testimony');
      return;
    }

    await onSubmit({
      title: title.trim(),
      content: content.trim(),
      category,
      isAnonymous,
      mediaUrls: [],
    });
  };

  const categories = Object.entries(TESTIMONY_CATEGORIES) as [
    TestimonyCategory,
    { label: string; emoji: string; color: string }
  ][];

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Encouragement Header */}
      <View
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: `${theme.brand}08` }}
      >
        <View className="flex-row items-start gap-3">
          <Text className="text-2xl">✨</Text>
          <View className="flex-1">
            <Text
              variant="body"
              style={{ color: theme.text }}
              className="leading-6"
            >
              Your testimony can inspire and encourage others in their faith journey.
              Share how God has worked in your life!
            </Text>
          </View>
        </View>
      </View>

      {/* Title */}
      <View className="mb-4">
        <Text
          variant="body"
          style={{ color: theme.heading }}
          className="font-semibold mb-2"
        >
          Title *
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Give your testimony a title"
          placeholderTextColor={theme.textSecondary}
          className="rounded-xl px-4 py-3 text-base"
          style={{
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
            borderWidth: 1,
            color: theme.text,
          }}
          maxLength={100}
        />
      </View>

      {/* Category */}
      <View className="mb-4">
        <Text
          variant="body"
          style={{ color: theme.heading }}
          className="font-semibold mb-2"
        >
          Category
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {categories.map(([key, cat]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setCategory(key)}
              className="px-3 py-2 rounded-2xl"
              style={{
                backgroundColor:
                  category === key ? `${cat.color}20` : theme.inputBackground,
                borderColor: category === key ? cat.color : theme.border,
                borderWidth: 1,
              }}
            >
              <Text className="text-sm">
                {cat.emoji} {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <View className="mb-4">
        <Text
          variant="body"
          style={{ color: theme.heading }}
          className="font-semibold mb-2"
        >
          Your Testimony *
        </Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Share your testimony... What has God done in your life?"
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
          className="rounded-xl px-4 py-3 text-base"
          style={{
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
            borderWidth: 1,
            color: theme.text,
            minHeight: 200,
          }}
          maxLength={2000}
        />
        <Text
          variant="caption"
          style={{ color: theme.textSecondary }}
          className="text-right mt-1"
        >
          {content.length}/2000
        </Text>
      </View>

      {/* Options */}
      <View
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: theme.inputBackground }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text
              variant="body"
              style={{ color: theme.heading }}
              className="font-medium"
            >
              Share anonymously
            </Text>
            <Text
              variant="caption"
              style={{ color: theme.textSecondary }}
            >
              Your name will not be shown
            </Text>
          </View>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: theme.border, true: theme.brand }}
            thumbColor="white"
          />
        </View>
      </View>

      {/* Submit Button */}
      <Button
        onPress={handleSubmit}
        disabled={isLoading || !title.trim() || !content.trim()}
        className="rounded-xl py-4 items-center"
        style={{
          backgroundColor: theme.brand,
          opacity: isLoading || !title.trim() || !content.trim() ? 0.5 : 1,
        }}
      >
        <Text className="text-white font-semibold text-base">
          {isLoading ? 'Sharing...' : 'Share Testimony'}
        </Text>
      </Button>
    </ScrollView>
  );
};

export default CreateTestimonyForm;
