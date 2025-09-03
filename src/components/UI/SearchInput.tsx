import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  type TextInputProps as RNTextInputProps,
} from 'react-native';

import { useTheme } from '@/src/hooks';
import { IconSymbol, IconSymbolName } from '../Icons/IconSymbol';
import { Text } from './Text';

export type SearchInputProps = Omit<RNTextInputProps, 'secureTextEntry'> & {
  iconSize?: number;
  rightIcon?: IconSymbolName;
  onRightIconPress?: () => void;
  variant?: 'default' | 'outlined' | 'filled';
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  placeholder: string;
  errorMessage?: string;
  onSearch?: (searchTerm: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  debounceMs?: number;
};

function SearchInput({
  rightIcon,
  iconSize = 20,
  onRightIconPress,
  variant = 'outlined',
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  error = false,
  disabled = false,
  label,
  required = false,
  value,
  defaultValue,
  placeholder = 'Search...',
  errorMessage,
  onSearch,
  onClear,
  showClearButton = true,
  debounceMs = 300,
  ...rest
}: SearchInputProps) {
  const theme = useTheme();

  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const debounceRef = useRef<number>(0);

  // Animation
  const labelAnim = useRef(new Animated.Value(inputValue ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || inputValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, inputValue, labelAnim]);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (onSearch) {
        onSearch(inputValue);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue, onSearch, debounceMs]);

  // Update internal state when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    rest.onChangeText?.(text);
  };

  const handleClear = () => {
    setInputValue('');
    rest.onChangeText?.('');
    onClear?.();
    if (onSearch) {
      onSearch('');
    }
  };

  const handleRightIconPress = () => {
    onRightIconPress?.();
  };

  // Floating label style
  const labelStyle = {
    position: 'absolute' as const,
    left: 44, // Always account for search icon
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    paddingHorizontal: 4,
    backgroundColor: isFocused || inputValue ? theme.background : 'transparent',
    color: error ? '#dc2626' : isFocused ? theme.primary : theme.muted,
  };

  return (
    <View className={`mb-4 ${containerClassName}`}>
      <View
        className={`flex-row items-center min-h-[54px] px-4 rounded-lg relative border ${
          error
            ? 'border-red-500 dark:border-red-400'
            : isFocused
              ? 'border-blue-500 dark:border-blue-400'
              : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-800`}
      >
        {label && (
          <Animated.Text
            style={labelStyle}
            className={`text-sm ${labelClassName}`}
          >
            {label}
            {required && ' *'}
          </Animated.Text>
        )}

        {/* Search Icon - Always present */}
        <View className="mr-3">
          <IconSymbol
            size={iconSize}
            name="magnifyingglass"
            color={isFocused ? theme.primary : theme.muted}
          />
        </View>

        <RNTextInput
          {...rest}
          value={inputValue}
          onChangeText={handleChangeText}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          placeholder={
            label && isFocused ? placeholder : label ? '' : placeholder
          }
          placeholderTextColor={theme.muted}
          editable={!disabled}
          style={{
            flex: 1,
            fontSize: 14,
            color: theme.text,
            paddingVertical: 16,
          }}
          className={`placeholder:text-gray-500 dark:placeholder:text-gray-400 ${inputClassName}`}
          returnKeyType="search"
          onSubmitEditing={() => {
            if (onSearch) {
              onSearch(inputValue);
            }
          }}
        />

        {/* Clear Button */}
        {showClearButton && inputValue.length > 0 && (
          <TouchableOpacity
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700"
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <IconSymbol
              size={16}
              color={theme.muted}
              name="xmark.circle.fill"
            />
          </TouchableOpacity>
        )}

        {/* Custom Right Icon */}
        {rightIcon && (
          <TouchableOpacity
            className="ml-2 p-2"
            onPress={handleRightIconPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <IconSymbol size={iconSize} color={theme.muted} name={rightIcon} />
          </TouchableOpacity>
        )}
      </View>

      {!!errorMessage && (
        <Text className="text-red-500 dark:text-red-400 text-sm mt-1">
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

export default SearchInput;
