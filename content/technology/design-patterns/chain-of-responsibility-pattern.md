---
title: 责任链模式
date: 2024-07-28
---
定义

- 为请求创建一个接收对象的链
- 每个对象沿着链传递请求，直到有对象处理它

类比：在公司里请假，申请先由你的直属上司审批，如果他不能处理，再向上一级领导审批，直到申请被批准或到达最高领导

应用场景

- 需要多个对象处理请求，但不希望指定处理者时
- 需要在运行时灵活地组合处理者时

优缺点

- 优点
    - 降低了请求发送者和接收者之间的耦合
    - 增强了请求处理的灵活性
- 缺点
    - 可能处理延迟，因为请求可能通过链中多个处理者
    - 如果链过长，可能影响性能

实现代码

```ts
abstract class Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return null;
  }
}

class ConcreteHandler1 extends Handler {
  public handle(request: string): string {
    if (request === 'Request1') {
      return `ConcreteHandler1: I'll handle the ${request}.`;
    }
    return super.handle(request);
  }
}

class ConcreteHandler2 extends Handler {
  public handle(request: string): string {
    if (request === 'Request2') {
      return `ConcreteHandler2: I'll handle the ${request}.`;
    }
    return super.handle(request);
  }
}

// 客户端代码
function clientCode(handler: Handler) {
  const requests = ['Request1', 'Request2', 'Request3'];

  for (const request of requests) {
    console.log(`Client: Who wants to handle ${request}?`);
    const result = handler.handle(request);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${request} was left untouched.`);
    }
  }
}

const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
handler1.setNext(handler2);

clientCode(handler1);
```
