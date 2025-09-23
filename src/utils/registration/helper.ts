export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// export const isValidPhoneNumber = (phone: string): boolean => {
//   // Remove all spaces, dashes, parentheses
//   const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

//   // Check if it starts with + and has 10-15 digits
//   const phoneRegex = /^\+[1-9]\d{9,14}$/;
//   return phoneRegex.test(cleanPhone);
// };

export const isValidPassword = (password: string): boolean => {
  if (password.length < 6) return false;

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasLetter && hasNumber;
};

export const getPasswordStrengthMessage = (password: string): string => {
  if (password.length === 0) return '';
  if (password.length < 6) return 'Password must be at least 6 characters';

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasLetter) return 'Password must contain at least one letter';
  if (!hasNumber) return 'Password must contain at least one number';

  return 'Password looks good!';
};

export const getPasswordStrength = (password: string) => {
  let score = 0;

  if (!password) return { score: 0, label: 'Weak' };

  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, label: labels[score] };
};
