import * as yup from 'yup';

// Schema for login screen (email/phone + password)
export const loginSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .required('Email or phone number is required')
    .test(
      'email-or-phone',
      'Please enter a valid email or phone number',
      (value) => {
        if (!value) return false;

        // Check if it's a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) return true;

        // Check if it's a valid phone number
        const phoneRegex = /^[+]?[\d\s()-]{10,}$/;
        if (phoneRegex.test(value)) return true;

        return false;
      },
    ),
  password: yup.string().required('Password is required'),
});

// Schema for phone verification screen (just verification code)
export const phoneVerificationSchema = yup.object().shape({
  verificationCode: yup
    .string()
    .required('Verification code is required')
    .length(6, 'Verification code must be 6 digits')
    .matches(/^\d{6}$/, 'Verification code must be 6 digits'),
});

export const registrationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  emailOrPhone: yup
    .string()
    .required('Email or phone number is required')
    .test(
      'email-or-phone',
      'Please enter a valid email or phone number',
      (value) => {
        if (!value) return false;

        // Check if it's a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) return true;

        // Check if it's a valid phone number
        const phoneRegex = /^[+]?[\d\s()-]{10,}$/;
        if (phoneRegex.test(value)) return true;

        return false;
      },
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number',
    ),
});
