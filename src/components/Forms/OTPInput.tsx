import { useTheme } from '@/src/hooks';
import React, { useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  autoFocus = true,
  disabled = false,
}) => {
  const theme = useTheme();
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const digits = value.split('').concat(Array(length - value.length).fill(''));

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [autoFocus]);

  const handleChange = (text: string, index: number) => {
    // Only allow digits
    const digit = text.replace(/[^0-9]/g, '');

    if (digit.length > 1) {
      // Handle paste
      const pastedValue = digit.slice(0, length);
      onChange(pastedValue);

      // Focus last input or next empty input
      const nextIndex = Math.min(pastedValue.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newValue = digits.slice();
    newValue[index] = digit;
    const newOtp = newValue.join('').slice(0, length);
    onChange(newOtp);

    // Move to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Dismiss keyboard when complete
    if (newOtp.length === length) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        const newValue = digits.slice();
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newValue = digits.slice();
        newValue[index] = '';
        onChange(newValue.join(''));
      }
    }
  };

  const handleFocus = (index: number) => {
    // Select input content on focus
    inputRefs.current[index]?.setNativeProps({
      selection: { start: 0, end: 1 },
    });
  };

  return (
    <View className="flex-row justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          className="w-12 h-14 border-2 rounded-xl text-center text-2xl font-semibold"
          style={{
            borderColor: digits[index]
              ? theme.brand
              : theme.isDark
                ? '#374151'
                : '#D1D5DB',
            backgroundColor: theme.isDark ? '#1F2937' : '#FFFFFF',
            color: theme.text,
            opacity: disabled ? 0.5 : 1,
          }}
          value={digits[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          keyboardType="number-pad"
          maxLength={1}
          editable={!disabled}
          selectTextOnFocus
          textContentType="oneTimeCode"
          autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        />
      ))}
    </View>
  );
};

export default OTPInput;
