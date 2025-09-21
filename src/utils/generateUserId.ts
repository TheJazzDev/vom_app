export const generateUserId = (accountType: 'member' | 'guest'): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 4);
  const type = accountType === 'member' ? 'vom' : 'vom-guest';
  return `${type}-${timestamp}${random}`;
};
