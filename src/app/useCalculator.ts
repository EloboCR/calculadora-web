import { useReducer, useEffect, useCallback } from 'react';
import { calculatorReducer, initialCalculatorState } from './calculatorReducer';
import { Operator } from '../domain/types';

export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialCalculatorState);

  const inputDigit = useCallback((digit: string) => {
    dispatch({ type: 'INPUT_DIGIT', payload: digit });
  }, []);

  const inputDot = useCallback(() => {
    dispatch({ type: 'INPUT_DOT' });
  }, []);

  const inputOperator = useCallback((op: Operator) => {
    dispatch({ type: 'INPUT_OPERATOR', payload: op });
  }, []);

  const equals = useCallback(() => {
    dispatch({ type: 'EQUALS' });
  }, []);

  const percent = useCallback(() => {
    dispatch({ type: 'PERCENT' });
  }, []);

  const toggleSign = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIGN' });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  // Keyboard handler (FR2, Flow 3)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        inputDigit(key);
      } else if (key === '.') {
        event.preventDefault();
        inputDot();
      } else if (key === '+') {
        event.preventDefault();
        inputOperator('+');
      } else if (key === '-') {
        event.preventDefault();
        inputOperator('-');
      } else if (key === '*' || key === 'x' || key === 'X') {
        event.preventDefault();
        inputOperator('*');
      } else if (key === '/') {
        event.preventDefault();
        inputOperator('/');
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        equals();
      } else if (key === '%') {
        event.preventDefault();
        percent();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDot, inputOperator, equals, percent, clear]);

  return {
    state,
    inputDigit,
    inputDot,
    inputOperator,
    equals,
    percent,
    toggleSign,
    clear
  };
}
