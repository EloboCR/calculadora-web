import Decimal from 'decimal.js';
import { DecimalLike } from './types';

// Configure Decimal.js precision and rounding mode (ROUND_HALF_UP = 4)
Decimal.set({ precision: 28, rounding: Decimal.ROUND_HALF_UP });

export class NumberPolicy {
  public static MAX_DISPLAY_DIGITS = 10;

  public static normalize(value: DecimalLike): Decimal {
    try {
      return new Decimal(value);
    } catch {
      return new Decimal(0);
    }
  }

  public static roundForDisplay(value: DecimalLike): string {
    try {
      const dec = new Decimal(value);
      if (dec.isNaN()) return 'Error';
      if (!dec.isFinite()) return 'Error';

      // Check if integer part or absolute magnitude exceeds 10 digits
      const absDec = dec.abs();
      if (absDec.gte(1e10) || (absDec.gt(0) && absDec.lt(1e-7))) {
        return this.toScientific(dec);
      }

      // Round to at most MAX_DISPLAY_DIGITS significant digits using HALF_UP
      const sigFormatted = dec.toSignificantDigits(this.MAX_DISPLAY_DIGITS, Decimal.ROUND_HALF_UP).toString();
      
      // If it still exceeds length or has unnecessary decimals
      if (sigFormatted.includes('.')) {
        // Strip trailing zeros after dot
        const trimmed = sigFormatted.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '');
        return trimmed;
      }
      return sigFormatted;
    } catch {
      return 'Error';
    }
  }

  public static toScientific(value: DecimalLike): string {
    try {
      const dec = new Decimal(value);
      return dec.toExponential(4);
    } catch {
      return 'Error';
    }
  }
}
