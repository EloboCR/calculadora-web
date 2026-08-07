import Decimal from 'decimal.js';
import { DecimalLike, Operator } from './types';
import { NumberPolicy } from './NumberPolicy';

export class PercentRule {
  public static calculateOperand(base: DecimalLike, operand: DecimalLike): Decimal {
    const b = NumberPolicy.normalize(base);
    const op = NumberPolicy.normalize(operand);
    return b.times(op).dividedBy(100);
  }

  public static apply(base: DecimalLike, operand: DecimalLike, operator: Operator): string {
    const b = NumberPolicy.normalize(base);
    const op = NumberPolicy.normalize(operand);

    switch (operator) {
      case '+': {
        const delta = b.times(op).dividedBy(100);
        return b.plus(delta).toString();
      }
      case '-': {
        const delta = b.times(op).dividedBy(100);
        return b.minus(delta).toString();
      }
      case '*': {
        return b.times(op.dividedBy(100)).toString();
      }
      case '/': {
        if (op.isZero()) return 'Error';
        return b.dividedBy(op.dividedBy(100)).toString();
      }
    }
  }

  public static applyStandalone(operand: DecimalLike): string {
    const op = NumberPolicy.normalize(operand);
    return op.dividedBy(100).toString();
  }
}
