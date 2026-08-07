import React from 'react';

interface CalcButtonProps {
  label: string;
  ariaLabel?: string;
  variant?: 'digit' | 'operator' | 'function' | 'equals';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  isActive?: boolean;
}

export const CalcButton: React.FC<CalcButtonProps> = ({
  label,
  ariaLabel,
  variant = 'digit',
  onClick,
  disabled = false,
  className = '',
  isActive = false
}) => {
  return (
    <button
      type="button"
      className={`calc-btn ${variant} ${isActive ? 'active-operator' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
};
