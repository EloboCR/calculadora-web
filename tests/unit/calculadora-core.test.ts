import { describe, it, expect } from 'vitest';
import { NumberPolicy } from '../../src/domain/NumberPolicy';
import { PercentRule } from '../../src/domain/PercentRule';
import { ExpressionParser } from '../../src/domain/ExpressionParser';
import { InputGuard } from '../../src/domain/InputGuard';
import { DisplayFormatter } from '../../src/domain/DisplayFormatter';

describe('NumberPolicy & Precision (ADR-003)', () => {
  it('normalizes numbers correctly', () => {
    const dec = NumberPolicy.normalize('123.45');
    expect(dec.toString()).toBe('123.45');
  });

  it('handles floating point precision accurately (0.1 + 0.2 = 0.3)', () => {
    const res = ExpressionParser.evaluate('0.1+0.2');
    expect(DisplayFormatter.format(res)).toBe('0.3');
  });

  it('rounds half-up to max 10 significant digits and trims trailing zeros', () => {
    const formatted = DisplayFormatter.format('1.00500000000');
    expect(formatted).toBe('1.005');
  });

  it('formats large numbers exceeding 10 digits to scientific notation', () => {
    const largeNumber = '123456789012345';
    const formatted = DisplayFormatter.format(largeNumber);
    expect(formatted).toMatch(/e\+/i);
  });
});

describe('ExpressionParser & Precedence (FR1, FR3, ADR-002)', () => {
  it('evaluates basic addition (5 + 3 = 8)', () => {
    const res = ExpressionParser.evaluate('5+3');
    expect(DisplayFormatter.format(res)).toBe('8');
  });

  it('evaluates basic subtraction (10 - 4 = 6)', () => {
    const res = ExpressionParser.evaluate('10-4');
    expect(DisplayFormatter.format(res)).toBe('6');
  });

  it('evaluates basic multiplication (6 * 7 = 42)', () => {
    const res = ExpressionParser.evaluate('6*7');
    expect(DisplayFormatter.format(res)).toBe('42');
  });

  it('evaluates basic division (20 / 4 = 5)', () => {
    const res = ExpressionParser.evaluate('20/4');
    expect(DisplayFormatter.format(res)).toBe('5');
  });

  it('respects standard mathematical precedence (2 + 3 * 4 = 14)', () => {
    const res = ExpressionParser.evaluate('2+3*4');
    expect(DisplayFormatter.format(res)).toBe('14');
  });

  it('evaluates mixed precedence chain (20 / 2 + 3 * 5 = 25)', () => {
    const res = ExpressionParser.evaluate('20/2+3*5');
    expect(DisplayFormatter.format(res)).toBe('25');
  });

  it('handles decimal inputs (1.5 + 2.25 = 3.75)', () => {
    const res = ExpressionParser.evaluate('1.5+2.25');
    expect(DisplayFormatter.format(res)).toBe('3.75');
  });

  it('returns Error on division by zero (5 / 0)', () => {
    const res = ExpressionParser.evaluate('5/0');
    expect(res).toBe('Error');
  });
});

describe('PercentRule Policy (FR7, ADR-004)', () => {
  it('calculates percent on addition (200 + 10% = 220)', () => {
    const res = PercentRule.apply('200', '10', '+');
    expect(DisplayFormatter.format(res)).toBe('220');
  });

  it('calculates percent on subtraction (200 - 10% = 180)', () => {
    const res = PercentRule.apply('200', '10', '-');
    expect(DisplayFormatter.format(res)).toBe('180');
  });

  it('calculates percent on multiplication (200 * 10% = 20)', () => {
    const res = PercentRule.apply('200', '10', '*');
    expect(DisplayFormatter.format(res)).toBe('20');
  });

  it('calculates percent on division (200 / 10% = 2000)', () => {
    const res = PercentRule.apply('200', '10', '/');
    expect(DisplayFormatter.format(res)).toBe('2000');
  });

  it('calculates standalone percent (10% = 0.1)', () => {
    const res = PercentRule.applyStandalone('10');
    expect(DisplayFormatter.format(res)).toBe('0.1');
  });
});

describe('InputGuard Policy (T6)', () => {
  it('rejects input that exceeds 64 characters', () => {
    const longString = '1'.repeat(65);
    expect(InputGuard.validateExpressionLength(longString).valid).toBe(false);
  });

  it('accepts valid input within 64 characters', () => {
    const validString = '123+456';
    expect(InputGuard.validateExpressionLength(validString).valid).toBe(true);
  });
});
