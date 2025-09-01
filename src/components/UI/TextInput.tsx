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

export type TextInputProps = RNTextInputProps & {
  iconSize?: number;
  leftIcon?: IconSymbolName;
  rightIcon?: IconSymbolName;
  onRightIconPress?: () => void;
  variant?: 'default' | 'outlined' | 'filled';
  inputType?: 'text' | 'email' | 'password' | 'textarea';
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  placeholder: string;
  errorMessage?: string;
  secureTextEntry?: boolean;
};

export function TextInput({
  leftIcon,
  rightIcon,
  iconSize = 20,
  onRightIconPress,
  variant = 'outlined',
  inputType = 'text',
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  error = false,
  disabled = false,
  label,
  required = false,
  value,
  defaultValue,
  placeholder,
  errorMessage,
  secureTextEntry,
  ...rest
}: TextInputProps) {
  const theme = useTheme();

  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Animation
  const labelAnim = useRef(new Animated.Value(inputValue ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || inputValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, inputValue, labelAnim]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    rest.onChangeText?.(text);
  };

  // Floating label style
  const labelStyle = {
    position: 'absolute' as const,
    left: leftIcon ? 44 : 16,
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
    color: error ? '#dc2626' : isFocused ? theme.muted : theme.muted,
  };

  const handleRightIconPress = () => {
    if (inputType === 'password') {
      setIsPasswordVisible((prev) => !prev);
    }
    onRightIconPress?.();
  };

  // Determine if text should be secure
  const shouldSecureText = () => {
    if (inputType === 'password') {
      return !isPasswordVisible;
    }
    return secureTextEntry || false;
  };

  return (
    <View className={`mb-4 ${containerClassName}`}>
      <View
        className={`flex-row items-center min-h-[54px] px-4 rounded-lg relative border ${
          error
            ? 'border-red-500'
            : isFocused
              ? 'border-blue-500'
              : 'border-gray-300'
        }`}
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

        {leftIcon && (
          <View className="mr-4">
            <IconSymbol size={iconSize} name={leftIcon} color={theme.muted} />
          </View>
        )}

        <RNTextInput
          {...rest}
          secureTextEntry={shouldSecureText()}
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
          placeholder={label && isFocused ? placeholder : ''}
          editable={!disabled}
          style={{
            flex: 1,
            fontSize: 14,
            color: theme.text,
          }}
          className="py-4 placeholder:text-gray-500 dark:placeholder:text-gray-500"
        />

        {inputType === 'password' && (
          <TouchableOpacity className="ml-2 p-2" onPress={handleRightIconPress}>
            {isPasswordVisible ? (
              <IconSymbol
                size={iconSize}
                color={theme.muted}
                name="eye.slash"
              />
            ) : (
              <IconSymbol size={iconSize} color={theme.muted} name="eye" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {!!errorMessage && (
        <Text className="text-red-500 text-sm">{errorMessage}</Text>
      )}
    </View>
  );
}
