import { NumberPolicy } from './NumberPolicy';
import { DecimalLike } from './types';

export class DisplayFormatter {
  public static format(value: DecimalLike): string {
    if (value === 'Error') return 'Error';
    if (typeof value === 'string' && value.endsWith('.')) {
      return value; // Retain trailing dot while user is typing decimals
    }
    return NumberPolicy.roundForDisplay(value);
  }
}
