import { useTheme } from '@/src/hooks';
import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text } from '../UI/Text';
import { View } from '../UI/View';
import { UserAvatar } from '../UserAvatar';

interface CommentInputProps {
  currentUserName?: string;
  currentUserAvatar?: string | null;
  placeholder?: string;
  onSubmit: (content: string) => Promise<void> | void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  currentUserName = 'User',
  currentUserAvatar,
  placeholder = 'Write a comment...',
  onSubmit,
  disabled = false,
  autoFocus = false,
}) => {
  const theme = useTheme();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || disabled || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim());
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = content.trim().length > 0 && !disabled && !isSubmitting;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View
        className="flex-row items-end py-3 px-4"
        style={[
          styles.container,
          {
            backgroundColor: theme.isDark ? '#1F2937' : '#F9FAFB',
            borderTopColor: theme.isDark ? '#374151' : '#E5E7EB',
          },
        ]}
      >
        <UserAvatar
          name={currentUserName}
          imageUrl={currentUserAvatar}
          size={32}
        />

        <View
          className="flex-1 mx-3 rounded-2xl px-4 py-2"
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.isDark ? '#374151' : '#FFFFFF',
              borderColor: theme.isDark ? '#4B5563' : '#E5E7EB',
            },
          ]}
        >
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder={placeholder}
            placeholderTextColor={theme.muted}
            multiline
            maxLength={500}
            editable={!disabled && !isSubmitting}
            autoFocus={autoFocus}
            style={[
              styles.input,
              {
                color: theme.text,
              },
            ]}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={[
            styles.sendButton,
            {
              backgroundColor: canSubmit
                ? theme.brand
                : theme.isDark
                  ? '#4B5563'
                  : '#D1D5DB',
            },
          ]}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text className="text-white font-semibold text-sm">Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  inputContainer: {
    borderWidth: 1,
    maxHeight: 100,
  },
  input: {
    fontSize: 14,
    lineHeight: 20,
    maxHeight: 80,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CommentInput;
