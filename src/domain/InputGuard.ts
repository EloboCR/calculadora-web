import { GuardResult } from './types';

export class InputGuard {
  public static MAX_EXPRESSION_LENGTH = 64;
  public static MAX_TOKENS = 64;

  public static validateExpressionLength(expr: string): GuardResult {
    if (expr.length > this.MAX_EXPRESSION_LENGTH) {
      return { valid: false, reason: 'Exceeded maximum expression length (64 characters)' };
    }
    return { valid: true };
  }

  public static validateTokenCount(count: number): GuardResult {
    if (count > this.MAX_TOKENS) {
      return { valid: false, reason: 'Exceeded maximum token count (64 tokens)' };
    }
    return { valid: true };
  }

  public static shouldAcceptKey(tsNowMs: number, tsLastMs: number): boolean {
    // 16ms rate-limit per frame
    return tsNowMs - tsLastMs >= 16;
  }
}
