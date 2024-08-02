---
title: 外观模式
date: 2024-07-28
---
定义

- 提供一个统一的接口，用来访问子系统中的一群接口
- 外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用

类比：就像在餐馆点餐，只需要和服务员沟通就可以点到餐，而不需要了解厨房里的细节

应用场景

- 为一个复杂子系统提供一个简单的接口
- 解耦客户端和子系统之间的依赖关系

优缺点

- 优点
    - 简化客户端对复杂系统的使用
    - 减少客户端与子系统之间的依赖
- 缺点
    - 增加了额外的封装层，可能会影响性能

实现代码

```ts
// 复杂子系统类
class Subsystem1 {
  public operation1(): string {
    return 'Subsystem1: Ready!';
  }

  public operationN(): string {
    return 'Subsystem1: Go!';
  }
}

class Subsystem2 {
  public operation1(): string {
    return 'Subsystem2: Get ready!';
  }

  public operationZ(): string {
    return 'Subsystem2: Fire!';
  }
}

// 外观类
class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1: Subsystem1, subsystem2: Subsystem2) {
    this.subsystem1 = subsystem1;
    this.subsystem2 = subsystem2;
  }

  public operation(): string {
    let result = 'Facade initializes subsystems:\n';
    result += this.subsystem1.operation1();
    result += '\n';
    result += this.subsystem2.operation1();
    result += '\n';
    result += 'Facade orders subsystems to perform the action:\n';
    result += this.subsystem1.operationN();
    result += '\n';
    result += this.subsystem2.operationZ();
    return result;
  }
}

// 客户端代码
function clientCode(facade: Facade) {
  console.log(facade.operation());
}

const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
```
