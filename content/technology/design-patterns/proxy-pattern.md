---
title: 代理模式
date: 2024-07-28
---
定义：为其他对象提供一种代理以控制对这个对象的访问

类比：就像你去电影院看电影，你买的是电影票（代理），而不是直接买电影。电影票允许你进入电影院观看电影

应用场景

- 控制对对象的访问
- 在访问对象时做一些额外的处理（如权限控制、延迟加载等）

优缺点

- 优点
    - 控制对象的访问权限
    - 在不修改对象的情况下添加额外的功能
- 缺点
    - 增加了系统的复杂性
    - 可能影响系统的性能

实现代码

```ts
// 服务接口
interface Subject {
  request(): void;
}

// 实际服务
class RealSubject implements Subject {
  public request(): void {
    console.log('RealSubject: Handling request.');
  }
}

// 代理类
class Proxy implements Subject {
  private realSubject: RealSubject;

  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.realSubject.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log('Proxy: Checking access prior to firing a real request.');
    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Logging the time of request.');
  }
}

// 客户端代码
function clientCode(subject: Subject) {
  subject.request();
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);
```
