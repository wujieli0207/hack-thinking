---
title: 中介者模式
---
定义

- 用一个中介对象封装一系列对象的交互
- 中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

类比：就像你在一个群聊中发消息，消息由群主（中介者）负责转发给其他成员，成员之间无需直接通信

应用场景

- 减少一组相互依赖的对象之间的耦合
- 集中控制复杂对象之间的交互

优缺点

- 优点
    - 减少对象之间的依赖
    - 提高系统的灵活性和可维护性
- 缺点
    - 可能增加系统的复杂性
    - 中介者可能变得过于复杂

实现代码

```ts
interface Mediator {
  notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;

  constructor(c1: Component1, c2: Component2) {
    this.component1 = c1;
    this.component1.setMediator(this);
    this.component2 = c2;
    this.component2.setMediator(this);
  }

  public notify(sender: object, event: string): void {
    if (event === 'A') {
      console.log('Mediator reacts on A and triggers following operations:');
      this.component2.doC();
    }

    if (event === 'D') {
      console.log('Mediator reacts on D and triggers following operations:');
      this.component1.doB();
      this.component2.doC();
    }
  }
}

class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator?: Mediator) {
    this.mediator = mediator;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

class Component1 extends BaseComponent {
  public doA(): void {
    console.log('Component 1 does A.');
    this.mediator.notify(this, 'A');
  }

  public doB(): void {
    console.log('Component 1 does B.');
    this.mediator.notify(this, 'B');
  }
}

class Component2 extends BaseComponent {
  public doC(): void {
    console.log('Component 2 does C.');
    this.mediator.notify(this, 'C');
  }

  public doD(): void {
    console.log('Component 2 does D.');
    this.mediator.notify(this, 'D');
  }
}

// 客户端代码
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);

console.log('Client triggers operation A.');
c1.doA();

console.log('');
console.log('Client triggers operation D.');
c2.doD();
```
