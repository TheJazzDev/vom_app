import {
  getAuthType,
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from '@/src/utils/registration';
import { useMemo } from 'react';

export interface ProgressStep {
  label: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export const useRegistrationProgress = (formValues: RegistrationProps) => {
  const progressSteps = useMemo((): ProgressStep[] => {
    const emailOrPhone = formValues.emailOrPhone?.trim() || '';
    const firstName = formValues.firstName?.trim() || '';
    const lastName = formValues.lastName?.trim() || '';
    const password = formValues.password || '';

    // Step 1: Valid contact info
    const isContactValid = () => {
      if (!emailOrPhone) return false;
      const contactType = getAuthType(emailOrPhone);

      if (contactType === 'email') {
        return isValidEmail(emailOrPhone);
      } else if (contactType === 'phone') {
        return isValidPhoneNumber(emailOrPhone);
      }
      return false;
    };

    // Step 2: Personal details
    const isPersonalDetailsValid =
      firstName.length >= 2 && lastName.length >= 2;

    // Step 3: Strong password
    const isPasswordValid = isValidPassword(password);

    // Step 4: All requirements met
    const isFormComplete =
      isContactValid() && isPersonalDetailsValid && isPasswordValid;

    return [
      {
        label: 'Contact Info',
        description:
          getAuthType(emailOrPhone) === 'email'
            ? 'Valid email address'
            : getAuthType(emailOrPhone) === 'phone'
              ? 'Valid phone number'
              : 'Email or phone number',
        completed: isContactValid(),
        active: !isContactValid(),
      },
      {
        label: 'Personal Details',
        description: 'First and last name',
        completed: isPersonalDetailsValid,
        active: isContactValid() && !isPersonalDetailsValid,
      },
      {
        label: 'Security',
        description: '6+ chars with letters & numbers',
        completed: isPasswordValid,
        active: isPersonalDetailsValid && !isPasswordValid,
      },
      {
        label: 'Complete',
        description: 'Ready to register',
        completed: isFormComplete,
        active: isPasswordValid && !isFormComplete,
      },
    ];
  }, [formValues]);

  const currentStep = useMemo(() => {
    const emailOrPhone = formValues.emailOrPhone?.trim() || '';
    const firstName = formValues.firstName?.trim() || '';
    const lastName = formValues.lastName?.trim() || '';
    const password = formValues.password || '';

    // Determine current step based on completion
    const contactType = getAuthType(emailOrPhone);
    const isContactValid =
      contactType === 'email'
        ? isValidEmail(emailOrPhone)
        : contactType === 'phone'
          ? isValidPhoneNumber(emailOrPhone)
          : false;

    if (!isContactValid) return 0;
    if (!(firstName.length >= 2 && lastName.length >= 2)) return 1;
    if (!isValidPassword(password)) return 2;
    return 3;
  }, [formValues]);

  return {
    progressSteps,
    currentStep,
  };
};
