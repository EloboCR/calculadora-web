import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/App';

describe('Calculadora UI & Accessibility (FR2, NFR3, WCAG 2.1 AA)', () => {
  it('renders display and key buttons', () => {
    render(<App />);
    const display = screen.getByTestId('calculator-display');
    expect(display).toBeDefined();
    expect(display.textContent).toBe('0');

    expect(screen.getByRole('button', { name: /limpiar/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /igual/i })).toBeDefined();
  });

  it('performs calculations via UI button clicks (5 + 3 = 8)', () => {
    render(<App />);
    const btn5 = screen.getByRole('button', { name: '5' });
    const btnPlus = screen.getByRole('button', { name: /sumar/i });
    const btn3 = screen.getByRole('button', { name: '3' });
    const btnEquals = screen.getByRole('button', { name: /igual/i });

    fireEvent.click(btn5);
    fireEvent.click(btnPlus);
    fireEvent.click(btn3);
    fireEvent.click(btnEquals);

    const display = screen.getByTestId('calculator-display');
    expect(display.textContent).toBe('8');
  });

  it('handles physical keyboard inputs (9 * 9 Enter -> 81, Escape -> 0)', () => {
    render(<App />);
    fireEvent.keyDown(window, { key: '9' });
    fireEvent.keyDown(window, { key: '*' });
    fireEvent.keyDown(window, { key: '9' });
    fireEvent.keyDown(window, { key: 'Enter' });

    const display = screen.getByTestId('calculator-display');
    expect(display.textContent).toBe('81');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(display.textContent).toBe('0');
  });

  it('marks display with role="alert" when error occurs (5 / 0 = Error)', () => {
    render(<App />);
    const btn5 = screen.getByRole('button', { name: '5' });
    const btnDiv = screen.getByRole('button', { name: /dividir/i });
    const btn0 = screen.getByRole('button', { name: '0' });
    const btnEquals = screen.getByRole('button', { name: /igual/i });

    fireEvent.click(btn5);
    fireEvent.click(btnDiv);
    fireEvent.click(btn0);
    fireEvent.click(btnEquals);

    const display = screen.getByTestId('calculator-display');
    expect(display.textContent).toBe('Error');
    expect(display.getAttribute('role')).toBe('alert');
  });
});
