export const getSizeStyles = (
  size: BandBadgeProps['size'],
  variant: BandBadgeProps['variant'],
) => {
  const isGlow = variant === 'glow';
  const isOutlined = variant === 'outlined';

  switch (size) {
    case 'sm':
      return {
        container: `px-2 py-1 min-h-[24px] self-start ${isGlow ? 'shadow-md' : ''} ${isOutlined ? 'border-1' : ''}`,
        text: 'caption',
        icon: 'text-xs',
      };
    case 'lg':
      return {
        container: `px-4 py-2.5 min-h-[44px] self-start ${isGlow ? 'shadow-xl' : ''} ${isOutlined ? 'border-2' : ''}`,
        text: 'body1',
        icon: 'text-lg',
      };
    case 'md':
    default:
      return {
        container: `px-3 py-1.5 min-h-[32px] self-start ${isGlow ? 'shadow-lg' : ''} ${isOutlined ? 'border-2' : ''}`,
        text: 'body2',
        icon: 'text-sm',
      };
  }
};
