import { ImageProps as NextImageProps } from 'next/image';

type BaseImageProps = Omit<NextImageProps, 'src' | 'alt' | 'width' | 'height' | 'fill' | 'priority' | 'loading' | 'decoding' | 'className'>;

interface OptimizedImageProps extends BaseImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
}

/**
 * Get optimized image props for Next.js Image component
 */
export function getOptimizedImageProps({
  src,
  alt,
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps): NextImageProps {
  return {
    src,
    alt,
    priority,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
    className: `transition-transform duration-300 ${className}`,
    ...props,
  };
}

// Base64 encoded 1x1 transparent pixel
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const getBlurDataURL = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
