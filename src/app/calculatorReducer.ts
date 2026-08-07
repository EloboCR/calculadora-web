import { Operator } from '../domain/types';
import { ExpressionParser } from '../domain/ExpressionParser';
import { PercentRule } from '../domain/PercentRule';
import { NumberPolicy } from '../domain/NumberPolicy';

export interface CalculatorState {
  displayValue: string;
  previousValue: string | null;
  operator: Operator | null;
  waitingForOperand: boolean;
  isErrorLocked: boolean;
  expression: string;
}

export const initialCalculatorState: CalculatorState = {
  displayValue: '0',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  isErrorLocked: false,
  expression: ''
};

export type CalculatorAction =
  | { type: 'INPUT_DIGIT'; payload: string }
  | { type: 'INPUT_DOT' }
  | { type: 'INPUT_OPERATOR'; payload: Operator }
  | { type: 'EQUALS' }
  | { type: 'PERCENT' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'CLEAR' };

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  // If calculator is in error state, ONLY CLEAR action is accepted (FR6)
  if (state.isErrorLocked) {
    if (action.type === 'CLEAR') {
      return initialCalculatorState;
    }
    return state;
  }

  switch (action.type) {
    case 'CLEAR':
      return initialCalculatorState;

    case 'INPUT_DIGIT': {
      const digit = action.payload;
      if (state.waitingForOperand) {
        return {
          ...state,
          displayValue: digit,
          waitingForOperand: false
        };
      }
      const newDisplay = state.displayValue === '0' ? digit : state.displayValue + digit;
      // Guard against overly long inputs in display (> 16 chars)
      if (newDisplay.length > 16) return state;
      return {
        ...state,
        displayValue: newDisplay
      };
    }

    case 'INPUT_DOT': {
      if (state.waitingForOperand) {
        return {
          ...state,
          displayValue: '0.',
          waitingForOperand: false
        };
      }
      if (state.displayValue.includes('.')) {
        return state;
      }
      return {
        ...state,
        displayValue: state.displayValue + '.'
      };
    }

    case 'TOGGLE_SIGN': {
      if (state.displayValue === '0') return state;
      const toggled = state.displayValue.startsWith('-')
        ? state.displayValue.slice(1)
        : '-' + state.displayValue;
      return {
        ...state,
        displayValue: toggled
      };
    }

    case 'INPUT_OPERATOR': {
      const nextOp = action.payload;
      
      // If we already had an operator and were waiting for operand, just replace operator
      if (state.waitingForOperand && state.operator) {
        return {
          ...state,
          operator: nextOp
        };
      }

      // If there's an ongoing operation with a previous value, we can accumulate
      if (state.previousValue !== null && state.operator !== null) {
        const fullExpr = `${state.previousValue}${state.operator}${state.displayValue}`;
        const result = ExpressionParser.evaluate(fullExpr);
        if (result === 'Error') {
          return {
            ...initialCalculatorState,
            displayValue: 'Error',
            isErrorLocked: true
          };
        }
        const formatted = NumberPolicy.roundForDisplay(result);
        return {
          ...state,
          displayValue: formatted,
          previousValue: result,
          operator: nextOp,
          waitingForOperand: true,
          expression: `${formatted} ${nextOp}`
        };
      }

      return {
        ...state,
        previousValue: state.displayValue,
        operator: nextOp,
        waitingForOperand: true,
        expression: `${state.displayValue} ${nextOp}`
      };
    }

    case 'PERCENT': {
      // If there's an active previousValue and operator (e.g. 200 + 10 %)
      if (state.previousValue !== null && state.operator !== null) {
        const percentValue = PercentRule.calculateOperand(state.previousValue, state.displayValue);
        const formatted = NumberPolicy.roundForDisplay(percentValue.toString());
        return {
          ...state,
          displayValue: formatted,
          waitingForOperand: false
        };
      } else {
        // Standalone percent (e.g. 10 % = 0.1)
        const standaloneResult = PercentRule.applyStandalone(state.displayValue);
        const formatted = NumberPolicy.roundForDisplay(standaloneResult);
        return {
          ...state,
          displayValue: formatted,
          waitingForOperand: true
        };
      }
    }

    case 'EQUALS': {
      if (state.previousValue === null || state.operator === null) {
        return state;
      }

      const fullExpr = `${state.previousValue}${state.operator}${state.displayValue}`;
      const result = ExpressionParser.evaluate(fullExpr);

      if (result === 'Error') {
        return {
          ...initialCalculatorState,
          displayValue: 'Error',
          isErrorLocked: true
        };
      }

      const formatted = NumberPolicy.roundForDisplay(result);
      return {
        ...state,
        displayValue: formatted,
        previousValue: null,
        operator: null,
        waitingForOperand: true,
        expression: ''
      };
    }

    default:
      return state;
  }
}
