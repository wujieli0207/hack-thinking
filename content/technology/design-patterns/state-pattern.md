---
title: 状态模式
---
定义：允许对象在其内部状态改变时改变其行为

类比：就像你玩电子游戏，角色可以根据不同的状态（如健康、受伤、昏迷）执行不同的动作

应用场景

- 一个对象的行为取决于它的状态，并且它必须在运行时根据状态改变其行为
- 代码中包含大量与对象状态有关的条件语句

优缺点

- 优点
    - 避免了过多的条件语句
    - 将与状态有关的行为局部化，并将不同状态的行为分割开
- 缺点
    - 增加了系统类的数量
    - 状态模式的使用需要仔细设计状态的转换

实现代码

```ts
// 上下文类
class Context {
  private state: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${state.constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

// 状态接口
abstract class State {
  protected context: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;
  public abstract handle2(): void;
}

// 具体状态类
class ConcreteStateA extends State {
  public handle1(): void {
    console.log('ConcreteStateA handles request1.');
    console.log('ConcreteStateA wants to change the state of the context.');
    this.context.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log('ConcreteStateA handles request2.');
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log('ConcreteStateB handles request1.');
  }

  public handle2(): void {
    console.log('ConcreteStateB handles request2.');
    console.log('ConcreteStateB wants to change the state of the context.');
    this.context.transitionTo(new ConcreteStateA());
  }
}

// 客户端代码
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
```
