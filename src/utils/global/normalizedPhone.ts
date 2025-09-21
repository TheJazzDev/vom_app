export const toInternationNigeriaPhone = (phone: string): string => {
  const clean = phone.replace(/\D/g, '');

  if (clean.startsWith('0')) return `+234${clean.slice(1)}`;

  if (clean.startsWith('234')) return `+${clean}`;

  if (clean.startsWith('+234')) return clean;

  return phone;
};

export const toLocalNigerianPhone = (phone: string): string => {
  if (phone.startsWith('+234')) return `0${phone.slice(4)}`;

  if (phone.startsWith('234')) return `0${phone.slice(3)}`;

  return phone;
};
