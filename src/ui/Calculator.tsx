import React from 'react';
import { useCalculator } from '../app/useCalculator';
import { Display } from './Display';
import { CalcButton } from './CalcButton';

export const Calculator: React.FC = () => {
  const {
    state,
    inputDigit,
    inputDot,
    inputOperator,
    equals,
    percent,
    toggleSign,
    clear
  } = useCalculator();

  const isLocked = state.isErrorLocked;

  return (
    <div className="calculator-card" role="region" aria-label="Calculadora">
      <Display
        value={state.displayValue}
        expression={state.expression}
        isError={state.isErrorLocked}
      />

      <div className="keypad-grid" role="group" aria-label="Teclado numérico y funciones">
        {/* Row 1 */}
        <CalcButton
          label="C"
          ariaLabel="Limpiar"
          variant="function"
          onClick={clear}
        />
        <CalcButton
          label="±"
          ariaLabel="Cambiar signo"
          variant="function"
          onClick={toggleSign}
          disabled={isLocked}
        />
        <CalcButton
          label="%"
          ariaLabel="Porcentaje"
          variant="function"
          onClick={percent}
          disabled={isLocked}
        />
        <CalcButton
          label="÷"
          ariaLabel="Dividir"
          variant="operator"
          onClick={() => inputOperator('/')}
          disabled={isLocked}
          isActive={state.operator === '/' && state.waitingForOperand}
        />

        {/* Row 2 */}
        <CalcButton
          label="7"
          variant="digit"
          onClick={() => inputDigit('7')}
          disabled={isLocked}
        />
        <CalcButton
          label="8"
          variant="digit"
          onClick={() => inputDigit('8')}
          disabled={isLocked}
        />
        <CalcButton
          label="9"
          variant="digit"
          onClick={() => inputDigit('9')}
          disabled={isLocked}
        />
        <CalcButton
          label="×"
          ariaLabel="Multiplicar"
          variant="operator"
          onClick={() => inputOperator('*')}
          disabled={isLocked}
          isActive={state.operator === '*' && state.waitingForOperand}
        />

        {/* Row 3 */}
        <CalcButton
          label="4"
          variant="digit"
          onClick={() => inputDigit('4')}
          disabled={isLocked}
        />
        <CalcButton
          label="5"
          variant="digit"
          onClick={() => inputDigit('5')}
          disabled={isLocked}
        />
        <CalcButton
          label="6"
          variant="digit"
          onClick={() => inputDigit('6')}
          disabled={isLocked}
        />
        <CalcButton
          label="−"
          ariaLabel="Restar"
          variant="operator"
          onClick={() => inputOperator('-')}
          disabled={isLocked}
          isActive={state.operator === '-' && state.waitingForOperand}
        />

        {/* Row 4 */}
        <CalcButton
          label="1"
          variant="digit"
          onClick={() => inputDigit('1')}
          disabled={isLocked}
        />
        <CalcButton
          label="2"
          variant="digit"
          onClick={() => inputDigit('2')}
          disabled={isLocked}
        />
        <CalcButton
          label="3"
          variant="digit"
          onClick={() => inputDigit('3')}
          disabled={isLocked}
        />
        <CalcButton
          label="+"
          ariaLabel="Sumar"
          variant="operator"
          onClick={() => inputOperator('+')}
          disabled={isLocked}
          isActive={state.operator === '+' && state.waitingForOperand}
        />

        {/* Row 5 */}
        <CalcButton
          label="0"
          variant="digit"
          className="zero-btn"
          onClick={() => inputDigit('0')}
          disabled={isLocked}
        />
        <CalcButton
          label="."
          ariaLabel="Punto decimal"
          variant="digit"
          onClick={inputDot}
          disabled={isLocked}
        />
        <CalcButton
          label="="
          ariaLabel="Igual"
          variant="equals"
          onClick={equals}
          disabled={isLocked}
        />
      </div>

      <div className="calculator-instructions" aria-hidden="true">
        <span>Usa clics o teclado: <kbd>0-9</kbd> <kbd>+-*/</kbd> <kbd>Enter</kbd> <kbd>Esc</kbd></span>
      </div>
    </div>
  );
};
