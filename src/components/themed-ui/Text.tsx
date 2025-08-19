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
    | 'body1'
    | 'body2'
    | 'button'
    | 'label';
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'inverse'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'brand';
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
    case 'body1':
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
      return 'text-text-primary dark:text-text-dark-primary';
    case 'secondary':
      return 'text-text-secondary dark:text-text-dark-secondary';
    case 'tertiary':
      return 'text-text-tertiary dark:text-text-dark-tertiary';
    case 'inverse':
      return 'text-text-inverse dark:text-text-dark-inverse';
    case 'success':
      return 'text-semantic-success dark:text-semantic-success';
    case 'warning':
      return 'text-semantic-warning dark:text-semantic-warning';
    case 'error':
      return 'text-semantic-error dark:text-semantic-error';
    case 'info':
      return 'text-semantic-info dark:text-semantic-info';
    case 'brand':
      return 'text-brand-primary dark:text-brand-primary';
    default:
      return 'text-text-primary dark:text-text-dark-primary';
  }
};

export const Text: React.FC<TextProps> = ({
  variant = 'text',
  color = 'primary',
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
