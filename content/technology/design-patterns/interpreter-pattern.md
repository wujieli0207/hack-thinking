---
title: 解释器模式
date: 2024-07-28
---
定义：给定一个语言，定义它的文法的一种表示，并定义一个解释器，该解释器使用该表示来解释语言中的句子

类比：学习一门新语言，你需要知道它的语法和词汇，然后用这些规则去理解和翻译这门语言。

应用场景

- 解释一种特定语言或语法
- 将一个复杂的表达式分解成更简单的表达式并逐步求值时

优缺点

- 优点
    - 易于实现简单文法的解释器
    - 易于扩展新的文法规则
- 缺点
    - 复杂文法的解释器难以维护
    - 性能可能较低，因为每个文法规则通常需要一个类

实现代码

```ts
// 抽象表达式接口
interface AbstractExpression {
  interpret(context: string): string;
}

// 终结符表达式
class TerminalExpression implements AbstractExpression {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  public interpret(context: string): string {
    if (context.includes(this.data)) {
      return `TerminalExpression: ${this.data} is found in ${context}`;
    }
    return `TerminalExpression: ${this.data} is not found in ${context}`;
  }
}

// 非终结符表达式
class OrExpression implements AbstractExpression {
  private expr1: AbstractExpression;
  private expr2: AbstractExpression;

  constructor(expr1: AbstractExpression, expr2: AbstractExpression) {
    this.expr1 = expr1;
    this.expr2 = expr2;
  }

  public interpret(context: string): string {
    return `${this.expr1.interpret(context)} OR ${this.expr2.interpret(context)}`;
  }
}

// 客户端代码
const expr1 = new TerminalExpression('Hello');
const expr2 = new TerminalExpression('World');
const orExpr = new OrExpression(expr1, expr2);

console.log(orExpr.interpret('Hello JavaScript'));
console.log(orExpr.interpret('Python World'));
console.log(orExpr.interpret('Java Programming'));
```
