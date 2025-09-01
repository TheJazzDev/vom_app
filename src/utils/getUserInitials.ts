export const getUserInitials = (
  firstName: string,
  lastName: string,
): string => {
  const firstLetter = firstName.charAt(0).toUpperCase();

  const secondLetter = lastName.charAt(0).toUpperCase();

  return firstLetter + secondLetter;
};
