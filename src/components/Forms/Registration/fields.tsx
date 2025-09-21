import React from 'react';
import { Control } from 'react-hook-form';
import { RHFTextInput, Text, View } from '../../UI';
import {
  getValidationMessageColor,
  validateContactInfo,
  validateName,
  validatePassword,
} from '@/src/utils/registration';

interface ContactFieldProps {
  control: Control<RegistrationProps>;
  value: string;
}

interface NameFieldProps {
  control: Control<RegistrationProps>;
  name: 'firstName' | 'lastName';
  value: string;
  label: string;
  placeholder: string;
}

interface PasswordFieldProps {
  control: Control<RegistrationProps>;
  value: string;
}

export const RegTypeField: React.FC<ContactFieldProps> = ({
  control,
  value,
}) => {
  const validation = validateContactInfo(value);
  const colorClass = getValidationMessageColor(validation.type);

  return (
    <View className="mb-4">
      <RHFTextInput
        control={control}
        name="emailOrPhone"
        inputType="text"
        label="Email or Phone Number"
        leftIcon="envelope"
        placeholder="Enter your email or phone number"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value && (
        <Text className={`text-xs mb-2 px-1 ${colorClass}`}>
          {validation.message}
        </Text>
      )}
    </View>
  );
};

export const NameField: React.FC<NameFieldProps> = ({
  control,
  name,
  value,
  label,
  placeholder,
}) => {
  const validation = validateName(value, label);
  const shouldShowValidation = value && value.length > 0 && !validation.isValid;

  return (
    <View className="mb-4">
      <RHFTextInput
        control={control}
        name={name}
        inputType="text"
        label={label}
        leftIcon="person"
        placeholder={placeholder}
      />
      {shouldShowValidation && (
        <Text className="text-xs text-red-500 mb-2 px-1">
          {validation.message}
        </Text>
      )}
    </View>
  );
};

export const PasswordField: React.FC<PasswordFieldProps> = ({
  control,
  value,
}) => {
  const validation = validatePassword(value);
  const colorClass = getValidationMessageColor(validation.type);

  return (
    <View className="mb-4">
      <RHFTextInput
        control={control}
        name="password"
        inputType="password"
        label="Password"
        leftIcon="lock"
        rightIcon="eye"
        placeholder="Create a password"
      />
      {value && (
        <Text className={`text-xs mb-2 px-1 ${colorClass}`}>
          {validation.message}
        </Text>
      )}
    </View>
  );
};
