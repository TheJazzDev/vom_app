import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  variant?:
    | 'text'
    | 'paragraph'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'caption'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'body'
    | 'body2'
    | 'button'
    | 'label';
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'accent'
    | 'muted'
    | 'body'
    | 'heading'
    | 'placeholder'
    | 'background'
    | 'card'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'brand'
    | string;
  children: React.ReactNode;
  className?: string;
}

const getVariantStyles = (variant: TextProps['variant']) => {
  switch (variant) {
    case 'h1':
      return 'text-4xl font-bold leading-tight tracking-tight';
    case 'h2':
      return 'text-3xl font-bold leading-tight tracking-tight';
    case 'h3':
      return 'text-2xl font-semibold leading-snug tracking-tight';
    case 'h4':
      return 'text-xl font-semibold leading-snug tracking-normal';
    case 'h5':
      return 'text-lg font-medium leading-normal tracking-normal';
    case 'h6':
      return 'text-base font-medium leading-normal tracking-normal';
    case 'subtitle1':
      return 'text-base font-medium leading-relaxed tracking-normal';
    case 'subtitle2':
      return 'text-sm font-medium leading-relaxed tracking-wide';
    case 'body':
      return 'text-base font-normal leading-relaxed tracking-normal';
    case 'body2':
      return 'text-sm font-normal leading-relaxed tracking-normal';
    case 'paragraph':
      return 'text-base font-normal leading-relaxed tracking-normal';
    case 'caption':
      return 'text-xs font-normal leading-normal tracking-wide';
    case 'overline':
      return 'text-xs font-medium leading-normal tracking-widest uppercase';
    case 'button':
      return 'text-sm font-medium leading-normal tracking-wide uppercase';
    case 'label':
      return 'text-sm font-medium leading-normal tracking-normal';
    case 'text':
    default:
      return 'text-base font-normal leading-normal tracking-normal';
  }
};

const getColorStyles = (color: TextProps['color']) => {
  switch (color) {
    case 'primary':
      return 'text-primary dark:text-dark-primary';
    case 'secondary':
      return 'text-secondary dark:text-dark-secondary';
    case 'tertiary':
      return 'text-tertiary dark:text-dark-tertiary';
    case 'accent':
      return 'text-accent dark:text-dark-accent';
    case 'muted':
      return 'text-muted dark:text-dark-muted';
    case 'heading':
      return 'text-heading dark:text-dark-heading';
    case 'body':
      return 'text-body dark:text-dark-body';
    case 'body2':
      return 'text-body2 dark:text-dark-body2';
    case 'placeholder':
      return 'text-placeholder dark:text-dark-placeholder';
    case 'background':
      return 'text-background dark:text-dark-background';
    case 'card':
      return 'text-card dark:text-dark-card';
    case 'success':
      return 'text-success dark:text-dark-success';
    case 'warning':
      return 'text-warning dark:text-dark-warning';
    case 'error':
      return 'text-error dark:text-dark-error';
    case 'info':
      return 'text-info dark:text-dark-info';
    case 'brand':
      return 'text-brand dark:text-dark-brand';
    case 'neutral':
      return 'text-white dark:text-white/90';
    default:
      return 'text-body dark:text-dark-body';
  }
};

export const Text: React.FC<TextProps> = ({
  variant = 'text',
  color = 'body',
  children,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = getVariantStyles(variant);
  const colorStyles = getColorStyles(color);
  const combinedClassName =
    `${variantStyles} ${colorStyles} ${className}`.trim();

  return (
    <RNText className={combinedClassName} style={style} {...props}>
      {children}
    </RNText>
  );
};
