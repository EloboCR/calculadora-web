import React from 'react';

interface DisplayProps {
  value: string;
  expression: string;
  isError: boolean;
}

export const Display: React.FC<DisplayProps> = ({ value, expression, isError }) => {
  return (
    <div className="calculator-display-container">
      <div className="display-subexpression" aria-hidden="true">
        {expression}
      </div>
      <div
        data-testid="calculator-display"
        className={`display-main-value ${isError ? 'error-state' : ''}`}
        aria-live="polite"
        role={isError ? 'alert' : undefined}
      >
        {value}
      </div>
    </div>
  );
};
