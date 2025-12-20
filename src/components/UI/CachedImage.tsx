import { Image, ImageProps, ImageContentFit } from 'expo-image';
import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

// Blur hash placeholder for loading state
const DEFAULT_BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

interface CachedImageProps extends Omit<ImageProps, 'source'> {
  uri: string | null | undefined;
  fallback?: React.ReactNode;
  containerStyle?: ViewStyle;
  size?: number;
  borderRadius?: number;
  contentFit?: ImageContentFit;
  showPlaceholder?: boolean;
}

/**
 * Optimized image component with automatic caching via expo-image.
 *
 * Features:
 * - Automatic disk and memory caching
 * - Blur hash placeholder during loading
 * - Fallback content when no image
 * - Cross-fade transition on load
 *
 * @example
 * <CachedImage
 *   uri={user.avatar}
 *   size={48}
 *   borderRadius={24}
 *   fallback={<UserInitials name={user.name} />}
 * />
 */
const CachedImage = memo(({
  uri,
  fallback,
  containerStyle,
  size,
  borderRadius,
  contentFit = 'cover',
  showPlaceholder = true,
  style,
  ...props
}: CachedImageProps) => {
  const hasValidUri = uri && uri.trim() !== '';

  const imageStyle = [
    size ? { width: size, height: size } : undefined,
    borderRadius !== undefined ? { borderRadius } : undefined,
    style,
  ];

  if (!hasValidUri) {
    if (fallback) {
      return (
        <View style={containerStyle}>
          {fallback}
        </View>
      );
    }
    return null;
  }

  return (
    <View style={containerStyle}>
      <Image
        source={{ uri }}
        style={imageStyle}
        contentFit={contentFit}
        placeholder={showPlaceholder ? { blurhash: DEFAULT_BLURHASH } : undefined}
        transition={200}
        cachePolicy="memory-disk"
        {...props}
      />
    </View>
  );
});

CachedImage.displayName = 'CachedImage';

export { CachedImage };
export type { CachedImageProps };
