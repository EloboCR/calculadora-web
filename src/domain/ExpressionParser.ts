import Decimal from 'decimal.js';
import { Token, Operator } from './types';
import { NumberPolicy } from './NumberPolicy';
import { InputGuard } from './InputGuard';

export class ExpressionParser {
  private static precedence: Record<Operator, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  public static tokenize(expr: string): Token[] {
    const tokens: Token[] = [];
    const sanitized = expr.replace(/\s+/g, '');
    let i = 0;

    while (i < sanitized.length) {
      const char = sanitized[i];

      if (['+', '-', '*', '/'].includes(char)) {
        // Check for unary minus: if at beginning or preceded by another operator
        const prevToken = tokens[tokens.length - 1];
        const isUnary = char === '-' && (!prevToken || prevToken.type === 'OPERATOR' || prevToken.type === 'LPAREN');
        
        if (isUnary) {
          // Read full negative number
          let numStr = '-';
          i++;
          while (i < sanitized.length && (/\d/.test(sanitized[i]) || sanitized[i] === '.')) {
            numStr += sanitized[i];
            i++;
          }
          tokens.push({ type: 'NUMBER', value: numStr });
          continue;
        }

        tokens.push({ type: 'OPERATOR', value: char });
        i++;
      } else if (char === '(') {
        tokens.push({ type: 'LPAREN', value: '(' });
        i++;
      } else if (char === ')') {
        tokens.push({ type: 'RPAREN', value: ')' });
        i++;
      } else if (/\d/.test(char) || char === '.') {
        let numStr = '';
        while (i < sanitized.length && (/\d/.test(sanitized[i]) || sanitized[i] === '.')) {
          numStr += sanitized[i];
          i++;
        }
        tokens.push({ type: 'NUMBER', value: numStr });
      } else {
        // Unknown character - skip
        i++;
      }
    }

    return tokens;
  }

  public static toRPN(tokens: Token[]): Token[] {
    const outputQueue: Token[] = [];
    const operatorStack: Token[] = [];

    for (const token of tokens) {
      if (token.type === 'NUMBER') {
        outputQueue.push(token);
      } else if (token.type === 'OPERATOR') {
        const op1 = token.value as Operator;
        while (operatorStack.length > 0) {
          const top = operatorStack[operatorStack.length - 1];
          if (top.type === 'OPERATOR') {
            const op2 = top.value as Operator;
            if (this.precedence[op2] >= this.precedence[op1]) {
              outputQueue.push(operatorStack.pop()!);
              continue;
            }
          }
          break;
        }
        operatorStack.push(token);
      } else if (token.type === 'LPAREN') {
        operatorStack.push(token);
      } else if (token.type === 'RPAREN') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1].type !== 'LPAREN') {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.pop(); // Pop LPAREN
      }
    }

    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop()!);
    }

    return outputQueue;
  }

  public static evaluateRPN(rpn: Token[]): string {
    const stack: Decimal[] = [];

    for (const token of rpn) {
      if (token.type === 'NUMBER') {
        stack.push(NumberPolicy.normalize(token.value));
      } else if (token.type === 'OPERATOR') {
        if (stack.length < 2) return 'Error';
        const b = stack.pop()!;
        const a = stack.pop()!;
        const op = token.value as Operator;

        switch (op) {
          case '+':
            stack.push(a.plus(b));
            break;
          case '-':
            stack.push(a.minus(b));
            break;
          case '*':
            stack.push(a.times(b));
            break;
          case '/':
            if (b.isZero()) {
              return 'Error';
            }
            stack.push(a.dividedBy(b));
            break;
        }
      }
    }

    if (stack.length !== 1) return 'Error';
    return stack[0].toString();
  }

  public static evaluate(expr: string): string {
    const guard = InputGuard.validateExpressionLength(expr);
    if (!guard.valid) return 'Error';

    const tokens = this.tokenize(expr);
    const tokenGuard = InputGuard.validateTokenCount(tokens.length);
    if (!tokenGuard.valid) return 'Error';

    const rpn = this.toRPN(tokens);
    return this.evaluateRPN(rpn);
  }
}
