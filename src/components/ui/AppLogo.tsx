'use client';

import React, { useEffect, useState } from 'react';
import AppIcon from './AppIcon';
import AppImage from './AppImage';

interface AppLogoProps {
  src?: string; // Image source (optional)
  text?: string; // Logo text (optional)
  iconName?: string; // Icon name when no image
  size?: number; // Size for icon/image
  className?: string; // Additional classes
  onClick?: () => void; // Click handler
}

function AppLogo({
  src = '/assets/image/app_logo.png',
  text,
  iconName = 'SparklesIcon',
  size = 64,
  className = '',
  onClick,
}: AppLogoProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Détecte le thème initial
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();

    // Observer les changements de thème
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Show image if src provided, otherwise show icon */}
      {src ? (
        <AppImage 
          src={src} 
          alt="Logo" 
          width={size} 
          height={size} 
          className={`flex-shrink-0 transition-all ${isDark ? 'brightness-100' : 'brightness-90'}`}
        />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}

      {/* Show text if provided */}
      {text && <span className="text-xl font-bold">{text}</span>}
    </div>
  );
}

export default AppLogo;
