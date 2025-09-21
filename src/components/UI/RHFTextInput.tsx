import React, { useEffect, useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import {
  Animated,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from 'react-native';

import { useTheme } from '@/src/hooks';
import { IconSymbol, IconSymbolName } from '../Icons/IconSymbol';
import { Text } from './Text';

export type RHFTextInputProps<TFieldValues extends FieldValues> =
  TextInputProps & {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    iconSize?: number;
    leftIcon?: IconSymbolName;
    rightIcon?: IconSymbolName;
    variant?: 'default' | 'outlined' | 'filled';
    inputType?: 'text' | 'email' | 'password' | 'search' | 'textarea';
    containerClassName?: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    placeholder?: string;
    validationMessage?: string;
    showValidationMessage?: boolean;
    autoCapitalize?: string;
    autoCorrect?: boolean;
    parentVariant?: string;
  };

export function RHFTextInput<TFieldValues extends FieldValues>({
  control,
  name,
  leftIcon,
  rightIcon,
  iconSize = 20,
  variant = 'outlined',
  inputType = 'text',
  containerClassName = '',
  disabled = false,
  label,
  required = false,
  placeholder,
  validationMessage,
  showValidationMessage = true,
  autoCapitalize,
  autoCorrect,
  parentVariant,
  ...rest
}: RHFTextInputProps<TFieldValues>) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const labelAnim = useRef(new Animated.Value(0)).current;

  const animateLabel = (value: string | undefined, focused: boolean) => {
    Animated.timing(labelAnim, {
      toValue: focused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleRightIconPress = () => {
    if (inputType === 'password') {
      setIsPasswordVisible((prev) => !prev);
    }
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
    backgroundColor:
      parentVariant === 'default' ? theme.card : theme.background,
    color: theme.muted,
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          animateLabel(value, isFocused);
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, isFocused]);

        return (
          <View className={`mb-1 ${containerClassName}`}>
            <View
              className={`flex-row items-center min-h-[54px] px-4 rounded-lg relative border ${
                error
                  ? 'border-red-500'
                  : isFocused
                    ? 'border-blue-400'
                    : 'border-border dark:border-dark-border'
              }`}
            >
              {label && (
                <Animated.Text style={labelStyle} className="text-sm">
                  {label}
                  {required && ' *'}
                </Animated.Text>
              )}

              {leftIcon && (
                <View className="mr-4">
                  <IconSymbol
                    size={iconSize}
                    name={leftIcon}
                    color={theme.muted}
                  />
                </View>
              )}

              <TextInput
                {...rest}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                secureTextEntry={inputType === 'password' && !isPasswordVisible}
                value={value}
                onChangeText={(text) =>
                  onChange(inputType === 'email' ? text.toLowerCase() : text)
                }
                onFocus={(e) => {
                  setIsFocused(true);
                  rest.onFocus?.(e);
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                  onBlur();
                  rest.onBlur?.(e);
                }}
                editable={!disabled}
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: theme.text,
                }}
                className="py-4 placeholder:text-gray-500 dark:placeholder:text-gray-500"
              />

              {inputType === 'password' && (
                <TouchableOpacity
                  className="ml-2 p-2"
                  onPress={handleRightIconPress}
                >
                  <IconSymbol
                    size={iconSize}
                    color={theme.muted}
                    name={isPasswordVisible ? 'eye.slash' : 'eye'}
                  />
                </TouchableOpacity>
              )}
            </View>

            {error?.message && showValidationMessage && (
              <Text className="text-red-500 text-sm px-1">{error.message}</Text>
            )}
          </View>
        );
      }}
    />
  );
}
