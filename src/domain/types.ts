import Decimal from 'decimal.js';

export type Operator = '+' | '-' | '*' | '/';

export interface Token {
  type: 'NUMBER' | 'OPERATOR' | 'LPAREN' | 'RPAREN';
  value: string;
}

export type DecimalLike = string | number | Decimal;

export interface GuardResult {
  valid: boolean;
  reason?: string;
}
