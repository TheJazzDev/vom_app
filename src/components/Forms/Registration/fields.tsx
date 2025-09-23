import {
  getValidationMessageColor,
  validateEmail,
  validateName,
  validatePassword,
} from '@/src/utils/registration';
import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { RHFTextInput, Text, View } from '../../UI';

interface EmailFieldProps {
  control: Control<RegistrationProps>;
}

interface NameFieldProps {
  control: Control<RegistrationProps>;
  name: 'firstName' | 'lastName';
  label: string;
  placeholder: string;
}

interface PasswordFieldProps {
  control: Control<RegistrationProps>;
}

export const EmailField: React.FC<EmailFieldProps> = ({ control }) => {
  const value =
    useWatch({
      control,
      name: 'email',
    }) || '';

  const validation = validateEmail(value);
  const colorClass = getValidationMessageColor(validation.type);

  return (
    <View className="mb-4">
      <RHFTextInput
        control={control}
        name="email"
        inputType="text"
        label="Email"
        leftIcon="envelope"
        placeholder="Enter your email"
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
  label,
  placeholder,
}) => {
  const value =
    useWatch({
      control,
      name,
    }) || '';

  const validation = validateName(value, label);
  const colorClass = getValidationMessageColor(validation.type);

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
      {value && (
        <Text className={`text-xs mb-2 px-1 ${colorClass}`}>
          {validation.message}
        </Text>
      )}
    </View>
  );
};

export const PasswordField: React.FC<PasswordFieldProps> = ({ control }) => {
  const value =
    useWatch({
      control,
      name: 'password',
    }) || '';

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
