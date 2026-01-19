import {
  getPasswordStrengthMessage,
  isValidEmail,
  isValidPassword,
} from './helper';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const validateEmail = (value: string): ValidationResult => {
  if (!value || !value.trim()) {
    return {
      isValid: false,
      message: 'Enter an email address',
      type: 'info',
    };
  }

  const trimmedValue = value.trim();

  if (isValidEmail(trimmedValue)) {
    const isValid = isValidEmail(trimmedValue);
    return {
      isValid,
      message: isValid
        ? '✓ We can accept this email!'
        : '✗ Please enter a valid email address',
      type: isValid ? 'success' : 'error',
    };
  }

  return {
    isValid: false,
    message: 'Enter an email address in a valid format',
    type: 'info',
  };
};

export const validateName = (
  value: string,
  fieldName: string,
): ValidationResult => {
  if (!value) {
    return {
      isValid: false,
      message: '',
      type: 'info',
    };
  }

  const isValid = value.length >= 2;
  return {
    isValid,
    message: isValid
      ? `✓ ${fieldName} is cool!`
      : `✗ ${fieldName} must be at least 2 characters`,
    type: isValid ? 'success' : 'error',
  };
};

export const validatePassword = (value: string): ValidationResult => {
  if (!value) {
    return {
      isValid: false,
      message: '',
      type: 'info',
    };
  }

  const isValid = isValidPassword(value);
  const strengthMessage = getPasswordStrengthMessage(value);

  return {
    isValid,
    message: `${isValid ? '✓' : '✗'} ${strengthMessage}`,
    type: isValid ? 'success' : 'error',
  };
};

export const getValidationMessageColor = (
  type: ValidationResult['type'],
): string => {
  switch (type) {
    case 'success':
      return 'text-green-600';
    case 'error':
      return 'text-red-500';
    case 'info':
    default:
      return 'text-gray-500';
  }
};
