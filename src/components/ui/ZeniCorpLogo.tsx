import React from 'react';

interface ZeniCorpLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'light' | 'dark' | 'roof' | 'white' | 'security';
  showText?: boolean;
  className?: string;
}

const ZeniCorpLogo: React.FC<ZeniCorpLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showText = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl'
  };

  const colorVariants = {
    light: {
      primary: '#991B1B',
      secondary: '#DC2626',
      text: '#1F2937'
    },
    dark: {
      primary: '#991B1B',
      secondary: '#DC2626',
      text: '#000000'
    },
    roof: {
      primary: '#991B1B',
      secondary: '#F87171',
      text: '#991B1B'
    },
    security: {
      primary: '#B91C1C',
      secondary: '#DC2626',
      text: '#991B1B'
    },
    white: {
      primary: '#FFFFFF',
      secondary: '#F9FAFB',
      text: '#FFFFFF'
    }
  };

  const colors = colorVariants[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Modern Geometric Z with Roof Security Theme */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle with Security Gradient */}
          <defs>
            <linearGradient id={`roof-gradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <filter id="roof-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer Circle with Security Theme */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill={`url(#roof-gradient-${variant})`}
            stroke={colors.primary}
            strokeWidth="2"
            filter="url(#roof-glow)"
          />
          
          {/* Inner Design - Z with Roof Elements */}
          <g transform="translate(50, 50)">
            {/* Main Z Letter */}
            <path
              d="M-20,-25 L20,-25 L20,-15 L-5,-15 L20,15 L20,25 L-20,25 L-20,15 L5,15 L-20,-15 Z"
              fill={variant === 'white' ? '#000000' : '#FFFFFF'}
              className="drop-shadow-sm"
            />
            
            {/* Roof Protection Elements */}
            <path
              d="M-30,-15 L-25,-25 L-20,-15 Z"
              fill={colors.secondary}
              opacity="0.8"
            />
            <path
              d="M20,-15 L25,-25 L30,-15 Z"
              fill={colors.secondary}
              opacity="0.8"
            />
            
            {/* Security Shield Elements */}
            <path
              d="M-28,20 L-28,10 Q-28,8 -26,8 L-22,8 Q-20,8 -20,10 L-20,20 Q-24,24 -28,20 Z"
              fill={colors.secondary}
              opacity="0.9"
            />
            <path
              d="M20,20 L20,10 Q20,8 22,8 L26,8 Q28,8 28,10 L28,20 Q24,24 20,20 Z"
              fill={colors.secondary}
              opacity="0.9"
            />
          </g>
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span 
            className={`font-heading font-black ${textSizeClasses[size]} tracking-tight leading-none`}
            style={{ color: colors.text }}
          >
            ZENI<span style={{ color: colors.primary }}>CORP</span>
          </span>
          {size !== 'sm' && (
            <span 
              className="text-xs font-medium tracking-wider opacity-75 uppercase"
              style={{ color: colors.text }}
            >
              Toiture • Sécurité • Garantie
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ZeniCorpLogo;