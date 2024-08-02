---
title: 命令模式
date: 2024-07-28
---
定义：

- 将请求封装成对象，以便使用不同的请求、队列或日志来参数化其他对象
- 同时支持可撤销的操作

类比：在点餐时，下单就是一个命令，你可以撤销、修改或重新下单

应用场景

- 参数化对象之间的请求
- 支持可撤销操作时
- 将请求排队和执行日志

优缺点

- 优点
    - 解耦请求发送者和接收者
    - 可以轻松添加新的命令
    - 支持撤销和恢复操作
- 缺点
    - 可能增加系统的复杂性

实现代码

```ts
// 命令接口
interface Command {
  execute(): void;
}

// 接收者类
class Receiver {
  public doSomething(): void {
    console.log('Receiver: Working on something...');
  }

  public doSomethingElse(): void {
    console.log('Receiver: Working on something else...');
  }
}

// 具体命令类
class ConcreteCommand1 implements Command {
  private receiver: Receiver;

  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  public execute(): void {
    console.log('ConcreteCommand1: Execute command on receiver.');
    this.receiver.doSomething();
  }
}

class ConcreteCommand2 implements Command {
  private receiver: Receiver;

  constructor(receiver: Receiver) {
    this.receiver = receiver;
  }

  public execute(): void {
    console.log('ConcreteCommand2: Execute another command on receiver.');
    this.receiver.doSomethingElse();
  }
}

// 调用者类
class Invoker {
  private onStart: Command;
  private onFinish: Command;

  public setOnStart(command: Command): void {
    this.onStart = command;
  }

  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }

  public doSomethingImportant(): void {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.onStart) {
      this.onStart.execute();
    }

    console.log('Invoker: ...doing something really important...');

    console.log('Invoker: Does anybody want something done after I finish?');
    if (this.onFinish) {
      this.onFinish.execute();
    }
  }
}

// 客户端代码
const invoker = new Invoker();
const receiver = new Receiver();
invoker.setOnStart(new ConcreteCommand1(receiver));
invoker.setOnFinish(new ConcreteCommand2(receiver));

invoker.doSomethingImportant();
```
