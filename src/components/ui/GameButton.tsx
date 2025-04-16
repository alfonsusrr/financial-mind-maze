import React from 'react';

interface GameButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'action';
  fullWidth?: boolean;
  className?: string;
}

const GameButton: React.FC<GameButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  fullWidth = false,
  className = ''
}) => {
  // Base styles
  const baseStyle = {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    transition: 'all 0.2s ease',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center' as const
  };

  // Variant styles
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          hoverBg: 'rgba(30, 30, 30, 0.9)'
        };
      case 'secondary':
        return {
          backgroundColor: 'rgba(60, 60, 60, 0.6)',
          color: 'white',
          hoverBg: 'rgba(80, 80, 80, 0.8)'
        };
      case 'action':
        return {
          backgroundColor: 'rgba(234, 179, 8, 0.8)', // Vibrant gold with 80% opacity
          color: 'black', // High contrast text
          hoverBg: 'rgba(234, 179, 8, 1)' // Solid gold on hover
        };
      default:
        return {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          hoverBg: 'rgba(30, 30, 30, 0.9)'
        };
    }
  };

  const variantStyle = getVariantStyle();
  
  return (
    <button 
      onClick={onClick}
      className={`game-button game-button-${variant} ${className}`}
      style={{
        ...baseStyle,
        backgroundColor: variantStyle.backgroundColor,
        color: variantStyle.color
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = variantStyle.hoverBg;
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = variantStyle.backgroundColor;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
};

export default GameButton; 