import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  type TextInputProps,
} from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';
import { IconSymbol, IconSymbolName } from '../Icons/IconSymbol';

export type ThemedTextInputProps = Omit<TextInputProps, 'style'> & {
  iconSize?: number;
  darkColor?: string;
  iconColor?: string;
  lightColor?: string;
  leftIcon?: IconSymbolName;
  rightIcon?: IconSymbolName;
  style?: StyleProp<ViewStyle>;
  onRightIconPress?: () => void;
  inputStyle?: StyleProp<TextStyle>;
  variant?: 'default' | 'outlined' | 'filled';
  inputType?: 'text' | 'email' | 'password' | 'search' | 'textarea';
};

export function ThemedTextInput({
  style,
  leftIcon,
  darkColor,
  rightIcon,
  iconColor,
  lightColor,
  iconSize = 20,
  onRightIconPress,
  variant = 'filled',
  inputType = 'text',
  ...rest
}: ThemedTextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'card');
  const defaultIconColor = useThemeColor({}, 'inactiveTint');

  // Get default icons based on input type
  const getDefaultIcons = (): {
    left?: IconSymbolName;
    right?: IconSymbolName;
  } => {
    switch (inputType) {
      case 'email':
        return { left: 'mail' };
      case 'password':
        return { left: 'lock', right: isPasswordVisible ? 'eye.slash' : 'eye' };
      case 'search':
        return { left: 'magnifyingglass' };
      default:
        return {};
    }
  };

  const defaultIcons = getDefaultIcons();
  const finalLeftIcon = leftIcon ?? defaultIcons.left;
  const finalRightIcon = rightIcon ?? defaultIcons.right;

  // Input type specific props
  const getInputProps = () => {
    switch (inputType) {
      case 'email':
        return {
          keyboardType: 'email-address' as const,
          autoCapitalize: 'none' as const,
          autoComplete: 'email' as const,
          autoCorrect: false,
        };
      case 'password':
        return {
          secureTextEntry: !isPasswordVisible,
          autoCapitalize: 'none' as const,
          autoComplete: 'password' as const,
          autoCorrect: false,
        };
      case 'search':
        return {
          returnKeyType: 'search' as const,
          autoCapitalize: 'none' as const,
          autoCorrect: false,
        };
      case 'textarea':
        return {
          multiline: true,
          textAlignVertical: 'top' as const,
          numberOfLines: 4,
        };
      default:
        return {};
    }
  };

  const handleRightIconPress = () => {
    if (inputType === 'password') {
      setIsPasswordVisible((prev) => !prev);
    }
    onRightIconPress?.();
  };

  const containerStyle = [
    styles.container,
    variant === 'default' && [
      styles.defaultContainer,
      { backgroundColor, borderColor },
    ],
    variant === 'outlined' && [styles.outlinedContainer, { borderColor }],
    variant === 'filled' && [styles.filledContainer, { backgroundColor }],
    inputType === 'textarea' && styles.textareaContainer,
  ];

  const inputStyle = [
    styles.input,
    { color: textColor },
    finalLeftIcon && styles.inputWithLeftIcon,
    finalRightIcon && styles.inputWithRightIcon,
    inputType === 'textarea' && styles.textareaInput,
  ];

  return (
    <View
      style={[containerStyle, style]}
      className='border border-border-primary dark:border-border-dark-primary'>
      {finalLeftIcon && (
        <View style={styles.leftIconContainer}>
          <IconSymbol
            size={iconSize}
            name={finalLeftIcon}
            color={iconColor || defaultIconColor}
          />
        </View>
      )}

      <TextInput
        placeholderTextColor='gray'
        style={inputStyle}
        {...getInputProps()}
        {...rest}
      />

      {finalRightIcon && (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={handleRightIconPress}
          activeOpacity={0.7}>
          <IconSymbol
            size={iconSize}
            name={finalRightIcon}
            color={iconColor || defaultIconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  defaultContainer: { borderRadius: 8, borderWidth: 1 },
  outlinedContainer: {
    borderRadius: 8,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  filledContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textareaContainer: {
    minHeight: 100,
    paddingTop: 12,
    alignItems: 'flex-start',
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 12 },
  inputWithLeftIcon: { marginLeft: 8 },
  inputWithRightIcon: { marginRight: 8 },
  textareaInput: { textAlignVertical: 'top', minHeight: 76 },
  leftIconContainer: { justifyContent: 'center', alignItems: 'center' },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});
