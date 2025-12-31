'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { getBlurDataURL } from '@/lib/image-utils';
import { forwardRef } from 'react';

// Extend Next.js ImageProps and add our custom props
interface OptimizedImageProps extends Omit<NextImageProps, 'alt' | 'src' | 'priority' | 'placeholder' | 'blurDataURL'> {
  src: string;
  alt: string;
  priority?: boolean;
  blurWidth?: number;
  blurHeight?: number;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(({
  src,
  alt,
  priority = false,
  blurWidth = 100,
  blurHeight = 100,
  className = '',
  style,
  ...props
}, ref) => {
  // Generate blur placeholder
  const blurDataURL = getBlurDataURL(blurWidth, blurHeight);

  // Ensure required props are set
  const imageProps: NextImageProps = {
    src,
    alt,
    priority,
    placeholder: 'blur' as const,
    blurDataURL,
    className: `transition-transform duration-300 ${className}`.trim(),
    ...props,
  };

  // Add style if provided
  if (style) {
    imageProps.style = style;
  }

  return (
    <NextImage
      {...imageProps}
      ref={ref}
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        target.src = '/placeholder.svg';
        
        // Call original onError if provided
        if (props.onError) {
          props.onError(e);
        }
      }}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';
