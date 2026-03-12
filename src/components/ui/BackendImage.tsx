'use client';

import React, { useState } from 'react';
import { getImageUrl } from '@/utils/imageUrl';

interface BackendImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallback?: string;
  bustCache?: boolean;
  onClick?: () => void;
}

/**
 * Composant optimisé pour charger les images depuis le backend
 * Gère automatiquement les erreurs et le fallback
 */
export default function BackendImage({
  src,
  alt,
  className = '',
  width,
  height,
  fallback = '/assets/image/no_image.png',
  bustCache = false,
  onClick,
}: BackendImageProps) {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src, bustCache));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallback);
      setHasError(true);
    }
  };

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      onClick={onClick}
      crossOrigin="anonymous"
      loading="lazy"
    />
  );
}
