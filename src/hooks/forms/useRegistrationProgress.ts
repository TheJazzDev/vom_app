import { isValidEmail, isValidPassword } from '@/src/utils/registration';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

export interface ProgressStep {
  label: string;
  description: string;
  completed: boolean;
  active: boolean;
}

export const useRegistrationProgress = (control: any) => {
  const watchedValues = useWatch({
    control,
    name: ['email', 'firstName', 'lastName', 'password'],
  });

  const [email = '', firstName = '', lastName = '', password = ''] =
    watchedValues || [];

  const progressSteps = useMemo((): ProgressStep[] => {
    const emailIsValid = isValidEmail(email);

    const isPersonalDetailsValid =
      firstName.length >= 2 && lastName.length >= 2;

    const isPasswordValid = isValidPassword(password);

    const isFormComplete =
      emailIsValid && isPersonalDetailsValid && isPasswordValid;

    return [
      {
        label: 'Contact Info',
        description: 'Valid email address',
        completed: emailIsValid,
        active: !emailIsValid,
      },
      {
        label: 'Personal Details',
        description: 'First and last name',
        completed: isPersonalDetailsValid,
        active: emailIsValid && !isPersonalDetailsValid,
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
  }, [email, firstName, lastName, password]);

  const currentStep = useMemo(() => {
    if (!isValidEmail(email)) return 0;
    if (!(firstName.length >= 2 && lastName.length >= 2)) return 1;
    if (!isValidPassword(password)) return 2;
    return 3;
  }, [email, firstName, lastName, password]);

  return {
    progressSteps,
    currentStep,
  };
};
