---
title: 桥接模式
---
定义：将抽象部分与它的实现部分分离，使它们都可以独立地变化

类比：有一个通用的遥控器，可以控制不同品牌的电视机。遥控器和电视机的具体实现可以独立变化

应用场景

- 希望抽象和实现可以独立变化
- 需要在不同维度上扩展类

优缺点

- 优点
    - 提高了系统的可扩展性
    - 符合[[single-responsibility-principle|单一职责原则]]和[[open-closed-principle|开闭原则]]
- 缺点
    - 增加了系统的复杂性

实现代码

```ts
// 实现部分的接口
interface Implementor {
  operationImpl(): string;
}

// 具体实现类
class ConcreteImplementorA implements Implementor {
  public operationImpl(): string {
    return 'ConcreteImplementorA: Here\'s the result on the platform A.';
  }
}

class ConcreteImplementorB implements Implementor {
  public operationImpl(): string {
    return 'ConcreteImplementorB: Here\'s the result on the platform B.';
  }
}

// 抽象部分的接口
abstract class Abstraction {
  protected implementor: Implementor;

  constructor(implementor: Implementor) {
    this.implementor = implementor;
  }

  public abstract operation(): string;
}

// 扩展抽象部分
class RefinedAbstraction extends Abstraction {
  public operation(): string {
    return `RefinedAbstraction: Base operation with:\n${this.implementor.operationImpl()}`;
  }
}

// 客户端代码
function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}

let implementor = new ConcreteImplementorA();
let abstraction = new RefinedAbstraction(implementor);
clientCode(abstraction);

implementor = new ConcreteImplementorB();
abstraction = new RefinedAbstraction(implementor);
clientCode(abstraction);
```
