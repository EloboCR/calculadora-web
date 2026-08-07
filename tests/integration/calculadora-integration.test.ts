import { describe, it, expect } from 'vitest';
import { calculatorReducer, initialCalculatorState } from '../../src/app/calculatorReducer';

describe('Calculator Reducer & State Transitions (Integration)', () => {
  it('performs basic sequential addition (5 + 3 = 8)', () => {
    let state = initialCalculatorState;
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '5' });
    expect(state.displayValue).toBe('5');
    state = calculatorReducer(state, { type: 'INPUT_OPERATOR', payload: '+' });
    expect(state.operator).toBe('+');
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '3' });
    expect(state.displayValue).toBe('3');
    state = calculatorReducer(state, { type: 'EQUALS' });
    expect(state.displayValue).toBe('8');
    expect(state.expression).toBe('');
  });

  it('locks calculator in Error state on division by zero until C is pressed (FR6)', () => {
    let state = initialCalculatorState;
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '5' });
    state = calculatorReducer(state, { type: 'INPUT_OPERATOR', payload: '/' });
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '0' });
    state = calculatorReducer(state, { type: 'EQUALS' });
    
    expect(state.displayValue).toBe('Error');
    expect(state.isErrorLocked).toBe(true);

    // Any key other than C should not change state
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '9' });
    expect(state.displayValue).toBe('Error');
    expect(state.isErrorLocked).toBe(true);

    state = calculatorReducer(state, { type: 'INPUT_OPERATOR', payload: '+' });
    expect(state.displayValue).toBe('Error');

    state = calculatorReducer(state, { type: 'EQUALS' });
    expect(state.displayValue).toBe('Error');

    // Pressing C recovers to initial state '0'
    state = calculatorReducer(state, { type: 'CLEAR' });
    expect(state.displayValue).toBe('0');
    expect(state.isErrorLocked).toBe(false);
  });

  it('supports chaining operations after equals (8 + 2 = 10)', () => {
    let state = initialCalculatorState;
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '5' });
    state = calculatorReducer(state, { type: 'INPUT_OPERATOR', payload: '+' });
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '3' });
    state = calculatorReducer(state, { type: 'EQUALS' });
    expect(state.displayValue).toBe('8');

    state = calculatorReducer(state, { type: 'INPUT_OPERATOR', payload: '+' });
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '2' });
    state = calculatorReducer(state, { type: 'EQUALS' });
    expect(state.displayValue).toBe('10');
  });

  it('prevents multiple decimal dots in a single number', () => {
    let state = initialCalculatorState;
    state = calculatorReducer(state, { type: 'INPUT_DOT' });
    expect(state.displayValue).toBe('0.');
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '5' });
    expect(state.displayValue).toBe('0.5');
    state = calculatorReducer(state, { type: 'INPUT_DOT' });
    expect(state.displayValue).toBe('0.5'); // Dot ignored
  });

  it('toggles sign correctly (±)', () => {
    let state = initialCalculatorState;
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '7' });
    expect(state.displayValue).toBe('7');
    state = calculatorReducer(state, { type: 'TOGGLE_SIGN' });
    expect(state.displayValue).toBe('-7');
    state = calculatorReducer(state, { type: 'TOGGLE_SIGN' });
    expect(state.displayValue).toBe('7');
  });

  it('applies percentage logic during active operator (200 + 10 % = 220)', () => {
    let state = initialCalculatorState;
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '2' });
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '0' });
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '0' });
    state = calculatorReducer(state, { type: 'INPUT_OPERATOR', payload: '+' });
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '1' });
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '0' });
    state = calculatorReducer(state, { type: 'PERCENT' });
    expect(state.displayValue).toBe('20');
    state = calculatorReducer(state, { type: 'EQUALS' });
    expect(state.displayValue).toBe('220');
  });

  it('applies standalone percentage (10 % = 0.1)', () => {
    let state = initialCalculatorState;
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '1' });
    state = calculatorReducer(state, { type: 'INPUT_DIGIT', payload: '0' });
    state = calculatorReducer(state, { type: 'PERCENT' });
    expect(state.displayValue).toBe('0.1');
  });
});
